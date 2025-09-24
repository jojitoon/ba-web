'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Video,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const businessStories = [
  {
    id: 1,
    title: 'The Family Bakery',
    business: "Mama Rosa's Bakery",
    location: 'Brooklyn, NY',
    status: 'Published',
    category: 'Food & Beverage',
    duration: '45 min',
    rating: 4.9,
    founded: '1952',
    employees: '12',
    date: '2024-01-16',
    views: 2156,
    images: 23,
    videos: 1,
  },
  {
    id: 2,
    title: 'The Corner Hardware Store',
    business: "Johnson's Hardware",
    location: 'Austin, TX',
    status: 'Published',
    category: 'Retail',
    duration: '38 min',
    rating: 4.8,
    founded: '1978',
    employees: '8',
    date: '2024-01-13',
    views: 1834,
    images: 18,
    videos: 1,
  },
  {
    id: 3,
    title: 'The Artisan Workshop',
    business: 'Craft & Co.',
    location: 'Portland, OR',
    status: 'Draft',
    category: 'Manufacturing',
    duration: '52 min',
    rating: 0,
    founded: '1985',
    employees: '15',
    date: '2024-01-11',
    views: 0,
    images: 12,
    videos: 0,
  },
  {
    id: 4,
    title: 'The Neighborhood Bookstore',
    business: 'Pages & Prose',
    location: 'Seattle, WA',
    status: 'In Review',
    category: 'Retail',
    duration: '41 min',
    rating: 0,
    founded: '1990',
    employees: '6',
    date: '2024-01-09',
    views: 0,
    images: 15,
    videos: 0,
  },
  {
    id: 5,
    title: 'The Local Brewery',
    business: 'Hometown Hops',
    location: 'Denver, CO',
    status: 'Published',
    category: 'Food & Beverage',
    duration: '48 min',
    rating: 4.8,
    founded: '2005',
    employees: '25',
    date: '2024-01-07',
    views: 1923,
    images: 31,
    videos: 1,
  },
  {
    id: 6,
    title: 'The Family Farm',
    business: 'Green Acres Organic',
    location: 'Iowa',
    status: 'Draft',
    category: 'Agriculture',
    duration: '55 min',
    rating: 0,
    founded: '1920',
    employees: '18',
    date: '2024-01-05',
    views: 0,
    images: 28,
    videos: 0,
  },
];

const statusOptions = ['All', 'Published', 'Draft', 'In Review'];
const categoryOptions = [
  'All',
  'Food & Beverage',
  'Retail',
  'Manufacturing',
  'Agriculture',
  'Services',
];

export default function AdminBusinessStories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredStories = businessStories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || story.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'All' || story.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            Business Stories
          </h1>
          <p className='text-foreground/70 mt-1'>
            Manage your business documentary content and stories.
          </p>
        </div>
        <Link
          href='/admin/business-stories/new'
          className='mt-4 sm:mt-0 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2'
        >
          <Plus className='w-5 h-5' />
          <span>New Story</span>
        </Link>
      </div>

      {/* Filters */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <input
                type='text'
                placeholder='Search stories...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='relative'>
              <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='pl-10 pr-8 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none min-w-[140px]'
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none min-w-[140px]'
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className='bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300'
          >
            {/* Story Header */}
            <div className='p-6 border-b border-border'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-foreground mb-2'>
                    {story.title}
                  </h3>
                  <p className='text-sm text-foreground/60 mb-2'>
                    {story.business}
                  </p>
                  <div className='flex items-center space-x-2 text-sm text-foreground/60'>
                    <MapPin className='w-4 h-4' />
                    <span>{story.location}</span>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      story.status === 'Published'
                        ? 'bg-primary/20 text-primary'
                        : story.status === 'Draft'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-secondary text-foreground/80'
                    }`}
                  >
                    {story.status}
                  </span>
                  <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                    <MoreVertical className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-foreground/60'>Category:</span>
                  <p className='font-medium text-foreground'>{story.category}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Founded:</span>
                  <p className='font-medium text-foreground'>{story.founded}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Duration:</span>
                  <p className='font-medium text-foreground'>{story.duration}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Employees:</span>
                  <p className='font-medium text-foreground'>{story.employees}</p>
                </div>
              </div>
            </div>

            {/* Story Stats */}
            <div className='p-6'>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-accent mb-1'>
                    {story.views}
                  </div>
                  <div className='text-xs text-foreground/60'>Views</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary mb-1'>
                    {story.images}
                  </div>
                  <div className='text-xs text-foreground/60'>Images</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-accent mb-1'>
                    {story.videos}
                  </div>
                  <div className='text-xs text-foreground/60'>Videos</div>
                </div>
              </div>

              {story.rating > 0 && (
                <div className='flex items-center justify-center space-x-1 mb-4'>
                  <Star className='w-4 h-4 text-primary fill-current' />
                  <span className='text-sm font-medium text-foreground'>
                    {story.rating}
                  </span>
                </div>
              )}

              <div className='flex items-center justify-between text-sm text-foreground/60 mb-4'>
                <div className='flex items-center space-x-1'>
                  <Calendar className='w-4 h-4' />
                  <span>{story.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center space-x-2'>
                <Link
                  href={`/business-stories/${story.id}`}
                  className='flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2'
                >
                  <Eye className='w-4 h-4' />
                  <span>View</span>
                </Link>
                <Link
                  href={`/admin/business-stories/${story.id}/edit`}
                  className='flex-1 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2'
                >
                  <Edit className='w-4 h-4' />
                  <span>Edit</span>
                </Link>
                <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                  <Trash2 className='w-4 h-4 text-foreground/60' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className='text-center py-16'>
          <Video className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
            No business stories found
          </h3>
          <p className='text-foreground/50 mb-6'>
            Try adjusting your search or filter criteria.
          </p>
          <Link
            href='/admin/business-stories/new'
            className='bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors inline-flex items-center space-x-2'
          >
            <Plus className='w-5 h-5' />
            <span>Create Your First Story</span>
          </Link>
        </div>
      )}
    </div>
  );
}
