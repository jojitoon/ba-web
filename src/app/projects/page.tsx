"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import {
  Building2,
  Calendar,
  MapPin,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

const categories = [
  "All",
  "Commercial",
  "Residential",
  "Industrial",
  "Healthcare",
  "Education",
  "Retail",
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const projects = useQuery(api.projects.list, { status: "Published" });

  const filteredProjects =
    projects?.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [];

  if (projects === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading projects...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-px w-16 bg-foreground"></div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/60">
                  Portfolio
                </span>
              </div>
              <h1 className="magazine-headline text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6 max-w-4xl">
                Construction <span className="italic">Projects</span>
              </h1>
              <p className="editorial-text text-lg lg:text-xl text-foreground/70 max-w-2xl">
                Explore our comprehensive portfolio of documented construction
                projects, from groundbreaking to completion, showcasing the
                incredible work of construction teams across the nation.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
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
              <div className="bg-secondary/30 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {projects?.length || 0}
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Total Projects</div>
              </div>
              <div className="bg-secondary/30 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {projects?.filter((p) => p.status === "Published").length || 0}
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Published</div>
              </div>
              <div className="bg-secondary/30 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {projects?.filter((p) => p.status === "In Review").length || 0}
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">In Review</div>
              </div>
              <div className="bg-secondary/30 p-6 border-l-4 border-foreground">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
                  {
                    new Set(
                      projects?.map((p) => p.location.split(",")[1]?.trim()) || []
                    ).size
                  }
                </div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group editorial-card block"
                >
                  {/* Project Image */}
                  <div className="relative h-80 overflow-hidden mb-6 bg-secondary/20">
                    <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center">
                      <Building2 className="w-20 h-20 text-foreground/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-semibold text-foreground bg-background/90 px-3 py-1.5 uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>

                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground bg-background/90 px-3 py-1.5 uppercase tracking-wider">
                          {project.timeline || "Ongoing"}
                        </span>
                        <span className="text-xs text-foreground/70 bg-background/90 px-3 py-1.5">
                          {project.team || "Professional Team"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4 px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/50 bg-secondary/50 px-3 py-1 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-foreground/50 uppercase tracking-wider">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground group-hover:opacity-70 transition-opacity leading-tight">
                      {project.title}
                    </h3>

                    <p className="editorial-text text-foreground/70 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-xs text-foreground/50 uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(project.createdAt).getFullYear()}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm font-semibold text-foreground uppercase tracking-wider">
                        <span>View Timeline</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-24">
                <Building2 className="w-20 h-20 text-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-serif font-bold text-foreground/70 mb-3">
                  No projects found
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
