-- Extended iSpora Database Schema
-- Run this AFTER the registrations table is created
-- This adds tables for Blog Posts, Events, and Partner Submissions

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL,
  author_avatar TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Trigger for blog posts updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for blog posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read published posts" ON blog_posts;
CREATE POLICY "Allow public read published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- ============================================
-- EVENTS / WEBINARS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  event_type TEXT CHECK (event_type IN ('Webinar', 'Workshop', 'Panel Discussion', 'Conference', 'Seminar')) NOT NULL,
  speaker TEXT NOT NULL,
  speaker_role TEXT,
  image_url TEXT,
  registration_link TEXT,
  recording_link TEXT,
  status TEXT CHECK (status IN ('upcoming', 'past', 'cancelled')) DEFAULT 'upcoming',
  attendees INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);

-- Trigger for events updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read events" ON events;
CREATE POLICY "Allow public read events" ON events
  FOR SELECT
  USING (true);

-- ============================================
-- PARTNER SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS partner_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Contact Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  linkedin TEXT,
  -- Organization Information
  org_name TEXT NOT NULL,
  org_type TEXT,
  role TEXT,
  org_website TEXT,
  org_social_media TEXT,
  -- Partnership Focus
  partnership_focus TEXT[] DEFAULT '{}',
  other_focus TEXT,
  -- About Your Work
  about_work TEXT,
  -- Partnership Intent
  why_partner TEXT,
  how_contribute TEXT,
  what_expect TEXT,
  -- Additional Notes
  additional_notes TEXT,
  -- Status
  status TEXT CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected', 'contacted')) DEFAULT 'pending',
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_submissions_status ON partner_submissions(status);
CREATE INDEX IF NOT EXISTS idx_partner_submissions_created_at ON partner_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_submissions_email ON partner_submissions(email);
CREATE INDEX IF NOT EXISTS idx_partner_submissions_org_type ON partner_submissions(org_type);

-- Trigger for partner submissions updated_at
DROP TRIGGER IF EXISTS update_partner_submissions_updated_at ON partner_submissions;
CREATE TRIGGER update_partner_submissions_updated_at
  BEFORE UPDATE ON partner_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for partner submissions
ALTER TABLE partner_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public inserts" ON partner_submissions;
CREATE POLICY "Allow public inserts" ON partner_submissions
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- EVENT REGISTRATIONS TABLE (for tracking who registered for events)
-- ============================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  attended BOOLEAN DEFAULT false,
  UNIQUE(event_id, email)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON event_registrations(email);

-- RLS for event registrations
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public event registration" ON event_registrations;
CREATE POLICY "Allow public event registration" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

