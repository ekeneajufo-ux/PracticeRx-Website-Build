import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();
auth.addHttpRoutes(http);

// Blog post automation endpoint
http.route({
  path: "/api/blog/publish",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { secret, title, slug, excerpt, content, coverImageUrl, tags, seoTitle, seoDescription } = body;

      if (!secret || secret !== "prx-blog-EVT7Q2Kr3Jz") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Check slug doesn't already exist
      const existing = await ctx.runQuery(api.blogPosts.getBySlug, { slug });
      if (existing) {
        return new Response(
          JSON.stringify({ error: `Slug "${slug}" already exists` }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }

      const id = await ctx.runMutation(api.blogPosts.publishAutomated, {
        secret: "internal-bypass",
        title,
        slug,
        excerpt,
        content,
        ...(coverImageUrl ? { coverImageUrl } : {}),
        tags,
        seoTitle,
        seoDescription,
      });

      return new Response(JSON.stringify({ success: true, id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

// Blog post delete endpoint (for automation cleanup)
http.route({
  path: "/api/blog/delete",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { secret, slug } = body;

      if (!secret || secret !== "prx-blog-EVT7Q2Kr3Jz") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      const post = await ctx.runQuery(api.blogPosts.getBySlug, { slug });
      if (!post) {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      await ctx.runMutation(api.blogPosts.removeAutomated, { secret: "internal-bypass", id: post._id });
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

// Blog post update cover image endpoint
http.route({
  path: "/api/blog/update-cover",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { secret, slug, coverImageUrl } = body;

      if (!secret || secret !== "prx-blog-EVT7Q2Kr3Jz") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      await ctx.runMutation(api.blogPosts.updateCoverAutomated, {
        secret: "internal-bypass",
        slug,
        coverImageUrl,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

// ── GHL Lead Sync Endpoints ──────────────────────────────────────
const SYNC_SECRET = "prx-ghl-sync-Kx9mR4vW7nB";

http.route({
  path: "/api/leads/unsynced",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");
    if (secret !== SYNC_SECRET) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const leads = await ctx.runQuery(api.leads.listUnsynced);
    return new Response(JSON.stringify({ leads }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/api/leads/mark-synced",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { secret, leadId } = body;
      if (secret !== SYNC_SECRET) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      await ctx.runMutation(api.leads.markGhlSynced, { leadId });
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

export default http;
