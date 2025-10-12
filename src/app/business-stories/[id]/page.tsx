'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import {
  Play,
  Clock,
  Users,
  MapPin,
  Calendar,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  QrCode,
  ExternalLink,
} from 'lucide-react';

export default function BusinessStoryPage() {
  const params = useParams();
  const storyId = params.id as string;

  const story = useQuery(api.businessStories.get, { id: storyId as any });

  if (story === undefined) {
    return (
      <div className='min-h-screen bg-background'>
        <Navigation />
        <div className='pt-20 pb-16 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4'></div>
          <p className='text-foreground/70'>Loading business story...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!story) {
    return (
      <div className='min-h-screen bg-background'>
        <Navigation />
        <div className='pt-20 pb-16 text-center'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Story Not Found
          </h1>
          <p className='text-foreground/70 mb-8'>
            The business story you're looking for doesn't exist.
          </p>
          <Link
            href='/business-stories'
            className='inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Business Stories</span>
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
              href='/business-stories'
              className='inline-flex items-center space-x-2 text-foreground/70 hover:text-primary transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Back to Business Stories</span>
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
            <div>
              <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4'>
                <span className='text-sm text-accent bg-accent/10 px-3 py-1 rounded-full w-fit'>
                  {story.category}
                </span>
                <div className='flex items-center space-x-1'>
                  <Star className='w-4 h-4 text-primary fill-current' />
                  <span className='text-sm text-foreground/70'>
                    {story.rating || 'N/A'}
                  </span>
                </div>
              </div>

              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4'>
                {story.title}
              </h1>

              <p className='text-lg sm:text-xl text-foreground/70 mb-6'>
                {story.business}
              </p>

              <div className='flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-foreground/60 mb-6 sm:mb-8'>
                <div className='flex items-center space-x-2'>
                  <MapPin className='w-4 h-4' />
                  <span>{story.location}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Calendar className='w-4 h-4' />
                  <span>Founded {story.founded || 'N/A'}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='w-4 h-4' />
                  <span>{story.employees || 'N/A'} employees</span>
                </div>
              </div>

              <p className='text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed'>
                {story.description}
              </p>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
                <button className='bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2'>
                  <Play className='w-5 h-5' />
                  <span>Watch Documentary</span>
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
              <div className='w-full h-64 sm:h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 bg-accent/90 rounded-full flex items-center justify-center'>
                  <Play className='w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground ml-1' />
                </div>
              </div>
              <div className='flex items-center justify-between text-sm text-foreground/70'>
                <div className='flex items-center space-x-2'>
                  <Clock className='w-4 h-4' />
                  <span>{story.duration || 'N/A'}</span>
                </div>
                <span>{new Date(story.createdAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-card rounded-xl p-8 metallic-border'>
            <h2 className='text-2xl font-bold text-foreground mb-6'>
              Watch the Full Documentary
            </h2>
            <div className='w-full h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center'>
              <div className='w-24 h-24 bg-accent/90 rounded-full flex items-center justify-center'>
                <Play className='w-12 h-12 text-accent-foreground ml-1' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Details */}
      <section className='py-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div>
              <h2 className='text-3xl font-bold text-foreground mb-6'>
                The Full Story
              </h2>
              <p className='text-lg text-foreground/80 leading-relaxed mb-8'>
                {story.fullDescription || story.description}
              </p>

              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Timeline
              </h3>
              <div className='space-y-6'>
                {story.milestones && story.milestones.length > 0 ? (
                  story.milestones.map((milestone, index) => (
                    <div key={index} className='flex items-start space-x-4'>
                      <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <Calendar className='w-6 h-6 text-primary' />
                      </div>
                      <div>
                        <div className='flex items-center space-x-2 mb-2'>
                          <span className='text-sm font-medium text-primary'>
                            {milestone.year}
                          </span>
                          <span className='text-lg font-semibold text-foreground'>
                            {milestone.title}
                          </span>
                        </div>
                        <p className='text-foreground/70'>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-foreground/60 italic'>
                      No timeline information available
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Customer Testimonials
              </h3>
              <div className='space-y-6'>
                {story.testimonials && story.testimonials.length > 0 ? (
                  story.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className='bg-card rounded-lg p-6 metallic-border'
                    >
                      <p className='text-foreground/80 mb-4 leading-relaxed'>
                        "{testimonial.content}"
                      </p>
                      <div>
                        <h4 className='font-semibold text-foreground'>
                          {testimonial.name}
                        </h4>
                        <p className='text-sm text-foreground/60'>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-8'>
                    <p className='text-foreground/60 italic'>
                      No testimonials available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-foreground mb-8 text-center'>
            Photo Gallery
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {story.media.images && story.media.images.length > 0 ? (
              story.media.images.map((image, index) => (
                <div
                  key={index}
                  className='bg-card rounded-lg overflow-hidden metallic-border'
                >
                  <div className='w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                    <div className='text-foreground/50'>Photo {index + 1}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full text-center py-16'>
                <p className='text-foreground/60 italic'>No photos available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support This Business */}
      <section className='py-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-card rounded-xl p-8 metallic-border text-center'>
            <h2 className='text-3xl font-bold text-foreground mb-6'>
              Support This Business
            </h2>
            <p className='text-lg text-foreground/70 mb-8 max-w-2xl mx-auto'>
              Help preserve local businesses by supporting {story.business}.
              Visit their location, try their products, and be part of their
              story.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-background rounded-lg p-6'>
                <MapPin className='w-8 h-8 text-primary mx-auto mb-3' />
                <h3 className='font-semibold text-foreground mb-2'>Visit Us</h3>
                <p className='text-sm text-foreground/70'>
                  {story.supportLinks.address || 'N/A'}
                </p>
              </div>
              <div className='bg-background rounded-lg p-6'>
                <ExternalLink className='w-8 h-8 text-accent mx-auto mb-3' />
                <h3 className='font-semibold text-foreground mb-2'>Website</h3>
                <a
                  href={story.supportLinks.website || '#'}
                  className='text-sm text-accent hover:text-accent/80'
                >
                  Visit Website
                </a>
              </div>
              <div className='bg-background rounded-lg p-6'>
                <Users className='w-8 h-8 text-primary mx-auto mb-3' />
                <h3 className='font-semibold text-foreground mb-2'>Call Us</h3>
                <a
                  href={`tel:${story.supportLinks.phone || ''}`}
                  className='text-sm text-foreground/70 hover:text-primary'
                >
                  {story.supportLinks.phone || 'N/A'}
                </a>
              </div>
            </div>

            <div className='bg-background rounded-lg p-6 max-w-md mx-auto'>
              <QrCode className='w-12 h-12 text-primary mx-auto mb-3' />
              <h3 className='font-semibold text-foreground mb-2'>
                QR Code Plaque
              </h3>
              <p className='text-sm text-foreground/70'>
                Scan the QR code at {story.business} to watch this documentary
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
