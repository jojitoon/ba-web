import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const toggleFavorite = mutation({
  args: {
    userId: v.string(),
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    itemId: v.string(), // Accept as string
  },
  handler: async (ctx, args) => {
    // Check if favorite already exists
    const existing = await ctx.db
      .query('favorites')
      .withIndex('by_item', (q) =>
        q.eq('itemType', args.itemType).eq('itemId', args.itemId)
      )
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (existing) {
      // Remove favorite
      await ctx.db.delete(existing._id);

      // Update favorite count on business story if applicable
      if (args.itemType === 'businessStory') {
        const story = await ctx.db.get(args.itemId as any);
        if (story) {
          const currentCount = (story as any).favoriteCount ?? 0;
          await ctx.db.patch(args.itemId as any, {
            favoriteCount: Math.max(0, currentCount - 1),
          });
        }
      }

      return { favorited: false };
    } else {
      // Add favorite
      await ctx.db.insert('favorites', {
        userId: args.userId,
        itemType: args.itemType,
        itemId: args.itemId,
        createdAt: Date.now(),
      });

      // Update favorite count on business story if applicable
      if (args.itemType === 'businessStory') {
        const story = await ctx.db.get(args.itemId as any);
        if (story) {
          const currentCount = (story as any).favoriteCount ?? 0;
          await ctx.db.patch(args.itemId as any, {
            favoriteCount: currentCount + 1,
          });
        }
      }

      return { favorited: true };
    }
  },
});

export const isFavorited = query({
  args: {
    userId: v.string(),
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    itemId: v.string(), // Accept as string
  },
  handler: async (ctx, args) => {
    const favorite = await ctx.db
      .query('favorites')
      .withIndex('by_item', (q) =>
        q.eq('itemType', args.itemType).eq('itemId', args.itemId)
      )
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    return favorite !== null;
  },
});

export const getUserFavorites = query({
  args: {
    userId: v.string(),
    itemType: v.optional(
      v.union(v.literal('project'), v.literal('businessStory'))
    ),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('favorites')
      .withIndex('by_user', (q) => q.eq('userId', args.userId));

    const favorites = await query.collect();

    if (args.itemType) {
      return favorites.filter((f) => f.itemType === args.itemType);
    }

    return favorites;
  },
});

export const getFavoriteCount = query({
  args: {
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const favorites = await ctx.db
      .query('favorites')
      .withIndex('by_item', (q) =>
        q.eq('itemType', args.itemType).eq('itemId', args.itemId)
      )
      .collect();

    return favorites.length;
  },
});
