import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import {
  generateS3UploadUrl,
  generateS3GetUrl,
  deleteS3File,
  generateS3Key,
  getS3PublicUrl,
} from './s3';

export const generateUploadUrl = mutation({
  args: {
    filename: v.string(),
    contentType: v.string(),
    type: v.union(v.literal('image'), v.literal('video')),
    projectId: v.optional(v.id('projects')),
    storyId: v.optional(v.id('businessStories')),
  },
  handler: async (ctx, args) => {
    const s3Key = generateS3Key(
      args.filename,
      args.type,
      args.projectId,
      args.storyId
    );
    const uploadUrl = await generateS3UploadUrl(s3Key, args.contentType);

    return {
      uploadUrl,
      s3Key,
    };
  },
});

export const saveStorageId = mutation({
  args: {
    storageId: v.string(), // S3 key
    filename: v.string(),
    mimeType: v.string(),
    size: v.number(),
    type: v.union(v.literal('image'), v.literal('video')),
    projectId: v.optional(v.id('projects')),
    storyId: v.optional(v.id('businessStories')),
    muxAssetId: v.optional(v.string()),
    muxPlaybackId: v.optional(v.string()),
    uploadId: v.optional(v.string()),
    publicUrl: v.optional(v.string()), // CloudFront/S3 public URL
    dateCategory: v.optional(v.string()), // YYYY-MM format
    uploadedAt: v.optional(v.number()), // Timestamp
  },
  handler: async (ctx, args) => {
    // Generate public URL if not provided and it's an image
    const publicUrl =
      args.publicUrl ||
      (args.type === 'image' ? getS3PublicUrl(args.storageId) : undefined);

    // Generate dateCategory if not provided
    let dateCategory = args.dateCategory;
    if (!dateCategory) {
      const date = args.uploadedAt ? new Date(args.uploadedAt) : new Date();
      dateCategory = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}`;
    }

    return await ctx.db.insert('media', {
      ...args,
      publicUrl,
      dateCategory,
      uploadedAt: args.uploadedAt || Date.now(),
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
    if (media && media.storageId) {
      // Only delete from S3 if it's an image (videos use Mux)
      if (media.type === 'image') {
        try {
          await deleteS3File(media.storageId);
        } catch (error) {
          console.error('Error deleting file from S3:', error);
          // Continue with database deletion even if S3 deletion fails
        }
      }
      await ctx.db.delete(args.id);
    }
  },
});

export const deleteStoryVideos = mutation({
  args: { storyId: v.id('businessStories') },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query('media')
      .filter((q) =>
        q.and(
          q.eq(q.field('storyId'), args.storyId),
          q.eq(q.field('type'), 'video')
        )
      )
      .collect();

    return videos.map((v) => ({
      id: v._id,
      muxAssetId: v.muxAssetId,
    }));
  },
});

export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    // First try to find media record and use stored publicUrl
    const media = await ctx.db
      .query('media')
      .filter((q) => q.eq(q.field('storageId'), args.storageId))
      .first();

    if (media && media.publicUrl) {
      return media.publicUrl;
    }

    // If no stored URL, generate one (queries are read-only, so we can't update here)
    try {
      return getS3PublicUrl(args.storageId);
    } catch (error) {
      // Fallback to presigned URL if public URL doesn't work
      return await generateS3GetUrl(args.storageId);
    }
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Use the dateCategory index for efficient sorting
    return await ctx.db
      .query('media')
      .withIndex('by_dateCategory')
      .order('desc')
      .collect();
  },
});

export const muxWebhook = mutation({
  args: { payload: v.any() },
  handler: async (ctx, { payload }) => {
    if (payload.type === 'video.asset.ready') {
      const assetId = payload.data.id;
      const playbackId = payload.data.playback_ids?.[0]?.id;
      const uploadId = payload.data.upload_id;

      console.log('Mux webhook received:', {
        type: payload.type,
        assetId,
        playbackId,
        uploadId,
      });

      if (!assetId || !playbackId) {
        console.warn('Missing assetId or playbackId in webhook payload');
        return;
      }

      // Build query filters - try to match by uploadId or assetId
      if (!uploadId && !assetId) {
        console.warn('No uploadId or assetId provided in webhook');
        return;
      }

      const mediaList = await ctx.db
        .query('media')
        .filter((q) => {
          if (uploadId && assetId) {
            return q.or(
              q.eq(q.field('uploadId'), uploadId),
              q.eq(q.field('muxAssetId'), assetId)
            );
          } else if (uploadId) {
            return q.eq(q.field('uploadId'), uploadId);
          } else {
            return q.eq(q.field('muxAssetId'), assetId);
          }
        })
        .collect();

      const media = mediaList[0];
      if (media) {
        const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?width=400&height=225`;
        await ctx.db.patch(media._id, {
          muxAssetId: assetId,
          muxPlaybackId: playbackId,
          thumbnailUrl,
        });
        console.log(
          `✅ Updated media ${media._id} with playbackId: ${playbackId}, assetId: ${assetId}`
        );
      } else {
        // Log all media records to help debug
        const allMedia = await ctx.db.query('media').collect();
        console.warn(
          `⚠️ No matching media found for uploadId=${uploadId} or assetId=${assetId}`
        );
        console.warn(
          `Available media records:`,
          allMedia.map((m) => ({
            id: m._id,
            uploadId: m.uploadId,
            muxAssetId: m.muxAssetId,
            storyId: m.storyId,
          }))
        );
      }
    }
  },
});

export const saveMuxMedia = mutation({
  args: {
    filename: v.string(),
    uploadId: v.string(),
    size: v.optional(v.number()),
    projectId: v.optional(v.id('projects')),
    storyId: v.optional(v.id('businessStories')),
  },
  handler: async (ctx, args) => {
    // Generate dateCategory in YYYY-MM format for sorting
    const now = new Date();
    const dateCategory = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}`;

    const mediaId = await ctx.db.insert('media', {
      filename: args.filename,
      uploadId: args.uploadId,
      projectId: args.projectId,
      storyId: args.storyId,
      storageId: '',
      type: 'video',
      mimeType: 'video/mp4',
      size: args.size ?? 0,
      dateCategory,
      uploadedAt: Date.now(),
    });

    return mediaId;
  },
});

export const bulkUpdateMediaStoryId = mutation({
  args: {
    mediaIds: v.array(v.string()),
    storyId: v.id('businessStories'),
  },
  handler: async (ctx, { mediaIds, storyId }) => {
    if (mediaIds.length === 0) return;

    const mediaList = await ctx.db
      .query('media')
      .filter((q) => {
        let filter = q.or(
          q.eq(q.field('_id'), mediaIds[0]),
          q.eq(q.field('storageId'), mediaIds[0]),
          q.eq(q.field('muxAssetId'), mediaIds[0])
        );
        for (let i = 1; i < mediaIds.length; i++) {
          filter = q.or(
            filter,
            q.eq(q.field('_id'), mediaIds[i]),
            q.eq(q.field('storageId'), mediaIds[i]),
            q.eq(q.field('muxAssetId'), mediaIds[i])
          );
        }
        return filter;
      })
      .collect();

    for (const media of mediaList) {
      await ctx.db.patch(media._id, { storyId });
    }
  },
});

export const bulkUpdateMediaProjectId = mutation({
  args: {
    mediaIds: v.array(v.id('media')),
    projectId: v.id('projects'),
  },
  handler: async (ctx, { mediaIds, projectId }) => {
    for (const id of mediaIds) {
      await ctx.db.patch(id, { projectId });
    }
  },
});
