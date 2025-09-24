'use client';

import { useState } from 'react';
import {
  Image,
  Video,
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Calendar,
  FileText,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const mediaFiles = [
  {
    id: 1,
    name: 'construction-site-01.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-15',
    project: 'Downtown Office Complex',
    story: null,
    url: '/api/placeholder/300/200',
  },
  {
    id: 2,
    name: 'timelapse-construction.mp4',
    type: 'video',
    size: '45.2 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-14',
    project: 'Downtown Office Complex',
    story: null,
    url: '/api/placeholder/300/200',
  },
  {
    id: 3,
    name: 'bakery-interior.jpg',
    type: 'image',
    size: '1.8 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-13',
    project: null,
    story: 'The Family Bakery',
    url: '/api/placeholder/300/200',
  },
  {
    id: 4,
    name: 'team-interview.mp4',
    type: 'video',
    size: '128.5 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-12',
    project: 'Residential Tower',
    story: null,
    url: '/api/placeholder/300/200',
  },
  {
    id: 5,
    name: 'hardware-store-front.jpg',
    type: 'image',
    size: '3.1 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-11',
    project: null,
    story: 'The Corner Hardware Store',
    url: '/api/placeholder/300/200',
  },
  {
    id: 6,
    name: 'aerial-drone-footage.mp4',
    type: 'video',
    size: '89.7 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-10',
    project: 'Industrial Facility',
    story: null,
    url: '/api/placeholder/300/200',
  },
  {
    id: 7,
    name: 'family-photo-old.jpg',
    type: 'image',
    size: '1.2 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-09',
    project: null,
    story: 'The Family Bakery',
    url: '/api/placeholder/300/200',
  },
  {
    id: 8,
    name: 'construction-progress.jpg',
    type: 'image',
    size: '2.9 MB',
    dimensions: '1920x1080',
    uploadedAt: '2024-01-08',
    project: 'University Campus',
    story: null,
    url: '/api/placeholder/300/200',
  },
];

const typeOptions = ['All', 'Image', 'Video'];
const projectOptions = ['All', 'Downtown Office Complex', 'Residential Tower', 'Industrial Facility', 'University Campus'];
const storyOptions = ['All', 'The Family Bakery', 'The Corner Hardware Store'];

export default function AdminMedia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [storyFilter, setStoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMedia = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || file.type === typeFilter.toLowerCase();
    const matchesProject = projectFilter === 'All' || file.project === projectFilter;
    const matchesStory = storyFilter === 'All' || file.story === storyFilter;
    return matchesSearch && matchesType && matchesProject && matchesStory;
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Media Library</h1>
          <p className='text-foreground/70 mt-1'>
            Manage your photos, videos, and other media files.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 flex space-x-3'>
          <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'>
            <Upload className='w-5 h-5' />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className='bg-card rounded-xl p-6 metallic-border'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <input
                type='text'
                placeholder='Search media files...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='relative'>
              <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className='pl-10 pr-8 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[120px]'
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[180px]'
            >
              {projectOptions.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
            <select
              value={storyFilter}
              onChange={(e) => setStoryFilter(e.target.value)}
              className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[180px]'
            >
              {storyOptions.map((story) => (
                <option key={story} value={story}>
                  {story}
                </option>
              ))}
            </select>
            <div className='flex border border-border rounded-lg'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-l-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground/60 hover:text-foreground'
                }`}
              >
                <Grid3X3 className='w-5 h-5' />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-r-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-foreground/60 hover:text-foreground'
                }`}
              >
                <List className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {filteredMedia.map((file) => (
            <div
              key={file.id}
              className='bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300 group'
            >
              <div className='relative aspect-video bg-background'>
                {file.type === 'image' ? (
                  <div className='w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                    <Image className='w-12 h-12 text-primary/50' />
                  </div>
                ) : (
                  <div className='w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center'>
                    <Video className='w-12 h-12 text-accent/50' />
                  </div>
                )}
                <div className='absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors' />
                <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button className='p-2 bg-background/80 rounded-lg hover:bg-background transition-colors'>
                    <MoreVertical className='w-4 h-4 text-foreground' />
                  </button>
                </div>
              </div>
              <div className='p-4'>
                <h3 className='font-medium text-foreground truncate mb-1'>
                  {file.name}
                </h3>
                <div className='text-sm text-foreground/60 space-y-1'>
                  <div className='flex items-center justify-between'>
                    <span>{file.size}</span>
                    <span className='capitalize'>{file.type}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Calendar className='w-3 h-3' />
                    <span>{file.uploadedAt}</span>
                  </div>
                  {file.project && (
                    <div className='text-xs text-primary'>
                      Project: {file.project}
                    </div>
                  )}
                  {file.story && (
                    <div className='text-xs text-accent'>
                      Story: {file.story}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-card rounded-xl overflow-hidden metallic-border'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-secondary/50'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Media
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Type
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Size
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Dimensions
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Uploaded
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-medium text-foreground'>
                    Associated With
                  </th>
                  <th className='px-6 py-4 text-right text-sm font-medium text-foreground'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border'>
                {filteredMedia.map((file) => (
                  <tr key={file.id} className='hover:bg-secondary/20 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center'>
                          {file.type === 'image' ? (
                            <Image className='w-5 h-5 text-primary/50' />
                          ) : (
                            <Video className='w-5 h-5 text-accent/50' />
                          )}
                        </div>
                        <div>
                          <div className='font-medium text-foreground'>
                            {file.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='capitalize text-foreground/80'>
                        {file.type}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-foreground/80'>
                      {file.size}
                    </td>
                    <td className='px-6 py-4 text-foreground/80'>
                      {file.dimensions}
                    </td>
                    <td className='px-6 py-4 text-foreground/80'>
                      {file.uploadedAt}
                    </td>
                    <td className='px-6 py-4'>
                      {file.project && (
                        <span className='text-xs bg-primary/20 text-primary px-2 py-1 rounded-full'>
                          {file.project}
                        </span>
                      )}
                      {file.story && (
                        <span className='text-xs bg-accent/20 text-accent px-2 py-1 rounded-full'>
                          {file.story}
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-end space-x-2'>
                        <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                          <Eye className='w-4 h-4 text-foreground/60' />
                        </button>
                        <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                          <Download className='w-4 h-4 text-foreground/60' />
                        </button>
                        <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                          <Trash2 className='w-4 h-4 text-foreground/60' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className='text-center py-16'>
          <Image className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
            No media files found
          </h3>
          <p className='text-foreground/50 mb-6'>
            Try adjusting your search or filter criteria.
          </p>
          <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center space-x-2'>
            <Upload className='w-5 h-5' />
            <span>Upload Your First Media</span>
          </button>
        </div>
      )}
    </div>
  );
}
