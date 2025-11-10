import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const trackEvent = mutation({
  args: {
    eventType: v.union(
      v.literal('view'),
      v.literal('share_click'),
      v.literal('link_copy'),
      v.literal('favorite')
    ),
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('analyticsEvents', {
      eventType: args.eventType,
      itemType: args.itemType,
      itemId: args.itemId,
      createdAt: Date.now(),
    });
  },
});

export const getAnalyticsByItem = query({
  args: {
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    itemId: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query('analyticsEvents')
      .withIndex('by_item', (q) =>
        q.eq('itemType', args.itemType).eq('itemId', args.itemId)
      );

    const events = await query.collect();

    let filteredEvents = events;
    if (args.startDate) {
      filteredEvents = filteredEvents.filter(
        (e) => e.createdAt >= args.startDate!
      );
    }
    if (args.endDate) {
      filteredEvents = filteredEvents.filter(
        (e) => e.createdAt <= args.endDate!
      );
    }

    return {
      views: filteredEvents.filter((e) => e.eventType === 'view').length,
      shares: filteredEvents.filter((e) => e.eventType === 'share_click')
        .length,
      copies: filteredEvents.filter((e) => e.eventType === 'link_copy').length,
      favorites: filteredEvents.filter((e) => e.eventType === 'favorite')
        .length,
      total: filteredEvents.length,
    };
  },
});

export const getAnalyticsTrends = query({
  args: {
    itemType: v.optional(
      v.union(v.literal('project'), v.literal('businessStory'))
    ),
    period: v.union(v.literal('day'), v.literal('month')),
    days: v.optional(v.number()), // Number of days to look back
  },
  handler: async (ctx, args) => {
    const days = args.days ?? (args.period === 'day' ? 30 : 365);
    const startDate = Date.now() - days * 24 * 60 * 60 * 1000;

    let query = ctx.db
      .query('analyticsEvents')
      .withIndex('by_date', (q) => q.gte('createdAt', startDate));

    const events = await query.collect();

    // Filter by itemType if provided
    let filteredEvents = events;
    if (args.itemType) {
      filteredEvents = events.filter((e) => e.itemType === args.itemType);
    }

    // Group by time period
    const grouped: Record<string, { views: number; shares: number; copies: number; favorites: number }> = {};

    filteredEvents.forEach((event) => {
      const date = new Date(event.createdAt);
      let key: string;

      if (args.period === 'day') {
        key = date.toISOString().split('T')[0]; // YYYY-MM-DD
      } else {
        const month = date.getMonth() + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        key = `${date.getFullYear()}-${monthStr}`; // YYYY-MM
      }

      if (!grouped[key]) {
        grouped[key] = { views: 0, shares: 0, copies: 0, favorites: 0 };
      }

      if (event.eventType === 'view') {
        grouped[key].views++;
      } else if (event.eventType === 'share_click') {
        grouped[key].shares++;
      } else if (event.eventType === 'link_copy') {
        grouped[key].copies++;
      } else if (event.eventType === 'favorite') {
        grouped[key].favorites++;
      }
    });

    // Convert to array and sort by date
    return Object.entries(grouped)
      .map(([date, data]) => ({
        date,
        ...data,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
});

export const getTopItems = query({
  args: {
    itemType: v.union(v.literal('project'), v.literal('businessStory')),
    metric: v.union(
      v.literal('views'),
      v.literal('shares'),
      v.literal('copies'),
      v.literal('favorites')
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const eventTypeMap: Record<string, string> = {
      views: 'view',
      shares: 'share_click',
      copies: 'link_copy',
      favorites: 'favorite',
    };

    const eventType = eventTypeMap[args.metric] as any;

    const events = await ctx.db
      .query('analyticsEvents')
      .withIndex('by_type', (q) => q.eq('eventType', eventType))
      .filter((q) => q.eq(q.field('itemType'), args.itemType))
      .collect();

    // Count events per item
    const counts: Record<string, number> = {};
    events.forEach((event) => {
      counts[event.itemId] = (counts[event.itemId] || 0) + 1;
    });

    // Get item details
    const items = await Promise.all(
      Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(async ([itemId, count]) => {
          if (args.itemType === 'project') {
            const project = await ctx.db.get(itemId as any);
            return {
              id: itemId,
              title: project && 'title' in project ? (project as any).title : 'Unknown',
              count,
            };
          } else {
            const story = await ctx.db.get(itemId as any);
            return {
              id: itemId,
              title: story && 'title' in story ? (story as any).title : 'Unknown',
              count,
            };
          }
        })
    );

    return items;
  },
});

