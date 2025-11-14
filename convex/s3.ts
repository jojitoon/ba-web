import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';

/**
 * Generate a presigned URL for uploading a file to S3
 */
export async function generateS3UploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generate a presigned URL for getting a file from S3
 */
export async function generateS3GetUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3
 */
export async function deleteS3File(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Generate a unique S3 key for a file
 */
export function generateS3Key(
  filename: string,
  type: 'image' | 'video',
  projectId?: string | any,
  storyId?: string | any
): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

  let prefix = type === 'image' ? 'images' : 'videos';

  if (projectId) {
    prefix = `projects/${String(projectId)}/${prefix}`;
  } else if (storyId) {
    prefix = `stories/${String(storyId)}/${prefix}`;
  }

  return `${prefix}/${timestamp}-${random}-${sanitizedFilename}`;
}

/**
 * Get the public URL for an S3 object using CloudFront
 * Falls back to S3 URL if CloudFront URL is not configured
 */
export function getS3PublicUrl(key: string): string {
  const cloudfrontUrl = process.env.CLOUDFRONT_URL;
  if (cloudfrontUrl) {
    // Remove trailing slash if present
    const baseUrl = cloudfrontUrl.replace(/\/$/, '');
    return `${baseUrl}/${key}`;
  }
  // Fallback to S3 URL if CloudFront is not configured
  const region = process.env.AWS_REGION || 'us-east-1';
  return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;
}
