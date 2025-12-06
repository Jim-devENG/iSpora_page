# Supabase Backend Setup Guide

This guide will help you set up a **new** Supabase backend for your iSpora project.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `ispora-backend`
   - **Database Password**: (save this securely!)
   - **Region**: Choose closest to your users
4. Wait for project creation (~2 minutes)

## Step 2: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_country ON registrations(country_of_residence);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for registration form)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow service role full access (for admin API)
-- This is handled automatically by service_role key
```

4. Click **Run** to execute

## Step 3: Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key
   - **service_role** key (⚠️ Keep secret - only for server-side!)

## Step 4: Configure Environment Variables

### Local Development

Create `.env.local`:

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: For frontend (if using Supabase client directly)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Vercel Deployment

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy or push to trigger rebuild

## Step 5: Test Your Backend

The new Supabase API routes are ready at:
- `POST /api/registrations` - Create registration
- `GET /api/registrations` - List all registrations
- `PATCH /api/registrations/[id]` - Update registration
- `DELETE /api/registrations/[id]` - Delete registration
- `GET /api/dashboard/stats` - Get dashboard statistics

## API Endpoints

### Create Registration
```bash
POST /api/registrations
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "whatsapp": "+1234567890",
  "countryOfOrigin": "Ghana",
  "countryOfResidence": "USA",
  "group": "diaspora",
  "ipAddress": "192.168.1.1",
  "location": {
    "city": "New York",
    "country": "USA",
    "timezone": "America/New_York"
  }
}
```

### Get All Registrations
```bash
GET /api/registrations
```

### Update Registration Status
```bash
PATCH /api/registrations/[id]
Content-Type: application/json

{
  "status": "verified"
}
```

### Delete Registration
```bash
DELETE /api/registrations/[id]
```

### Get Dashboard Stats
```bash
GET /api/dashboard/stats
```

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Run SQL schema
3. ✅ Add environment variables
4. ✅ Test API endpoints
5. ✅ Deploy to Vercel

## Troubleshooting

**"Missing Supabase environment variables"**
- Check `.env.local` exists and has correct values
- Restart dev server after adding env vars

**"relation 'registrations' does not exist"**
- Run the SQL schema in Supabase SQL Editor

**"new row violates row-level security policy"**
- Verify you're using `service_role` key in API routes
- Check RLS policies are created correctly

