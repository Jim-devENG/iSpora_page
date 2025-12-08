# How to Check Vercel Functions

## Step-by-Step Instructions

1. **In your Vercel Dashboard**, look at the left sidebar menu
2. **Click on "Functions"** (it should be in the menu, usually below "Deployments")
3. **You should see a list of all serverless functions**

## What to Look For

In the Functions tab, you should see:
- ✅ `/api/registrations` (this one works)
- ✅ `/api/dashboard/stats` (this one works)
- ❌ `/api/blog-posts` (should be here but might be missing)
- ❌ `/api/upload-image` (should be here but might be missing)

## If Functions Are Missing

If `/api/blog-posts` and `/api/upload-image` are NOT in the list:

1. Go to **Deployments** tab
2. Click on the **latest deployment** (the one that says "Ready")
3. Click the **three dots (⋯)** menu
4. Select **"Redeploy"**
5. **IMPORTANT**: Turn OFF "Use existing Build Cache"
6. Click **"Redeploy"**

This will force Vercel to rebuild everything from scratch and should recognize the new API routes.

## Alternative: Check Build Logs

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click on **"Build Logs"** tab
4. Look for any errors about `blog-posts.ts` or `upload-image.ts`
5. Check if TypeScript compilation succeeded

## If Still Not Working

1. Go to **Settings** → **General**
2. Scroll down to find **"Clear Build Cache"** or **"Redeploy"** option
3. Clear the cache and redeploy

