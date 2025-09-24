'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import {
  Play,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Search,
  Star,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';

const allStories = [
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
    category: 'Food & Beverage',
    year: '2024',
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
    category: 'Retail',
    year: '2024',
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
    category: 'Manufacturing',
    year: '2023',
  },
  {
    id: 4,
    title: 'The Neighborhood Bookstore',
    business: 'Pages & Prose',
    location: 'Seattle, WA',
    duration: '41 min',
    rating: 4.7,
    image: '/api/placeholder/400/300',
    description:
      'A literary haven that has fostered community and learning for over three decades.',
    founded: '1990',
    employees: '6',
    category: 'Retail',
    year: '2024',
  },
  {
    id: 5,
    title: 'The Local Brewery',
    business: 'Hometown Hops',
    location: 'Denver, CO',
    duration: '48 min',
    rating: 4.8,
    image: '/api/placeholder/400/300',
    description:
      'From garage experiment to community cornerstone - the story of craft beer passion.',
    founded: '2005',
    employees: '25',
    category: 'Food & Beverage',
    year: '2023',
  },
  {
    id: 6,
    title: 'The Family Farm',
    business: 'Green Acres Organic',
    location: 'Iowa',
    duration: '55 min',
    rating: 4.9,
    image: '/api/placeholder/400/300',
    description:
      'Five generations of sustainable farming and community connection.',
    founded: '1920',
    employees: '18',
    category: 'Agriculture',
    year: '2024',
  },
];

const categories = [
  'All',
  'Food & Beverage',
  'Retail',
  'Manufacturing',
  'Agriculture',
  'Services',
];

export default function BusinessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = allStories.filter((story) => {
    const matchesCategory =
      selectedCategory === 'All' || story.category === selectedCategory;
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      {/* Page Header */}
      <section className='pt-20 pb-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
              Business <span className='text-accent'>Stories</span>
            </h1>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Discover the inspiring stories of local businesses, their
              founders, and the communities they serve. Each documentary
              captures the heart and soul of American entrepreneurship.
            </p>
          </div>

          {/* Search and Filter */}
          <div className='flex flex-col md:flex-row gap-4 justify-center items-center mb-8'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <input
                type='text'
                placeholder='Search stories...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-64'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <Filter className='w-5 h-5 text-foreground/50' />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 text-center'>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-accent mb-1'>
                {allStories.length}
              </div>
              <div className='text-foreground/70 text-sm'>Documentaries</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-primary mb-1'>
                {allStories.reduce((acc, story) => acc + story.rating, 0) /
                  allStories.length}
              </div>
              <div className='text-foreground/70 text-sm'>Avg Rating</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-accent mb-1'>100+</div>
              <div className='text-foreground/70 text-sm'>Hours of Content</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-primary mb-1'>25+</div>
              <div className='text-foreground/70 text-sm'>States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredStories.map((story) => (
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
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-xs text-accent bg-accent/10 px-2 py-1 rounded'>
                      {story.category}
                    </span>
                    <div className='flex items-center space-x-2 text-sm text-foreground/60'>
                      <Calendar className='w-4 h-4' />
                      <span>{story.year}</span>
                    </div>
                  </div>

                  <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors'>
                    {story.title}
                  </h3>

                  <p className='text-sm text-foreground/60 mb-3'>
                    {story.business}
                  </p>

                  <p className='text-foreground/70 mb-4 line-clamp-3'>
                    {story.description}
                  </p>

                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-4 text-sm text-foreground/60'>
                      <div className='flex items-center space-x-1'>
                        <Users className='w-4 h-4' />
                        <span>{story.employees} employees</span>
                      </div>
                      <span>Founded {story.founded}</span>
                    </div>
                  </div>

                  <Link
                    href={`/business-stories/${story.id}`}
                    className='inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors'
                  >
                    <span>Watch Documentary</span>
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className='text-center py-16'>
              <Play className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
                No stories found
              </h3>
              <p className='text-foreground/50'>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
