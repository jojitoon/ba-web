'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'John D.',
    role: 'Contractor',
    company: 'Metro Construction',
    content:
      'Built Ancestry helped us manage our projects more efficiently, and our clients loved the visual updates! The 3D models and virtual tours have been game-changers for client presentations.',
    rating: 5,
    project: 'Downtown Office Complex',
  },
  {
    id: 2,
    name: 'Jane S.',
    role: 'Architect',
    company: 'Design Studio',
    content:
      'The ability to showcase 3D models and virtual tours of my designs has been incredible. Our clients can now truly understand the vision before construction even begins.',
    rating: 5,
    project: 'Residential Tower',
  },
  {
    id: 3,
    name: 'Maria R.',
    role: 'Business Owner',
    company: "Mama Rosa's Bakery",
    content:
      "Having our family story documented professionally was amazing. The documentary captured not just our business, but our legacy and the community we've built over three generations.",
    rating: 5,
    project: 'Business Documentary',
  },
  {
    id: 4,
    name: 'David L.',
    role: 'Project Manager',
    company: 'Industrial Solutions',
    content:
      'The timeline feature is fantastic for compliance and reporting. We can easily track progress and provide detailed documentation to stakeholders and regulatory bodies.',
    rating: 5,
    project: 'Industrial Facility',
  },
  {
    id: 5,
    name: 'Sarah K.',
    role: 'Marketing Director',
    company: 'Real Estate Group',
    content:
      'Built Ancestry has transformed how we market our projects. The immersive content helps potential buyers visualize spaces and understand the quality of our construction.',
    rating: 5,
    project: 'Luxury Development',
  },
  {
    id: 6,
    name: 'Mike T.',
    role: 'General Contractor',
    company: 'Heritage Builders',
    content:
      'The team interviews feature is brilliant. It showcases the skilled craftspeople behind our projects and helps attract top talent to our company.',
    rating: 5,
    project: 'Custom Homes',
  },
];

export default function Testimonials() {
  return (
    <section className='py-24 bg-background'>
      <div className='max-w-[1920px] mx-auto px-6 lg:px-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <div className='mb-16'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='h-px w-16 bg-foreground'></div>
              <span className='text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60'>
                Client Testimonials
              </span>
            </div>
            <h2 className='magazine-headline text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-3xl'>
              What Our <span className='italic'>Clients Say</span>
            </h2>
            <p className='editorial-text text-lg lg:text-xl text-foreground/70 max-w-2xl'>
              Hear from construction professionals and business owners who have
              transformed their projects and stories with Built Ancestry.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className='editorial-card p-8 relative'
              >
                {/* Quote Icon */}
                <div className='absolute top-6 right-6'>
                  <Quote className='w-10 h-10 text-foreground/10' />
                </div>

                {/* Rating */}
                <div className='flex items-center space-x-1 mb-6'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 text-foreground fill-current' />
                  ))}
                </div>

                {/* Content */}
                <p className='editorial-text text-foreground/80 mb-8 leading-relaxed'>
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className='border-t border-border pt-6 space-y-3'>
                  <div>
                    <h4 className='font-serif font-bold text-lg text-foreground mb-1'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm text-foreground/60 uppercase tracking-wider'>
                      {testimonial.role}
                    </p>
                    <p className='text-sm font-semibold text-foreground/80 mt-1'>
                      {testimonial.company}
                    </p>
                  </div>
                  <div>
                    <span className='text-xs text-foreground/50 bg-secondary/50 px-3 py-1.5 uppercase tracking-wider'>
                      {testimonial.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-t border-border pt-16'>
            <div className='text-center'>
              <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-3'>
                98%
              </div>
              <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                Client Satisfaction
              </div>
            </div>
            <div className='text-center'>
              <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-3'>
                500+
              </div>
              <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                Projects Completed
              </div>
            </div>
            <div className='text-center'>
              <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-3'>
                50+
              </div>
              <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                Cities Covered
              </div>
            </div>
            <div className='text-center'>
              <div className='text-5xl lg:text-6xl font-serif font-bold text-foreground mb-3'>
                24/7
              </div>
              <div className='text-sm text-foreground/60 uppercase tracking-wider'>
                Support Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
