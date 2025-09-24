'use client';

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PricingCard from '@/components/pricing-card';
import {
  Building2,
  Camera,
  Drone,
  Users,
  FileText,
  Award,
  CheckCircle,
  BarChart3,
} from 'lucide-react';

export default function ForConstructionPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-20 pb-16 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6'>
              For <span className='text-primary'>Construction Firms</span>
            </h1>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Document your projects with professional photography, 3D models,
              drone footage, and interactive timelines. Build your portfolio and
              ensure compliance with comprehensive project documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Project Documentation{' '}
              <span className='text-primary'>Services</span>
            </h2>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Comprehensive documentation services that capture every stage of
              your construction projects with professional quality and
              cutting-edge technology.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Camera className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Professional Photography
              </h3>
              <p className='text-foreground/70'>
                High-quality photos documenting every phase of construction,
                from groundbreaking to completion.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Drone className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Aerial Drone Footage
              </h3>
              <p className='text-foreground/70'>
                Stunning aerial perspectives and progress videos that showcase
                the scale and scope of your projects.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Building2 className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                3D Models & Virtual Tours
              </h3>
              <p className='text-foreground/70'>
                Interactive 3D models and virtual tours that bring your projects
                to life for clients and stakeholders.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6'>
                <Users className='w-8 h-8 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Team Interviews
              </h3>
              <p className='text-foreground/70'>
                Professional interviews with workers, engineers, and architects
                highlighting the human side of construction.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Interactive Project Timeline
              </h3>
              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <FileText className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground mb-2'>
                      Visual Progress Tracking
                    </h4>
                    <p className='text-foreground/70'>
                      Interactive timeline showing project milestones with
                      photos, videos, and key achievements.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <BarChart3 className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground mb-2'>
                      Compliance Documentation
                    </h4>
                    <p className='text-foreground/70'>
                      Comprehensive documentation for regulatory compliance,
                      safety records, and quality assurance.
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <Award className='w-6 h-6 text-primary' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground mb-2'>
                      Portfolio Building
                    </h4>
                    <p className='text-foreground/70'>
                      Professional portfolio materials that showcase your
                      expertise and attract new clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-card rounded-xl p-8 metallic-border'>
              <div className='w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center'>
                <Building2 className='w-20 h-20 text-primary/50' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-20 bg-card/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Benefits for{' '}
              <span className='text-primary'>Construction Firms</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <CheckCircle className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Compliance & Documentation
              </h3>
              <p className='text-foreground/70'>
                Meet regulatory requirements with comprehensive documentation,
                safety records, and quality assurance materials.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <Award className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Marketing & Portfolio
              </h3>
              <p className='text-foreground/70'>
                Build a professional portfolio that showcases your expertise and
                attracts new clients with stunning visuals.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <Users className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Team Recognition
              </h3>
              <p className='text-foreground/70'>
                Highlight your skilled workforce and attract top talent with
                professional team interviews and project showcases.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <BarChart3 className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Client Communication
              </h3>
              <p className='text-foreground/70'>
                Keep clients informed with real-time updates, progress reports,
                and interactive project timelines.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <Building2 className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                3D Visualization
              </h3>
              <p className='text-foreground/70'>
                Help clients visualize finished projects with 3D models and
                virtual tours before construction begins.
              </p>
            </div>

            <div className='bg-card rounded-xl p-6 metallic-border'>
              <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4'>
                <FileText className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-xl font-bold text-foreground mb-4'>
                Legacy Preservation
              </h3>
              <p className='text-foreground/70'>
                Create lasting digital records of your projects for future
                reference, training, and company history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Project Documentation <span className='text-primary'>Plans</span>
            </h2>
            <p className='text-xl text-foreground/70 max-w-3xl mx-auto'>
              Choose the documentation package that fits your project size and
              requirements.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <PricingCard
              title='Basic Documentation'
              price='$1,999'
              period='per project'
              description='Essential documentation for small to medium projects'
              features={[
                'Monthly progress photos',
                'Basic drone footage',
                'Project timeline',
                'Team interviews (2-3 people)',
                'Online project portal',
                'Basic 3D model',
                'Email support',
              ]}
              cta='Get Started'
              ctaLink='/contact?plan=basic-doc'
              accent='primary'
            />

            <PricingCard
              title='Professional Documentation'
              price='$4,999'
              period='per project'
              description='Comprehensive documentation for large commercial projects'
              features={[
                'Weekly progress photos & videos',
                'Professional drone footage',
                'Interactive project timeline',
                'Team interviews (5-8 people)',
                'Advanced 3D models',
                'Virtual tour creation',
                'Client portal & updates',
                'Priority support',
              ]}
              cta='Get Started'
              ctaLink='/contact?plan=professional-doc'
              accent='primary'
              popular={true}
            />

            <PricingCard
              title='Premium Documentation'
              price='$9,999'
              period='per project'
              description='Complete documentation for major infrastructure projects'
              features={[
                'Daily progress documentation',
                'Cinematic drone footage',
                'Full project documentary',
                'Comprehensive team interviews',
                'Advanced 3D modeling & VR',
                'Multiple virtual tours',
                'Dedicated project manager',
                'Custom reporting',
                '24/7 support',
              ]}
              cta='Get Started'
              ctaLink='/contact?plan=premium-doc'
              accent='primary'
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-card/30'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
            Ready to <span className='text-primary'>Preserve Your Project</span>
            ?
          </h2>
          <p className='text-xl text-foreground/70 mb-8'>
            Let's document your construction project with professional quality
            and create a lasting digital legacy that showcases your team's
            incredible work.
          </p>
          <a
            href='/contact'
            className='inline-flex items-center space-x-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 metallic-glow'
          >
            <Building2 className='w-6 h-6' />
            <span>Start Your Project Documentation</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
