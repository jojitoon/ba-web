'use client';

import { useQuery, useMutation } from 'convex/react';
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
} from 'lucide-react';
import { api } from 'convex/_generated/api';
import DeleteConfirmation from '@/components/delete-confirmation';

const statusOptions = ['All', 'Published', 'Draft', 'In Review'];
const categoryOptions = [
  'All',
  'Commercial',
  'Residential',
  'Infrastructure',
  'Industrial',
  'Healthcare',
  'Education',
  'Retail',
];

export default function AdminProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    projectId: string | null;
    projectTitle: string;
  }>({
    isOpen: false,
    projectId: null,
    projectTitle: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const projects = useQuery(api.projects.list, {
    status: statusFilter !== 'All' ? statusFilter : undefined,
    category: categoryFilter !== 'All' ? categoryFilter : undefined,
  });

  const deleteProject = useMutation(api.projects.deleteProject);

  const filteredProjects =
    projects?.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) || [];

  const handleDeleteClick = (projectId: string, projectTitle: string) => {
    setDeleteModal({
      isOpen: true,
      projectId,
      projectTitle,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.projectId) return;

    setIsDeleting(true);
    try {
      await deleteProject({ id: deleteModal.projectId as any });
      setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' });
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' });
  };

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
            key={project._id}
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
                  <p className='font-medium text-foreground'>
                    {project.category}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Budget:</span>
                  <p className='font-medium text-foreground'>
                    {project.budget || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Timeline:</span>
                  <p className='font-medium text-foreground'>
                    {project.timeline || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Team:</span>
                  <p className='font-medium text-foreground'>
                    {project.team || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className='p-6'>
              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary mb-1'>
                    {project.media.photos.length + project.media.videos.length}
                  </div>
                  <div className='text-xs text-foreground/60'>Media</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-accent mb-1'>
                    {project.media.photos.length}
                  </div>
                  <div className='text-xs text-foreground/60'>Images</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-primary mb-1'>
                    {project.media.videos.length}
                  </div>
                  <div className='text-xs text-foreground/60'>Videos</div>
                </div>
              </div>

              <div className='flex items-center justify-between text-sm text-foreground/60 mb-4'>
                <div className='flex items-center space-x-1'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center space-x-2'>
                <Link
                  href={`/projects/${project._id}`}
                  className='flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center space-x-2'
                >
                  <Eye className='w-4 h-4' />
                  <span>View</span>
                </Link>
                <Link
                  href={`/admin/projects/${project._id}/edit`}
                  className='flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2'
                >
                  <Edit className='w-4 h-4' />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDeleteClick(project._id, project.title)}
                  className='p-2 rounded-lg hover:bg-secondary transition-colors'
                >
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title='Delete Project'
        description='Are you sure you want to delete this project? This action cannot be undone and will permanently remove all project data, including media files and timelines.'
        itemName={deleteModal.projectTitle}
        isLoading={isDeleting}
      />
    </div>
  );
}
