'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Upload,
  XCircle,
  Video,
  X,
} from 'lucide-react';
import MuxUploader from '@mux/mux-uploader-react';

interface UploadedVideo {
  id: string;
  filename: string;
  status: 'success' | 'error';
  assetId: string;
  size?: number;
}

interface MuxVideoUploaderProps {
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  onUploadComplete?: (assetId: string, filename: string, size?: number) => void;
  onUploadError?: (error: string) => void;
}

export default function MuxVideoUploader({
  maxFileSize = 500 * 1024 * 1024,
  acceptedFileTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  onUploadComplete,
  onUploadError,
}: MuxVideoUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadId, setUploadId] = useState<string>('');
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploaderRef = useRef<any & { abort: () => void }>(null);

  const getNewUrlAndReset = useCallback(async () => {
    try {
      setUploadStatus('idle');
      setErrorMessage('');
      const response = await fetch('/api/mux/upload-url', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to get upload URL');
      const data = await response.json();
      setUploadUrl(data.url);
      setUploadId(data.uploadId || '');
    } catch (err: any) {
      setErrorMessage(err.message);
      setUploadStatus('error');
    }
  }, []);

  useEffect(() => {
    getNewUrlAndReset();
  }, [getNewUrlAndReset]);

  const handleUploadStart = useCallback(
    (event: any) => {
      const file = event.detail?.file;

      if (!file) {
        const msg = 'Unable to read selected file.';
        setErrorMessage(msg);
        setUploadStatus('error');
        onUploadError?.(msg);
        return;
      }

      if (!acceptedFileTypes.includes(file.type)) {
        const msg = `Invalid file type. Allowed types: ${acceptedFileTypes.join(
          ', '
        )}`;
        setErrorMessage(msg);
        setUploadStatus('error');
        onUploadError?.(msg);
        uploaderRef.current?.abort?.();
        return;
      }

      if (file.size > maxFileSize) {
        const msg = `File too large. Max size is ${(
          maxFileSize /
          1024 /
          1024
        ).toFixed(0)}MB.`;
        setErrorMessage(msg);
        setUploadStatus('error');
        onUploadError?.(msg);
        uploaderRef.current?.abort?.();
        return;
      }

      const duplicate = uploadedVideos.some(
        (v) => v.filename === file.name && v.size === file.size
      );
      if (duplicate) {
        const msg = 'This video has already been uploaded.';
        setErrorMessage(msg);
        setUploadStatus('error');
        uploaderRef.current?.abort?.();
        onUploadError?.(msg);
        return;
      }

      setSelectedFile(file);
      setUploadStatus('uploading');
    },
    [uploadedVideos, acceptedFileTypes, maxFileSize, onUploadError]
  );

  const handleSuccess = useCallback(
    async (event: any) => {
      const filename = selectedFile?.name ?? 'Untitled Video';
      const size = selectedFile?.size;

      // Use the uploadId from the API response, or try to extract from URL as fallback
      let currentUploadId = uploadId;
      if (!currentUploadId) {
        currentUploadId = uploadUrl.split('/upload/')[1]?.split('?')[0] || '';
      }

      if (!currentUploadId) {
        onUploadError?.('Missing upload ID from upload URL.');
        return;
      }

      setUploadedVideos((prev) => [
        ...prev,
        {
          id: currentUploadId,
          status: 'success',
          assetId: currentUploadId,
          filename,
          size,
        },
      ]);

      setSelectedFile(null);
      setUploadStatus('success');

      onUploadComplete?.(currentUploadId, filename, size);
    },
    [selectedFile, onUploadComplete, onUploadError, uploadUrl, uploadId]
  );

  const handleError = useCallback(
    (event: any) => {
      const msg = event.detail?.message ?? 'An unknown error occurred.';
      setErrorMessage(msg);
      setUploadStatus('error');
      onUploadError?.(msg);
    },
    [onUploadError]
  );

  const handleCancel = useCallback(() => {
    uploaderRef.current?.abort();
    setSelectedFile(null);
    getNewUrlAndReset();
  }, [getNewUrlAndReset]);

  const removeVideo = useCallback((assetId: string) => {
    setUploadedVideos((prev) => prev.filter((v) => v.id !== assetId));
  }, []);

  return (
    <div className='space-y-6'>
      <div className='border-2 border-dashed border-border rounded-lg p-8 text-center'>
        {(uploadStatus === 'idle' || uploadStatus === 'uploading') &&
          uploadUrl && (
            <>
              {uploadStatus === 'idle' && (
                <Upload className='w-12 h-12 text-foreground/30 mx-auto mb-4' />
              )}

              {uploadStatus === 'uploading' && (
                <p className='text-sm font-medium mb-4'>Uploading...</p>
              )}

              <MuxUploader
                ref={uploaderRef}
                endpoint={uploadUrl}
                onUploadStart={handleUploadStart}
                onSuccess={handleSuccess}
                onUploadError={handleError}
              />

              {uploadStatus === 'uploading' && (
                <button
                  onClick={handleCancel}
                  className='text-sm text-red-500 hover:text-red-700 flex items-center justify-center mx-auto mt-4'
                >
                  <XCircle className='w-4 h-4 mr-1' />
                  Cancel Upload
                </button>
              )}
            </>
          )}

        {uploadStatus === 'idle' && !uploadUrl && !errorMessage && (
          <p>Loading uploader...</p>
        )}

        {uploadStatus === 'success' && (
          <div className='space-y-4'>
            <CheckCircle className='w-8 h-8 text-green-500 mx-auto' />
            <p className='font-medium'>Upload Successful!</p>
            <button
              onClick={getNewUrlAndReset}
              className='text-sm text-foreground/80'
            >
              Upload Another
            </button>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className='space-y-4'>
            <AlertCircle className='w-8 h-8 text-red-500 mx-auto' />
            <p className='font-medium'>Upload Failed</p>
            <p className='text-sm text-red-500'>{errorMessage}</p>
            <button
              onClick={getNewUrlAndReset}
              className='text-sm text-foreground/80'
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {uploadedVideos.length > 0 && (
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-foreground'>
            Uploaded Videos ({uploadedVideos.length})
          </h3>
          <div className='space-y-3'>
            {uploadedVideos.map((video) => (
              <div
                key={video.id}
                className='bg-background rounded-lg p-4 border border-border'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <Video className='w-5 h-5 text-accent' />
                    <div>
                      <span className='text-sm font-medium text-foreground'>
                        {video.filename}
                      </span>
                      <p className='text-xs text-green-500 mt-1'>
                        Upload successful
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <CheckCircle className='w-4 h-4 text-green-500' />
                    <button
                      onClick={() => removeVideo(video.id)}
                      className='p-1 rounded hover:bg-secondary transition-colors'
                    >
                      <X className='w-4 h-4 text-foreground/60' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
