"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import {
  Play,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Search,
  Star,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

const categories = [
  "All",
  "Food & Beverage",
  "Retail",
  "Manufacturing",
  "Agriculture",
  "Services",
];

export default function BusinessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const stories = useQuery(api.businessStories.list, { status: "Published" });
  const filteredStories =
    stories?.filter((story) => {
      const matchesCategory =
        selectedCategory === "All" || story.category === selectedCategory;
      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [];

  if (stories === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading business stories...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-20 bg-secondary/20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-px w-16 bg-foreground"></div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60">
                  Documentaries
                </span>
              </div>
              <h1 className="magazine-headline text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6 max-w-4xl">
                Business <span className="italic">Stories</span>
              </h1>
              <p className="editorial-text text-lg lg:text-xl text-foreground/70 max-w-2xl">
                Discover the inspiring stories of local businesses, their
                founders, and the communities they serve. Each documentary
                captures the heart and soul of American entrepreneurship.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-background border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent w-64 text-sm"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-foreground/40" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm"
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background/50 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {stories?.length || 0}
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Documentaries</div>
              </div>
              <div className="bg-background/50 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {stories && stories.length > 0
                    ? (
                        stories.reduce(
                          (acc, story) => acc + (story.rating || 0),
                          0
                        ) / stories.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Avg Rating</div>
              </div>
              <div className="bg-background/50 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {stories?.reduce((acc, story) => {
                    const duration = story.duration
                      ? parseInt(story.duration)
                      : 0;
                    return acc + duration;
                  }, 0) || 0}
                  +
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">
                  Minutes of Content
                </div>
              </div>
              <div className="bg-background/50 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {
                    new Set(
                      stories?.map((s) => s.location.split(",")[1]?.trim()) || []
                    ).size
                  }
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">States</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredStories.map((story) => (
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
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/50 bg-secondary/50 px-3 py-1 uppercase tracking-wider">
                        {story.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-foreground/50 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(story.createdAt).getFullYear()}</span>
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

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-xs text-foreground/50 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{story.employees || "N/A"} employees</span>
                        </div>
                        <span>Founded {story.founded || "N/A"}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm font-semibold text-foreground uppercase tracking-wider">
                        <span>Watch</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredStories.length === 0 && (
              <div className="text-center py-24">
                <Play className="w-20 h-20 text-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-foreground/70 mb-3">
                  No stories found
                </h3>
                <p className="text-foreground/50">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
