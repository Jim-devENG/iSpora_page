# Supabase Backend Setup - Complete Guide

## ✅ Your Supabase Credentials

- **Project URL**: `https://cjpzxwqeonxddilqxilw.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHp4d3Flb254ZGRpbHF4aWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5ODU3NDEsImV4cCI6MjA4MDU2MTc0MX0.QHX05mz3T0rdHn2qdwq2gRc1hdBhJSE7WfYsmw3Rfl8`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHp4d3Flb254ZGRpbHF4aWx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk4NTc0MSwiZXhwIjoyMDgwNTYxNzQxfQ.d_JT-VpqwwmHGBsv6hjSNDQ7tfLxfXeWg2M1F9x6RgU`

## Step 1: Create Environment File

Create a file named `.env.local` in your project root with:

```env
SUPABASE_URL=https://cjpzxwqeonxddilqxilw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHp4d3Flb254ZGRpbHF4aWx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk4NTc0MSwiZXhwIjoyMDgwNTYxNzQxfQ.d_JT-VpqwwmHGBsv6hjSNDQ7tfLxfXeWg2M1F9x6RgU

VITE_SUPABASE_URL=https://cjpzxwqeonxddilqxilw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHp4d3Flb254ZGRpbHF4aWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5ODU3NDEsImV4cCI6MjA4MDU2MTc0MX0.QHX05mz3T0rdHn2qdwq2gRc1hdBhJSE7WfYsmw3Rfl8
```

## Step 2: Set Up Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/cjpzxwqeonxddilqxilw
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-schema.sql`
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 3: Verify Setup

After running the SQL, verify the table was created:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see a `registrations` table
3. Click on it to see the columns

## Step 4: Test Locally

1. Make sure `.env.local` exists with your credentials
2. Restart your dev server:
   ```bash
   npm run dev
   ```
3. Test the registration form
4. Check the admin dashboard to see if data appears

## Step 5: Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add these variables:
   - `SUPABASE_URL` = `https://cjpzxwqeonxddilqxilw.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHp4d3Flb254ZGRpbHF4aWx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDk4NTc0MSwiZXhwIjoyMDgwNTYxNzQxfQ.d_JT-VpqwwmHGBsv6hjSNDQ7tfLxfXeWg2M1F9x6RgU`
4. Redeploy your project

## API Endpoints Ready

Your backend is now ready with these endpoints:

- `POST /api/registrations` - Create new registration
- `GET /api/registrations` - Get all registrations
- `PATCH /api/registrations/[id]` - Update registration status
- `DELETE /api/registrations/[id]` - Delete registration
- `GET /api/dashboard/stats` - Get dashboard statistics

## Troubleshooting

**"Missing Supabase environment variables"**
- Make sure `.env.local` exists in project root
- Restart dev server after creating `.env.local`

**"relation 'registrations' does not exist"**
- Run the SQL schema in Supabase SQL Editor
- Check that the table was created in Table Editor

**"new row violates row-level security policy"**
- Verify RLS policy was created (check in SQL Editor)
- Make sure you're using service_role key in API routes

## Next Steps

✅ Database schema created
✅ API routes configured
✅ Environment variables set
✅ Ready to test!

Test your registration form and admin dashboard to ensure everything works!

