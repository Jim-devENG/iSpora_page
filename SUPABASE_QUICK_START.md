# Supabase Quick Start Guide

## ✅ What's Been Done

1. ✅ Installed `@supabase/supabase-js` package
2. ✅ Created Supabase client library (`api/_lib/supabase.ts`)
3. ✅ Updated all API routes to use Supabase:
   - `api/registrations.ts` - Create and list registrations
   - `api/registrations/[id].ts` - Update and delete registrations
   - `api/dashboard/stats.ts` - Dashboard statistics

## 🚀 Next Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: `ispora`
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 2. Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL from `SUPABASE_MIGRATION_GUIDE.md` (Step 2)
4. Click **Run** to execute

### 3. Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ Keep this secret!)

### 4. Set Environment Variables

#### For Local Development

Create `.env.local` in your project root:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

#### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `SUPABASE_URL` = Your project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Your service role key
4. Remove old MongoDB variables:
   - `MONGODB_URI` (if exists)
   - `MONGODB_DB` (if exists)

### 5. Test Locally

```bash
npm run dev
```

Test the registration form and admin dashboard to ensure everything works.

### 6. Deploy to Vercel

```bash
vercel --prod
```

Or push to your Git repository and Vercel will auto-deploy.

## 🔍 Testing Checklist

- [ ] Registration form submits successfully
- [ ] Admin dashboard loads registrations
- [ ] Dashboard stats display correctly
- [ ] Can update registration status
- [ ] Can delete registrations
- [ ] Top countries display correctly

## 📝 Notes

- **MongoDB/Mongoose**: Still installed but no longer used. You can remove it later with `npm uninstall mongoose`
- **Old API routes**: The MongoDB code is replaced but files remain for reference
- **Data Migration**: If you have existing data in MongoDB, see the migration guide for export/import steps

## 🆘 Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure `.env.local` exists and has correct values
- Restart your dev server after adding env vars

**Error: "relation 'registrations' does not exist"**
- Run the SQL schema from the migration guide in Supabase SQL Editor

**Error: "new row violates row-level security policy"**
- Check that you're using `service_role` key (not `anon` key) in API routes
- Verify RLS policies are set up correctly

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- Full migration guide: See `SUPABASE_MIGRATION_GUIDE.md`

