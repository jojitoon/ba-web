'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import {
  Building2,
  Calendar,
  MapPin,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import { useState } from 'react';

const allProjects = [
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
    category: 'Commercial',
    status: 'Completed',
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
    category: 'Residential',
    status: 'Completed',
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
    category: 'Industrial',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Hospital Expansion',
    location: 'Chicago, IL',
    date: '2024',
    image: '/api/placeholder/400/300',
    description:
      'Modern healthcare facility expansion with advanced medical technology.',
    timeline: '30 months',
    team: '250+ workers',
    category: 'Healthcare',
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'University Campus',
    location: 'Boston, MA',
    date: '2023',
    image: '/api/placeholder/400/300',
    description:
      'New academic buildings and student housing for growing university.',
    timeline: '42 months',
    team: '400+ workers',
    category: 'Education',
    status: 'Completed',
  },
  {
    id: 6,
    title: 'Retail Complex',
    location: 'Miami, FL',
    date: '2024',
    image: '/api/placeholder/400/300',
    description:
      'Mixed-use retail and entertainment complex with modern design.',
    timeline: '20 months',
    team: '180+ workers',
    category: 'Retail',
    status: 'In Progress',
  },
];

const categories = [
  'All',
  'Commercial',
  'Residential',
  'Industrial',
  'Healthcare',
  'Education',
  'Retail',
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
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
              Construction <span className='text-primary'>Projects</span>
            </h1>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Explore our comprehensive portfolio of documented construction
              projects, from groundbreaking to completion, showcasing the
              incredible work of construction teams across the nation.
            </p>
          </div>

          {/* Search and Filter */}
          <div className='flex flex-col md:flex-row gap-4 justify-center items-center mb-8'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5' />
              <input
                type='text'
                placeholder='Search projects...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <Filter className='w-5 h-5 text-foreground/50' />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
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
              <div className='text-2xl font-bold text-primary mb-1'>
                {allProjects.length}
              </div>
              <div className='text-foreground/70 text-sm'>Total Projects</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-accent mb-1'>
                {allProjects.filter((p) => p.status === 'Completed').length}
              </div>
              <div className='text-foreground/70 text-sm'>Completed</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-primary mb-1'>
                {allProjects.filter((p) => p.status === 'In Progress').length}
              </div>
              <div className='text-foreground/70 text-sm'>In Progress</div>
            </div>
            <div className='bg-card/50 rounded-lg p-4 metallic-border'>
              <div className='text-2xl font-bold text-accent mb-1'>50+</div>
              <div className='text-foreground/70 text-sm'>Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project) => (
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

                  {/* Status Badge */}
                  <div className='absolute top-4 right-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-accent/20 text-accent'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Info */}
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
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-xs text-accent bg-accent/10 px-2 py-1 rounded'>
                      {project.category}
                    </span>
                    <div className='flex items-center space-x-2 text-sm text-foreground/60'>
                      <MapPin className='w-4 h-4' />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                    {project.title}
                  </h3>

                  <p className='text-foreground/70 mb-4 line-clamp-3'>
                    {project.description}
                  </p>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 text-sm text-foreground/60'>
                      <Calendar className='w-4 h-4' />
                      <span>{project.date}</span>
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className='inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors'
                    >
                      <span>View Timeline</span>
                      <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-16'>
              <Building2 className='w-16 h-16 text-foreground/30 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-foreground/70 mb-2'>
                No projects found
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
