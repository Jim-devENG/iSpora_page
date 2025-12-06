# Image Upload Setup Guide

## Overview

The system now supports **file uploads** for blog posts and events. Images are uploaded to Supabase Storage and the public URL is returned.

## Setup Steps

### 1. Create Supabase Storage Bucket

Run the SQL in `supabase-storage-setup.sql` in your Supabase SQL Editor:

```sql
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY IF NOT EXISTS "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');
```

### 2. Alternative: Manual Setup in Supabase Dashboard

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name: `images`
4. Check **Public bucket** (to allow public access)
5. Click **Create bucket**

### 3. Set Storage Policies (if using SQL)

The SQL file includes policies for:
- Public read access (so images can be displayed)
- Authenticated uploads (for future use)

## How It Works

### Upload Flow

1. **User selects image** → Frontend converts to base64
2. **POST to `/api/upload-image`** → API receives base64 image
3. **Upload to Supabase Storage** → Image stored in `images` bucket
4. **Return public URL** → URL saved to database

### API Endpoint

**POST `/api/upload-image`**

Request:
```json
{
  "image": "data:image/png;base64,iVBORw0KGgo...",
  "type": "blog",  // or "event"
  "fileName": "my-image.png"  // optional
}
```

Response:
```json
{
  "success": true,
  "imageUrl": "https://[project].supabase.co/storage/v1/object/public/images/blog/1234567890-abc123.png",
  "filePath": "blog/1234567890-abc123.png",
  "type": "blog",
  "message": "Image uploaded successfully"
}
```

## Frontend Usage

### Using the ImageUpload Component

```tsx
import { ImageUpload } from './ui/ImageUpload';

function MyForm() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      type="blog"  // or "event"
      label="Blog Image"
      required={false}
    />
  );
}
```

### Manual Upload (without component)

```typescript
// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Upload image
const file = event.target.files[0];
const base64 = await fileToBase64(file);

const response = await fetch('/api/upload-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: base64,
    type: 'blog'
  })
});

const { imageUrl } = await response.json();
// Use imageUrl in your blog post/event creation
```

## Creating Blog Post with Uploaded Image

```typescript
// 1. Upload image first
const uploadResponse = await fetch('/api/upload-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: base64Image, type: 'blog' })
});
const { imageUrl } = await uploadResponse.json();

// 2. Create blog post with image URL
const postResponse = await fetch('/api/blog-posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    excerpt: 'Summary',
    author: 'Author Name',
    category: 'Updates',
    imageUrl: imageUrl,  // Use the uploaded image URL
    published: true
  })
});
```

## Creating Event with Uploaded Image

```typescript
// 1. Upload image first
const uploadResponse = await fetch('/api/upload-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: base64Image, type: 'event' })
});
const { imageUrl } = await uploadResponse.json();

// 2. Create event with image URL
const eventResponse = await fetch('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Webinar Title',
    description: 'Description',
    eventDate: '2024-03-15',
    eventTime: '2:00 PM GMT',
    eventType: 'Webinar',
    speaker: 'Speaker Name',
    imageUrl: imageUrl,  // Use the uploaded image URL
    status: 'upcoming'
  })
});
```

## File Size Limits

- **Maximum file size**: 5MB
- **Supported formats**: PNG, JPG, JPEG, GIF, WebP
- **Recommended sizes**:
  - Blog posts: 1200x630px
  - Events: 800x450px

## Storage Structure

Images are organized in Supabase Storage as:
```
images/
  ├── blog/
  │   ├── 1234567890-abc123.png
  │   └── 1234567891-def456.jpg
  └── events/
      ├── 1234567892-ghi789.png
      └── 1234567893-jkl012.jpg
```

## Troubleshooting

### "Failed to upload image"
- Check that Supabase Storage bucket `images` exists
- Verify storage policies allow uploads
- Check file size (must be < 5MB)

### "Invalid base64 format"
- Ensure image is converted to base64 with `data:image/...` prefix
- Use `FileReader.readAsDataURL()` for conversion

### Images not displaying
- Verify bucket is set to **public**
- Check that storage policy allows public read access
- Verify the returned `imageUrl` is accessible

## Security Notes

- Images are stored in a public bucket (anyone with URL can access)
- File names are randomized to prevent guessing
- File size is limited to 5MB
- Only image files are accepted (validated by MIME type)

