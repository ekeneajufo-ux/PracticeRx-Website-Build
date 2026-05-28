import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribe = mutation({
  args: { email: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) return null;
    await ctx.db.insert("subscribers", {
      email: args.email,
      subscribedAt: Date.now(),
    });
    return null;
  },
});
