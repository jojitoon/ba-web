'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  Share2,
  Copy,
  Heart,
  Building2,
  Video,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'month'>('day');
  const [selectedItemType, setSelectedItemType] = useState<
    'project' | 'businessStory' | undefined
  >(undefined);
  const [days, setDays] = useState(30);

  const trends = useQuery(api.analytics.getAnalyticsTrends, {
    itemType: selectedItemType,
    period: selectedPeriod,
    days,
  });

  const topProjects = useQuery(api.analytics.getTopItems, {
    itemType: 'project',
    metric: 'views',
    limit: 5,
  });

  const topStories = useQuery(api.analytics.getTopItems, {
    itemType: 'businessStory',
    metric: 'views',
    limit: 5,
  });

  const topProjectsShares = useQuery(api.analytics.getTopItems, {
    itemType: 'project',
    metric: 'shares',
    limit: 5,
  });

  const topStoriesShares = useQuery(api.analytics.getTopItems, {
    itemType: 'businessStory',
    metric: 'shares',
    limit: 5,
  });

  const topProjectsSaves = useQuery(api.analytics.getTopItems, {
    itemType: 'project',
    metric: 'favorites',
    limit: 5,
  });

  const topStoriesSaves = useQuery(api.analytics.getTopItems, {
    itemType: 'businessStory',
    metric: 'favorites',
    limit: 5,
  });

  // Calculate totals from trends
  const totals = trends
    ? trends.reduce(
        (acc, day) => ({
          views: acc.views + day.views,
          shares: acc.shares + day.shares,
          copies: acc.copies + day.copies,
          favorites: acc.favorites + day.favorites,
        }),
        { views: 0, shares: 0, copies: 0, favorites: 0 }
      )
    : { views: 0, shares: 0, copies: 0, favorites: 0 };

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (selectedPeriod === 'day') {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      const [year, month] = dateStr.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(
        'en-US',
        { month: 'short', year: 'numeric' }
      );
    }
  };

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Analytics</h1>
          <p className='text-foreground/70 mt-1'>
            Track views, shares, and saves for projects and stories
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex flex-wrap items-center gap-4'>
          <div className='flex items-center space-x-2'>
            <label className='text-sm font-medium text-foreground'>
              Period:
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) =>
                setSelectedPeriod(e.target.value as 'day' | 'month')
              }
              className='px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent'
            >
              <option value='day'>Daily</option>
              <option value='month'>Monthly</option>
            </select>
          </div>

          <div className='flex items-center space-x-2'>
            <label className='text-sm font-medium text-foreground'>
              Type:
            </label>
            <select
              value={selectedItemType || 'all'}
              onChange={(e) =>
                setSelectedItemType(
                  e.target.value === 'all'
                    ? undefined
                    : (e.target.value as 'project' | 'businessStory')
                )
              }
              className='px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent'
            >
              <option value='all'>All</option>
              <option value='project'>Projects</option>
              <option value='businessStory'>Stories</option>
            </select>
          </div>

          <div className='flex items-center space-x-2'>
            <label className='text-sm font-medium text-foreground'>
              Days:
            </label>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className='px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent'
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Eye className='w-6 h-6 text-primary' />
            </div>
          </div>
          <h3 className='text-2xl font-bold text-foreground mb-1'>
            {totals.views.toLocaleString()}
          </h3>
          <p className='text-sm text-foreground/60'>Total Views</p>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Share2 className='w-6 h-6 text-accent' />
            </div>
          </div>
          <h3 className='text-2xl font-bold text-foreground mb-1'>
            {totals.shares.toLocaleString()}
          </h3>
          <p className='text-sm text-foreground/60'>Share Clicks</p>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Copy className='w-6 h-6 text-primary' />
            </div>
          </div>
          <h3 className='text-2xl font-bold text-foreground mb-1'>
            {totals.copies.toLocaleString()}
          </h3>
          <p className='text-sm text-foreground/60'>Link Copies</p>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Heart className='w-6 h-6 text-accent' />
            </div>
          </div>
          <h3 className='text-2xl font-bold text-foreground mb-1'>
            {totals.favorites.toLocaleString()}
          </h3>
          <p className='text-sm text-foreground/60'>Saves</p>
        </div>
      </div>

      {/* Trends Chart */}
      {trends && trends.length > 0 && (
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Trends Over Time
          </h2>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray='3 3' stroke='oklch(0.9 0 0)' />
              <XAxis
                dataKey='date'
                tickFormatter={formatDate}
                stroke='oklch(0.45 0 0)'
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke='oklch(0.45 0 0)' style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(1 0 0)',
                  border: '1px solid oklch(0.9 0 0)',
                  borderRadius: '8px',
                }}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='views'
                stroke='oklch(0.25 0 0)'
                strokeWidth={2}
                name='Views'
                dot={{ r: 4 }}
              />
              <Line
                type='monotone'
                dataKey='shares'
                stroke='oklch(0.4 0 0)'
                strokeWidth={2}
                name='Shares'
                dot={{ r: 4 }}
              />
              <Line
                type='monotone'
                dataKey='copies'
                stroke='oklch(0.5 0 0)'
                strokeWidth={2}
                name='Copies'
                dot={{ r: 4 }}
              />
              <Line
                type='monotone'
                dataKey='favorites'
                stroke='oklch(0.55 0.22 25)'
                strokeWidth={2}
                name='Saves'
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bar Chart */}
      {trends && trends.length > 0 && (
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Activity Breakdown
          </h2>
          <ResponsiveContainer width='100%' height={400}>
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray='3 3' stroke='oklch(0.9 0 0)' />
              <XAxis
                dataKey='date'
                tickFormatter={formatDate}
                stroke='oklch(0.45 0 0)'
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke='oklch(0.45 0 0)' style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(1 0 0)',
                  border: '1px solid oklch(0.9 0 0)',
                  borderRadius: '8px',
                }}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Bar dataKey='views' fill='oklch(0.25 0 0)' name='Views' />
              <Bar dataKey='shares' fill='oklch(0.4 0 0)' name='Shares' />
              <Bar dataKey='copies' fill='oklch(0.5 0 0)' name='Copies' />
              <Bar
                dataKey='favorites'
                fill='oklch(0.55 0.22 25)'
                name='Saves'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Items */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top Projects by Views */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Building2 className='w-5 h-5 text-primary' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Projects (Views)
            </h2>
          </div>
          <div className='space-y-4'>
            {topProjects && topProjects.length > 0 ? (
              topProjects.map((project, index) => (
                <div
                  key={project.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {project.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {project.count} views
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Top Stories by Views */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Video className='w-5 h-5 text-accent' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Stories (Views)
            </h2>
          </div>
          <div className='space-y-4'>
            {topStories && topStories.length > 0 ? (
              topStories.map((story, index) => (
                <div
                  key={story.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {story.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {story.count} views
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Top Projects by Shares */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Share2 className='w-5 h-5 text-primary' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Projects (Shares)
            </h2>
          </div>
          <div className='space-y-4'>
            {topProjectsShares && topProjectsShares.length > 0 ? (
              topProjectsShares.map((project, index) => (
                <div
                  key={project.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {project.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {project.count} shares
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Top Stories by Shares */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Share2 className='w-5 h-5 text-accent' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Stories (Shares)
            </h2>
          </div>
          <div className='space-y-4'>
            {topStoriesShares && topStoriesShares.length > 0 ? (
              topStoriesShares.map((story, index) => (
                <div
                  key={story.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {story.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {story.count} shares
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Top Projects by Saves */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Heart className='w-5 h-5 text-primary' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Projects (Saves)
            </h2>
          </div>
          <div className='space-y-4'>
            {topProjectsSaves && topProjectsSaves.length > 0 ? (
              topProjectsSaves.map((project, index) => (
                <div
                  key={project.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {project.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {project.count} saves
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>

        {/* Top Stories by Saves */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center space-x-2 mb-6'>
            <Heart className='w-5 h-5 text-accent' />
            <h2 className='text-xl font-bold text-foreground'>
              Top Stories (Saves)
            </h2>
          </div>
          <div className='space-y-4'>
            {topStoriesSaves && topStoriesSaves.length > 0 ? (
              topStoriesSaves.map((story, index) => (
                <div
                  key={story.id}
                  className='flex items-center justify-between p-4 bg-background rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent'>
                      {index + 1}
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {story.title}
                      </p>
                      <p className='text-sm text-foreground/60'>
                        {story.count} saves
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-foreground/60 text-center py-8'>
                No data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
