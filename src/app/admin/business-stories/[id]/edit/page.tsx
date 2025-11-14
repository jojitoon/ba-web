'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useAction } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Plus, X, Trash2, Video } from 'lucide-react';
import { api } from 'convex/_generated/api';
import MediaUpload from '@/components/media-upload';
import MuxVideoUploader from '@/components/video-uploader';

export default function EditBusinessStory() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.id as string;

  const story = useQuery(api.businessStories.getByIdWithMedia, {
    id: storyId as any,
  });
  const updateStory = useMutation(api.businessStories.update);

  const [formData, setFormData] = useState({
    title: '',
    business: '',
    location: '',
    category: '',
    status: 'Draft' as const,
    duration: '',
    rating: 5,
    founded: '',
    employees: '',
    description: '',
    fullDescription: '',
    ownerStory: '',
    milestones: [{ year: '', title: '', description: '' }],
    testimonials: [{ name: '', role: '', content: '', rating: 5 }],
    supportLinks: {
      website: '',
      phone: '',
      email: '',
      address: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedMediaIds, setUploadedMediaIds] = useState<string[]>([]);
  const [imagesPerCategory, setImagesPerCategory] = useState<Record<string, number>>({});
  const INITIAL_IMAGES_PER_CATEGORY = 20; // Show 20 images per category initially

  const bulkUpdateMediaStoryId = useMutation(api.media.bulkUpdateMediaStoryId);
  const saveMuxMedia = useMutation(api.media.saveMuxMedia);
  const deleteMedia = useMutation(api.media.deleteMedia);
  const deleteStoryVideos = useMutation(api.media.deleteStoryVideos);
  const deleteMuxAsset = useAction(api.mux.deleteMuxAsset);

  // Initialize images per category count when story loads
  useEffect(() => {
    if (story?.media?.images && story.media.images.length > 0 && Object.keys(imagesPerCategory).length === 0) {
      // Group images by dateCategory to get categories
      const groupedImages = story.media.images.reduce(
        (acc: Record<string, typeof story.media.images>, image: any) => {
          const dateCategory = image.dateCategory || 'Unknown';
          if (!acc[dateCategory]) {
            acc[dateCategory] = [];
          }
          acc[dateCategory].push(image);
          return acc;
        },
        {}
      );
      const sortedCategories = Object.keys(groupedImages).sort((a, b) => b.localeCompare(a));
      
      const initialCounts: Record<string, number> = {};
      sortedCategories.forEach((category) => {
        initialCounts[category] = INITIAL_IMAGES_PER_CATEGORY;
      });
      setImagesPerCategory(initialCounts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story?._id]);

  // Load story data when it's available
  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        business: story.business,
        location: story.location,
        category: story.category,
        status: story.status as any,
        duration: story.duration || '',
        rating: story.rating || 5,
        founded: story.founded as any,
        employees: story.employees as any,
        description: story.description,
        fullDescription: story.fullDescription || '',
        ownerStory: story.ownerStory || '',
        milestones:
          story.milestones.length > 0
            ? story.milestones
            : [{ year: '', title: '', description: '' }],
        testimonials:
          story.testimonials.length > 0
            ? story.testimonials
            : [{ name: '', role: '', content: '', rating: 5 }],
        supportLinks: {
          website: story.supportLinks.website || '',
          phone: story.supportLinks.phone || '',
          email: story.supportLinks.email || '',
          address: story.supportLinks.address || '',
        },
      });
    }
  }, [story]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSupportLinkChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      supportLinks: {
        ...prev.supportLinks,
        [field]: value,
      },
    }));
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      milestones: newMilestones,
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { year: '', title: '', description: '' },
      ],
    }));
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      milestones: newMilestones,
    }));
  };

  const handleTestimonialChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: '', role: '', content: '', rating: 5 },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  const handleMuxUploadComplete = async (
    uploadId: string,
    _: string,
    size?: number
  ) => {
    try {
      // First, save the new video media record immediately
      // This ensures the webhook can find it when it fires
      const mediaId = await saveMuxMedia({
        filename: `${uploadId}.mp4`,
        uploadId,
        size: size ?? 0,
        storyId: storyId as any,
      });

      console.log(
        `✅ Created media record ${mediaId} for uploadId: ${uploadId}`
      );

      setUploadedMediaIds((prev) => [...prev, mediaId]);

      // Then delete old videos from this story (after new one is saved)
      if (storyId) {
        const oldVideos = await deleteStoryVideos({ storyId: storyId as any });

        // Filter out the video we just created
        const videosToDelete = oldVideos.filter((v) => v.id !== mediaId);

        // Delete from Mux and database
        for (const video of videosToDelete) {
          if (video.muxAssetId) {
            try {
              await deleteMuxAsset({ assetId: video.muxAssetId });
              console.log(`✅ Deleted old Mux asset: ${video.muxAssetId}`);
            } catch (error) {
              console.error(
                `Failed to delete Mux asset ${video.muxAssetId}:`,
                error
              );
            }
          }
          try {
            await deleteMedia({ id: video.id });
            console.log(`✅ Deleted old media record: ${video.id}`);
          } catch (error) {
            console.error(`Failed to delete media ${video.id}:`, error);
          }
        }
      }
    } catch (err) {
      console.error('Failed to save video record:', err);
      alert('Failed to save video. Please try again.');
    }
  };

  const handleDeleteImage = async (imageId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      await deleteMedia({ id: imageId as any });
      // Remove from uploadedMediaIds if it's there
      setUploadedMediaIds((prev) => prev.filter((id) => id !== imageId));
      // The Convex query will automatically refetch and update the UI
    } catch (error) {
      console.error('Failed to delete image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  const handleDeleteVideo = async (videoId: string, muxAssetId?: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      // Delete from Mux first if muxAssetId exists
      if (muxAssetId) {
        try {
          await deleteMuxAsset({ assetId: muxAssetId });
          console.log(`✅ Deleted Mux asset: ${muxAssetId}`);
        } catch (error) {
          console.error(`Failed to delete Mux asset ${muxAssetId}:`, error);
          // Continue with database deletion even if Mux deletion fails
        }
      }

      // Delete from database
      await deleteMedia({ id: videoId as any });
      // Remove from uploadedMediaIds if it's there
      setUploadedMediaIds((prev) => prev.filter((id) => id !== videoId));
      // The Convex query will automatically refetch and update the UI
    } catch (error) {
      console.error('Failed to delete video:', error);
      alert('Failed to delete video. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty milestones and testimonials
      const filteredMilestones = formData.milestones.filter(
        (milestone) =>
          milestone.year.trim() !== '' &&
          milestone.title.trim() !== '' &&
          milestone.description.trim() !== ''
      );
      const filteredTestimonials = formData.testimonials.filter(
        (testimonial) =>
          testimonial.name.trim() !== '' && testimonial.content.trim() !== ''
      );

      await updateStory({
        id: storyId as any,
        title: formData.title,
        business: formData.business,
        location: formData.location,
        category: formData.category,
        status: formData.status,
        duration: formData.duration || undefined,
        rating: formData.rating,
        founded: formData.founded,
        employees: formData.employees,
        description: formData.description,
        fullDescription: formData.fullDescription || undefined,
        ownerStory: formData.ownerStory || undefined,
        milestones: filteredMilestones,
        testimonials: filteredTestimonials,
        supportLinks: {
          website: formData.supportLinks.website || undefined,
          phone: formData.supportLinks.phone || undefined,
          email: formData.supportLinks.email || undefined,
          address: formData.supportLinks.address || undefined,
        },
      });

      // Link any newly uploaded media to the story
      if (uploadedMediaIds.length > 0) {
        await bulkUpdateMediaStoryId({
          mediaIds: uploadedMediaIds,
          storyId: storyId as any,
        });
      }

      // Redirect to business stories list
      router.push('/admin/business-stories');
    } catch (error) {
      console.error('Failed to update business story:', error);
      alert('Failed to update business story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!story) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-foreground/70'>Loading business story...</p>
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
            <h1 className='text-4xl font-bold text-foreground'>
              Edit Business Story
            </h1>
            <p className='text-foreground/70'>
              Update the business story information and content.
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
            className='bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
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
                Story Title
              </label>
              <input
                type='text'
                id='title'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='business'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Business Name
              </label>
              <input
                type='text'
                id='business'
                value={formData.business}
                onChange={(e) => handleInputChange('business', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
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
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
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
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
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
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
              >
                <option value='Draft'>Draft</option>
                <option value='In Review'>In Review</option>
                <option value='Published'>Published</option>
              </select>
            </div>
            <div>
              <label
                htmlFor='duration'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Duration
              </label>
              <input
                type='text'
                id='duration'
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='e.g., 45 min'
              />
            </div>
            <div>
              <label
                htmlFor='founded'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Founded Year
              </label>
              <input
                type='text'
                id='founded'
                value={formData.founded}
                onChange={(e) => handleInputChange('founded', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                required
              />
            </div>
            <div>
              <label
                htmlFor='employees'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Number of Employees
              </label>
              <input
                type='text'
                id='employees'
                value={formData.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                required
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
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='Brief story description'
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
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='Detailed story description'
              />
            </div>
            <div>
              <label
                htmlFor='ownerStory'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Owner's Story
              </label>
              <textarea
                id='ownerStory'
                rows={6}
                value={formData.ownerStory}
                onChange={(e) =>
                  handleInputChange('ownerStory', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder="The owner's personal story and journey"
              />
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Business Milestones
            </h2>
            <button
              type='button'
              onClick={addMilestone}
              className='bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2'
            >
              <Plus className='w-4 h-4' />
              <span>Add Milestone</span>
            </button>
          </div>
          <div className='space-y-4'>
            {formData.milestones.map((milestone, index) => (
              <div
                key={index}
                className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border'
              >
                <input
                  type='text'
                  value={milestone.year}
                  onChange={(e) =>
                    handleMilestoneChange(index, 'year', e.target.value)
                  }
                  className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                  placeholder='Year'
                />
                <input
                  type='text'
                  value={milestone.title}
                  onChange={(e) =>
                    handleMilestoneChange(index, 'title', e.target.value)
                  }
                  className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                  placeholder='Milestone Title'
                />
                <div className='flex items-center space-x-2'>
                  <input
                    type='text'
                    value={milestone.description}
                    onChange={(e) =>
                      handleMilestoneChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    className='flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                    placeholder='Description'
                  />
                  <button
                    type='button'
                    onClick={() => removeMilestone(index)}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <X className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Customer Testimonials
            </h2>
            <button
              type='button'
              onClick={addTestimonial}
              className='bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2'
            >
              <Plus className='w-4 h-4' />
              <span>Add Testimonial</span>
            </button>
          </div>
          <div className='space-y-4'>
            {formData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='p-4 bg-background rounded-lg border border-border'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <input
                    type='text'
                    value={testimonial.name}
                    onChange={(e) =>
                      handleTestimonialChange(index, 'name', e.target.value)
                    }
                    className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                    placeholder='Customer Name'
                  />
                  <input
                    type='text'
                    value={testimonial.role}
                    onChange={(e) =>
                      handleTestimonialChange(index, 'role', e.target.value)
                    }
                    className='px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                    placeholder='Role/Title'
                  />
                </div>
                <div className='flex items-center space-x-2 mb-4'>
                  <input
                    type='text'
                    value={testimonial.content}
                    onChange={(e) =>
                      handleTestimonialChange(index, 'content', e.target.value)
                    }
                    className='flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                    placeholder='Testimonial content'
                  />
                  <button
                    type='button'
                    onClick={() => removeTestimonial(index)}
                    className='p-2 rounded-lg hover:bg-secondary transition-colors'
                  >
                    <X className='w-4 h-4 text-foreground/60' />
                  </button>
                </div>
                <div className='flex items-center space-x-2'>
                  <label className='text-sm text-foreground/70'>Rating:</label>
                  <input
                    type='number'
                    min='1'
                    max='5'
                    value={testimonial.rating}
                    onChange={(e) =>
                      handleTestimonialChange(
                        index,
                        'rating',
                        parseInt(e.target.value)
                      )
                    }
                    className='w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Links */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Support Links
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='website'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Website
              </label>
              <input
                type='url'
                id='website'
                value={formData.supportLinks.website}
                onChange={(e) =>
                  handleSupportLinkChange('website', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='https://www.business.com'
              />
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Phone
              </label>
              <input
                type='tel'
                id='phone'
                value={formData.supportLinks.phone}
                onChange={(e) =>
                  handleSupportLinkChange('phone', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='+1 (123) 456-7890'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.supportLinks.email}
                onChange={(e) =>
                  handleSupportLinkChange('email', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='info@business.com'
              />
            </div>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-foreground/70 mb-2'
              >
                Address
              </label>
              <input
                type='text'
                id='address'
                value={formData.supportLinks.address}
                onChange={(e) =>
                  handleSupportLinkChange('address', e.target.value)
                }
                className='w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
                placeholder='123 Business St, City, State, ZIP'
              />
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className='bg-card rounded-xl p-6 metallic-border'>
          <h2 className='text-xl font-bold text-foreground mb-6'>
            Media Files
          </h2>
          <div className='space-y-8'>
            {/* Images */}
            <div>
              <h3 className='text-sm font-semibold text-foreground mb-4'>
                Images
              </h3>
              <MediaUpload
                storyId={storyId as any}
                onUploadComplete={(imageIds) => {
                  setUploadedMediaIds((prev) => [...prev, ...imageIds]);
                }}
                accept='image/*'
              />
            </div>

            {/* Videos */}
            <div>
              <h3 className='text-sm font-semibold text-foreground mb-4'>
                Videos
              </h3>
              <p className='text-sm text-foreground/60 mb-4'>
                Uploading a new video will replace any existing video for this
                story.
              </p>
              <MuxVideoUploader
                onUploadComplete={handleMuxUploadComplete}
                onUploadError={(error) => {
                  console.error('Mux upload error:', error);
                  alert(`Video upload failed: ${error}`);
                }}
                maxFileSize={500 * 1024 * 1024}
                acceptedFileTypes={[
                  'video/mp4',
                  'video/quicktime',
                  'video/x-msvideo',
                ]}
              />
            </div>

            {/* Existing Media */}
            {(story?.media?.images && story.media.images.length > 0) ||
            (story?.media?.videos && story.media.videos.length > 0) ? (
              <div className='mt-8 pt-8 border-t border-border'>
                <h3 className='text-sm font-semibold text-foreground mb-6'>
                  Existing Media
                </h3>

                {/* Existing Images */}
                {story?.media?.images && story.media.images.length > 0 && (
                  <div className='mb-8'>
                    <h4 className='text-xs font-semibold text-foreground/70 mb-4 uppercase tracking-wider'>
                      Images ({story.media.images.length})
                    </h4>
                    {(() => {
                      // Group images by dateCategory
                      const groupedImages = story.media.images.reduce(
                        (acc: Record<string, typeof story.media.images>, image: any) => {
                          const dateCategory = image.dateCategory || 'Unknown';
                          if (!acc[dateCategory]) {
                            acc[dateCategory] = [];
                          }
                          acc[dateCategory].push(image);
                          return acc;
                        },
                        {}
                      );

                      // Sort date categories in descending order (newest first)
                      const sortedCategories = Object.keys(groupedImages).sort(
                        (a, b) => b.localeCompare(a)
                      );

                      // Format date category for display (YYYY-MM -> Month Year)
                      const formatDateCategory = (dateCategory: string) => {
                        if (dateCategory === 'Unknown') return 'Unknown Date';
                        const [year, month] = dateCategory.split('-');
                        const date = new Date(parseInt(year), parseInt(month) - 1);
                        return date.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        });
                      };

                      const loadMoreImages = (dateCategory: string) => {
                        setImagesPerCategory((prev) => ({
                          ...prev,
                          [dateCategory]: (prev[dateCategory] || INITIAL_IMAGES_PER_CATEGORY) + 20,
                        }));
                      };

                      return (
                        <div className='space-y-8'>
                          {sortedCategories.map((dateCategory) => {
                            const images = groupedImages[dateCategory];
                            const displayedCount = imagesPerCategory[dateCategory] || INITIAL_IMAGES_PER_CATEGORY;
                            const displayedImages = images.slice(0, displayedCount);
                            const hasMore = images.length > displayedCount;

                            return (
                              <div key={dateCategory}>
                                <h5 className='text-sm font-semibold text-foreground/80 mb-4'>
                                  {formatDateCategory(dateCategory)} ({images.length})
                                </h5>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                                  {displayedImages.map((image: any) => (
                                    <div
                                      key={image._id}
                                      className='relative group bg-secondary/30 rounded-lg overflow-hidden border border-border'
                                    >
                                      <div className='aspect-square relative'>
                                        <img
                                          src={image.url}
                                          alt={image.filename}
                                          className='w-full h-full object-cover'
                                          loading='lazy'
                                          decoding='async'
                                        />
                                        <div className='absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-200 flex items-center justify-center'>
                                          <button
                                            onClick={(e) => handleDeleteImage(image._id, e)}
                                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90'
                                            title='Delete image'
                                            type='button'
                                          >
                                            <Trash2 className='w-4 h-4' />
                                          </button>
                                        </div>
                                      </div>
                                      <div className='p-2'>
                                        <p className='text-xs text-foreground/60 truncate'>
                                          {image.filename}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {hasMore && (
                                  <div className='text-center mt-4'>
                                    <button
                                      onClick={() => loadMoreImages(dateCategory)}
                                      className='bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'
                                      type='button'
                                    >
                                      Load More ({images.length - displayedCount} remaining)
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Existing Videos */}
                {story?.media?.videos && story.media.videos.length > 0 && (
                  <div>
                    <h4 className='text-xs font-semibold text-foreground/70 mb-4 uppercase tracking-wider'>
                      Videos ({story.media.videos.length})
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {story.media.videos.map((video: any) => (
                        <div
                          key={video._id}
                          className='relative group bg-secondary/30 rounded-lg overflow-hidden border border-border'
                        >
                          <div className='aspect-video relative'>
                            {video.thumbnailUrl ? (
                              <img
                                src={video.thumbnailUrl}
                                alt={video.filename}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <div className='w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center'>
                                <Video className='w-12 h-12 text-foreground/40' />
                              </div>
                            )}
                            <div className='absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-200 flex items-center justify-center'>
                              <button
                                onClick={(e) =>
                                  handleDeleteVideo(video._id, video.muxAssetId, e)
                                }
                                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90'
                                title='Delete video'
                                type='button'
                              >
                                <Trash2 className='w-4 h-4' />
                              </button>
                            </div>
                            <div className='absolute top-2 left-2'>
                              <div className='bg-foreground/80 text-background px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1'>
                                <Video className='w-3 h-3' />
                                <span>Video</span>
                              </div>
                            </div>
                          </div>
                          <div className='p-3'>
                            <p className='text-sm text-foreground font-medium truncate mb-1'>
                              {video.filename}
                            </p>
                            {video.muxPlaybackId && (
                              <p className='text-xs text-foreground/50'>
                                Ready to play
                              </p>
                            )}
                            {!video.muxPlaybackId && (
                              <p className='text-xs text-foreground/50'>
                                Processing...
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
