'use client';

import { useQuery, useMutation } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Building2,
  Video,
  Image,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  MapPin,
} from 'lucide-react';
import { api } from 'convex/_generated/api';
import DeleteConfirmation from '@/components/delete-confirmation';

export default function AdminDashboard() {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'project' | 'story' | null;
    id: string | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    title: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const projects = useQuery(api.projects.list, {});
  const businessStories = useQuery(api.businessStories.list, {});

  const deleteProject = useMutation(api.projects.deleteProject);
  const deleteStory = useMutation(api.businessStories.deleteStory);

  const totalProjects = projects?.length || 0;
  const totalStories = businessStories?.length || 0;
  const publishedProjects =
    projects?.filter((p) => p.status === 'Published').length || 0;
  const publishedStories =
    businessStories?.filter((s) => s.status === 'Published').length || 0;

  const handleDeleteClick = (
    type: 'project' | 'story',
    id: string,
    title: string
  ) => {
    setDeleteModal({
      isOpen: true,
      type,
      id,
      title,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    setIsDeleting(true);
    try {
      if (deleteModal.type === 'project') {
        await deleteProject({ id: deleteModal.id as any });
      } else {
        await deleteStory({ id: deleteModal.id as any });
      }
      setDeleteModal({ isOpen: false, type: null, id: null, title: '' });
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, type: null, id: null, title: '' });
  };

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
                {totalProjects}
              </p>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Building2 className='w-6 h-6 text-primary' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>{publishedProjects} published</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Business Stories</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {totalStories}
              </p>
            </div>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Video className='w-6 h-6 text-accent' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>{publishedStories} published</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Media Files</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {projects?.reduce(
                  (acc, p) =>
                    acc + p.media.photos.length + p.media.videos.length,
                  0
                ) || 0}
              </p>
            </div>
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
              <Image className='w-6 h-6 text-primary' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>Across all projects</span>
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-foreground/60'>Total Content</p>
              <p className='text-3xl font-bold text-foreground mt-1'>
                {totalProjects + totalStories}
              </p>
            </div>
            <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-accent' />
            </div>
          </div>
          <div className='mt-4 flex items-center text-sm text-foreground/60'>
            <TrendingUp className='w-4 h-4 mr-1' />
            <span>Projects + Stories</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Recent Projects */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Recent Projects
            </h2>
            <Link
              href='/admin/projects'
              className='text-primary hover:text-primary/80 font-medium text-sm'
            >
              View All
            </Link>
          </div>
          <div className='space-y-4'>
            {projects?.slice(0, 3).map((project) => (
              <div
                key={project._id}
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
                          : project.status === 'In Review'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}
                    >
                      {project.status}
                    </span>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='w-3 h-3' />
                      <span>{project.location}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Building2 className='w-3 h-3' />
                      <span>{project.category}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <Edit className='w-4 h-4 text-foreground/60' />
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteClick('project', project._id, project.title)
                    }
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
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
            {businessStories?.slice(0, 3).map((story) => (
              <div
                key={story._id}
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
                          : story.status === 'In Review'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}
                    >
                      {story.status}
                    </span>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='w-3 h-3' />
                      <span>{story.location}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Video className='w-3 h-3' />
                      <span>{story.category}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Link
                    href={`/admin/business-stories/${story._id}/edit`}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <Edit className='w-4 h-4 text-foreground/60' />
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteClick('story', story._id, story.title)
                    }
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <Trash2 className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${
          deleteModal.type === 'project' ? 'Project' : 'Business Story'
        }`}
        description={`Are you sure you want to delete this ${deleteModal.type}? This action cannot be undone and will permanently remove all data, including media files and content.`}
        itemName={deleteModal.title}
        isLoading={isDeleting}
      />
    </div>
  );
}
