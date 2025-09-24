'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Building2, Video, Users, Target, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-20 pb-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
              About <span className='text-primary'>Built Ancestry</span>
            </h1>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              We preserve legacies through technology, capturing the stories and
              achievements that define our communities and shape our future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div>
              <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
                Our <span className='text-primary'>Mission</span>
              </h2>
              <p className='text-lg text-foreground/70 mb-6 leading-relaxed'>
                Built Ancestry was founded on the belief that every construction
                project and business story deserves to be preserved and
                celebrated. We combine cutting-edge technology with cinematic
                storytelling to create lasting digital legacies.
              </p>
              <p className='text-lg text-foreground/70 mb-8 leading-relaxed'>
                From the first groundbreaking ceremony to the final handshake,
                we capture the human stories behind the structures and
                businesses that define our communities.
              </p>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center'>
                  <Target className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>Preserve</h3>
                  <p className='text-foreground/70'>
                    Every milestone, every story
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-card rounded-xl p-8 metallic-border'>
              <div className='w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center'>
                <Building2 className='w-20 h-20 text-primary/50' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-20 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div className='bg-card rounded-xl p-8 metallic-border'>
              <div className='w-full h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center'>
                <Video className='w-20 h-20 text-accent/50' />
              </div>
            </div>
            <div>
              <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
                The Story Behind{' '}
                <span className='text-accent'>Built Ancestry</span>
              </h2>
              <p className='text-lg text-foreground/70 mb-6 leading-relaxed'>
                Founded by a team of construction professionals and documentary
                filmmakers, Built Ancestry emerged from a simple observation:
                the incredible stories behind construction projects and local
                businesses were being lost.
              </p>
              <p className='text-lg text-foreground/70 mb-8 leading-relaxed'>
                We saw the need to preserve not just the physical structures,
                but the human stories, the challenges overcome, and the
                communities built along the way.
              </p>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center'>
                  <Heart className='w-6 h-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>Celebrate</h3>
                  <p className='text-foreground/70'>
                    The people behind the projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Why Construction & Business{' '}
              <span className='text-primary'>Matter</span>
            </h2>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Every project and business represents more than just structures
              and services - they represent dreams, communities, and legacies.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Building2 className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Community Impact
              </h3>
              <p className='text-foreground/70 leading-relaxed'>
                Construction projects and local businesses are the backbone of
                our communities, creating jobs, providing services, and building
                the places where memories are made.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Users className='w-8 h-8 text-accent' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Human Stories
              </h3>
              <p className='text-foreground/70 leading-relaxed'>
                Behind every project and business are real people with real
                stories - the craftspeople, entrepreneurs, and community members
                who make it all possible.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Award className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Legacy Preservation
              </h3>
              <p className='text-foreground/70 leading-relaxed'>
                These stories deserve to be preserved for future generations,
                showcasing the innovation, dedication, and community spirit that
                built our world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Our <span className='text-accent'>Values</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-card rounded-xl p-6 metallic-border text-center'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Target className='w-6 h-6 text-primary' />
              </div>
              <h3 className='font-bold text-foreground mb-2'>Excellence</h3>
              <p className='text-foreground/70 text-sm'>
                We strive for the highest quality in everything we do, from
                documentation to storytelling.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border text-center'>
              <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Heart className='w-6 h-6 text-accent' />
              </div>
              <h3 className='font-bold text-foreground mb-2'>Authenticity</h3>
              <p className='text-foreground/70 text-sm'>
                We capture real stories with genuine emotion, preserving the
                authentic human experience.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border text-center'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Users className='w-6 h-6 text-primary' />
              </div>
              <h3 className='font-bold text-foreground mb-2'>Community</h3>
              <p className='text-foreground/70 text-sm'>
                We believe in the power of community and the importance of
                celebrating local achievements.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border text-center'>
              <div className='w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Building2 className='w-6 h-6 text-accent' />
              </div>
              <h3 className='font-bold text-foreground mb-2'>Innovation</h3>
              <p className='text-foreground/70 text-sm'>
                We use cutting-edge technology to create immersive experiences
                and lasting digital legacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
