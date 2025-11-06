"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { CheckCircle, AlertCircle, Upload } from "lucide-react";
import MuxUploader from "@mux/mux-uploader-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface MuxVideoUploaderProps {
  onUploadComplete?: (assetId: string, playbackId: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

export default function MuxVideoUploader({
  onUploadComplete,
  onUploadError,
  maxFileSize = 100 * 1024 * 1024, // 100MB
  acceptedFileTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"],
}: MuxVideoUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "processing" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [assetId, setAssetId] = useState("");
  const [playbackId, setPlaybackId] = useState("");
  const [uploadEndpoint, setUploadEndpoint] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [mediaId, setMediaId] = useState<string | null>(null);

  // 1. Add state to hold file details like name and size.
  const [fileDetails, setFileDetails] = useState({
    name: "",
    size: 0,
    type: "",
  });

  const uploaderRef = useRef<any>(null);

  const saveMediaWithUploadId = useMutation(api.media.saveStorageId);

  const queryArgs = useMemo(
    () => (mediaId ? { id: mediaId as any } : "skip"),
    [mediaId]
  );
  const mediaRecord = useQuery(api.media.getMedia, queryArgs);

  useEffect(() => {
    if (
      mediaRecord &&
      mediaRecord.muxPlaybackId &&
      uploadStatus === "processing"
    ) {
      setUploadStatus("success");
      setAssetId(mediaRecord.muxAssetId || "");
      setPlaybackId(mediaRecord.muxPlaybackId || "");
      onUploadComplete?.(
        mediaRecord.muxAssetId || "",
        mediaRecord.muxPlaybackId || ""
      );
    }
  }, [mediaRecord, uploadStatus, onUploadComplete]);

  const fetchUploadUrl = useCallback(async () => {
    try {
      const response = await fetch("/api/mux/upload-url", { method: "POST" });
      if (!response.ok) throw new Error("Failed to get upload URL");
      const data = await response.json();
      setUploadEndpoint(data.url);
      setUploadId(data.uploadId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setErrorMessage(
        `Could not connect to the upload service: ${errorMessage}`
      );
      setUploadStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchUploadUrl();
  }, [fetchUploadUrl]);

  const handleUploadStart = (event: any) => {
    setUploadStatus("uploading");
    setUploadProgress(0);
    setErrorMessage("");

    const file = event.detail.file;
    if (file) {
      setFileDetails({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  };

  const handleUploadProgress = (event: any) => {
    if (typeof event.detail === "object") {
      setUploadProgress(event.detail.bytesUploaded / event.detail.bytesTotal);
    }
    if (typeof event.detail === "number") {
      setUploadProgress(event.detail);
    }
  };

  const handleUploadSuccess = async () => {
    if (!uploadId) {
      setUploadStatus("error");
      setErrorMessage("Upload session ID not found.");
      return;
    }
    setUploadStatus("processing");
    try {
      const recordId = await saveMediaWithUploadId({
        filename: fileDetails.name,
        type: "video",
        storageId: "",
        size: fileDetails.size,
        mimeType: fileDetails.type,
        uploadId,
        muxAssetId: undefined,
        muxPlaybackId: undefined,
        projectId: undefined,
        storyId: undefined,
      });
      setMediaId(recordId);
    } catch (err) {
      setUploadStatus("error");
      setErrorMessage("Failed to save media record.");
    }
  };

  const handleUploadError = (event: any) => {
    const error = event.detail;
    setUploadStatus("error");
    setErrorMessage(error.message || "Upload failed");
    onUploadError?.(error.message || "Upload failed");
  };

  const resetUploader = () => {
    setUploadStatus("idle");
    setUploadProgress(0);
    setErrorMessage("");
    setAssetId("");
    setPlaybackId("");
    setUploadId("");
    setMediaId(null);
    setFileDetails({ name: "", size: 0, type: "" });
    if (uploaderRef.current) uploaderRef.current.reset();
    fetchUploadUrl();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload Video to Mux
        </h3>
        <p className="text-foreground/60 mb-4">
          Upload your video file for processing and streaming
        </p>

        {uploadStatus === "idle" && uploadEndpoint ? (
          <MuxUploader
            ref={uploaderRef}
            endpoint={uploadEndpoint}
            onUploadStart={handleUploadStart}
            onProgress={() => {
              console.log("progress");
            }}
            onSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            maxFileSize={maxFileSize}
            className="mux-uploader"
            style={
              {
                "--uploader-background": "var(--background)",
                "--uploader-border": "var(--border)",
                "--uploader-text": "var(--foreground)",
                "--uploader-primary": "var(--primary)",
              } as React.CSSProperties
            }
          />
        ) : (
          uploadStatus === "idle" && (
            <p className="text-sm text-muted-foreground">
              Fetching upload URL...
            </p>
          )
        )}

        {uploadStatus === "uploading" && (
          <div className="space-y-4">
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-foreground/60">
              Uploading... {Math.round(uploadProgress)}%
            </p>
          </div>
        )}

        {uploadStatus === "processing" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-foreground/60">
              Video is processing. This may take a few minutes...
            </p>
            <p className="text-xs text-foreground/40">Upload ID: {uploadId}</p>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-500">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Upload Successful!</span>
            </div>
            <div className="text-sm text-foreground/60 space-y-1">
              <p>Asset ID: {assetId}</p>
              <p>Playback ID: {playbackId}</p>
            </div>
            <button
              onClick={resetUploader}
              className="bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Upload Another Video
            </button>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <span className="font-medium">Upload Failed</span>
            </div>
            <p className="text-sm text-red-500">{errorMessage}</p>
            <button
              onClick={resetUploader}
              className="bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Video Requirements</h4>
        <ul className="text-sm text-foreground/60 space-y-1">
          <li>
            • Maximum file size: {(maxFileSize / 1024 / 1024).toFixed(0)}MB
          </li>
          <li>• Supported formats: MP4, MOV, AVI</li>
        </ul>
      </div>
    </div>
  );
}
