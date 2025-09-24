'use client';

import Link from 'next/link';
import { Building2, Calendar, MapPin, ArrowRight } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'Downtown Office Complex',
    location: 'New York, NY',
    date: '2024',
    image: '/api/placeholder/400/300',
    description:
      'A 50-story mixed-use development featuring sustainable design and cutting-edge technology.',
    timeline: '24 months',
    team: '150+ workers',
  },
  {
    id: 2,
    title: 'Residential Tower',
    location: 'Los Angeles, CA',
    date: '2024',
    image: '/api/placeholder/400/300',
    description:
      'Luxury residential complex with panoramic city views and premium amenities.',
    timeline: '18 months',
    team: '200+ workers',
  },
  {
    id: 3,
    title: 'Industrial Facility',
    location: 'Houston, TX',
    date: '2023',
    image: '/api/placeholder/400/300',
    description:
      'State-of-the-art manufacturing facility with advanced automation systems.',
    timeline: '36 months',
    team: '300+ workers',
  },
];

export default function FeaturedProjects() {
  return (
    <section className='py-20 bg-card/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-16 px-4 sm:px-0'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6'>
            Featured <span className='text-primary'>Construction Projects</span>
          </h2>
          <p className='text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto'>
            Explore our portfolio of documented construction projects, from
            groundbreaking to completion, showcasing the incredible work of
            construction teams across the nation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12'>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className='group bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300'
            >
              {/* Project Image */}
              <div className='relative h-64 overflow-hidden'>
                <div className='w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                  <Building2 className='w-16 h-16 text-primary/50' />
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>
                <div className='absolute bottom-4 left-4 right-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full'>
                      {project.timeline}
                    </span>
                    <span className='text-sm text-foreground/70'>
                      {project.team}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className='p-4 sm:p-6'>
                <div className='flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm text-foreground/60 mb-2'>
                  <div className='flex items-center space-x-2'>
                    <MapPin className='w-4 h-4' />
                    <span>{project.location}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='w-4 h-4' />
                    <span>{project.date}</span>
                  </div>
                </div>

                <h3 className='text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                  {project.title}
                </h3>

                <p className='text-sm sm:text-base text-foreground/70 mb-4 line-clamp-3'>
                  {project.description}
                </p>

                <Link
                  href={`/projects/${project.id}`}
                  className='inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base'
                >
                  <span>View Project Timeline</span>
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className='text-center'>
          <Link
            href='/projects'
            className='inline-flex items-center space-x-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 metallic-glow'
          >
            <Building2 className='w-6 h-6' />
            <span>View All Projects</span>
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </section>
  );
}
