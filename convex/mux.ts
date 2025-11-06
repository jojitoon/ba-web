"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function createMuxUploadUrl(filename: string) {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    throw new Error("Missing Mux credentials");
  }

  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
    },
    cors_origin: "*",
  });

  return { uploadUrl: upload.url, assetId: upload.asset_id };
}

export const createMuxUpload = action({
  args: {
    filename: v.string(),
    projectId: v.optional(v.id("projects")),
    storyId: v.optional(v.id("businessStories")),
  },
  handler: async (
    ctx: any,
    args: { filename: string; projectId?: any; storyId?: any }
  ): Promise<{
    uploadUrl: string;
    assetId: string | undefined;
    mediaId: any;
  }> => {
    const muxData = await createMuxUploadUrl(args.filename);

    console.log("Mux upload data:", muxData);

    const mediaId: any = await ctx.runMutation(api.media.saveStorageId, {
      filename: args.filename,
      type: "video",
      storageId: "",
      size: 0,
      mimeType: "video/mp4",
      muxAssetId: muxData.assetId,
      projectId: args.projectId,
      storyId: args.storyId,
    });

    return {
      uploadUrl: muxData.uploadUrl,
      assetId: muxData.assetId,
      mediaId,
    };
  },
});

export const deleteMuxAsset = action({
  args: { assetId: v.string() },
  handler: async (ctx: any, args: { assetId: string }) => {
    if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
      throw new Error("Missing Mux credentials");
    }

    try {
      await mux.video.assets.delete(args.assetId);
      console.log(`✅ Deleted Mux asset: ${args.assetId}`);
    } catch (error: any) {
      // If asset doesn't exist or already deleted, that's okay
      if (error.status !== 404) {
        console.error(`Failed to delete Mux asset ${args.assetId}:`, error);
        throw error;
      }
    }
  },
});
