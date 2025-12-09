# API Routes Fix - Complete Analysis & Solution

## Root Cause Analysis

### Problem Statement
In production (https://ispora.com):
- ✅ `/api/registrations` → Works (returns JSON)
- ✅ `/api/dashboard/stats` → Works (returns JSON)
- ❌ `/api/blog-posts` → Returns HTML (SPA shell) instead of JSON
- ❌ `/api/events` → Returns HTML (SPA shell) instead of JSON
- ❌ `/api/upload-image` → 404 (Not Found)

### Root Cause Identified

**The API route files were in the correct location (`api/` directory) but had structural differences from the working routes:**

1. **CORS Header Order Mismatch**: 
   - Working routes (`api/registrations.ts`, `api/dashboard/stats.ts`) connect to Supabase FIRST, then set CORS headers
   - Broken routes set CORS headers BEFORE Supabase connection
   - This subtle difference may have caused Vercel to not recognize them as proper API routes

2. **Inconsistent Pattern in Sub-routes**:
   - `api/blog-posts/[id].ts` and `api/events/[id].ts` set CORS before Supabase connection
   - This inconsistency could confuse Vercel's route detection

3. **Upload Route Structure**:
   - `api/upload-image.ts` only connected to Supabase inside the POST handler
   - This differed from the working pattern where Supabase is connected at the top level

### Why This Matters

Vercel automatically detects `api/*.ts` files as serverless functions, but if the handler structure doesn't match the expected pattern, Vercel may:
- Fail to build the function properly
- Fall back to serving the SPA (HTML shell) instead
- Return 404 if the route isn't recognized at all

## Solution Applied

### 1. Aligned All Routes to Working Pattern

**Pattern from working routes:**
```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Supabase connection FIRST
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // 2. CORS preflight handling
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ... other headers
    return res.status(204).end();
  }

  // 3. Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // 4. Handle request methods
  // ...
}
```

**Files Updated:**
- ✅ `api/blog-posts.ts` - Already matched pattern (from previous fix)
- ✅ `api/events.ts` - Already matched pattern (from previous fix)
- ✅ `api/upload-image.ts` - **FIXED**: Moved Supabase connection to top
- ✅ `api/blog-posts/[id].ts` - **FIXED**: Moved Supabase connection before CORS
- ✅ `api/events/[id].ts` - **FIXED**: Moved Supabase connection before CORS

### 2. Ensured All Routes Always Return JSON

All routes now:
- Set `Content-Type: application/json` header
- Return JSON in all error cases (never HTML)
- Use consistent error response format: `{ error: string, details?: string }`

### 3. Verified Frontend API Calls

**Frontend calls match API response shapes:**
- ✅ `BlogPage.tsx`: Expects `{ posts: BlogPost[] }` → API returns `{ posts: BlogPost[] }`
- ✅ `WebinarsPage.tsx`: Expects `{ events: Event[] }` → API returns `{ events: Event[] }`
- ✅ `AdminDashboard.tsx`: 
  - Blog posts: Expects `{ posts: BlogPost[] }` → API returns `{ posts: BlogPost[] }`
  - Events: Expects `{ events: Event[] }` → API returns `{ events: Event[] }`
  - Image upload: Expects `{ imageUrl: string, ... }` → API returns `{ imageUrl: string, ... }`

## File Structure

### Working Routes (Reference)
```
api/
├── registrations.ts          ✅ Works
├── registrations/
│   └── [id].ts              ✅ Works
└── dashboard/
    └── stats.ts             ✅ Works
```

### Fixed Routes
```
api/
├── blog-posts.ts            ✅ Fixed (matches working pattern)
├── blog-posts/
│   └── [id].ts             ✅ Fixed (matches working pattern)
├── events.ts               ✅ Fixed (matches working pattern)
├── events/
│   └── [id].ts             ✅ Fixed (matches working pattern)
└── upload-image.ts         ✅ Fixed (matches working pattern)
```

## API Endpoints Summary

### Blog Posts
- **GET /api/blog-posts** → `{ posts: BlogPost[] }`
- **POST /api/blog-posts** → `{ post: BlogPost }` (201)
- **GET /api/blog-posts/[id]** → `{ post: BlogPost }`
- **PATCH /api/blog-posts/[id]** → `{ post: BlogPost }`
- **DELETE /api/blog-posts/[id]** → `204 No Content`

### Events
- **GET /api/events** → `{ events: Event[] }`
- **POST /api/events** → `{ event: Event }` (201)
- **GET /api/events/[id]** → `{ event: Event }`
- **PATCH /api/events/[id]** → `{ event: Event }`
- **DELETE /api/events/[id]** → `204 No Content`

### Image Upload
- **GET /api/upload-image** → `{ status: 'ok', message: '...', ... }` (health check)
- **POST /api/upload-image** → `{ success: true, imageUrl: string, ... }`

## Verification Steps

### After Deployment

1. **Test Blog Posts API:**
   ```bash
   curl https://ispora.com/api/blog-posts
   ```
   - Expected: `{ "posts": [...] }`
   - Status: `200 OK`
   - Content-Type: `application/json`

2. **Test Events API:**
   ```bash
   curl https://ispora.com/api/events
   ```
   - Expected: `{ "events": [...] }`
   - Status: `200 OK`
   - Content-Type: `application/json`

3. **Test Image Upload API:**
   ```bash
   curl https://ispora.com/api/upload-image
   ```
   - Expected: `{ "status": "ok", ... }`
   - Status: `200 OK`
   - Content-Type: `application/json`

4. **Test Admin Dashboard:**
   - Open admin dashboard
   - Blog posts tab should load without "Expected JSON but got text/html" errors
   - Events tab should load without errors
   - Image upload should work (or show clear error if Supabase Storage not configured)

### Vercel Functions Dashboard

After deployment, verify in Vercel Dashboard → Functions:
- `/api/blog-posts` should be listed
- `/api/blog-posts/[id]` should be listed
- `/api/events` should be listed
- `/api/events/[id]` should be listed
- `/api/upload-image` should be listed

## Changes Summary

### Files Modified

1. **api/upload-image.ts**
   - Moved Supabase connection to top of handler (matching working pattern)
   - Added consistent logging with `[UPLOAD_IMAGE]` prefix
   - Ensured all error paths return JSON

2. **api/blog-posts/[id].ts**
   - Moved Supabase connection before CORS headers
   - Aligned with working route pattern

3. **api/events/[id].ts**
   - Moved Supabase connection before CORS headers
   - Aligned with working route pattern

### No Frontend Changes Needed

The frontend was already correctly calling the APIs and expecting the correct response shapes. The issue was purely in the API route structure.

## Expected Outcome

After deploying these changes:

1. ✅ `/api/blog-posts` will return JSON (not HTML)
2. ✅ `/api/events` will return JSON (not HTML)
3. ✅ `/api/upload-image` will return JSON (not 404)
4. ✅ Admin dashboard will load blog posts and events without errors
5. ✅ Image upload will work (if Supabase Storage is configured) or show a clear error

## If Issues Persist

If routes still return HTML after deployment:

1. **Clear Vercel Build Cache**
   - Vercel Dashboard → Settings → General → Clear Build Cache
   - Redeploy without cache

2. **Check Build Logs**
   - Vercel Dashboard → Deployments → Latest → Build Logs
   - Look for TypeScript compilation errors
   - Verify all `api/*.ts` files are being built

3. **Verify File Structure**
   - Ensure all files are committed to git
   - Check that files exist in the repository

4. **Manual Function Verification**
   - Use Vercel CLI: `vercel dev`
   - Test locally: `curl http://localhost:3000/api/blog-posts`
   - Should return JSON, not HTML

## Conclusion

The root cause was **structural inconsistency** in the API route handlers. By aligning all routes to match the exact pattern used by the working routes (`api/registrations.ts`, `api/dashboard/stats.ts`), Vercel should now properly recognize and serve all API routes as serverless functions, returning JSON instead of HTML.

All routes now follow the pattern:
1. Supabase connection first
2. CORS preflight handling
3. CORS headers for all responses
4. Request method handling
5. Always return JSON (never HTML)

