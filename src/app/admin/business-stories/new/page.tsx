"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import MediaUpload from "@/components/media-upload";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import MuxVideoUploader from "@/components/video-uploader";

export default function NewBusinessStory() {
  const [formData, setFormData] = useState({
    title: "",
    business: "",
    location: "",
    category: "",
    status: "Draft" as const,
    duration: "",
    rating: 0,
    founded: "",
    employees: "",
    description: "",
    fullDescription: "",
    ownerStory: "",
    milestones: [{ year: "", title: "", description: "" }],
    testimonials: [{ name: "", role: "", content: "", rating: 5 }],
    supportLinks: {
      website: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const [uploadedMediaIds, setUploadedMediaIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createStory = useMutation(api.businessStories.create);
  const bulkUpdateMediaStoryId = useMutation(api.media.bulkUpdateMediaStoryId);
  const saveMuxMedia = useMutation(api.media.saveMuxMedia);

  const handleMuxUploadComplete = async (
    uploadId: string,
    _: string,
    size?: number
  ) => {
    try {
      const mediaId = await saveMuxMedia({
        filename: `${uploadId}.mp4`,
        uploadId,
        size: size ?? 0,
      });

      setUploadedMediaIds((prev) => [...prev, mediaId]);
    } catch (err) {
      console.error("Failed to save video record:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storyId = await createStory(formData);

      if (uploadedMediaIds.length > 0) {
        await bulkUpdateMediaStoryId({
          mediaIds: uploadedMediaIds,
          storyId,
        });
      }

      window.location.href = "/admin/business-stories";
    } catch (error) {
      console.error("Failed to create business story:", error);
      alert("Failed to create business story. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      milestones: newMilestones,
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { year: "", title: "", description: "" },
      ],
    }));
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      milestones: newMilestones,
    }));
  };

  const handleTestimonialChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const newTestimonials = [...formData.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: "", role: "", content: "", rating: 5 },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/business-stories"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                New Business Story
              </h1>
              <p className="text-foreground/70 mt-1">
                Create a new business documentary story.
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="bg-secondary text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? "Saving..." : "Save Story"}</span>
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Story Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter story title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.business}
                onChange={(e) => handleInputChange("business", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Services">Services</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Video Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 45 min"
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Business Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Founded Year
              </label>
              <input
                type="text"
                value={formData.founded}
                onChange={(e) => handleInputChange("founded", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 1952"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Employees
              </label>
              <input
                type="text"
                value={formData.employees}
                onChange={(e) => handleInputChange("employees", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  handleInputChange("rating", parseFloat(e.target.value))
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="4.9"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Description
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Brief story description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Description
              </label>
              <textarea
                rows={6}
                value={formData.fullDescription}
                onChange={(e) =>
                  handleInputChange("fullDescription", e.target.value)
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Detailed story description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Owner's Story
              </label>
              <textarea
                rows={6}
                value={formData.ownerStory}
                onChange={(e) =>
                  handleInputChange("ownerStory", e.target.value)
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Tell the owner's personal story and journey"
              />
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Business Milestones
            </h2>
            <button
              type="button"
              onClick={addMilestone}
              className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Milestone</span>
            </button>
          </div>
          <div className="space-y-4">
            {formData.milestones.map((milestone, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border"
              >
                <input
                  type="text"
                  value={milestone.year}
                  onChange={(e) =>
                    handleMilestoneChange(index, "year", e.target.value)
                  }
                  className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Year"
                />
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) =>
                    handleMilestoneChange(index, "title", e.target.value)
                  }
                  className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Milestone title"
                />
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={milestone.description}
                    onChange={(e) =>
                      handleMilestoneChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Description"
                  />
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground/60" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Customer Testimonials
            </h2>
            <button
              type="button"
              onClick={addTestimonial}
              className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>
          <div className="space-y-4">
            {formData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) =>
                      handleTestimonialChange(index, "name", e.target.value)
                    }
                    className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Customer name"
                  />
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) =>
                      handleTestimonialChange(index, "role", e.target.value)
                    }
                    className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Customer role"
                  />
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) =>
                      handleTestimonialChange(
                        index,
                        "rating",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-20 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Rating"
                  />
                  <span className="text-sm text-foreground/60">
                    Rating (1-5)
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <textarea
                    rows={3}
                    value={testimonial.content}
                    onChange={(e) =>
                      handleTestimonialChange(index, "content", e.target.value)
                    }
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Testimonial content"
                  />
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
                    className="p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground/60" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Links */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Support Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.supportLinks.website}
                onChange={(e) =>
                  handleNestedInputChange(
                    "supportLinks",
                    "website",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.supportLinks.phone}
                onChange={(e) =>
                  handleNestedInputChange(
                    "supportLinks",
                    "phone",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.supportLinks.email}
                onChange={(e) =>
                  handleNestedInputChange(
                    "supportLinks",
                    "email",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.supportLinks.address}
                onChange={(e) =>
                  handleNestedInputChange(
                    "supportLinks",
                    "address",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Images */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Images
            </h3>
            <MediaUpload
              storyId={undefined}
              onUploadComplete={(imageIds) => {
                setUploadedMediaIds((prev) => [...prev, ...imageIds]);
              }}
              accept="image/*"
            />
          </div>

          {/* Videos */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Videos
            </h3>
            <MuxVideoUploader
              onUploadComplete={handleMuxUploadComplete}
              onUploadError={(error) => {
                console.error("Mux upload error:", error);
                alert(`Video upload failed: ${error}`);
              }}
              maxFileSize={500 * 1024 * 1024}
              acceptedFileTypes={[
                "video/mp4",
                "video/quicktime",
                "video/x-msvideo",
              ]}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
