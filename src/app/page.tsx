'use client';

import { useQuery } from 'convex/react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import FeaturedProjects from '@/components/featured-projects';
import FeaturedStories from '@/components/featured-stories';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';
import { api } from 'convex/_generated/api';

export default function Home() {
  const projects = useQuery(api.projects.list, { status: 'Published' });
  const businessStories = useQuery(api.businessStories.list, {
    status: 'Published',
  });

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <FeaturedStories stories={businessStories || []} />
      <Testimonials />
      <Footer />
    </div>
  );
}
