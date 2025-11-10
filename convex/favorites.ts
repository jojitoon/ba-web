import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const toggleFavorite = mutation({
  args: {
    userId: v.string(),
    itemType: v.union(v.literal("project"), v.literal("businessStory")),
    itemId: v.string(), // Accept as string
  },
  handler: async (ctx, args) => {
    // Check if favorite already exists
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_item", (q) =>
        q.eq("itemType", args.itemType).eq("itemId", args.itemId)
      )
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existing) {
      // Remove favorite
      await ctx.db.delete(existing._id);
      return { favorited: false };
    } else {
      // Add favorite
      await ctx.db.insert("favorites", {
        userId: args.userId,
        itemType: args.itemType,
        itemId: args.itemId,
        createdAt: Date.now(),
      });
      return { favorited: true };
    }
  },
});

export const isFavorited = query({
  args: {
    userId: v.string(),
    itemType: v.union(v.literal("project"), v.literal("businessStory")),
    itemId: v.string(), // Accept as string
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_item", (q) =>
        q.eq("itemType", args.itemType).eq("itemId", args.itemId)
      )
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    return favorite !== null;
  },
});

export const getUserFavorites = query({
  args: {
    userId: v.string(),
    itemType: v.optional(v.union(v.literal("project"), v.literal("businessStory"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", args.userId));

    const favorites = await query.collect();

    if (args.itemType) {
      return favorites.filter((f) => f.itemType === args.itemType);
    }

    return favorites;
  },
});

