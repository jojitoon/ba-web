'use client';

import Link from 'next/link';
import { Building2, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  budget?: string;
  timeline?: string;
  team?: string;
  media: {
    photos: string[];
    videos: string[];
  };
  createdAt: number;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Take only the first 3 projects for featured display
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className='py-24 bg-background'>
      <div className='max-w-[1920px] mx-auto px-6 lg:px-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <div className='mb-16'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='h-px w-16 bg-foreground'></div>
              <span className='text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60'>
                Featured Portfolio
              </span>
            </div>
            <h2 className='magazine-headline text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-3xl'>
              Construction <span className='italic'>Projects</span>
            </h2>
            <p className='editorial-text text-lg lg:text-xl text-foreground/70 max-w-2xl'>
              Explore our portfolio of documented construction projects, from
              groundbreaking to completion, showcasing the incredible work of
              construction teams across the nation.
            </p>
          </div>

          {/* Projects Grid - Editorial Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16'>
            {featuredProjects.map((project, index) => (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className='group editorial-card block'
              >
                {/* Project Image */}
                <div className='relative h-80 overflow-hidden mb-6 bg-secondary/20'>
                  <div className='w-full h-full bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center'>
                    <Building2 className='w-20 h-20 text-foreground/20' />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent'></div>
                  
                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className='featured-badge'>Featured</div>
                  )}
                  
                  {/* Project Meta */}
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='text-xs font-semibold text-foreground bg-background/90 px-3 py-1.5 uppercase tracking-wider'>
                        {project.timeline || 'Ongoing'}
                      </span>
                      <span className='text-xs text-foreground/70 bg-background/90 px-3 py-1.5'>
                        {project.team || 'Professional Team'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className='space-y-4 px-6 pb-6'>
                  <div className='flex items-center space-x-4 text-xs text-foreground/50 uppercase tracking-wider'>
                    <div className='flex items-center space-x-2'>
                      <MapPin className='w-3 h-3' />
                      <span>{project.location}</span>
                    </div>
                    <span>•</span>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='w-3 h-3' />
                      <span>{new Date(project.createdAt).getFullYear()}</span>
                    </div>
                  </div>

                  <h3 className='text-2xl lg:text-3xl font-serif font-bold text-foreground group-hover:opacity-70 transition-opacity leading-tight'>
                    {project.title}
                  </h3>

                  <p className='editorial-text text-foreground/70 line-clamp-3'>
                    {project.description}
                  </p>

                  <div className='flex items-center space-x-2 text-sm font-semibold text-foreground uppercase tracking-wider pt-2'>
                    <span>View Project</span>
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Projects CTA */}
          <div className='text-center border-t border-border pt-12'>
            <Link
              href='/projects'
              className='group inline-flex items-center space-x-3 border-2 border-foreground text-foreground px-10 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300'
            >
              <Building2 className='w-5 h-5' />
              <span>View All Projects</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
