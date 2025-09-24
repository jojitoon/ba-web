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
    <section className='py-20 bg-card/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 sm:mb-16 px-4 sm:px-0'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6'>
            What Our <span className='text-primary'>Clients Say</span>
          </h2>
          <p className='text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto'>
            Hear from construction professionals and business owners who have
            transformed their projects and stories with Built Ancestry.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className='bg-card rounded-xl p-4 sm:p-6 metallic-border hover:metallic-glow transition-all duration-300 relative'
            >
              {/* Quote Icon */}
              <div className='absolute top-4 right-4'>
                <Quote className='w-8 h-8 text-primary/20' />
              </div>

              {/* Rating */}
              <div className='flex items-center space-x-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 text-primary fill-current' />
                ))}
              </div>

              {/* Content */}
              <p className='text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 leading-relaxed'>
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className='border-t border-border pt-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-semibold text-foreground'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm text-foreground/60'>
                      {testimonial.role}
                    </p>
                    <p className='text-sm text-primary'>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className='mt-2'>
                  <span className='text-xs text-foreground/50 bg-secondary px-2 py-1 rounded'>
                    {testimonial.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center'>
          <div className='bg-card/50 rounded-lg p-4 sm:p-6 metallic-border'>
            <div className='text-2xl sm:text-3xl font-bold text-primary mb-2'>
              98%
            </div>
            <div className='text-sm sm:text-base text-foreground/70'>
              Client Satisfaction
            </div>
          </div>
          <div className='bg-card/50 rounded-lg p-4 sm:p-6 metallic-border'>
            <div className='text-2xl sm:text-3xl font-bold text-accent mb-2'>
              500+
            </div>
            <div className='text-sm sm:text-base text-foreground/70'>
              Projects Completed
            </div>
          </div>
          <div className='bg-card/50 rounded-lg p-4 sm:p-6 metallic-border'>
            <div className='text-2xl sm:text-3xl font-bold text-primary mb-2'>
              50+
            </div>
            <div className='text-sm sm:text-base text-foreground/70'>
              Cities Covered
            </div>
          </div>
          <div className='bg-card/50 rounded-lg p-4 sm:p-6 metallic-border'>
            <div className='text-2xl sm:text-3xl font-bold text-accent mb-2'>
              24/7
            </div>
            <div className='text-sm sm:text-base text-foreground/70'>
              Support Available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
