# Blog & Events Backend - Supabase Implementation

## Overview

Complete Supabase-backed backend for blog posts and events with proper JSON API routes.

## Database Schema

### Table: `blog_posts`

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  author_name TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table: `events`

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  location TEXT,
  registration_link TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Note**: Run `supabase_schema_blog_events.sql` in your Supabase SQL Editor to create these tables.

## API Routes

### Blog Posts

#### `GET /api/blog-posts`

**Query Parameters:**
- `status` (optional): `'draft'` | `'published'` | `'archived'` | `'all'` (default: `'published'`)
- `limit` (optional): Number (default: 20, max: 100)

**Response:**
```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "content": "string",
      "excerpt": "string | null",
      "tags": ["string"] | null,
      "status": "draft" | "published" | "archived",
      "cover_image_url": "string | null",
      "author_name": "string | null",
      "published_at": "ISO8601 string | null",
      "created_at": "ISO8601 string",
      "updated_at": "ISO8601 string"
    }
  ]
}
```

**Example:**
```bash
GET /api/blog-posts?status=published&limit=10
```

#### `POST /api/blog-posts`

**Request Body:**
```json
{
  "title": "string (required)",
  "slug": "string (required)",
  "content": "string (required)",
  "excerpt": "string (optional)",
  "tags": ["string"] (optional),
  "status": "draft" | "published" | "archived" (optional, default: "draft"),
  "cover_image_url": "string (optional)",
  "author_name": "string (optional)",
  "published_at": "ISO8601 string (optional)"
}
```

**Response:**
```json
{
  "post": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "content": "string",
    "excerpt": "string | null",
    "tags": ["string"] | null,
    "status": "draft" | "published" | "archived",
    "cover_image_url": "string | null",
    "author_name": "string | null",
    "published_at": "ISO8601 string | null",
    "created_at": "ISO8601 string",
    "updated_at": "ISO8601 string"
  }
}
```

**Status Code:** `201 Created`

**Note:** If `status` is `'published'` and `published_at` is not provided, it will be set to the current timestamp.

#### `GET /api/blog-posts/[id]`

**Response:**
```json
{
  "post": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "content": "string",
    "excerpt": "string | null",
    "tags": ["string"] | null,
    "status": "draft" | "published" | "archived",
    "cover_image_url": "string | null",
    "author_name": "string | null",
    "published_at": "ISO8601 string | null",
    "created_at": "ISO8601 string",
    "updated_at": "ISO8601 string"
  }
}
```

**Status Code:** `200 OK` or `404 Not Found`

#### `PATCH /api/blog-posts/[id]`

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "slug": "string",
  "content": "string",
  "excerpt": "string",
  "tags": ["string"],
  "status": "draft" | "published" | "archived",
  "cover_image_url": "string",
  "author_name": "string",
  "published_at": "ISO8601 string"
}
```

**Response:**
```json
{
  "post": {
    // Updated blog post object
  }
}
```

**Status Code:** `200 OK` or `404 Not Found`

#### `DELETE /api/blog-posts/[id]`

**Response:** `204 No Content` (on success) or `404 Not Found`

---

### Events

#### `GET /api/events`

**Query Parameters:**
- `status` (optional): `'draft'` | `'published'` | `'archived'` | `'all'` (default: `'published'`)
- `upcoming` (optional): `'true'` | `'false'` (default: `'true'` if status is not `'all'`)
- `limit` (optional): Number (default: 20, max: 100)

**Response:**
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string | null",
      "start_at": "ISO8601 string",
      "end_at": "ISO8601 string | null",
      "location": "string | null",
      "registration_link": "string | null",
      "status": "draft" | "published" | "archived",
      "cover_image_url": "string | null",
      "created_at": "ISO8601 string",
      "updated_at": "ISO8601 string"
    }
  ]
}
```

**Example:**
```bash
GET /api/events?status=published&upcoming=true&limit=10
```

#### `POST /api/events`

**Request Body:**
```json
{
  "title": "string (required)",
  "start_at": "ISO8601 string (required)",
  "description": "string (optional)",
  "end_at": "ISO8601 string (optional)",
  "location": "string (optional)",
  "registration_link": "string (optional)",
  "status": "draft" | "published" | "archived" (optional, default: "draft"),
  "cover_image_url": "string (optional)"
}
```

**Response:**
```json
{
  "event": {
    "id": "uuid",
    "title": "string",
    "description": "string | null",
    "start_at": "ISO8601 string",
    "end_at": "ISO8601 string | null",
    "location": "string | null",
    "registration_link": "string | null",
    "status": "draft" | "published" | "archived",
    "cover_image_url": "string | null",
    "created_at": "ISO8601 string",
    "updated_at": "ISO8601 string"
  }
}
```

**Status Code:** `201 Created`

#### `GET /api/events/[id]`

**Response:**
```json
{
  "event": {
    "id": "uuid",
    "title": "string",
    "description": "string | null",
    "start_at": "ISO8601 string",
    "end_at": "ISO8601 string | null",
    "location": "string | null",
    "registration_link": "string | null",
    "status": "draft" | "published" | "archived",
    "cover_image_url": "string | null",
    "created_at": "ISO8601 string",
    "updated_at": "ISO8601 string"
  }
}
```

**Status Code:** `200 OK` or `404 Not Found`

