'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

// Mock data - in a real app, this would come from an API
const projects: Record<string, any> = {
  1: {
    id: 1,
    title: 'Downtown Office Complex',
    location: 'New York, NY',
    date: '2024',
    timeline: '24 months',
    team: '150+ workers',
    category: 'Commercial',
    status: 'Completed',
    description:
      'A 50-story mixed-use development featuring sustainable design and cutting-edge technology.',
    fullDescription: `The Downtown Office Complex represents a new era of sustainable urban development in the heart of New York City. This 50-story mixed-use development combines cutting-edge technology with environmentally conscious design, creating a landmark that will serve the community for generations to come.

The project features state-of-the-art office spaces, retail areas, and public amenities, all designed with LEED Platinum certification in mind. The building incorporates advanced energy systems, green roofs, and innovative water management solutions that set new standards for urban sustainability.

Throughout the construction process, our team documented every phase of development, from the initial groundbreaking ceremony to the final handshake. The project timeline showcases the incredible work of over 150 skilled professionals who brought this vision to life.`,
    client: 'Metro Development Group',
    architect: 'Foster + Partners',
    contractor: 'Turner Construction',
    budget: '$850M',
    squareFootage: '2.5M sq ft',
    floors: '50',
    startDate: 'January 2022',
    completionDate: 'December 2023',
    timelines: [
      {
        phase: 'Planning & Design',
        startDate: '2021',
        endDate: '2022',
        description:
          'Architectural design, engineering, and permit acquisition',
        status: 'completed',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      },
      {
        phase: 'Foundation & Structure',
        startDate: 'January 2022',
        endDate: 'August 2022',
        description:
          'Excavation, foundation work, and steel frame construction',
        status: 'completed',
        images: [
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
        ],
      },
      {
        phase: 'Enclosure & MEP',
        startDate: 'September 2022',
        endDate: 'June 2023',
        description:
          'Exterior facade, mechanical, electrical, and plumbing systems',
        status: 'completed',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      },
      {
        phase: 'Interior & Finishing',
        startDate: 'July 2023',
        endDate: 'November 2023',
        description: 'Interior construction, finishes, and tenant improvements',
        status: 'completed',
        images: [
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
        ],
      },
      {
        phase: 'Final Inspections',
        startDate: 'December 2023',
        endDate: 'December 2023',
        description: 'Final inspections, testing, and project handover',
        status: 'completed',
        images: ['/api/placeholder/400/300'],
      },
    ],
    teamInterviews: [
      {
        name: 'Sarah Johnson',
        role: 'Project Manager',
        company: 'Turner Construction',
        quote:
          'This project challenged us to push the boundaries of sustainable construction while maintaining the highest quality standards.',
        image: '/api/placeholder/200/200',
      },
      {
        name: 'Michael Chen',
        role: 'Lead Architect',
        company: 'Foster + Partners',
        quote:
          'The Downtown Office Complex represents our vision for the future of urban development - sustainable, beautiful, and functional.',
        image: '/api/placeholder/200/200',
      },
      {
        name: 'David Rodriguez',
        role: 'Site Supervisor',
        company: 'Turner Construction',
        quote:
          'Working with such a talented team on this landmark project has been the highlight of my career.',
        image: '/api/placeholder/200/200',
      },
    ],
    keyFeatures: [
      'LEED Platinum Certification',
      'Advanced Energy Management System',
      'Green Roof and Rainwater Collection',
      'Smart Building Technology',
      'Public Art Integration',
      'Accessible Design Throughout',
    ],
    statistics: [
      { label: 'Total Budget', value: '$850M' },
      { label: 'Square Footage', value: '2.5M sq ft' },
      { label: 'Floors', value: '50' },
      { label: 'Construction Time', value: '24 months' },
      { label: 'Workers Employed', value: '150+' },
      { label: 'LEED Points', value: '95' },
    ],
    media: {
      photos: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
      ],
      videos: [
        {
          title: 'Construction Time-lapse',
          duration: '3:45',
          thumbnail: '/api/placeholder/400/300',
        },
        {
          title: 'Drone Aerial Tour',
          duration: '2:30',
          thumbnail: '/api/placeholder/400/300',
        },
        {
          title: 'Team Interviews',
          duration: '8:15',
          thumbnail: '/api/placeholder/400/300',
        },
      ],
    },
  },
  2: {
    id: 2,
    title: 'Residential Tower',
    location: 'Los Angeles, CA',
    date: '2024',
    timeline: '18 months',
    team: '200+ workers',
    category: 'Residential',
    status: 'Completed',
    description:
      'Luxury residential complex with panoramic city views and premium amenities.',
    fullDescription: `The Residential Tower in Los Angeles represents the pinnacle of luxury living in the heart of the city. This stunning 35-story residential complex offers panoramic views of the Los Angeles skyline and the Pacific Ocean, combined with world-class amenities and sustainable design.

The project features 200 luxury condominiums, each designed with modern finishes and smart home technology. Residents enjoy access to a rooftop pool, fitness center, concierge services, and private parking. The building's design emphasizes natural light and outdoor living spaces, creating a seamless connection between indoor and outdoor environments.

The construction timeline showcases the precision and expertise required to build such a complex structure in a dense urban environment, with careful attention to minimizing disruption to the surrounding community.`,
    client: 'Luxury Living Developments',
    architect: 'Gensler',
    contractor: 'PCL Construction',
    budget: '$450M',
    squareFootage: '1.8M sq ft',
    floors: '35',
    startDate: 'March 2022',
    completionDate: 'September 2023',
    timelines: [
      {
        phase: 'Site Preparation',
        startDate: 'March 2022',
        endDate: 'May 2022',
        description: 'Demolition, site clearing, and foundation preparation',
        status: 'completed',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      },
      {
        phase: 'Foundation & Core',
        startDate: 'June 2022',
        endDate: 'October 2022',
        description: 'Foundation construction and building core erection',
        status: 'completed',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      },
      {
        phase: 'Superstructure',
        startDate: 'November 2022',
        endDate: 'April 2023',
        description: 'Steel frame construction and floor slab installation',
        status: 'completed',
        images: [
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
          '/api/placeholder/400/300',
        ],
      },
      {
        phase: 'Enclosure & Finishes',
        startDate: 'May 2023',
        endDate: 'August 2023',
        description: 'Exterior facade, interior finishes, and amenity spaces',
        status: 'completed',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      },
      {
        phase: 'Final Completion',
        startDate: 'September 2023',
        endDate: 'September 2023',
        description: 'Final inspections, testing, and resident move-ins',
        status: 'completed',
        images: ['/api/placeholder/400/300'],
      },
    ],
    teamInterviews: [
      {
        name: 'Jennifer Lee',
        role: 'Project Director',
        company: 'PCL Construction',
        quote:
          'This residential tower sets a new standard for luxury living in Los Angeles, combining stunning design with exceptional quality.',
        image: '/api/placeholder/200/200',
      },
      {
        name: 'Robert Kim',
        role: 'Design Principal',
        company: 'Gensler',
        quote:
          'We wanted to create a building that would become an iconic part of the Los Angeles skyline while providing residents with an unparalleled living experience.',
        image: '/api/placeholder/200/200',
      },
    ],
    keyFeatures: [
      'Panoramic City and Ocean Views',
      'Rooftop Pool and Lounge',
      'Smart Home Technology',
      'Private Parking Garage',
      'Concierge Services',
      'Fitness Center and Spa',
    ],
    statistics: [
      { label: 'Total Budget', value: '$450M' },
      { label: 'Square Footage', value: '1.8M sq ft' },
      { label: 'Floors', value: '35' },
      { label: 'Construction Time', value: '18 months' },
      { label: 'Workers Employed', value: '200+' },
      { label: 'Residential Units', value: '200' },
    ],
    media: {
      photos: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
      ],
      videos: [
        {
          title: 'Construction Progress',
          duration: '4:20',
          thumbnail: '/api/placeholder/400/300',
        },
        {
          title: 'Aerial Drone Footage',
          duration: '3:15',
          thumbnail: '/api/placeholder/400/300',
        },
      ],
    },
  },
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projects[projectId];

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
                    project.status === 'Completed'
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
                  <span>{project.date}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='w-4 h-4' />
                  <span>{project.team}</span>
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
                    {project.timeline}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Budget:</span>
                  <p className='font-semibold text-foreground'>
                    {project.budget}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Square Footage:</span>
                  <p className='font-semibold text-foreground'>
                    {project.squareFootage}
                  </p>
                </div>
                <div>
                  <span className='text-foreground/60'>Floors:</span>
                  <p className='font-semibold text-foreground'>
                    {project.floors}
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
                {project.fullDescription}
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>Client</h3>
                  <p className='text-foreground/70'>{project.client}</p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Architect
                  </h3>
                  <p className='text-foreground/70'>{project.architect}</p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Contractor
                  </h3>
                  <p className='text-foreground/70'>{project.contractor}</p>
                </div>
                <div className='bg-card rounded-lg p-6 metallic-border'>
                  <h3 className='font-semibold text-foreground mb-2'>
                    Duration
                  </h3>
                  <p className='text-foreground/70'>
                    {project.startDate} - {project.completionDate}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Key Features
              </h3>
              <div className='space-y-4'>
                {project.keyFeatures.map((feature: string, index: number) => (
                  <div key={index} className='flex items-center space-x-3'>
                    <CheckCircle className='w-5 h-5 text-primary flex-shrink-0' />
                    <span className='text-foreground/80'>{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className='text-2xl font-bold text-foreground mb-6 mt-8'>
                Project Statistics
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                {project.statistics.map(
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
            {project.timelines.map((phase: any, index: number) => (
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
                  {phase.images.map((image: string, imgIndex: number) => (
                    <div
                      key={imgIndex}
                      className='bg-background rounded-lg overflow-hidden'
                    >
                      <div className='w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                        <Camera className='w-8 h-8 text-primary/50' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            {project.teamInterviews.map((member: any, index: number) => (
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
            ))}
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
              {project.media.photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  className='bg-card rounded-lg overflow-hidden metallic-border'
                >
                  <div className='w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                    <Camera className='w-12 h-12 text-primary/50' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <h3 className='text-2xl font-bold text-foreground mb-6'>Videos</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {project.media.videos.map((video: any, index: number) => (
                <div
                  key={index}
                  className='bg-card rounded-lg overflow-hidden metallic-border'
                >
                  <div className='w-full h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative'>
                    <div className='w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center'>
                      <Play className='w-8 h-8 text-accent-foreground ml-1' />
                    </div>
                    <div className='absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs text-foreground'>
                      {video.duration}
                    </div>
                  </div>
                  <div className='p-4'>
                    <h4 className='font-semibold text-foreground'>
                      {video.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
