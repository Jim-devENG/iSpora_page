# Supabase Migration Guide

This guide will help you migrate from MongoDB (Render) to Supabase (PostgreSQL).

## Step 1: Set Up Supabase Project

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in

2. **Create a New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: `ispora`
   - Set a database password (save this securely!)
   - Choose a region close to your users
   - Click "Create new project"

3. **Get Your Connection Details**
   - Go to Project Settings → API
   - Copy your:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - `anon` public key
     - `service_role` key (keep this secret!)

## Step 2: Create Database Schema

1. **Go to SQL Editor** in Supabase Dashboard
2. **Run this SQL** to create the registrations table:

```sql
-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  country_of_origin TEXT NOT NULL,
  country_of_residence TEXT NOT NULL,
  group_type TEXT CHECK (group_type IN ('local', 'diaspora')) DEFAULT 'diaspora',
  ip_address TEXT,
  location JSONB,
  status TEXT CHECK (status IN ('pending', 'active', 'verified')) DEFAULT 'pending',
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for registrations)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Create policy for service role to read all (for admin dashboard)
-- This will be handled by service_role key in API routes
```

## Step 3: Install Supabase Client

Run this command in your project:

```bash
npm install @supabase/supabase-js
```

## Step 4: Update Environment Variables

1. **Create/Update `.env.local`** (for local development):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# For API routes (server-side)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. **Update Vercel Environment Variables**:
   - Go to your Vercel project settings
   - Add these environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - Remove old `MONGODB_URI` and `MONGODB_DB`

## Step 5: Migration Complete!

The code has been updated to use Supabase. Test locally first:

```bash
npm run dev
```

Then deploy to Vercel:

```bash
vercel --prod
```

## Data Migration (If You Have Existing Data)

If you have existing registrations in MongoDB, you'll need to export and import them:

1. **Export from MongoDB**:
   ```bash
   mongoexport --uri="your_mongodb_uri" --collection=registrations --out=registrations.json
   ```

2. **Transform and Import to Supabase**:
   - Use the Supabase dashboard SQL editor
   - Or create a migration script (see below)

## Troubleshooting

- **Connection Issues**: Make sure your Supabase project is active
- **RLS Errors**: Check that service_role key is used in API routes
- **Type Errors**: Make sure TypeScript types match the new schema

## Next Steps

- Set up Supabase Auth if needed
- Configure backups
- Set up monitoring
- Consider using Supabase Realtime for live updates