#### `PATCH /api/events/[id]`

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "description": "string",
  "start_at": "ISO8601 string",
  "end_at": "ISO8601 string",
  "location": "string",
  "registration_link": "string",
  "status": "draft" | "published" | "archived",
  "cover_image_url": "string"
}
```

**Response:**
```json
{
  "event": {
    // Updated event object
  }
}
```

**Status Code:** `200 OK` or `404 Not Found`

#### `DELETE /api/events/[id]`

**Response:** `204 No Content` (on success) or `404 Not Found`

---

## Error Responses

All endpoints return JSON error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

**Common Status Codes:**
- `400 Bad Request` - Invalid request body or parameters
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - HTTP method not supported
- `500 Internal Server Error` - Server error

---

## Frontend Integration

### Blog Posts

**Fetching Posts:**
```typescript
const response = await fetchJson<{ posts: BlogPost[] }>('/api/blog-posts?status=published');
const posts = response.posts;
```

**Creating Post:**
```typescript
const response = await fetchJson<{ post: BlogPost }>('/api/blog-posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Post',
    slug: 'my-post',
    content: 'Post content...',
    status: 'published'
  })
});
const newPost = response.post;
```

### Events

**Fetching Events:**
```typescript
const response = await fetchJson<{ events: Event[] }>('/api/events?status=published&upcoming=true');
const events = response.events;
```

**Creating Event:**
```typescript
const response = await fetchJson<{ event: Event }>('/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Event',
    start_at: new Date().toISOString(),
    status: 'published'
  })
});
const newEvent = response.event;
```

---

## TypeScript Types

Types are defined in `api/_types/content.ts`:

- `BlogPost` - Blog post interface
- `Event` - Event interface
- `BlogPostStatus` - `'draft' | 'published' | 'archived'`
- `EventStatus` - `'draft' | 'published' | 'archived'`
- `BlogPostsResponse` - `{ posts: BlogPost[] }`
- `BlogPostResponse` - `{ post: BlogPost }`
- `EventsResponse` - `{ events: Event[] }`
- `EventResponse` - `{ event: Event }`
- `ApiError` - `{ error: string, details?: string }`

---

## Implementation Details

### Logging

All API routes use structured logging with tags:
- `[BLOG_POSTS_GET]` - Blog posts list fetch
- `[BLOG_POSTS_POST]` - Blog post creation
- `[BLOG_POSTS_GET_ID]` - Single blog post fetch
- `[BLOG_POSTS_PATCH_ID]` - Blog post update
- `[BLOG_POSTS_DELETE_ID]` - Blog post deletion
- `[EVENTS_GET]` - Events list fetch
- `[EVENTS_POST]` - Event creation
- `[EVENTS_GET_ID]` - Single event fetch
- `[EVENTS_PATCH_ID]` - Event update
- `[EVENTS_DELETE_ID]` - Event deletion

### CORS

All endpoints set CORS headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS,PATCH`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Content-Type: application/json`

### Error Handling

- All errors are caught and logged with context
- Errors return JSON (never HTML)
- Descriptive error messages for validation failures
- Proper HTTP status codes

---

## Migration Notes

### From Old Schema

If you have existing data in the old schema (`supabase-schema-extended.sql`), you'll need to migrate:

**Old blog_posts fields → New fields:**
- `image_url` → `cover_image_url`
- `author` → `author_name`
- `published` (boolean) → `status` ('draft' | 'published' | 'archived')
- `category` → `tags` (array)
- Remove: `author_avatar`, `read_time`, `featured`, `likes`, `comments`, `views`

**Old events fields → New fields:**
- `image_url` → `cover_image_url`
- `event_date` + `event_time` → `start_at` (TIMESTAMPTZ)
- `status` ('upcoming' | 'past' | 'cancelled') → `status` ('draft' | 'published' | 'archived')
- Remove: `event_type`, `speaker`, `speaker_role`, `attendees`, `views`, `max_attendees`, `recording_link`

---

## Testing

1. **Create a blog post:**
   ```bash
   curl -X POST https://ispora.com/api/blog-posts \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Post","slug":"test-post","content":"Content here","status":"published"}'
   ```

2. **List blog posts:**
   ```bash
   curl https://ispora.com/api/blog-posts?status=published
   ```

3. **Create an event:**
   ```bash
   curl -X POST https://ispora.com/api/events \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Event","start_at":"2024-12-31T10:00:00Z","status":"published"}'
   ```

4. **List events:**
   ```bash
   curl https://ispora.com/api/events?status=published&upcoming=true
   ```

---

## Files Changed

### Created
- `api/_types/content.ts` - TypeScript types
- `supabase_schema_blog_events.sql` - Database schema
- `BLOG_EVENTS_BACKEND_SUPABASE.md` - This documentation

### Updated
- `api/blog-posts.ts` - Complete rewrite with new schema
- `api/blog-posts/[id].ts` - Complete rewrite with new schema
- `api/events.ts` - Complete rewrite with new schema
- `api/events/[id].ts` - Complete rewrite with new schema
- `components/BlogPage.tsx` - Updated to use new API response shape
- `components/WebinarsPage.tsx` - Updated to use new API response shape
- `components/AdminDashboard.tsx` - Updated to use new API response shape

---

## Next Steps

1. Run `supabase_schema_blog_events.sql` in Supabase SQL Editor
2. Test all API endpoints
3. Verify frontend displays data correctly
4. Migrate existing data if needed (see Migration Notes above)

