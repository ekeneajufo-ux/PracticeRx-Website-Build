import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  blogPosts: defineTable({
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
    .index("by_slug", ["slug"])
    .index("by_published", ["published", "publishedAt"]),

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    specialty: v.optional(v.string()),
    interest: v.optional(v.string()),
    source: v.string(),
    downloadedAt: v.number(),
    ghlSynced: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_ghl_sync", ["ghlSynced"]),

  discoveryCallBookings: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    specialty: v.string(),
    practiceType: v.string(),
    currentSituation: v.string(),
    message: v.optional(v.string()),
    status: v.string(),
    bookedAt: v.number(),
  }).index("by_status", ["status"]),

  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),

  dripEnrollments: defineTable({
    email: v.string(),
    name: v.string(),
    source: v.string(), // "guide_download" | "contact" | "discovery_call"
    enrolledAt: v.number(),
    currentStep: v.number(), // 0 = welcome sent, 1 = case study sent, etc.
    lastSentAt: v.number(),
    completedAt: v.optional(v.number()),
    status: v.string(), // "active" | "completed" | "unsubscribed"
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
});

export default schema;
