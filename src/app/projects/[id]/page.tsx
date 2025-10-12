'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import {
  Building2,
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  Camera,
  Play,
  CheckCircle,
} from 'lucide-react';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const project = useQuery(api.projects.get, { id: projectId as any });

  if (project === undefined) {
    return (
      <div className='min-h-screen bg-background'>
        <Navigation />
        <div className='pt-20 pb-16 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-foreground/70'>Loading project...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className='min-h-screen bg-background'>
        <Navigation />
        <div className='pt-20 pb-16 text-center'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Project Not Found
          </h1>
          <p className='text-foreground/70 mb-8'>
            The project you're looking for doesn't exist.
          </p>
          <Link
            href='/projects'
            className='inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Projects</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-20 pb-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8'>
            <Link
              href='/projects'
              className='inline-flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Back to Projects</span>
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
            <div>
              <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4'>
                <span className='text-sm text-primary bg-primary/10 px-3 py-1 rounded-full w-fit'>
                  {project.category}
                </span>
                <span
                  className={`text-sm px-3 py-1 rounded-full w-fit ${
                    project.status === 'Published'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-accent/20 text-accent'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4'>
                {project.title}
              </h1>

              <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-foreground/60 mb-6'>
                <div className='flex items-center space-x-2'>
                  <MapPin className='w-4 h-4' />
                  <span>{project.location}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Calendar className='w-4 h-4' />
                  <span>{new Date(project.createdAt).getFullYear()}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='w-4 h-4' />
                  <span>{project.team || 'Professional Team'}</span>
                </div>
              </div>

              <p className='text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed'>
                {project.description}
              </p>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
                <button className='bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2'>
                  <Play className='w-5 h-5' />
                  <span>View Timeline</span>
                </button>
                <div className='flex space-x-3'>
                  <button className='bg-card border border-border px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center space-x-2 flex-1 sm:flex-none'>
                    <Share2 className='w-5 h-5' />
                    <span className='hidden sm:inline'>Share</span>
                  </button>
                  <button className='bg-card border border-border px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center space-x-2 flex-1 sm:flex-none'>
                    <Heart className='w-5 h-5' />
                    <span className='hidden sm:inline'>Save</span>
                  </button>
                </div>
              </div>
            </div>

            <div className='bg-card rounded-xl p-4 sm:p-8 metallic-border'>
              <div className='w-full h-64 sm:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6'>
                <Building2 className='w-16 h-16 sm:w-20 sm:h-20 text-primary/50' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm'>
                <div>
                  <span className='text-foreground/60'>Timeline:</span>
                  <p className='font-semibold text-foreground'>
                    {project.timeline || 'Ongoing'}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Budget:</span>
                  <p className='font-semibold text-foreground'>
                    {project.budget || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Client:</span>
                  <p className='font-semibold text-foreground'>
                    {project.client || 'N/A'}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Architect:</span>
                  <p className='font-semibold text-foreground'>
                    {project.architect || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div>
              <h2 className='text-3xl font-bold text-foreground mb-6'>
                Project Overview
              </h2>
              <p className='text-lg text-foreground/80 leading-relaxed mb-8'>
                {project.fullDescription || project.description}
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>Client</h3>
                  <p className='text-foreground/70'>
                    {project.client || 'N/A'}
                  </p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Architect
                  </h3>
                  <p className='text-foreground/70'>
                    {project.architect || 'N/A'}
                  </p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Contractor
                  </h3>
                  <p className='text-foreground/70'>
                    {project.contractor || 'N/A'}
                  </p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Timeline
                  </h3>
                  <p className='text-foreground/70'>
                    {project.timeline || 'Ongoing'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Key Features
              </h3>
              <div className='space-y-4'>
                {project.keyFeatures && project.keyFeatures.length > 0 ? (
                  project.keyFeatures.map((feature: string, index: number) => (
                    <div key={index} className='flex items-center space-x-3'>
                      <CheckCircle className='w-5 h-5 text-primary flex-shrink-0' />
                      <span className='text-foreground/80'>{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className='text-foreground/60 italic'>
                    No key features listed
                  </p>
                )}
              </div>

              <h3 className='text-2xl font-bold text-foreground mb-6 mt-8'>
                Project Statistics
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                {project.statistics && project.statistics.length > 0 ? (
                  project.statistics.map(
                    (stat: { value: string; label: string }, index: number) => (
                      <div
                        key={index}
                        className='bg-card rounded-lg p-4 metallic-border text-center'
                      >
                        <div className='text-2xl font-bold text-primary mb-1'>
                          {stat.value}
                        </div>
                        <div className='text-sm text-foreground/70'>
                          {stat.label}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className='col-span-2 text-center py-8'>
                    <p className='text-foreground/60 italic'>
                      No statistics available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Timeline */}
      <section className='py-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
            Construction Timeline
          </h2>
          <div className='space-y-8'>
            {project.timelines && project.timelines.length > 0 ? (
              project.timelines.map((phase: any, index: number) => (
                <div
                  key={index}
                  className='bg-card rounded-xl p-8 metallic-border'
                >
                  <div className='flex items-start justify-between mb-6'>
                    <div>
                      <h3 className='text-2xl font-bold text-foreground mb-2'>
                        {phase.phase}
                      </h3>
                      <p className='text-foreground/70 mb-2'>
                        {phase.description}
                      </p>
                      <div className='flex items-center space-x-4 text-sm text-foreground/60'>
                        <div className='flex items-center space-x-2'>
                          <Calendar className='w-4 h-4' />
                          <span>
                            {phase.startDate} - {phase.endDate}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <CheckCircle className='w-4 h-4 text-primary' />
                          <span className='text-primary'>Completed</span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-3xl font-bold text-primary mb-1'>
                        {index + 1}
                      </div>
                      <div className='text-sm text-foreground/60'>Phase</div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {phase.images && phase.images.length > 0 ? (
                      phase.images.map((image: string, imgIndex: number) => (
                        <div
                          key={imgIndex}
                          className='bg-background rounded-lg overflow-hidden'
                        >
                          <div className='w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                            <Camera className='w-8 h-8 text-primary/50' />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='col-span-3 text-center py-8'>
                        <p className='text-foreground/60 italic'>
                          No images available for this phase
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-16'>
                <p className='text-foreground/60 italic'>
                  No timeline information available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Interviews */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
            Team Interviews
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {project.teamInterviews && project.teamInterviews.length > 0 ? (
              project.teamInterviews.map((member: any, index: number) => (
                <div
                  key={index}
                  className='bg-card rounded-xl p-6 metallic-border text-center'
                >
                  <div className='w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <Users className='w-10 h-10 text-primary/50' />
                  </div>
                  <h3 className='text-xl font-bold text-foreground mb-2'>
                    {member.name}
                  </h3>
                  <p className='text-primary mb-2'>{member.role}</p>
                  <p className='text-sm text-foreground/60 mb-4'>
                    {member.company}
                  </p>
                  <p className='text-foreground/80 italic'>"{member.quote}"</p>
                </div>
              ))
            ) : (
              <div className='col-span-full text-center py-16'>
                <p className='text-foreground/60 italic'>
                  No team interviews available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className='py-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-foreground mb-8 text-center'>
            Project Gallery
          </h2>

          {/* Photos */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-foreground mb-6'>Photos</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {project.media.photos && project.media.photos.length > 0 ? (
                project.media.photos.map((photo: string, index: number) => (
                  <div
                    key={index}
                    className='bg-card rounded-lg overflow-hidden metallic-border'
                  >
                    <div className='w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                      <Camera className='w-12 h-12 text-primary/50' />
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-16'>
                  <p className='text-foreground/60 italic'>
                    No photos available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Videos */}
          <div>
            <h3 className='text-2xl font-bold text-foreground mb-6'>Videos</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {project.media.videos && project.media.videos.length > 0 ? (
                project.media.videos.map((video: string, index: number) => (
                  <div
                    key={index}
                    className='bg-card rounded-lg overflow-hidden metallic-border'
                  >
                    <div className='w-full h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative'>
                      <div className='w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center'>
                        <Play className='w-8 h-8 text-accent-foreground ml-1' />
                      </div>
                    </div>
                    <div className='p-4'>
                      <h4 className='font-semibold text-foreground'>
                        Video {index + 1}
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-16'>
                  <p className='text-foreground/60 italic'>
                    No videos available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
