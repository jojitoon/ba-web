"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  Upload,
  X,
  Image,
  Video,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface MediaUploadProps {
  projectId?: Id<"projects">;
  storyId?: Id<"businessStories">;
  onUploadComplete?: (mediaIds: Id<"media">[]) => void;
  accept?: string;
  maxFiles?: number;
}

interface UploadedFile {
  id: string;
  file: File;
  type: "image" | "video";
  status: "uploading" | "success" | "error";
  progress: number;
  storageId?: string;
  muxAssetId?: string;
  thumbnailUrl?: string;
  error?: string;
}

export default function MediaUpload({
  projectId,
  storyId,
  onUploadComplete,
  accept = "image/*,video/*",
  maxFiles = 10,
}: MediaUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveStorageId = useMutation(api.media.saveStorageId);
  const createMuxUpload = useAction(api.mux.createMuxUpload);

  // Clear successfully uploaded files after 2 seconds
  useEffect(() => {
    const successFiles = files.filter((f) => f.status === "success");
    if (successFiles.length > 0) {
      const timer = setTimeout(() => {
        setFiles((prev) => {
          // Only clear files that are still in success status
          const remaining = prev.filter((f) => f.status !== "success");
          return remaining;
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [files]);

  const uploadFile = useCallback(
    async (file: File, index: number) => {
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      setFiles((prev) =>
        prev.map((f, i) =>
          i === index ? { ...f, status: "uploading", progress: 0 } : f
        )
      );

      try {
        if (fileType === "image") {
          const uploadUrl = await generateUploadUrl();

          const response = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!response.ok) throw new Error("Image upload failed");

          const { storageId } = await response.json();

          const mediaId = await saveStorageId({
            storageId,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            type: "image",
            projectId,
            storyId,
          });

          setFiles((prev) =>
            prev.map((f, i) =>
              i === index
                ? { ...f, status: "success", progress: 100, storageId }
                : f
            )
          );

          return { type: "image", storageId, mediaId };
        } else {
          const muxData = await createMuxUpload({
            filename: file.name,
            projectId,
            storyId,
          });

          const uploadResponse = await fetch(muxData.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Mux upload failed: ${uploadResponse.status}`);
          }

          setFiles((prev) =>
            prev.map((f, i) =>
              i === index
                ? {
                    ...f,
                    status: "success",
                    progress: 100,
                    muxAssetId: muxData.assetId,
                  }
                : f
            )
          );

          return {
            type: "video",
            muxAssetId: muxData.assetId,
            mediaId: muxData.mediaId,
          };
        }
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f, i) =>
            i === index
              ? {
                  ...f,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : f
          )
        );
        throw error;
      }
    },
    [generateUploadUrl, saveStorageId, createMuxUpload, projectId, storyId]
  );

  const handleFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = maxFiles 
        ? Array.from(newFiles).slice(0, maxFiles - files.filter(f => f.status !== "success").length)
        : Array.from(newFiles);

      const validFiles = fileArray.filter((file) => {
        const isValidType =
          file.type.startsWith("image/") || file.type.startsWith("video/");
        const isValidSize = file.size <= 100 * 1024 * 1024;
        return isValidType && isValidSize;
      });

      if (validFiles.length === 0) {
        // Reset file input even if no valid files
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const currentFilesCount = files.filter(f => f.status !== "success").length;
      const newUploadedFiles: UploadedFile[] = validFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: file.type.startsWith("image/") ? "image" : "video",
        status: "uploading",
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newUploadedFiles]);

      // Reset file input to allow selecting the same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      try {
        const results = await Promise.all(
          newUploadedFiles.map((f, i) => uploadFile(f.file, currentFilesCount + i))
        );

        const mediaIds = results
          .map((r) => r.mediaId)
          .filter(Boolean) as Id<"media">[];

        onUploadComplete?.(mediaIds);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
    [files, maxFiles, uploadFile, onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload Media Files
        </h3>
        <p className="text-foreground/60 mb-4">
          Drag and drop files here, or click to select files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          id="media-upload"
        />
        <label
          htmlFor="media-upload"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer inline-flex items-center space-x-2"
        >
          <Upload className="w-5 h-5" />
          <span>Choose Files</span>
        </label>
        <p className="text-xs text-foreground/50 mt-2">
          Max file size: 100MB. Supported formats: Images (JPG, PNG, GIF)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Uploaded Files ({files.length})
          </h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="bg-background rounded-lg p-4 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {file.type === "image" ? (
                      <Image className="w-5 h-5 text-primary" />
                    ) : (
                      <Video className="w-5 h-5 text-accent" />
                    )}
                    <div>
                      <span className="text-sm font-medium text-foreground">
                        {file.file.name}
                      </span>
                      <p className="text-xs text-foreground/60">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status)}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 rounded hover:bg-secondary transition-colors"
                    >
                      <X className="w-4 h-4 text-foreground/60" />
                    </button>
                  </div>
                </div>

                {file.status === "uploading" && (
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}

                {file.status === "error" && file.error && (
                  <p className="text-xs text-red-500 mt-1">{file.error}</p>
                )}

                {file.status === "success" && (
                  <p className="text-xs text-green-500 mt-1">
                    Upload successful
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
