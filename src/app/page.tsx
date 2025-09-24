import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import FeaturedProjects from '@/components/featured-projects';
import FeaturedStories from '@/components/featured-stories';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <HeroSection />
      <FeaturedProjects />
      <FeaturedStories />
      <Testimonials />
      <Footer />
    </div>
  );
}
