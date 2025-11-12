import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    service: v.string(),
    projectType: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      company: args.company,
      phone: args.phone,
      service: args.service,
      projectType: args.projectType,
      message: args.message,
      read: false,
      createdAt: Date.now(),
    });
    return messageId;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_date")
      .order("desc")
      .collect();
    return messages;
  },
});

export const getUnread = query({
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_read", (q) => q.eq("read", false))
      .order("desc")
      .collect();
    return messages;
  },
});

export const getUnreadCount = query({
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_read", (q) => q.eq("read", false))
      .collect();
    return messages.length;
  },
});

export const markAsRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true });
  },
});

export const markAsUnread = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: false });
  },
});

export const deleteMessage = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getById = query({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

