const { ConvexHttpClient } = require('convex/browser');
const fs = require('fs');
const path = require('path');

// Initialize Convex client
const client = new ConvexHttpClient(
  'https://adjoining-narwhal-867.convex.cloud'
);

// Story ID to use for all media
const STORY_ID = 'j57bgyckesyajnqw5w271nymkn7twy14';

/**
 * Extract storageId (S3 key) from URL
 * Examples:
 * - https://bucket.s3.region.amazonaws.com/path/to/file.jpg -> path/to/file.jpg
 * - https://cloudfront.net/path/to/file.jpg -> path/to/file.jpg
 */
function extractStorageIdFromUrl(url) {
  try {
    const urlObj = new URL(url);
    // Remove leading slash from pathname
    return urlObj.pathname.substring(1);
  } catch (error) {
    console.error(`Error parsing URL: ${url}`, error);
    // Fallback: try to extract path after domain
    const match = url.match(/\/\/(?:[^\/]+)\/(.+)$/);
    return match ? match[1] : url;
  }
}

/**
 * Parse CSV file
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim());

  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }

  // Parse header
  const headers = lines[0]
    .split(',')
    .map((h) => h.trim().replace(/^"|"$/g, ''));

  // Parse rows
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let currentValue = '';
    let inQuotes = false;

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Add last value

    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index].replace(/^"|"$/g, '');
      });
      rows.push(row);
    }
  }

  return rows;
}

/**
 * Import media from CSV
 */
async function importMedia(csvPath) {
  console.log('Reading CSV file...');
  const rows = parseCSV(csvPath);
  console.log(`Found ${rows.length} rows to import`);

  // Show available columns from first row for debugging
  if (rows.length > 0) {
    console.log('Available columns:', Object.keys(rows[0]).join(', '));
  }

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    try {
      // Extract required fields
      const url = row.url || row.URL || row.publicUrl || row.public_url;
      const mimetype =
        row.mimetype ||
        row.mimeType ||
        row.mime_type ||
        row.type ||
        'image/jpeg';
      const filename = row.filename || row.name || `image_${i + 1}.jpg`;
      const size = parseInt(
        row.size || row.fileSize || row.file_size || '0',
        10
      );

      if (!url) {
        console.warn(`Row ${i + 1}: Missing URL, skipping`);
        errorCount++;
        continue;
      }

      // Extract storageId from URL
      const storageId = extractStorageIdFromUrl(url);

      // Extract uploadedAt timestamp if available
      let uploadedAt;
      let dateCategory;
      if (
        row.uploadedAt ||
        row.uploaded_at ||
        row.createdAt ||
        row.created_at
      ) {
        const dateStr =
          row.uploadedAt || row.uploaded_at || row.createdAt || row.created_at;
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          uploadedAt = date.getTime();
          dateCategory = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, '0')}`;
        }
      }

      if (!dateCategory) {
        const now = new Date();
        dateCategory = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, '0')}`;
      }

      // Import media using Convex mutation
      const mediaId = await client.mutation('media:saveStorageId', {
        storageId,
        filename,
        mimeType: mimetype,
        size,
        type: 'image',
        storyId: STORY_ID,
        publicUrl: url,
        dateCategory,
        uploadedAt,
      });

      console.log(`✓ Row ${i + 1}: Imported ${filename} (ID: ${mediaId})`);
      successCount++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`✗ Row ${i + 1}: Error importing`, error.message);
      errorCount++;
    }
  }

  console.log('\n=== Import Summary ===');
  console.log(`Successfully imported: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total: ${rows.length}`);
}

// Main execution
const csvPath =
  process.argv[2] ||
  path.join(__dirname, '../public_PropertyMedia_export_2025-11-14_113547.csv');

if (!fs.existsSync(csvPath)) {
  console.error(`Error: CSV file not found at ${csvPath}`);
  console.error('Usage: node scripts/import-media.js [path-to-csv]');
  process.exit(1);
}

// if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
//   console.error(
//     'Error: NEXT_PUBLIC_CONVEX_URL environment variable is not set'
//   );
//   process.exit(1);
// }

importMedia(csvPath)
  .then(() => {
    console.log('\nImport completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
