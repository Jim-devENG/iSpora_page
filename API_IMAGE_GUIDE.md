# Image Upload Guide for Blog Posts and Events

## Overview

Both **Blog Posts** and **Events** support images through the `image_url` field in the database.

**NEW: File Upload Support!** You can now upload images directly instead of providing URLs. See [IMAGE_UPLOAD_SETUP.md](./IMAGE_UPLOAD_SETUP.md) for details.

## Database Schema

### Blog Posts
- Field: `image_url` (TEXT, nullable)
- Location: `blog_posts` table

### Events
- Field: `image_url` (TEXT, nullable)
- Location: `events` table

## API Usage

### Creating a Blog Post with Image

```bash
POST /api/blog-posts
Content-Type: application/json

{
  "title": "My Blog Post",
  "excerpt": "Post summary",
  "author": "Author Name",
  "category": "Updates",
  "imageUrl": "https://example.com/image.jpg",  // Image URL
  "published": true
}
```

**Accepted field names:**
- `imageUrl` (camelCase) ✅
- `image_url` (snake_case) ✅

### Creating an Event with Image

```bash
POST /api/events
Content-Type: application/json

{
  "title": "Webinar Title",
  "description": "Event description",
  "eventDate": "2024-03-15",
  "eventTime": "2:00 PM GMT",
  "eventType": "Webinar",
  "speaker": "Speaker Name",
  "imageUrl": "https://example.com/event-image.jpg",  // Image URL
  "status": "upcoming"
}
```

**Accepted field names:**
- `imageUrl` (camelCase) ✅
- `image_url` (snake_case) ✅

## Image URL Options

### 1. External URLs
Use any publicly accessible image URL:
```json
{
  "imageUrl": "https://images.unsplash.com/photo-1234567890"
}
```

### 2. Local/Public Folder Images
Use images from your `/public` folder:
```json
{
  "imageUrl": "/conference.jpg"
}
```

### 3. Base64 Data URLs
For small images, you can use base64:
```json
{
  "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## Image Validation

Use the `/api/upload-image` endpoint to validate image URLs:

```bash
POST /api/upload-image
Content-Type: application/json

{
  "imageUrl": "https://example.com/image.jpg",
  "type": "blog" // or "event"
}
```

## Frontend Display

The frontend components (`BlogPage` and `WebinarsPage`) automatically handle images:
- If `image_url` exists, it uses that
- Falls back to `image` field (for backward compatibility)
- Default fallback to placeholder images if none provided

## Example: Full Blog Post Creation

```javascript
const response = await fetch('/api/blog-posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Article',
    excerpt: 'This is a great article about...',
    author: 'John Doe',
    category: 'Updates',
    imageUrl: 'https://images.unsplash.com/photo-1234567890',
    content: 'Full article content here...',
    readTime: '5 min read',
    featured: false,
    published: true
  })
});
```

## Example: Full Event Creation

```javascript
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Tech Innovation Webinar',
    description: 'Learn about the latest tech trends',
    eventDate: '2024-03-15',
    eventTime: '2:00 PM GMT',
    eventType: 'Webinar',
    speaker: 'Jane Smith',
    speakerRole: 'Tech Expert',
    imageUrl: 'https://images.unsplash.com/photo-9876543210',
    registrationLink: 'https://forms.example.com/register',
    status: 'upcoming',
    maxAttendees: 100
  })
});
```

## Notes

- Images are stored as URLs (not binary data)
- For file uploads, you'll need to:
  1. Upload files to a cloud storage service (Supabase Storage, AWS S3, etc.)
  2. Get the public URL
  3. Use that URL in the `imageUrl` field
- Image URLs should be publicly accessible
- Recommended image formats: JPG, PNG, WebP
- Recommended max size: 2MB per image

