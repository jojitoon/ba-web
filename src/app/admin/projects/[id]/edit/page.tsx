'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import MediaUpload from '@/components/media-upload';
import MuxVideoUploader from '@/components/mux-video-uploader';
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react';
import { api } from 'convex/_generated/api';

export default function EditProject() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const project = useQuery(api.projects.get, { id: projectId as any });
  const updateProject = useMutation(api.projects.update);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    status: 'Draft' as const,
    budget: '',
    timeline: '',
    team: '',
    client: '',
    architect: '',
    contractor: '',
    description: '',
    fullDescription: '',
    keyFeatures: [''],
    statistics: [
      { label: '', value: '' },
      { label: '', value: '' },
    ],
  });

  const [uploadedMediaIds, setUploadedMediaIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load project data when it's available
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        location: project.location,
        category: project.category,
        status: project.status,
        budget: project.budget || '',
        timeline: project.timeline || '',
        team: project.team || '',
        client: project.client || '',
        architect: project.architect || '',
        contractor: project.contractor || '',
        description: project.description,
        fullDescription: project.fullDescription || '',
        keyFeatures:
          project.keyFeatures.length > 0 ? project.keyFeatures : [''],
        statistics:
          project.statistics.length > 0
            ? project.statistics
            : [
                { label: '', value: '' },
                { label: '', value: '' },
              ],
      });
      setUploadedMediaIds([...project.media.photos, ...project.media.videos]);
    }
  }, [project]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKeyFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      keyFeatures: newFeatures,
    }));
  };

  const addKeyFeature = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, ''],
    }));
  };

  const removeKeyFeature = (index: number) => {
    const newFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      keyFeatures: newFeatures,
    }));
  };

  const handleStatisticChange = (
    index: number,
    field: 'label' | 'value',
    value: string
  ) => {
    const newStats = [...formData.statistics];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      statistics: newStats,
    }));
  };

  const addStatistic = () => {
    setFormData((prev) => ({
      ...prev,
      statistics: [...prev.statistics, { label: '', value: '' }],
    }));
  };

  const removeStatistic = (index: number) => {
    const newStats = formData.statistics.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      statistics: newStats,
    }));
  };

  const handleMediaUploadComplete = (mediaIds: string[]) => {
    setUploadedMediaIds((prev) => [...prev, ...mediaIds]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty key features and statistics
      const filteredKeyFeatures = formData.keyFeatures.filter(
        (feature) => feature.trim() !== ''
      );
      const filteredStatistics = formData.statistics.filter(
        (stat) => stat.label.trim() !== '' && stat.value.trim() !== ''
      );

      await updateProject({
        id: projectId as any,
        title: formData.title,
        location: formData.location,
        category: formData.category,
        status: formData.status,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        team: formData.team || undefined,
        client: formData.client || undefined,
        architect: formData.architect || undefined,
        contractor: formData.contractor || undefined,
        description: formData.description,
        fullDescription: formData.fullDescription || undefined,
        keyFeatures: filteredKeyFeatures,
        statistics: filteredStatistics,
      });

      // Redirect to projects list
      router.push('/admin/projects');
    } catch (error) {
      console.error('Failed to update project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!project) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-foreground/70'>Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => router.back()}
            className='p-2 rounded-lg hover:bg-secondary transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-foreground' />
          </button>
          <div>
            <h1 className='text-4xl font-bold text-foreground'>Edit Project</h1>
            <p className='text-foreground/70'>
              Update the project information and content.
            </p>
          </div>
        </div>
        <div className='flex space-x-3'>
          <button className='bg-secondary text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center space-x-2'>
            <Eye className='w-5 h-5' />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Save className='w-5 h-5' />
            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        {/* Basic Information */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Basic Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Project Title
              </label>
              <input
                type='text'
                id='title'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Location
              </label>
              <input
                type='text'
                id='location'
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Category
              </label>
              <input
                type='text'
                id='category'
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Status
              </label>
              <select
                id='status'
                value={formData.status}
                onChange={(e) =>
                  handleInputChange('status', e.target.value as any)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              >
                <option value='Draft'>Draft</option>
                <option value='In Review'>In Review</option>
                <option value='Published'>Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Project Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='budget'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Budget
              </label>
              <input
                type='text'
                id='budget'
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='e.g., $50M'
              />
            </div>
            <div>
              <label
                htmlFor='timeline'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Timeline
              </label>
              <input
                type='text'
                id='timeline'
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='e.g., 24 months'
              />
            </div>
            <div>
              <label
                htmlFor='team'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Team Size
              </label>
              <input
                type='text'
                id='team'
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='e.g., 50+ professionals'
              />
            </div>
            <div>
              <label
                htmlFor='client'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Client
              </label>
              <input
                type='text'
                id='client'
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Client name'
              />
            </div>
            <div>
              <label
                htmlFor='architect'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Architect
              </label>
              <input
                type='text'
                id='architect'
                value={formData.architect}
                onChange={(e) => handleInputChange('architect', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Architect firm'
              />
            </div>
            <div>
              <label
                htmlFor='contractor'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Contractor
              </label>
              <input
                type='text'
                id='contractor'
                value={formData.contractor}
                onChange={(e) =>
                  handleInputChange('contractor', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Contractor name'
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Description
          </h2>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Short Description
              </label>
              <textarea
                id='description'
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Brief project description'
                required
              />
            </div>
            <div>
              <label
                htmlFor='fullDescription'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Full Description
              </label>
              <textarea
                id='fullDescription'
                rows={6}
                value={formData.fullDescription}
                onChange={(e) =>
                  handleInputChange('fullDescription', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                placeholder='Detailed project description'
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>Key Features</h2>
            <button
              type='button'
              onClick={addKeyFeature}
              className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'
            >
              <Plus className='w-4 h-4' />
              <span>Add Feature</span>
            </button>
          </div>
          <div className='space-y-4'>
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <input
                  type='text'
                  value={feature}
                  onChange={(e) =>
                    handleKeyFeatureChange(index, e.target.value)
                  }
                  className='flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  placeholder='Enter key feature'
                />
                <button
                  type='button'
                  onClick={() => removeKeyFeature(index)}
                  className='p-2 rounded-lg hover:bg-secondary transition-colors'
                >
                  <X className='w-4 h-4 text-foreground/60' />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Project Statistics */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Project Statistics
            </h2>
            <button
              type='button'
              onClick={addStatistic}
              className='bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2'
            >
              <Plus className='w-4 h-4' />
              <span>Add Statistic</span>
            </button>
          </div>
          <div className='space-y-4'>
            {formData.statistics.map((stat, index) => (
              <div
                key={index}
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
              >
                <input
                  type='text'
                  value={stat.label}
                  onChange={(e) =>
                    handleStatisticChange(index, 'label', e.target.value)
                  }
                  className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  placeholder='Statistic label'
                />
                <div className='flex items-center space-x-2'>
                  <input
                    type='text'
                    value={stat.value}
                    onChange={(e) =>
                      handleStatisticChange(index, 'value', e.target.value)
                    }
                    className='flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    placeholder='Statistic value'
                  />
                  <button
                    type='button'
                    onClick={() => removeStatistic(index)}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <X className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Media Files
          </h2>
          <div className='space-y-6'>
            <MediaUpload
              onUploadComplete={handleMediaUploadComplete}
              accept='image/*'
              maxFiles={20}
            />
          </div>
        </div>

        {/* Video Upload */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Video Content
          </h2>
          <MuxVideoUploader
            onUploadComplete={(assetId, playbackId) => {
              console.log('Video uploaded:', { assetId, playbackId });
              // Handle video upload completion
            }}
            onUploadError={(error) => {
              console.error('Video upload error:', error);
            }}
          />
        </div>
      </form>
    </div>
  );
}
