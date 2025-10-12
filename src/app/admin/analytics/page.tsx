'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Calendar,
  Download,
  Filter,
  Building2,
  Video,
  Image,
  Clock,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const analyticsData = {
  overview: {
    totalViews: 12543,
    totalProjects: 24,
    totalStories: 18,
    totalUsers: 156,
    viewsChange: 12.5,
    projectsChange: 8.2,
    storiesChange: -2.1,
    usersChange: 15.3,
  },
  topProjects: [
    { name: 'Downtown Office Complex', views: 2341, status: 'Published' },
    { name: 'Residential Tower', views: 1892, status: 'Published' },
    { name: 'Industrial Facility', views: 1567, status: 'Published' },
    { name: 'University Campus', views: 1234, status: 'In Review' },
    { name: 'Shopping Mall', views: 987, status: 'Published' },
  ],
  topStories: [
    { name: 'The Family Bakery', views: 1876, status: 'Published' },
    { name: 'The Corner Hardware Store', views: 1456, status: 'Published' },
    { name: 'Local Restaurant Chain', views: 1234, status: 'Published' },
    { name: 'Tech Startup Journey', views: 987, status: 'In Review' },
    { name: 'Artisan Workshop', views: 765, status: 'Published' },
  ],
  recentActivity: [
    {
      type: 'project',
      action: 'created',
      name: 'New Office Building',
      time: '2 hours ago',
    },
    {
      type: 'story',
      action: 'published',
      name: 'Local Cafe Story',
      time: '4 hours ago',
    },
    {
      type: 'media',
      action: 'uploaded',
      name: 'Construction Photos',
      time: '6 hours ago',
    },
    {
      type: 'project',
      action: 'updated',
      name: 'Residential Complex',
      time: '8 hours ago',
    },
    {
      type: 'story',
      action: 'reviewed',
      name: 'Family Business',
      time: '12 hours ago',
    },
  ],
  monthlyStats: [
    { month: 'Jan', views: 1200, projects: 2, stories: 3 },
    { month: 'Feb', views: 1800, projects: 4, stories: 2 },
    { month: 'Mar', views: 2200, projects: 3, stories: 4 },
    { month: 'Apr', views: 2800, projects: 5, stories: 3 },
    { month: 'May', views: 3200, projects: 4, stories: 5 },
    { month: 'Jun', views: 2900, projects: 6, stories: 1 },
  ],
};

const timeRanges = ['7 days', '30 days', '90 days', '1 year'];

