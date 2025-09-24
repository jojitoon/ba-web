'use client';

import Link from 'next/link';
import {
  Building2,
  Video,
  Image,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const dashboardStats = {
  totalProjects: 24,
  totalStories: 18,
  totalMedia: 156,
  totalUsers: 8,
  recentProjects: [
    {
      id: 1,
      title: 'Downtown Office Complex',
      status: 'Published',
      date: '2024-01-15',
      views: 1247,
    },
    {
      id: 2,
      title: 'Residential Tower',
      status: 'Draft',
      date: '2024-01-14',
      views: 0,
    },
    {
      id: 3,
      title: 'Industrial Facility',
      status: 'Published',
      date: '2024-01-12',
      views: 892,
    },
  ],
  recentStories: [
    {
      id: 1,
      title: 'The Family Bakery',
      business: "Mama Rosa's Bakery",
      status: 'Published',
      date: '2024-01-16',
      views: 2156,
    },
    {
      id: 2,
      title: 'The Corner Hardware Store',
      business: "Johnson's Hardware",
      status: 'Published',
      date: '2024-01-13',
      views: 1834,
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: 'project',
      action: 'created',
      title: 'University Campus',
      user: 'Admin User',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'story',
      action: 'updated',
      title: 'The Family Bakery',
      user: 'Admin User',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'media',
      action: 'uploaded',
      title: '15 new photos',
      user: 'Admin User',
      time: '6 hours ago',
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
          <p className='text-foreground/70 mt-1'>
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 flex space-x-3'>
          <Link
            href='/admin/projects/new'
            className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'
          >
            <Plus className='w-4 h-4' />
            <span>New Project</span>
          </Link>
          <Link
            href='/admin/business-stories/new'
            className='bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2'
          >
            <Plus className='w-4 h-4' />
            <span>New Story</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Projects</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {dashboardStats.totalProjects}
              </p>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Building2 className='w-6 h-6 text-primary' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Business Stories</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {dashboardStats.totalStories}
              </p>
            </div>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Video className='w-6 h-6 text-accent' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>+8% from last month</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Media Files</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {dashboardStats.totalMedia}
              </p>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Image className='w-6 h-6 text-primary' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>+24% from last month</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Users</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {dashboardStats.totalUsers}
              </p>
            </div>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-accent' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>+2 this month</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Projects */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>Recent Projects</h2>
            <Link
              href='/admin/projects'
              className='text-primary hover:text-primary/80 font-medium text-sm'
            >
              View All
            </Link>
          </div>
          <div className='space-y-4'>
            {dashboardStats.recentProjects.map((project) => (
              <div
                key={project.id}
                className='flex items-center justify-between p-4 bg-background rounded-lg'
              >
                <div className='flex-1'>
                  <h3 className='font-semibold text-foreground'>
                    {project.title}
                  </h3>
                  <div className='flex items-center space-x-4 mt-1 text-sm text-foreground/60'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'Published'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {project.status}
                    </span>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-3 h-3' />
                      <span>{project.date}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Eye className='w-3 h-3' />
                      <span>{project.views} views</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <Edit className='w-4 h-4 text-foreground/60' />
                  </Link>
                  <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                    <Trash2 className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Business Stories */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Recent Business Stories
            </h2>
            <Link
              href='/admin/business-stories'
              className='text-accent hover:text-accent/80 font-medium text-sm'
            >
              View All
            </Link>
          </div>
          <div className='space-y-4'>
            {dashboardStats.recentStories.map((story) => (
              <div
                key={story.id}
                className='flex items-center justify-between p-4 bg-background rounded-lg'
              >
                <div className='flex-1'>
                  <h3 className='font-semibold text-foreground'>
                    {story.title}
                  </h3>
                  <p className='text-sm text-foreground/60 mt-1'>
                    {story.business}
                  </p>
                  <div className='flex items-center space-x-4 mt-2 text-sm text-foreground/60'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        story.status === 'Published'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {story.status}
                    </span>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-3 h-3' />
                      <span>{story.date}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Eye className='w-3 h-3' />
                      <span>{story.views} views</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Link
                    href={`/admin/business-stories/${story.id}/edit`}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <Edit className='w-4 h-4 text-foreground/60' />
                  </Link>
                  <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                    <Trash2 className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <h2 className='text-xl font-bold text-foreground mb-6'>
          Recent Activity
        </h2>
        <div className='space-y-4'>
          {dashboardStats.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className='flex items-center space-x-4 p-4 bg-background rounded-lg'
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'project'
                    ? 'bg-primary/20'
                    : activity.type === 'story'
                    ? 'bg-accent/20'
                    : 'bg-secondary'
                }`}
              >
                {activity.type === 'project' ? (
                  <Building2 className='w-5 h-5 text-primary' />
                ) : activity.type === 'story' ? (
                  <Video className='w-5 h-5 text-accent' />
                ) : (
                  <Image className='w-5 h-5 text-foreground/60' />
                )}
              </div>
              <div className='flex-1'>
                <p className='text-foreground'>
                  <span className='font-semibold'>{activity.user}</span>{' '}
                  {activity.action} {activity.title}
                </p>
                <p className='text-sm text-foreground/60'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
