import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const capture = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    specialty: v.optional(v.string()),
    interest: v.optional(v.string()),
    source: v.string(),
  },
  returns: v.id("leads"),
  handler: async (ctx, args) => {
    // Check for existing lead with same email
    const existing = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) {
      // Update existing lead with new info if provided
      await ctx.db.patch(existing._id, {
        ...(args.phone && { phone: args.phone }),
        ...(args.specialty && { specialty: args.specialty }),
        ...(args.interest && { interest: args.interest }),
        ghlSynced: false, // re-flag for sync on update
      });
      return existing._id;
    }
    return await ctx.db.insert("leads", {
      ...args,
      downloadedAt: Date.now(),
      ghlSynced: false,
    });
  },
});

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("leads"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      specialty: v.optional(v.string()),
      interest: v.optional(v.string()),
      source: v.string(),
      downloadedAt: v.number(),
      ghlSynced: v.optional(v.boolean()),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db.query("leads").order("desc").collect();
  },
});

/** Return leads not yet synced to GHL (for external sync script). */
export const listUnsynced = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("leads"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      specialty: v.optional(v.string()),
      interest: v.optional(v.string()),
      source: v.string(),
      downloadedAt: v.number(),
      ghlSynced: v.optional(v.boolean()),
    })
  ),
  handler: async (ctx) => {
    // Get leads where ghlSynced is false or undefined
    const allLeads = await ctx.db.query("leads").collect();
    return allLeads.filter((l) => !l.ghlSynced);
  },
});

/** Mark a lead as synced to GHL. */
export const markGhlSynced = mutation({
  args: { leadId: v.id("leads") },
  returns: v.null(),
  handler: async (ctx, { leadId }) => {
    await ctx.db.patch(leadId, { ghlSynced: true });
    return null;
  },
});
