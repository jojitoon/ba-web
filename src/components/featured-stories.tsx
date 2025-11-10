"use client";

import Link from "next/link";
import { Play, Clock, Users, ArrowRight, Star } from "lucide-react";

export default function FeaturedStories({ stories }: { stories: any[] }) {
  // Show only the first 3 stories for featured section
  const featuredStories = stories.slice(0, 3);

  if (featuredStories.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-foreground"></div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60">
                Featured Documentaries
              </span>
            </div>
            <h2 className="magazine-headline text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-3xl">
              Business <span className="italic">Stories</span>
            </h2>
            <p className="editorial-text text-lg lg:text-xl text-foreground/70 max-w-2xl">
              Discover the inspiring stories of local businesses, their founders,
              and the communities they serve. Each documentary captures the heart
              and soul of American entrepreneurship.
            </p>
          </div>

          {/* Stories Grid - Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {featuredStories.map((story, index) => (
              <Link
                key={story._id}
                href={`/business-stories/${story._id}`}
                className="group editorial-card block"
              >
                {/* Story Image */}
                <div className="relative h-80 overflow-hidden mb-6 bg-secondary/30">
                  <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-secondary/20 flex items-center justify-center">
                    <Play className="w-20 h-20 text-foreground/20" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="featured-badge">Featured</div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-foreground/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-background ml-1" />
                    </div>
                  </div>

                  {/* Story Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-foreground/80 bg-background/90 px-3 py-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{story.duration || "N/A"}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-foreground/80 bg-background/90 px-3 py-1.5">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{story.rating || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-4 px-6 pb-6">
                  <div className="flex items-center justify-between text-xs text-foreground/50 uppercase tracking-wider">
                    <span>Founded {story.founded || "N/A"}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{story.employees || "N/A"} employees</span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground group-hover:opacity-70 transition-opacity leading-tight">
                    {story.title}
                  </h3>

                  <p className="text-sm text-foreground/60 font-medium">
                    {story.business}
                  </p>

                  <p className="editorial-text text-foreground/70 line-clamp-3">
                    {story.description}
                  </p>

                  <div className="flex items-center space-x-2 text-sm font-semibold text-foreground uppercase tracking-wider pt-2">
                    <span>Watch Documentary</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Stories CTA */}
          <div className="text-center border-t border-border pt-12">
            <Link
              href="/business-stories"
              className="group inline-flex items-center space-x-3 border-2 border-foreground text-foreground px-10 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              <span>View All Business Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
