-- iSpora Registrations Table Schema
-- Run this in Supabase SQL Editor

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_country ON registrations(country_of_residence);
CREATE INDEX IF NOT EXISTS idx_registrations_group ON registrations(group_type);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists, then create it
DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop policy if it exists, then create it
DROP POLICY IF EXISTS "Allow public inserts" ON registrations;
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Note: Service role key bypasses RLS, so admin operations will work
-- without additional policies. The service_role key is used in API routes.

