"use client";
import type { Id } from "convex/_generated/dataModel";
import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import MediaUpload from "@/components/media-upload";
import MuxVideoUploader from "@/components/video-uploader";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    status: "Draft" as const,
    budget: "",
    timeline: "",
    team: "",
    client: "",
    architect: "",
    contractor: "",
    description: "",
    fullDescription: "",
    keyFeatures: [""],
    statistics: [
      { label: "", value: "" },
      { label: "", value: "" },
    ],
  });

  const [uploadedMediaIds, setUploadedMediaIds] = useState<Id<"media">[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProject = useMutation(api.projects.create);
  const bulkUpdateMediaProjectId = useMutation(
    api.media.bulkUpdateMediaProjectId
  );
  const saveMuxMedia = useMutation(api.media.saveMuxMedia);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKeyFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      keyFeatures: newFeatures,
    }));
  };

  const addKeyFeature = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, ""],
    }));
  };

  const removeKeyFeature = (index: number) => {
    const newFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      keyFeatures: newFeatures,
    }));
  };

  const handleStatisticChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const newStats = [...formData.statistics];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      statistics: newStats,
    }));
  };

  const addStatistic = () => {
    setFormData((prev) => ({
      ...prev,
      statistics: [...prev.statistics, { label: "", value: "" }],
    }));
  };

  const removeStatistic = (index: number) => {
    const newStats = formData.statistics.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      statistics: newStats,
    }));
  };

  const handleMediaUploadComplete = (mediaIds: Id<"media">[]) => {
    setUploadedMediaIds((prev) => [...prev, ...mediaIds]);
  };

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
      // Filter out empty key features and statistics
      const filteredKeyFeatures = formData.keyFeatures.filter(
        (feature) => feature.trim() !== ""
      );
      const filteredStatistics = formData.statistics.filter(
        (stat) => stat.label.trim() !== "" && stat.value.trim() !== ""
      );

      const projectId = await createProject({
        title: formData.title,
        location: formData.location,
        category: formData.category,
        status: formData.status,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        team: formData.team || undefined,
        client: formData.client || undefined,
        architect: formData.architect || undefined,
        contractor: formData.contractor || undefined,
        description: formData.description,
        fullDescription: formData.fullDescription || undefined,
        keyFeatures: filteredKeyFeatures,
        statistics: filteredStatistics,
      });

      if (uploadedMediaIds.length > 0) {
        await bulkUpdateMediaProjectId({
          mediaIds: uploadedMediaIds,
          projectId,
        });
      }

      // Redirect to projects list
      window.location.href = "/admin/projects";
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/projects"
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Project</h1>
            <p className="text-foreground/70 mt-1">
              Create a new construction project documentation.
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
            form="project-form"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? "Saving..." : "Save Project"}</span>
          </button>
        </div>
      </div>

      <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter project title"
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Project Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Budget
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., $850M"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 24 months"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Team Size
              </label>
              <input
                type="text"
                value={formData.team}
                onChange={(e) => handleInputChange("team", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., 150+ workers"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Client
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Architect
              </label>
              <input
                type="text"
                value={formData.architect}
                onChange={(e) => handleInputChange("architect", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Architect firm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contractor
              </label>
              <input
                type="text"
                value={formData.contractor}
                onChange={(e) =>
                  handleInputChange("contractor", e.target.value)
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Contractor name"
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Brief project description"
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Detailed project description"
              />
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Key Features</h2>
            <button
              type="button"
              onClick={addKeyFeature}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Feature</span>
            </button>
          </div>
          <div className="space-y-4">
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleKeyFeatureChange(index, e.target.value)
                  }
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter key feature"
                />
                <button
                  type="button"
                  onClick={() => removeKeyFeature(index)}
                  className="p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4 text-foreground/60" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-card rounded-xl p-6 metallic-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Project Statistics
            </h2>
            <button
              type="button"
              onClick={addStatistic}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Statistic</span>
            </button>
          </div>
          <div className="space-y-4">
            {formData.statistics.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) =>
                    handleStatisticChange(index, "label", e.target.value)
                  }
                  className="px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Statistic label"
                />
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) =>
                      handleStatisticChange(index, "value", e.target.value)
                    }
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Statistic value"
                  />
                  <button
                    type="button"
                    onClick={() => removeStatistic(index)}
                    className="p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground/60" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-8">
          {/* Images */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Images
            </h3>
            <MediaUpload
              projectId={undefined}
              onUploadComplete={handleMediaUploadComplete}
              accept="image/*"
              maxFiles={20}
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
