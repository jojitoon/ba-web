'use client';

import Link from 'next/link';
import { Play, ArrowRight, Building2, Video, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className='relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20'>
      {/* Subtle Background Pattern */}
      <div className='absolute inset-0 z-0'>
        <div className='w-full h-full bg-background architectural-grid opacity-30'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-[1920px] mx-auto px-6 lg:px-12 w-full'>
        <div className='max-w-7xl mx-auto'>
          {/* Editorial Layout */}
          <div className='grid lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
            {/* Main Content - Left Side */}
            <div className='lg:col-span-7 space-y-8'>
              {/* Category Label */}
              <div className='flex items-center space-x-4 mt-20 md:mt-0'>
                <div className='h-px w-16 bg-foreground'></div>
                <span className='text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60'>
                  Legacy Documentation
                </span>
              </div>

              {/* Main Headline */}
              <h1 className='magazine-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1.05]'>
                Preserving Legacies in{' '}
                <span className='italic'>Construction</span> &{' '}
                <span className='italic'>Business</span>
              </h1>

              {/* Subtitle */}
              <p className='editorial-text text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-2xl leading-relaxed'>
                Capture, document, and showcase every stage of your construction
                projects and business stories with immersive visuals, 3D models,
                virtual tours, and team interviews.
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Link
                  href='/projects'
                  className='group inline-flex items-center justify-center space-x-3 bg-foreground text-background px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground/90 transition-all duration-300'
                >
                  <Building2 className='w-5 h-5' />
                  <span>Explore Projects</span>
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </Link>

                <Link
                  href='/business-stories'
                  className='group inline-flex items-center justify-center space-x-3 border-2 border-foreground text-foreground px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300'
                >
                  <Video className='w-5 h-5' />
                  <span>Watch Stories</span>
                  <Play className='w-4 h-4 group-hover:scale-110 transition-transform' />
                </Link>
              </div>
            </div>

            {/* Stats Sidebar - Right Side */}
            <div className='lg:col-span-5'>
              <div className='bg-secondary/30 p-8 lg:p-12 space-y-8 border-l-4 border-foreground'>
                <div className='flex items-center space-x-3'>
                  <TrendingUp className='w-6 h-6 text-foreground/60' />
                  <h3 className='text-sm uppercase tracking-wider font-semibold text-foreground/60'>
                    By The Numbers
                  </h3>
                </div>

                <div className='space-y-6'>
                  <div>
                    <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-2'>
                      500+
                    </div>
                    <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                      Projects Documented
                    </div>
                  </div>

                  <div className='h-px bg-border'></div>

                  <div>
                    <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-2'>
                      100+
                    </div>
                    <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                      Business Stories
                    </div>
                  </div>

                  <div className='h-px bg-border'></div>

                  <div>
                    <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-2'>
                      50+
                    </div>
                    <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                      Cities Covered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='flex flex-col items-center space-y-2'>
          <span className='text-xs uppercase tracking-wider text-foreground/40 font-medium'>
            Scroll
          </span>
          <div className='w-px h-12 bg-foreground/20 relative'>
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-foreground/40 animate-pulse'></div>
          </div>
        </div>
      </div>
    </section>
  );
}
