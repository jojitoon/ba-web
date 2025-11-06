import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("businessStories");

    if (args.status && args.status !== "All") {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    if (args.category && args.category !== "All") {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }

    return await query.order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("businessStories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    business: v.string(),
    location: v.string(),
    category: v.string(),
    status: v.union(
      v.literal("Draft"),
      v.literal("In Review"),
      v.literal("Published")
    ),
    duration: v.optional(v.string()),
    rating: v.optional(v.number()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
    description: v.string(),
    fullDescription: v.optional(v.string()),
    ownerStory: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("businessStories", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("businessStories"),
    title: v.optional(v.string()),
    business: v.optional(v.string()),
    location: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("Draft"),
        v.literal("In Review"),
        v.literal("Published")
      )
    ),
    duration: v.optional(v.string()),
    rating: v.optional(v.number()),
    founded: v.optional(v.string()),
    employees: v.optional(v.string()),
    description: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    ownerStory: v.optional(v.string()),
    milestones: v.optional(
      v.array(
        v.object({
          year: v.string(),
          title: v.string(),
          description: v.string(),
        })
      )
    ),
    testimonials: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.string(),
          content: v.string(),
          rating: v.number(),
        })
      )
    ),
    supportLinks: v.optional(
      v.object({
        website: v.optional(v.string()),
        phone: v.optional(v.string()),
        email: v.optional(v.string()),
        address: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteStory = mutation({
  args: { id: v.id("businessStories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const addMedia = mutation({
  args: {
    storyId: v.id("businessStories"),
    type: v.union(v.literal("image"), v.literal("video")),
    storageId: v.string(),
    muxAssetId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const story = await ctx.db.get(args.storyId);
    if (!story) throw new Error("Story not found");

    const currentMedia = story.media || { images: [], video: undefined };

    if (args.type === "image") {
      await ctx.db.patch(args.storyId, {
        media: {
          ...currentMedia,
          images: [...(currentMedia.images || []), args.storageId],
        },
        updatedAt: Date.now(),
      });
    } else if (args.type === "video") {
      await ctx.db.patch(args.storyId, {
        media: {
          ...currentMedia,
          video: args.muxAssetId,
        },
        updatedAt: Date.now(),
      });
    }
  },
});

export const incrementViews = mutation({
  args: { id: v.id("businessStories") },
  handler: async (ctx, args) => {
    const story = await ctx.db.get(args.id);
    if (!story) return;
    await ctx.db.patch(args.id, { views: (story.views ?? 0) + 1 });
  },
});

export const getStory = query({
  args: { id: v.id("businessStories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByIdWithMedia = query({
  args: { id: v.id("businessStories") },
  handler: async (ctx, args) => {
    const story = await ctx.db.get(args.id);
    if (!story) return null;

    const mediaItems = await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("storyId"), args.id))
      .collect();

    const images: any[] = [];
    const videos: any[] = [];

    for (const media of mediaItems) {
      if (media.type === "image") {
        const url = await ctx.storage.getUrl(media.storageId as any);
        images.push({
          _id: media._id,
          url,
          filename: media.filename,
          storageId: media.storageId,
        });
      } else if (media.type === "video") {
        const playbackUrl = media.muxPlaybackId
          ? `https://stream.mux.com/${media.muxPlaybackId}.m3u8`
          : null;

        const thumbnailUrl = media.thumbnailUrl
          ? media.thumbnailUrl
          : media.muxPlaybackId
          ? `https://image.mux.com/${media.muxPlaybackId}/thumbnail.png?width=400&height=225`
          : null;

        videos.push({
          _id: media._id,
          filename: media.filename,
          muxAssetId: media.muxAssetId,
          playbackUrl,
          thumbnailUrl,
        });
      }
    }

    return {
      ...story,
      media: {
        images,
        videos,
      },
    };
  },
});

export const listWithMedia = query({
  args: {},
  handler: async (ctx) => {
    const stories = await ctx.db.query("businessStories").collect();

    const storiesWithMedia = await Promise.all(
      stories.map(async (story) => {
        const mediaItems = await ctx.db
          .query("media")
          .filter((q) => q.eq(q.field("storyId"), story._id))
          .collect();

        const images: any[] = [];
        const videos: any[] = [];

        for (const media of mediaItems) {
          if (media.type === "image") {
            const url = await ctx.storage.getUrl(media.storageId as any);
            images.push({
              _id: media._id,
              url,
              filename: media.filename,
              storageId: media.storageId,
            });
          } else if (media.type === "video") {
            videos.push({
              _id: media._id,
              playbackId: media.muxPlaybackId,
              thumbnailUrl: media.thumbnailUrl,
              filename: media.filename,
              muxAssetId: media.muxAssetId,
            });
          }
        }

        return {
          ...story,
          media: {
            images,
            videos,
          },
        };
      })
    );

    return storiesWithMedia;
  },
});

export const getMediaUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as any);
  },
});
