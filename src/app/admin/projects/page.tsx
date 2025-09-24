'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Building2,
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
  DollarSign,
} from 'lucide-react';

// Mock data - in a real app, this would come from Convex
const projects = [
  {
    id: 1,
    title: 'Downtown Office Complex',
    location: 'New York, NY',
    status: 'Published',
    category: 'Commercial',
    budget: '$850M',
    timeline: '24 months',
    team: '150+ workers',
    date: '2024-01-15',
    views: 1247,
    images: 45,
    videos: 8,
  },
  {
    id: 2,
    title: 'Residential Tower',
    location: 'Los Angeles, CA',
    status: 'Draft',
    category: 'Residential',
    budget: '$450M',
    timeline: '18 months',
    team: '200+ workers',
    date: '2024-01-14',
    views: 0,
    images: 23,
    videos: 3,
  },
  {
    id: 3,
    title: 'Industrial Facility',
    location: 'Houston, TX',
    status: 'Published',
    category: 'Industrial',
    budget: '$320M',
    timeline: '36 months',
    team: '300+ workers',
    date: '2024-01-12',
    views: 892,
    images: 67,
    videos: 12,
  },
  {
    id: 4,
    title: 'Hospital Expansion',
    location: 'Chicago, IL',
    status: 'In Review',
    category: 'Healthcare',
    budget: '$680M',
    timeline: '30 months',
    team: '250+ workers',
    date: '2024-01-10',
    views: 0,
    images: 34,
    videos: 6,
  },
  {
    id: 5,
    title: 'University Campus',
    location: 'Boston, MA',
    status: 'Published',
    category: 'Education',
    budget: '$520M',
    timeline: '42 months',
    team: '400+ workers',
    date: '2024-01-08',
    views: 1567,
    images: 89,
    videos: 15,
  },
  {
    id: 6,
    title: 'Retail Complex',
    location: 'Miami, FL',
    status: 'Draft',
    category: 'Retail',
    budget: '$280M',
    timeline: '20 months',
    team: '180+ workers',
    date: '2024-01-05',
    views: 0,
    images: 12,
    videos: 2,
  },
];

const statusOptions = ['All', 'Published', 'Draft', 'In Review'];
const categoryOptions = [
  'All',
  'Commercial',
  'Residential',
  'Industrial',
  'Healthcare',
  'Education',
  'Retail',
];

export default function AdminProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'All' || project.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Projects</h1>
          <p className='text-foreground/70 mt-1'>
            Manage your construction project documentation and content.
          </p>
        </div>
        <Link
          href='/admin/projects/new'
          className='mt-4 sm:mt-0 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'
        >
          <Plus className='w-5 h-5' />
          <span>New Project</span>
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
                placeholder='Search projects...'
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='pl-10 pr-8 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[140px]'
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
              className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none min-w-[140px]'
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

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className='bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300'
          >
            {/* Project Header */}
            <div className='p-6 border-b border-border'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-foreground mb-2'>
                    {project.title}
                  </h3>
                  <div className='flex items-center space-x-2 text-sm text-foreground/60'>
                    <MapPin className='w-4 h-4' />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Published'
                        ? 'bg-primary/20 text-primary'
                        : project.status === 'Draft'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-secondary text-foreground/80'
                    }`}
                  >
                    {project.status}
                  </span>
                  <button className='p-2 rounded-lg hover:bg-secondary transition-colors'>
                    <MoreVertical className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-foreground/60'>Category:</span>
                  <p className='font-medium text-foreground'>{project.category}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Budget:</span>
                  <p className='font-medium text-foreground'>{project.budget}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Timeline:</span>
                  <p className='font-medium text-foreground'>{project.timeline}</p>
                </div>
                <div>
                  <span className='text-foreground/60'>Team:</span>
                  <p className='font-medium text-foreground'>{project.team}</p>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className='p-6'>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary mb-1'>
                    {project.views}
                  </div>
                  <div className='text-xs text-foreground/60'>Views</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-accent mb-1'>
                    {project.images}
                  </div>
                  <div className='text-xs text-foreground/60'>Images</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary mb-1'>
                    {project.videos}
                  </div>
                  <div className='text-xs text-foreground/60'>Videos</div>
                </div>
              </div>

              <div className='flex items-center justify-between text-sm text-foreground/60 mb-4'>
                <div className='flex items-center space-x-1'>
                  <Calendar className='w-4 h-4' />
                  <span>{project.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center space-x-2'>
                <Link
                  href={`/projects/${project.id}`}
                  className='flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2'
                >
                  <Eye className='w-4 h-4' />
                  <span>View</span>
                </Link>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className='flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2'
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
      {filteredProjects.length === 0 && (
        <div className='text-center py-16'>
          <Building2 className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
            No projects found
          </h3>
          <p className='text-foreground/50 mb-6'>
            Try adjusting your search or filter criteria.
          </p>
          <Link
            href='/admin/projects/new'
            className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center space-x-2'
          >
            <Plus className='w-5 h-5' />
            <span>Create Your First Project</span>
          </Link>
        </div>
      )}
    </div>
  );
}
