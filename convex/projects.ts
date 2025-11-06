import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("projects");

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
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    category: v.string(),
    status: v.union(
      v.literal("Draft"),
      v.literal("In Review"),
      v.literal("Archived"),
      v.literal("In Progress"),
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("projects", {
      ...args,
      media: {
        photos: [],
        videos: [],
      },
      timelines: [],
      teamInterviews: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("Draft"),
        v.literal("In Review"),
        v.literal("Archived"),
        v.literal("In Progress"),
        v.literal("Published")
      )
    ),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    team: v.optional(v.string()),
    client: v.optional(v.string()),
    architect: v.optional(v.string()),
    contractor: v.optional(v.string()),
    description: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    keyFeatures: v.optional(v.array(v.string())),
    statistics: v.optional(
      v.array(
        v.object({
          label: v.string(),
          value: v.string(),
        })
      )
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

export const getByIdWithMedia = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return null;

    const mediaItems = await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("projectId"), args.id))
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
      ...project,
      media: {
        images,
        videos,
      },
    };
  },
});

export const addMedia = mutation({
  args: {
    projectId: v.id("projects"),
    type: v.union(v.literal("photo"), v.literal("video")),
    storageId: v.string(),
    muxAssetId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    if (args.type === "photo") {
      await ctx.db.patch(args.projectId, {
        media: {
          ...project.media,
          photos: [...project.media.photos, args.storageId],
        },
        updatedAt: Date.now(),
      });
    } else if (args.type === "video") {
      await ctx.db.patch(args.projectId, {
        media: {
          ...project.media,
          videos: [...project.media.videos, args.muxAssetId!],
        },
        updatedAt: Date.now(),
      });
    }
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    const mediaList = await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("projectId"), id))
      .collect();

    for (const media of mediaList) {
      await ctx.db.delete(media._id);
    }

    await ctx.db.delete(id);
  },
});
