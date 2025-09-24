'use client';

import Link from 'next/link';
import { Play, Clock, Users, ArrowRight, Star } from 'lucide-react';

const featuredStories = [
  {
    id: 1,
    title: 'The Family Bakery',
    business: "Mama Rosa's Bakery",
    location: 'Brooklyn, NY',
    duration: '45 min',
    rating: 4.9,
    image: '/api/placeholder/400/300',
    description:
      'Three generations of bakers preserving traditional recipes while embracing modern innovation.',
    founded: '1952',
    employees: '12',
  },
  {
    id: 2,
    title: 'The Corner Hardware Store',
    business: "Johnson's Hardware",
    location: 'Austin, TX',
    duration: '38 min',
    rating: 4.8,
    image: '/api/placeholder/400/300',
    description:
      'From fixing leaky faucets to building communities - the story of a neighborhood institution.',
    founded: '1978',
    employees: '8',
  },
  {
    id: 3,
    title: 'The Artisan Workshop',
    business: 'Craft & Co.',
    location: 'Portland, OR',
    duration: '52 min',
    rating: 4.9,
    image: '/api/placeholder/400/300',
    description:
      'Where traditional craftsmanship meets contemporary design in a modern workshop.',
    founded: '1985',
    employees: '15',
  },
];

export default function FeaturedStories() {
  return (
    <section className='py-20 bg-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-16 px-4 sm:px-0'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6'>
            Featured <span className='text-accent'>Business Stories</span>
          </h2>
          <p className='text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto'>
            Discover the inspiring stories of local businesses, their founders,
            and the communities they serve. Each documentary captures the heart
            and soul of American entrepreneurship.
          </p>
        </div>

        {/* Stories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12'>
          {featuredStories.map((story) => (
            <div
              key={story.id}
              className='group bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300'
            >
              {/* Story Image */}
              <div className='relative h-64 overflow-hidden'>
                <div className='w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center'>
                  <Play className='w-16 h-16 text-accent/50' />
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent'></div>

                {/* Play Button Overlay */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                    <Play className='w-8 h-8 text-accent-foreground ml-1' />
                  </div>
                </div>

                {/* Story Info */}
                <div className='absolute bottom-4 left-4 right-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Clock className='w-4 h-4 text-foreground/70' />
                      <span className='text-sm text-foreground/70'>
                        {story.duration}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Star className='w-4 h-4 text-primary fill-current' />
                      <span className='text-sm text-foreground/70'>
                        {story.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className='p-4 sm:p-6'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-2'>
                  <span className='text-sm text-accent font-medium'>
                    Founded {story.founded}
                  </span>
                  <div className='flex items-center space-x-1 text-sm text-foreground/60'>
                    <Users className='w-4 h-4' />
                    <span>{story.employees} employees</span>
                  </div>
                </div>

                <h3 className='text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors'>
                  {story.title}
                </h3>

                <p className='text-sm text-foreground/60 mb-3'>
                  {story.business}
                </p>

                <p className='text-sm sm:text-base text-foreground/70 mb-4 line-clamp-3'>
                  {story.description}
                </p>

                <Link
                  href={`/business-stories/${story.id}`}
                  className='inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors text-sm sm:text-base'
                >
                  <span>Watch Documentary</span>
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Stories CTA */}
        <div className='text-center'>
          <Link
            href='/business-stories'
            className='inline-flex items-center space-x-3 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-300 metallic-glow'
          >
            <Play className='w-6 h-6' />
            <span>View All Business Stories</span>
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </section>
  );
}
