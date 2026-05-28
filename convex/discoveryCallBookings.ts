import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const book = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    specialty: v.string(),
    practiceType: v.string(),
    currentSituation: v.string(),
    message: v.optional(v.string()),
  },
  returns: v.id("discoveryCallBookings"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("discoveryCallBookings", {
      ...args,
      status: "pending",
      bookedAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("discoveryCallBookings"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      specialty: v.string(),
      practiceType: v.string(),
      currentSituation: v.string(),
      message: v.optional(v.string()),
      status: v.string(),
      bookedAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db.query("discoveryCallBookings").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("discoveryCallBookings"),
    status: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    await ctx.db.patch(args.id, { status: args.status });
    return null;
  },
});
