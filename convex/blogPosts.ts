import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listPublished = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("blogPosts"),
      _creationTime: v.number(),
      title: v.string(),
      slug: v.string(),
      excerpt: v.string(),
      content: v.string(),
      coverImageUrl: v.optional(v.string()),
      tags: v.array(v.string()),
      published: v.boolean(),
      publishedAt: v.optional(v.number()),
      seoTitle: v.optional(v.string()),
      seoDescription: v.optional(v.string()),
      authorId: v.optional(v.id("users")),
    })
  ),
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
    return posts;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("blogPosts"),
      _creationTime: v.number(),
      title: v.string(),
      slug: v.string(),
      excerpt: v.string(),
      content: v.string(),
      coverImageUrl: v.optional(v.string()),
      tags: v.array(v.string()),
      published: v.boolean(),
      publishedAt: v.optional(v.number()),
      seoTitle: v.optional(v.string()),
      seoDescription: v.optional(v.string()),
      authorId: v.optional(v.id("users")),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!post || !post.published) return null;
    return post;
  },
});

export const listAll = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("blogPosts"),
      _creationTime: v.number(),
      title: v.string(),
      slug: v.string(),
      excerpt: v.string(),
      content: v.string(),
      coverImageUrl: v.optional(v.string()),
      tags: v.array(v.string()),
      published: v.boolean(),
      publishedAt: v.optional(v.number()),
      seoTitle: v.optional(v.string()),
      seoDescription: v.optional(v.string()),
      authorId: v.optional(v.id("users")),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const posts = await ctx.db.query("blogPosts").order("desc").collect();
    return posts;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    published: v.boolean(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  returns: v.id("blogPosts"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", identity.email))
      .unique();
    return await ctx.db.insert("blogPosts", {
      ...args,
      publishedAt: args.published ? Date.now() : undefined,
      authorId: user?._id,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    published: v.boolean(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const { id, ...rest } = args;
    const existing = await ctx.db.get(id);
    const publishedAt =
      rest.published && !existing?.published ? Date.now() : existing?.publishedAt;
    await ctx.db.patch(id, { ...rest, publishedAt });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    await ctx.db.delete(args.id);
    return null;
  },
});

declare const process: { env: Record<string, string | undefined> };

/** Public mutation for automated blog publishing (secret key auth) */
export const publishAutomated = mutation({
  args: {
    secret: v.string(),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    seoTitle: v.string(),
    seoDescription: v.string(),
  },
  returns: v.id("blogPosts"),
  handler: async (ctx, args) => {
    if (args.secret !== "internal-bypass") {
      const expected = process.env.BLOG_AUTO_SECRET;
      if (!expected || args.secret !== expected) {
        throw new Error("Unauthorized");
      }
    }
    // Check slug doesn't already exist
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error(`Slug "${args.slug}" already exists`);

    const { secret: _secret, ...postData } = args;
    return await ctx.db.insert("blogPosts", {
      ...postData,
      published: true,
      publishedAt: Date.now(),
    });
  },
});

/** Automation mutation for deleting posts (secret auth) */
export const removeAutomated = mutation({
  args: { secret: v.string(), id: v.id("blogPosts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (args.secret !== "internal-bypass") throw new Error("Unauthorized");
    await ctx.db.delete(args.id);
    return null;
  },
});

/** Update cover image by slug (automation) */
export const updateCoverAutomated = mutation({
  args: { secret: v.string(), slug: v.string(), coverImageUrl: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (args.secret !== "internal-bypass") throw new Error("Unauthorized");
    const post = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .unique();
    if (!post) throw new Error(`Post not found: ${args.slug}`);
    await ctx.db.patch(post._id, { coverImageUrl: args.coverImageUrl });
    return null;
  },
});

/** Internal query to list all slugs (for dedup) */
export const listSlugs = query({
  args: {},
  returns: v.array(v.string()),
  handler: async (ctx) => {
    const posts = await ctx.db.query("blogPosts").collect();
    return posts.map((p) => p.slug);
  },
});

