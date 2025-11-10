import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    location: v.string(),
    category: v.string(),
    status: v.union(
      v.literal("Draft"),
      v.literal("Archived"),
      v.literal("In Progress"),
      v.literal("In Review"),
      v.literal("Published")
    ),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    team: v.optional(v.string()),
    client: v.optional(v.string()),
    architect: v.optional(v.string()),
    contractor: v.optional(v.string()),
    description: v.string(),
    fullDescription: v.optional(v.string()),
    keyFeatures: v.array(v.string()),
    statistics: v.array(
      v.object({
        label: v.string(),
        value: v.string(),
      })
    ),
    media: v.object({
      photos: v.array(v.string()), // Convex storage IDs
      videos: v.array(v.string()), // Mux asset IDs
    }),
    timelines: v.array(
      v.object({
        phase: v.string(),
        startDate: v.string(),
        endDate: v.string(),
        description: v.string(),
        status: v.union(
          v.literal("completed"),
          v.literal("in-progress"),
          v.literal("pending")
        ),
        images: v.array(v.string()), // Convex storage IDs
      })
    ),
    teamInterviews: v.array(
      v.object({
        name: v.string(),
        role: v.string(),
        company: v.string(),
        quote: v.string(),
        image: v.optional(v.string()), // Convex storage ID
      })
    ),
    views: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  businessStories: defineTable({
    title: v.string(),
    business: v.string(),
    location: v.string(),
    category: v.string(),
    status: v.union(
      v.literal("Draft"),
      v.literal("In Review"),
      v.literal("Archived"),
      v.literal("In Progress"),
      v.literal("Published")
    ),
    duration: v.optional(v.string()),
    rating: v.optional(v.number()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
    description: v.string(),
    fullDescription: v.optional(v.string()),
    ownerStory: v.optional(v.string()),
    views: v.optional(v.number()),
    favoriteCount: v.optional(v.number()),
    milestones: v.array(
      v.object({
        year: v.string(),
        title: v.string(),
        description: v.string(),
      })
    ),
    testimonials: v.array(
      v.object({
        name: v.string(),
        role: v.string(),
        content: v.string(),
        rating: v.number(),
      })
    ),
    supportLinks: v.object({
      website: v.optional(v.string()),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      address: v.optional(v.string()),
    }),
    media: v.optional(
      v.object({
        images: v.array(v.string()),
        video: v.optional(v.string()),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  media: defineTable({
    type: v.union(v.literal("image"), v.literal("video")),
    filename: v.string(),
    storageId: v.string(), // Convex storage ID
    muxAssetId: v.optional(v.string()), // For videos
    muxPlaybackId: v.optional(v.string()), // For videos
    uploadId: v.optional(v.string()), // Mux upload ID for tracking
    thumbnailUrl: v.optional(v.string()),
    size: v.number(),
    mimeType: v.string(),
    projectId: v.optional(v.id("projects")),
    storyId: v.optional(v.id("businessStories")),
    uploadedAt: v.number(),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor"), v.literal("viewer")),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  }),

  publicUsers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    passwordHash: v.string(), // In production, use proper hashing
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  })
    .index("by_email", ["email"]),

  favorites: defineTable({
    userId: v.string(), // Email or user identifier
    itemType: v.union(v.literal("project"), v.literal("businessStory")),
    itemId: v.string(), // Store as string to handle both project and businessStory IDs
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_item", ["itemType", "itemId"]),
});
