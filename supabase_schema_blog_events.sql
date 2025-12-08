-- Supabase Schema for Blog Posts and Events
-- Run this in your Supabase SQL Editor
-- 
-- IMPORTANT: If you have existing tables with the OLD schema, run:
--   1. supabase_migration_blog_events.sql (migrates existing data)
--   2. Then this file (creates new schema if tables don't exist)
--
-- If starting fresh, just run this file.

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  author_name TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT blog_posts_slug_unique UNIQUE (slug)
);

-- Indexes for blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Trigger function for updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog_posts updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read of published posts
DROP POLICY IF EXISTS "Allow public read published posts" ON blog_posts;
CREATE POLICY "Allow public read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Policy: Allow service role full access (for API routes)
DROP POLICY IF EXISTS "Allow service role full access" ON blog_posts;
CREATE POLICY "Allow service role full access" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  location TEXT,
  registration_link TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for events
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_at ON events(start_at ASC);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- Trigger for events updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read of published events
DROP POLICY IF EXISTS "Allow public read published events" ON events;
CREATE POLICY "Allow public read published events" ON events
  FOR SELECT
  USING (status = 'published');

-- Policy: Allow service role full access (for API routes)
DROP POLICY IF EXISTS "Allow service role full access" ON events;
CREATE POLICY "Allow service role full access" ON events
  FOR ALL
  USING (true)
  WITH CHECK (true);

