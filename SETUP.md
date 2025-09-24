# Built Ancestry Admin Setup

This document provides setup instructions for the Built Ancestry admin system with Convex and Mux integration.

## Prerequisites

- Node.js 18+
- npm or pnpm
- Convex account
- Mux account

## Installation

1. Install dependencies:

```bash
npm install
# or
pnpm install
```

2. Set up Convex:

```bash
npx convex dev
```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOY_KEY=your_convex_deploy_key

# Mux Configuration
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
NEXT_PUBLIC_MUX_UPLOAD_ENDPOINT=your_mux_upload_endpoint

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Convex Setup

1. Create a new Convex project:

```bash
npx convex dev
```

2. The schema and functions are already configured in the `convex/` directory:
   - `schema.ts` - Database schema
   - `projects.ts` - Project management functions
   - `businessStories.ts` - Business story functions
   - `media.ts` - Media upload and management functions

## Mux Setup

1. Create a Mux account at https://mux.com
2. Create a new project and get your API credentials
3. Set up a direct upload endpoint for video uploads
4. Configure your environment variables with the Mux credentials

## Features

### Admin Dashboard (`/admin`)

- Overview of all projects and business stories
- Statistics and recent activity
- Quick access to create new content

### Project Management (`/admin/projects`)

- Create, edit, and manage construction projects
- Upload images using Convex storage
- Upload videos using Mux
- Timeline and team interview management

### Business Stories (`/admin/business-stories`)

- Create, edit, and manage business documentaries
- Upload images and videos
- Manage testimonials and milestones
- Support links and contact information

### Media Library (`/admin/media`)

- View all uploaded media files
- Filter by type, project, or story
- Grid and list view options
- File management and deletion

## File Upload System

### Images (Convex Storage)

- Automatic upload to Convex storage
- Progress tracking and error handling
- Support for JPG, PNG, GIF formats
- Maximum file size: 100MB

### Videos (Mux)

- Direct upload to Mux for processing
- Automatic transcoding and optimization
- Support for MP4, MOV, AVI formats
- Streaming-ready playback

## Development

1. Start the development server:

```bash
npm run dev
```

2. Start Convex in development mode:

```bash
npx convex dev
```

3. Access the admin dashboard at `http://localhost:3000/admin`

## Production Deployment

1. Deploy Convex functions:

```bash
npx convex deploy
```

2. Build and deploy Next.js application:

```bash
npm run build
npm start
```

## API Integration

The admin system integrates with:

- **Convex**: Real-time database and file storage
- **Mux**: Video processing and streaming
- **Next.js**: Full-stack React framework

## Security

- All file uploads are validated for type and size
- Environment variables are used for sensitive credentials
- Convex provides built-in authentication and authorization
- Mux handles secure video processing and delivery
