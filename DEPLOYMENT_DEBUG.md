# Deployment Debugging Guide

## API Route Pattern

**This project uses Vercel Serverless Functions:**

- **Location:** API routes live in `api/*.ts` (root level `api/` directory)
- **Handler Style:** `export default async function handler(req: VercelRequest, res: VercelResponse)`
- **Configuration:** Defined in `vercel.json` with pattern `"api/**/*.ts"` and `maxDuration: 30`
- **Working Examples:**
  - `/api/registrations` → `api/registrations.ts`
  - `/api/dashboard/stats` → `api/dashboard/stats.ts`

**All API routes must:**
1. Be in the `api/` directory (not `pages/api/`, not `app/api/`)
2. Export a default async function handler
3. Use `VercelRequest` and `VercelResponse` types from `@vercel/node`
4. Always return JSON (never HTML)

## How to Verify a Deployment is Actually Updated

### Step 1: Check Debug Endpoint

After deployment, hit the debug endpoint in your browser:

```
https://ispora.com/api/debug-alive
```

**Expected Response:**
```json
{
  "ok": true,
  "route": "/api/debug-alive",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "commitHint": "debug-v2-clean-rebuild"
}
```

**What to Check:**
- ✅ Status: `200 OK`
- ✅ Content-Type: `application/json` (not `text/html`)
- ✅ Response is JSON (not HTML page)
- ✅ `commitHint` matches the current deployment (update this in `api/debug-alive.ts` when deploying new versions)

**If you see HTML or 404:**
- The deployment may not have picked up the new code
- Check Vercel build logs for errors
- Verify the file `api/debug-alive.ts` exists in the repository

### Step 2: Verify Blog Posts Route

```
https://ispora.com/api/blog-posts
```

**Expected Response:**
```json
{
  "posts": [...]
}
```

**What to Check:**
- ✅ Status: `200 OK`
- ✅ Content-Type: `application/json`
- ✅ Response is JSON with `posts` array (not HTML)
- ✅ No "Expected JSON but got text/html" errors in browser console

### Step 3: Verify Events Route

```
https://ispora.com/api/events
```

**Expected Response:**
```json
{
  "events": [...]
}
```

**What to Check:**
- ✅ Status: `200 OK`
- ✅ Content-Type: `application/json`
- ✅ Response is JSON with `events` array (not HTML)
- ✅ No "Expected JSON but got text/html" errors in browser console

### Step 4: Verify Upload Image Route

```
https://ispora.com/api/upload-image
```

**Expected Response (POST):**
```json
{
  "error": "Image upload is not implemented yet. Please configure Supabase Storage and update /api/upload-image."
}
```

**What to Check:**
- ✅ Status: `501 Not Implemented` (not `404 Not Found`)
- ✅ Content-Type: `application/json`
- ✅ Response is JSON error (not HTML "Page not found")
- ✅ No 404 errors in browser console

## Troubleshooting

### Routes Return HTML Instead of JSON

**Possible Causes:**
1. **Routes not in correct location:** Ensure files are in `api/` directory, not `pages/api/` or `app/api/`
2. **Build failure:** Check Vercel build logs - if build fails, old deployment may still be serving
3. **Vercel not recognizing routes:** Verify `vercel.json` has `"api/**/*.ts"` pattern
4. **File naming:** Ensure files are `.ts` (TypeScript) and match the route name exactly

**Solution:**
- Verify file paths match working routes exactly
- Check Vercel build logs for TypeScript compilation errors
- Ensure `vercel.json` configuration is correct
- Clear Vercel build cache and redeploy

### Routes Return 404

**Possible Causes:**
1. **File doesn't exist:** Check that the file exists in the repository
2. **Build didn't include file:** Check Vercel build logs
3. **Wrong export:** Ensure `export default async function handler` is used
4. **Vercel function limit:** Hobby plan has 12 function limit - check if exceeded

**Solution:**
- Verify file exists in `api/` directory
- Check Vercel Functions dashboard to see if route is listed
- Verify export statement matches working routes
- Check function count in Vercel dashboard

### Build Fails in Vercel

**Important:** If build fails, production will keep serving the **last successful deployment**.

**What to Do:**
1. Check Vercel build logs for specific errors
2. Fix TypeScript compilation errors
3. Verify all imports are correct
4. Ensure environment variables are set in Vercel
5. Redeploy after fixing errors

### Routes Work Locally But Not in Production

**Possible Causes:**
1. **Environment variables:** Supabase credentials may not be set in Vercel
2. **Build cache:** Old cached build may be serving
3. **Deployment not triggered:** Changes may not have been committed/pushed

**Solution:**
1. Verify environment variables in Vercel Dashboard → Settings → Environment Variables
2. Clear build cache and redeploy
3. Ensure changes are committed and pushed to trigger deployment

## Quick Verification Checklist

After each deployment:

- [ ] Hit `/api/debug-alive` → See JSON with current `commitHint`
- [ ] Hit `/api/blog-posts` → See JSON `{ posts: [...] }`
- [ ] Hit `/api/events` → See JSON `{ events: [...] }`
- [ ] Test POST to `/api/upload-image` → See JSON 501 error (not 404 HTML)
- [ ] Open admin dashboard → No "Expected JSON but got text/html" errors
- [ ] Check browser console → No 404 errors for API routes

## File Locations Summary

**Working Routes (Reference):**
- `/api/registrations` → `api/registrations.ts`
- `/api/dashboard/stats` → `api/dashboard/stats.ts`

**Rebuilt Routes:**
- `/api/blog-posts` → `api/blog-posts.ts`
- `/api/events` → `api/events.ts`
- `/api/upload-image` → `api/upload-image.ts`
- `/api/debug-alive` → `api/debug-alive.ts`

**Legacy Routes (Not Used):**
- `netlify/functions/*.js` - Legacy Netlify functions (not used in Vercel deployment)

## What Was Wrong Before

The routes (`/api/blog-posts`, `/api/events`, `/api/upload-image`) were implemented in the correct location (`api/` directory) but may have had:

1. **Structural differences** from working routes that prevented Vercel from recognizing them
2. **Build/deployment issues** where changes weren't being picked up
3. **Missing or incorrect exports** that caused Vercel to not deploy them as functions

**Solution Applied:**
- Complete rebuild from scratch following exact pattern of working routes
- Added debug endpoint to verify deployments
- Added pattern documentation comments to all route files
- Ensured all routes match working pattern exactly: Supabase connection → OPTIONS → CORS → Methods

## Next Steps After Deployment

1. **Immediately after deployment:**
   - Visit `https://ispora.com/api/debug-alive` → Confirm JSON response
   - Visit `https://ispora.com/api/blog-posts` → Confirm JSON response
   - Visit `https://ispora.com/api/events` → Confirm JSON response

2. **Test admin dashboard:**
   - Open admin dashboard
   - Check blog posts tab loads without errors
   - Check events tab loads without errors
   - Verify no console errors

3. **If issues persist:**
   - Check Vercel build logs
   - Verify environment variables are set
   - Clear build cache and redeploy
   - Check Vercel Functions dashboard to see if routes are listed

