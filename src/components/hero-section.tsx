'use client';

import Link from 'next/link';
import { Play, ArrowRight, Building2, Video } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Video/Images */}
      <div className='absolute inset-0 z-0'>
        <div className='w-full h-full bg-gradient-to-br from-background via-background/90 to-background/80 construction-texture'>
          {/* Placeholder for looping construction/business clips */}
          <div
            className='absolute inset-0 opacity-20'
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='max-w-4xl mx-auto'>
          {/* Main Tagline */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-4 sm:px-0'>
            Preserving Legacies in{' '}
            <span className='text-primary'>Construction</span> &{' '}
            <span className='text-accent'>Business</span>
          </h1>

          {/* Subtitle */}
          <p className='text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0'>
            Capture, document, and showcase every stage of your construction
            projects and business stories with immersive visuals, 3D models,
            virtual tours, and team interviews.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0'>
            <Link
              href='/projects'
              className='group bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2 sm:space-x-3 metallic-glow w-full sm:w-auto justify-center'
            >
              <Building2 className='w-5 h-5 sm:w-6 sm:h-6' />
              <span>Explore Projects</span>
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
            </Link>

            <Link
              href='/business-stories'
              className='group bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-accent/90 transition-all duration-300 flex items-center space-x-2 sm:space-x-3 metallic-glow w-full sm:w-auto justify-center'
            >
              <Video className='w-5 h-5 sm:w-6 sm:h-6' />
              <span>Watch Business Stories</span>
              <Play className='w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform' />
            </Link>
          </div>

          {/* Stats or Features Preview */}
          <div className='mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0'>
            <div className='text-center'>
              <div className='text-2xl sm:text-3xl font-bold text-primary mb-2'>
                500+
              </div>
              <div className='text-sm sm:text-base text-foreground/70'>
                Projects Documented
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl sm:text-3xl font-bold text-accent mb-2'>
                100+
              </div>
              <div className='text-sm sm:text-base text-foreground/70'>
                Business Stories
              </div>
            </div>
            <div className='text-center'>
              <div className='text-2xl sm:text-3xl font-bold text-primary mb-2'>
                50+
              </div>
              <div className='text-sm sm:text-base text-foreground/70'>
                Cities Covered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'>
        <div className='w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-primary rounded-full mt-2 animate-bounce'></div>
        </div>
      </div>
    </section>
  );
}