export default function AdminAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30 days');

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className='w-4 h-4 text-green-500' />
    ) : (
      <TrendingDown className='w-4 h-4 text-red-500' />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Building2 className='w-4 h-4 text-primary' />;
      case 'story':
        return <Video className='w-4 h-4 text-accent' />;
      case 'media':
        return <Image className='w-4 h-4 text-primary' />;
      default:
        return <Clock className='w-4 h-4 text-foreground/60' />;
    }
  };

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Analytics</h1>
          <p className='text-foreground/70 mt-1'>
            Track your content performance and user engagement.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 flex space-x-3'>
          <div className='relative'>
            <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className='pl-10 pr-8 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[120px]'
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'>
            <Download className='w-5 h-5' />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Views</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {analyticsData.overview.totalViews.toLocaleString()}
              </p>
              <div className='flex items-center space-x-1 mt-2'>
                {getChangeIcon(analyticsData.overview.viewsChange)}
                <span
                  className={`text-sm font-medium ${getChangeColor(
                    analyticsData.overview.viewsChange
                  )}`}
                >
                  {analyticsData.overview.viewsChange > 0 ? '+' : ''}
                  {analyticsData.overview.viewsChange}%
                </span>
                <span className='text-sm text-foreground/60'>
                  vs last month
                </span>
              </div>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Eye className='w-6 h-6 text-primary' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Projects</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {analyticsData.overview.totalProjects}
              </p>
              <div className='flex items-center space-x-1 mt-2'>
                {getChangeIcon(analyticsData.overview.projectsChange)}
                <span
                  className={`text-sm font-medium ${getChangeColor(
                    analyticsData.overview.projectsChange
                  )}`}
                >
                  {analyticsData.overview.projectsChange > 0 ? '+' : ''}
                  {analyticsData.overview.projectsChange}%
                </span>
                <span className='text-sm text-foreground/60'>
                  vs last month
                </span>
              </div>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Building2 className='w-6 h-6 text-primary' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Business Stories</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {analyticsData.overview.totalStories}
              </p>
              <div className='flex items-center space-x-1 mt-2'>
                {getChangeIcon(analyticsData.overview.storiesChange)}
                <span
                  className={`text-sm font-medium ${getChangeColor(
                    analyticsData.overview.storiesChange
                  )}`}
                >
                  {analyticsData.overview.storiesChange > 0 ? '+' : ''}
                  {analyticsData.overview.storiesChange}%
                </span>
                <span className='text-sm text-foreground/60'>
                  vs last month
                </span>
              </div>
            </div>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Video className='w-6 h-6 text-accent' />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Users</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {analyticsData.overview.totalUsers}
              </p>
              <div className='flex items-center space-x-1 mt-2'>
                {getChangeIcon(analyticsData.overview.usersChange)}
                <span
                  className={`text-sm font-medium ${getChangeColor(
                    analyticsData.overview.usersChange
                  )}`}
                >
                  {analyticsData.overview.usersChange > 0 ? '+' : ''}
                  {analyticsData.overview.usersChange}%
                </span>
                <span className='text-sm text-foreground/60'>
                  vs last month
                </span>
              </div>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-primary' />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Top Performing Projects */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Top Performing Projects
            </h2>
            <BarChart3 className='w-6 h-6 text-primary' />
          </div>
          <div className='space-y-4'>
            {analyticsData.topProjects.map((project, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-background rounded-lg'
              >
                <div className='flex-1'>
                  <h3 className='font-semibold text-foreground'>
                    {project.name}
                  </h3>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span className='text-sm text-foreground/60'>
                      {project.views.toLocaleString()} views
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Published'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className='text-2xl font-bold text-foreground/20'>
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Stories */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Top Performing Stories
            </h2>
            <Video className='w-6 h-6 text-accent' />
          </div>
          <div className='space-y-4'>
            {analyticsData.topStories.map((story, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-background rounded-lg'
              >
                <div className='flex-1'>
                  <h3 className='font-semibold text-foreground'>
                    {story.name}
                  </h3>
                  <div className='flex items-center space-x-2 mt-1'>
                    <span className='text-sm text-foreground/60'>
                      {story.views.toLocaleString()} views
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        story.status === 'Published'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {story.status}
                    </span>
                  </div>
                </div>
                <div className='text-2xl font-bold text-foreground/20'>
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-foreground'>Recent Activity</h2>
          <Clock className='w-6 h-6 text-primary' />
        </div>
        <div className='space-y-4'>
          {analyticsData.recentActivity.map((activity, index) => (
            <div
              key={index}
              className='flex items-center space-x-4 p-4 bg-background rounded-lg'
            >
              <div className='w-10 h-10 bg-secondary rounded-lg flex items-center justify-center'>
                {getActivityIcon(activity.type)}
              </div>
              <div className='flex-1'>
                <p className='text-foreground'>
                  <span className='font-medium'>{activity.name}</span> was{' '}
                  {activity.action}
                </p>
                <p className='text-sm text-foreground/60'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Stats Chart Placeholder */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-foreground'>
            Monthly Performance
          </h2>
          <Calendar className='w-6 h-6 text-primary' />
        </div>
        <div className='h-64 bg-background rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <BarChart3 className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
            <p className='text-foreground/60'>
              Chart visualization would be implemented here
            </p>
            <p className='text-sm text-foreground/40 mt-1'>
              Using a charting library like Chart.js or Recharts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
