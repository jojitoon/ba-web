import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageId = mutation({
  args: {
    storageId: v.id('_storage'),
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    type: v.union(v.literal('image'), v.literal('video')),
    projectId: v.optional(v.id('projects')),
    storyId: v.optional(v.id('businessStories')),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('media', {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

export const getMedia = query({
  args: { id: v.id('media') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getMediaByProject = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('media')
      .filter((q) => q.eq(q.field('projectId'), args.projectId))
      .collect();
  },
});

export const getMediaByStory = query({
  args: { storyId: v.id('businessStories') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('media')
      .filter((q) => q.eq(q.field('storyId'), args.storyId))
      .collect();
  },
});

export const deleteMedia = mutation({
  args: { id: v.id('media') },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.id);
    if (media) {
      await ctx.storage.delete(media.storageId);
      await ctx.db.delete(args.id);
    }
  },
});

export const getImageUrl = query({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('media').order('desc').collect();
  },
});
