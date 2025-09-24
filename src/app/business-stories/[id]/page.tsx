'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

// Mock data - in a real app, this would come from an API
const businessStories = {
  1: {
    id: 1,
    title: 'The Family Bakery',
    business: "Mama Rosa's Bakery",
    location: 'Brooklyn, NY',
    duration: '45 min',
    rating: 4.9,
    year: '2024',
    founded: '1952',
    employees: '12',
    category: 'Food & Beverage',
    description:
      'Three generations of bakers preserving traditional recipes while embracing modern innovation.',
    fullDescription: `Mama Rosa's Bakery has been a cornerstone of the Brooklyn community for over 70 years. Founded by Rosa Martinez in 1952, this family business has weathered economic storms, neighborhood changes, and the challenges of modern competition while maintaining its commitment to authentic, handcrafted baked goods.

The documentary follows the Martinez family through their daily operations, from the pre-dawn hours when the ovens are fired up, to the evening when the last customer leaves with a warm loaf of bread. We meet Rosa's daughter Maria, who took over in 1985, and her son Carlos, who represents the third generation and brings modern business practices while honoring traditional methods.

Through intimate interviews and behind-the-scenes footage, we discover how this small bakery has become more than just a business - it's a gathering place for the community, a keeper of cultural traditions, and a testament to the power of family and perseverance.`,
    videoUrl: '/api/placeholder/video',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    milestones: [
      {
        year: '1952',
        title: 'Bakery Founded',
        description:
          "Rosa Martinez opens Mama Rosa's Bakery with a small loan and big dreams.",
      },
      {
        year: '1985',
        title: 'Second Generation',
        description:
          'Maria Martinez takes over the business, expanding the menu and modernizing operations.',
      },
      {
        year: '2010',
        title: 'Third Generation',
        description:
          'Carlos Martinez joins the business, bringing digital marketing and online ordering.',
      },
      {
        year: '2024',
        title: 'Documentary Release',
        description:
          'Built Ancestry documents the family story for future generations.',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Regular Customer',
        content:
          "I've been coming to Mama Rosa's since I was a child. The bread is amazing, but it's the family atmosphere that keeps me coming back.",
      },
      {
        name: 'Michael Chen',
        role: 'Local Business Owner',
        content:
          "Mama Rosa's is more than a bakery - it's the heart of our neighborhood. They support local events and always give back to the community.",
      },
    ],
    qrCode: '/api/placeholder/qr-code',
    supportLinks: {
      website: 'https://mamarosasbakery.com',
      phone: '(555) 123-4567',
      address: '123 Main Street, Brooklyn, NY 11201',
    },
  },
  2: {
    id: 2,
    title: 'The Corner Hardware Store',
    business: "Johnson's Hardware",
    location: 'Austin, TX',
    duration: '38 min',
    rating: 4.8,
    year: '2024',
    founded: '1978',
    employees: '8',
    category: 'Retail',
    description:
      'From fixing leaky faucets to building communities - the story of a neighborhood institution.',
    fullDescription: `Johnson's Hardware has been serving the Austin community for over 45 years. What started as a small family business has become an essential part of the neighborhood, known not just for its extensive inventory of tools and supplies, but for the personal service and expertise that owner Tom Johnson and his team provide.

The documentary explores how this traditional hardware store has adapted to the digital age while maintaining its old-fashioned values. From helping customers with DIY projects to supporting local contractors, Johnson's Hardware represents the kind of community-focused business that makes neighborhoods thrive.

Through interviews with long-time customers, employees, and the Johnson family, we learn about the challenges of running a small business in an era of big-box stores and online shopping, and how personal relationships and local knowledge continue to be their greatest assets.`,
    videoUrl: '/api/placeholder/video',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    milestones: [
      {
        year: '1978',
        title: 'Store Opens',
        description:
          'Tom Johnson opens the hardware store with a focus on personal service.',
      },
      {
        year: '1995',
        title: 'Expansion',
        description:
          'The store expands to include a larger showroom and more inventory.',
      },
      {
        year: '2015',
        title: 'Digital Integration',
        description:
          'Online ordering and inventory management systems are introduced.',
      },
      {
        year: '2024',
        title: 'Documentary',
        description:
          'The Johnson family story is preserved for future generations.',
      },
    ],
    testimonials: [
      {
        name: 'Lisa Rodriguez',
        role: 'Homeowner',
        content:
          'Tom and his team have helped me with countless home improvement projects. Their knowledge and patience are unmatched.',
      },
      {
        name: 'David Park',
        role: 'Contractor',
        content:
          "Johnson's Hardware is my go-to supplier. They always have what I need, and if they don't, they'll get it for me.",
      },
    ],
    qrCode: '/api/placeholder/qr-code',
    supportLinks: {
      website: 'https://johnsonshardware.com',
      phone: '(555) 234-5678',
      address: '456 Oak Street, Austin, TX 78701',
    },
  },
};

export default function BusinessStoryPage() {
  const params = useParams();
  const storyId = params.id as string;
  const story = businessStories[storyId as keyof typeof businessStories];

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
                    {story.rating}
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
                  <span>Founded {story.founded}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Users className='w-4 h-4' />
                  <span>{story.employees} employees</span>
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
                  <span>{story.duration}</span>
                </div>
                <span>{story.year}</span>
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
                {story.fullDescription}
              </p>

              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Timeline
              </h3>
              <div className='space-y-6'>
                {story.milestones.map((milestone, index) => (
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
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Customer Testimonials
              </h3>
              <div className='space-y-6'>
                {story.testimonials.map((testimonial, index) => (
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
                ))}
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
            {story.images.map((image, index) => (
              <div
                key={index}
                className='bg-card rounded-lg overflow-hidden metallic-border'
              >
                <div className='w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
                  <div className='text-foreground/50'>Photo {index + 1}</div>
                </div>
              </div>
            ))}
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
                  {story.supportLinks.address}
                </p>
              </div>
              <div className='bg-background rounded-lg p-6'>
                <ExternalLink className='w-8 h-8 text-accent mx-auto mb-3' />
                <h3 className='font-semibold text-foreground mb-2'>Website</h3>
                <a
                  href={story.supportLinks.website}
                  className='text-sm text-accent hover:text-accent/80'
                >
                  Visit Website
                </a>
              </div>
              <div className='bg-background rounded-lg p-6'>
                <Users className='w-8 h-8 text-primary mx-auto mb-3' />
                <h3 className='font-semibold text-foreground mb-2'>Call Us</h3>
                <a
                  href={`tel:${story.supportLinks.phone}`}
                  className='text-sm text-foreground/70 hover:text-primary'
                >
                  {story.supportLinks.phone}
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
