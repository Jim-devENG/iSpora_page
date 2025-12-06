# Complete Supabase Backend Setup

## ✅ What's Been Created

### Database Tables
1. **registrations** - User registrations (Local & Diaspora)
2. **blog_posts** - Blog articles and news
3. **events** - Webinars, workshops, and programs
4. **partner_submissions** - Partnership interest forms
5. **event_registrations** - Track who registered for events

### API Endpoints

#### Registrations
- `POST /api/registrations` - Create registration
- `GET /api/registrations` - List all registrations
- `PATCH /api/registrations/[id]` - Update status
- `DELETE /api/registrations/[id]` - Delete registration
- `GET /api/dashboard/stats` - Dashboard statistics

#### Blog Posts
- `GET /api/blog-posts` - List all published posts
- `GET /api/blog-posts?featured=true` - Get featured posts
- `GET /api/blog-posts?category=Updates` - Filter by category
- `POST /api/blog-posts` - Create new post (supports `imageUrl` field)

#### Events
- `GET /api/events` - List all events
- `GET /api/events?status=upcoming` - Get upcoming events
- `GET /api/events?status=past` - Get past events
- `POST /api/events` - Create new event (supports `imageUrl` field)

#### Partners
- `GET /api/partners` - List all partner submissions
- `GET /api/partners?status=pending` - Filter by status
- `POST /api/partners` - Submit partnership interest

## 📋 Setup Steps

### 1. Run Database Schema

Go to Supabase SQL Editor and run:
1. First: `supabase-schema.sql` (creates registrations table)
2. Then: `supabase-schema-extended.sql` (creates blog, events, partners tables)
3. Finally: `supabase-storage-setup.sql` (creates storage bucket for image uploads)

### 2. Environment Variables

Already created in `.env.local`:
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`

### 3. Frontend Integration

✅ **PartnersPage** - Now submits to `/api/partners`
✅ **BlogPage** - Fetches from `/api/blog-posts` (with fallback)
✅ **WebinarsPage** - Fetches from `/api/events` (with fallback)
✅ **AdminDashboard** - Has tabs for Blog, Events, and Partners

## 🎯 Next Steps

1. **Run the extended SQL schema** in Supabase
2. **Test the forms:**
   - Partners form submission
   - Registration form
3. **Add content via API:**
   - Create blog posts via `POST /api/blog-posts`
   - Create events via `POST /api/events`
4. **View in Admin Dashboard:**
   - Check all tabs (Registrations, Blog, Events, Partners)

## 📝 API Usage Examples

### Create Blog Post
```bash
POST /api/blog-posts
{
  "title": "New Article",
  "excerpt": "Article summary",
  "author": "Author Name",
  "category": "Updates",
  "imageUrl": "https://example.com/image.jpg",  // Optional: Image URL
  "published": true,
  "featured": false
}
```

### Create Event
```bash
POST /api/events
{
  "title": "Webinar Title",
  "description": "Event description",
  "eventDate": "2024-03-15",
  "eventTime": "2:00 PM GMT",
  "eventType": "Webinar",
  "speaker": "Speaker Name",
  "imageUrl": "https://example.com/event-image.jpg",  // Optional: Image URL
  "status": "upcoming"
}
```

## 📸 Image Support

Both **Blog Posts** and **Events** support images through the `imageUrl` field:
- ✅ Database has `image_url` columns
- ✅ API accepts `imageUrl` (camelCase) or `image_url` (snake_case)
- ✅ **File upload support** - Upload images directly via `/api/upload-image`
- ✅ Frontend `ImageUpload` component for easy image selection
- ✅ Images stored in Supabase Storage
- ✅ See `IMAGE_UPLOAD_SETUP.md` for upload setup and usage
- ✅ See `API_IMAGE_GUIDE.md` for detailed image usage

All backend infrastructure is ready! Just run the SQL schemas and start using the APIs.

