import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple password hashing (in production, use bcrypt or similar)
function simpleHash(password: string): string {
  // This is a simple hash for demo purposes only
  // In production, use proper password hashing like bcrypt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("publicUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = simpleHash(args.password);
    const userId = await ctx.db.insert("publicUsers", {
      email: args.email,
      name: args.name || args.email.split("@")[0],
      passwordHash,
      createdAt: Date.now(),
    });

    return { success: true, userId };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("publicUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordHash = simpleHash(args.password);
    if (user.passwordHash !== passwordHash) {
      throw new Error("Invalid email or password");
    }

    // Update last login
    await ctx.db.patch(user._id, {
      lastLoginAt: Date.now(),
    });

    return {
      success: true,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  },
});

