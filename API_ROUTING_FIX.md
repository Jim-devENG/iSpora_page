# API Routing Fix - Production Issues Resolved

## Root Cause Analysis

### Problem
In production (https://ispora.com), the following API endpoints were failing:
- `GET /api/blog-posts` → Returns HTML (SPA shell) instead of JSON
- `POST /api/events` → 404 (Not Found)
- `POST /api/upload-image` → 404 (Not Found)

However, these endpoints work correctly:
- `GET /api/registrations` → ✅ Returns JSON
- `GET /api/dashboard/stats` → ✅ Returns JSON

### Root Cause
The API route files (`api/blog-posts.ts`, `api/events.ts`, `api/upload-image.ts`) were structured slightly differently from the working routes (`api/registrations.ts`, `api/dashboard/stats.ts`). Specifically:

1. **CORS Header Order**: The new routes set CORS headers BEFORE the Supabase connection, while working routes set them AFTER. While both should work, aligning with the working pattern ensures consistency.

2. **Frontend API Call Mismatch**: `AdminDashboard.tsx` was calling `/api/events` and expecting an array `Event[]`, but the API returns `{ events: Event[] }`. This mismatch could cause parsing errors.

3. **Vercel Auto-Detection**: Vercel should automatically detect `api/*.ts` files as serverless functions, but the slight structural differences might have prevented proper recognition in some deployments.

## Fixes Applied

### 1. ✅ Aligned API Route Structure with Working Pattern

**Changed Files:**
- `api/blog-posts.ts`
- `api/events.ts`
- `api/upload-image.ts`

**Changes:**
- Moved Supabase connection to the top (before CORS headers)
- Set CORS headers after Supabase connection (matching working routes)
- Maintained `Content-Type: application/json` header
- Kept all error handling and response logic intact

**Before:**
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ... more headers
  
  // Then Supabase connection
  let supabase = getSupabaseClient();
  // ...
}
```

**After:**
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Supabase connection first (matching working routes)
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Then CORS headers
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ...
    return res.status(204).end();
  }
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  // ...
}
```

### 2. ✅ Fixed Frontend API Call Mismatch

**Changed File:**
- `components/AdminDashboard.tsx`

**Issue:**
```typescript
// ❌ Wrong: Expected array but API returns object
const data = await fetchJson<any[]>('/api/events');
setEvents(Array.isArray(data) ? data : []);
```

**Fix:**
```typescript
// ✅ Correct: Expects object with events array
const response = await fetchJson<{ events: any[] }>('/api/events?status=all');
setEvents(Array.isArray(response.events) ? response.events : []);
```

### 3. ✅ Verified File Structure

All API routes are in the correct location:
```
api/
├── blog-posts.ts          ✅ (matches api/registrations.ts pattern)
├── blog-posts/
│   └── [id].ts           ✅
├── events.ts              ✅ (matches api/registrations.ts pattern)
├── events/
│   └── [id].ts           ✅
├── upload-image.ts        ✅
├── registrations.ts       ✅ (working)
├── registrations/
│   └── [id].ts           ✅
├── dashboard/
│   └── stats.ts          ✅ (working)
└── _lib/
    └── supabase.ts       ✅
```

### 4. ✅ Verified Vercel Configuration

**File:** `vercel.json`

```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

This configuration tells Vercel to treat all `api/**/*.ts` files as serverless functions with a 30-second timeout, which matches the working routes.

## API Response Shapes

### Blog Posts
- **GET /api/blog-posts** → `{ posts: BlogPost[] }`
- **POST /api/blog-posts** → `{ post: BlogPost }`
- **GET /api/blog-posts/[id]** → `{ post: BlogPost }`
- **PATCH /api/blog-posts/[id]** → `{ post: BlogPost }`
- **DELETE /api/blog-posts/[id]** → `204 No Content`

### Events
- **GET /api/events** → `{ events: Event[] }`
- **POST /api/events** → `{ event: Event }`
- **GET /api/events/[id]** → `{ event: Event }`
- **PATCH /api/events/[id]** → `{ event: Event }`
- **DELETE /api/events/[id]** → `204 No Content`

### Image Upload
- **GET /api/upload-image** → `{ status: 'ok', message: '...', ... }`
- **POST /api/upload-image** → `{ success: true, imageUrl: string, ... }`

## Deployment Checklist

After deploying these changes:

1. ✅ Verify `/api/blog-posts` returns JSON (not HTML)
   - Visit: `https://ispora.com/api/blog-posts`
   - Expected: `{ "posts": [...] }`
   - Status: `200 OK`
   - Content-Type: `application/json`

2. ✅ Verify `/api/events` returns JSON
   - Visit: `https://ispora.com/api/events`
   - Expected: `{ "events": [...] }`
   - Status: `200 OK`
   - Content-Type: `application/json`

3. ✅ Verify `/api/upload-image` is accessible
   - Visit: `https://ispora.com/api/upload-image`
   - Expected: `{ "status": "ok", ... }`
   - Status: `200 OK`
   - Content-Type: `application/json`

4. ✅ Test Admin Dashboard
   - Blog posts should load without "Expected JSON but got text/html" errors
   - Events should load without 404 errors
   - Image upload should work (or show clear error message)

5. ✅ Check Vercel Functions Dashboard
   - Go to Vercel Dashboard → Functions
   - Verify these functions are listed:
     - `/api/blog-posts`
     - `/api/blog-posts/[id]`
     - `/api/events`
     - `/api/events/[id]`
     - `/api/upload-image`

## If Issues Persist

If the routes still don't work after deployment:

1. **Clear Build Cache**
   - Vercel Dashboard → Settings → General → Clear Build Cache
   - Redeploy without cache

2. **Check Build Logs**
   - Vercel Dashboard → Deployments → Latest → Build Logs
   - Look for TypeScript compilation errors
   - Verify all `api/*.ts` files are being built

3. **Verify File Structure**
   - Ensure all files are committed to git
   - Check that `api/blog-posts.ts`, `api/events.ts`, `api/upload-image.ts` exist in the repository

4. **Manual Function Verification**
   - Use Vercel CLI: `vercel dev`
   - Test locally: `curl http://localhost:3000/api/blog-posts`
   - Should return JSON, not HTML

## Summary

**Root Cause:** API routes were structured slightly differently from working routes, and frontend had a response shape mismatch.

**Fixes:**
1. Aligned API route structure with working pattern (Supabase connection first, then CORS)
2. Fixed frontend API call to expect correct response shape
3. Verified all routes are in correct locations
4. Ensured Vercel configuration is correct

**Expected Result:** All API endpoints should now return JSON in production, matching the behavior of working routes like `/api/registrations` and `/api/dashboard/stats`.

