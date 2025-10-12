'use client';

import { useState, useRef } from 'react';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';
import MuxUploader from '@mux/mux-uploader-react';

interface MuxVideoUploaderProps {
  onUploadComplete?: (assetId: string, playbackId: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
}

export default function MuxVideoUploader({
  onUploadComplete,
  onUploadError,
  maxFileSize = 100 * 1024 * 1024, // 100MB
  acceptedFileTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
}: MuxVideoUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [assetId, setAssetId] = useState('');
  const [playbackId, setPlaybackId] = useState('');
  const uploaderRef = useRef<any>(null);

  const handleUploadStart = () => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    setErrorMessage('');
  };

  const handleUploadProgress = (event: CustomEvent) => {
    const progress = event.detail;
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (event: CustomEvent) => {
    const { assetId, playbackId } = event.detail;
    setUploadStatus('success');
    setAssetId(assetId);
    setPlaybackId(playbackId);
    onUploadComplete?.(assetId, playbackId);
  };

  const handleUploadError = (event: CustomEvent) => {
    const error = event.detail;
    setUploadStatus('error');
    setErrorMessage(error.message || 'Upload failed');
    onUploadError?.(error.message || 'Upload failed');
  };

  const resetUploader = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    setErrorMessage('');
    setAssetId('');
    setPlaybackId('');
    if (uploaderRef.current) {
      uploaderRef.current.reset();
    }
  };

  return (
    <div className='space-y-4'>
      {/* Upload Area */}
      <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
        <Upload className='w-12 h-12 text-foreground/30 mx-auto mb-4' />
        <h3 className='text-lg font-semibold text-foreground mb-2'>
          Upload Video to Mux
        </h3>
        <p className='text-foreground/60 mb-4'>
          Upload your video file for processing and streaming
        </p>

        {uploadStatus === 'idle' && (
          <MuxUploader
            ref={uploaderRef}
            endpoint={process.env.NEXT_PUBLIC_MUX_UPLOAD_ENDPOINT}
            onUploadStart={handleUploadStart}
            onUploadProgress={handleUploadProgress}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            maxFileSize={maxFileSize}
            acceptedFileTypes={acceptedFileTypes}
            className='mux-uploader'
            style={
              {
                '--uploader-background': 'var(--background)',
                '--uploader-border': 'var(--border)',
                '--uploader-text': 'var(--foreground)',
                '--uploader-primary': 'var(--primary)',
              } as React.CSSProperties
            }
          />
        )}

        {uploadStatus === 'uploading' && (
          <div className='space-y-4'>
            <div className='w-full bg-secondary rounded-full h-2'>
              <div
                className='bg-primary h-2 rounded-full transition-all duration-300'
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className='text-sm text-foreground/60'>
              Uploading... {Math.round(uploadProgress)}%
            </p>
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-center space-x-2 text-green-500'>
              <CheckCircle className='w-6 h-6' />
              <span className='font-medium'>Upload Successful!</span>
            </div>
            <div className='text-sm text-foreground/60 space-y-1'>
              <p>Asset ID: {assetId}</p>
              <p>Playback ID: {playbackId}</p>
            </div>
            <button
              onClick={resetUploader}
              className='bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors'
            >
              Upload Another Video
            </button>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className='space-y-4'>
            <div className='flex items-center justify-center space-x-2 text-red-500'>
              <AlertCircle className='w-6 h-6' />
              <span className='font-medium'>Upload Failed</span>
            </div>
            <p className='text-sm text-red-500'>{errorMessage}</p>
            <button
              onClick={resetUploader}
              className='bg-secondary text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors'
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* File Requirements */}
      <div className='bg-card rounded-lg p-4'>
        <h4 className='font-medium text-foreground mb-2'>Video Requirements</h4>
        <ul className='text-sm text-foreground/60 space-y-1'>
          <li>
            • Maximum file size: {(maxFileSize / 1024 / 1024).toFixed(0)}MB
          </li>
          <li>• Supported formats: MP4, MOV, AVI</li>
          <li>• Recommended resolution: 1920x1080 or higher</li>
          <li>• Videos will be processed for optimal streaming</li>
        </ul>
      </div>
    </div>
  );
}
