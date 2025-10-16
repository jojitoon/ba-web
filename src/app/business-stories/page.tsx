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
      <section className="pt-50 pb-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Business <span className="text-accent">Stories</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Discover the inspiring stories of local businesses, their
              founders, and the communities they serve. Each documentary
              captures the heart and soul of American entrepreneurship.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent w-64"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-foreground/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
            <div className="bg-card/50 rounded-lg p-4 metallic-border">
              <div className="text-2xl font-bold text-accent mb-1">
                {stories?.length || 0}
              </div>
              <div className="text-foreground/70 text-sm">Documentaries</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 metallic-border">
              <div className="text-2xl font-bold text-primary mb-1">
                {stories && stories.length > 0
                  ? (
                      stories.reduce(
                        (acc, story) => acc + (story.rating || 0),
                        0
                      ) / stories.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <div className="text-foreground/70 text-sm">Avg Rating</div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 metallic-border">
              <div className="text-2xl font-bold text-accent mb-1">
                {stories?.reduce((acc, story) => {
                  const duration = story.duration
                    ? parseInt(story.duration)
                    : 0;
                  return acc + duration;
                }, 0) || 0}
                +
              </div>
              <div className="text-foreground/70 text-sm">
                Minutes of Content
              </div>
            </div>
            <div className="bg-card/50 rounded-lg p-4 metallic-border">
              <div className="text-2xl font-bold text-primary mb-1">
                {
                  new Set(
                    stories?.map((s) => s.location.split(",")[1]?.trim()) || []
                  ).size
                }
              </div>
              <div className="text-foreground/70 text-sm">States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div
                key={story._id}
                className="group bg-card rounded-xl overflow-hidden metallic-border hover:metallic-glow transition-all duration-300"
              >
                {/* Story Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-accent/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-accent-foreground ml-1" />
                    </div>
                  </div>

                  {/* Story Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-foreground/70" />
                        <span className="text-sm text-foreground/70">
                          {story.duration || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span className="text-sm text-foreground/70">
                          {story.rating || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      {story.category}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(story.createdAt).getFullYear()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-sm text-foreground/60 mb-3">
                    {story.business}
                  </p>

                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {story.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{story.employees || "N/A"} employees</span>
                      </div>
                      <span>Founded {story.founded || "N/A"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/business-stories/${story._id}`}
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    <span>Watch Documentary</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-16">
              <Play className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground/70 mb-2">
                No stories found
              </h3>
              <p className="text-foreground/50">
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
