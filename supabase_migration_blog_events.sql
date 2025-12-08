-- Migration Script: Old Schema → New Schema
-- This migrates existing blog_posts and events tables to the new schema
-- Run this FIRST if you have existing tables with the old schema
--
-- IMPORTANT: Run this BEFORE running supabase_schema_blog_events.sql

-- ============================================
-- MIGRATE BLOG_POSTS TABLE
-- ============================================

-- Step 1: Add new columns (if they don't exist)
DO $$ 
DECLARE
  row_count INTEGER;
BEGIN
  -- Add slug column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'slug') THEN
    ALTER TABLE blog_posts ADD COLUMN slug TEXT;
    
    -- Generate slugs from titles for ALL existing posts
    -- Handle edge cases: NULL titles, empty titles, titles with only special characters
    UPDATE blog_posts 
    SET slug = CASE
      WHEN title IS NULL OR TRIM(title) = '' THEN 
        'post-' || id::text
      ELSE
        -- Generate slug from title, fallback to id if result is empty
        COALESCE(
          NULLIF(
            LOWER(REGEXP_REPLACE(TRIM(title), '[^a-zA-Z0-9]+', '-', 'g')),
            ''
          ),
          'post-' || id::text
        )
    END
    WHERE slug IS NULL;
    
    -- Handle duplicate slugs by appending a counter
    -- This ensures uniqueness before adding the constraint
    WITH numbered_slugs AS (
      SELECT 
        id,
        slug,
        ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at) as rn
      FROM blog_posts
      WHERE slug IS NOT NULL
    )
    UPDATE blog_posts bp
    SET slug = CASE
      WHEN ns.rn > 1 THEN ns.slug || '-' || (ns.rn - 1)
      ELSE ns.slug
    END
    FROM numbered_slugs ns
    WHERE bp.id = ns.id AND ns.rn > 1;
    
    -- Verify all rows have non-NULL, non-empty slugs
    SELECT COUNT(*) INTO row_count
    FROM blog_posts
    WHERE slug IS NULL OR slug = '';
    
    IF row_count > 0 THEN
      -- Fallback: use id for any remaining NULL/empty slugs
      UPDATE blog_posts
      SET slug = 'post-' || id::text
      WHERE slug IS NULL OR slug = '';
    END IF;
    
    -- Now safe to make slug NOT NULL and UNIQUE
    ALTER TABLE blog_posts ALTER COLUMN slug SET NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug_unique ON blog_posts(slug);
  END IF;

  -- Add tags column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'tags') THEN
    ALTER TABLE blog_posts ADD COLUMN tags TEXT[] DEFAULT '{}';
    -- Migrate category to tags array
    UPDATE blog_posts 
    SET tags = ARRAY[category] 
    WHERE category IS NOT NULL AND tags = '{}';
  END IF;

  -- Add status column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'status') THEN
    ALTER TABLE blog_posts ADD COLUMN status TEXT DEFAULT 'draft';
    -- Migrate published boolean to status
    UPDATE blog_posts 
    SET status = CASE 
      WHEN published = true THEN 'published'
      ELSE 'draft'
    END;
    -- Add constraint
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_status_check 
      CHECK (status IN ('draft', 'published', 'archived'));
    ALTER TABLE blog_posts ALTER COLUMN status SET NOT NULL;
  END IF;

  -- Add cover_image_url column (rename from image_url)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'cover_image_url') THEN
    ALTER TABLE blog_posts ADD COLUMN cover_image_url TEXT;
    -- Migrate image_url to cover_image_url
    UPDATE blog_posts 
    SET cover_image_url = image_url 
    WHERE image_url IS NOT NULL;
  END IF;

  -- Add author_name column (rename from author)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'author_name') THEN
    ALTER TABLE blog_posts ADD COLUMN author_name TEXT;
    -- Migrate author to author_name
    UPDATE blog_posts 
    SET author_name = author 
    WHERE author IS NOT NULL;
  END IF;

  -- Ensure content is NOT NULL (add default if needed)
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'content' AND is_nullable = 'YES') THEN
    UPDATE blog_posts SET content = '' WHERE content IS NULL;
    ALTER TABLE blog_posts ALTER COLUMN content SET NOT NULL;
    ALTER TABLE blog_posts ALTER COLUMN content SET DEFAULT '';
  END IF;
END $$;

-- Step 1.5: Update RLS policies BEFORE dropping columns they depend on
-- This must happen before dropping the 'published' column
DROP POLICY IF EXISTS "Allow public read published posts" ON blog_posts;
CREATE POLICY "Allow public read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Step 2: Drop old columns (after migration)
DO $$
BEGIN
  -- Drop old columns that are no longer needed
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'author') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS author;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'author_avatar') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS author_avatar;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'category') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS category;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'image_url') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS image_url;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'read_time') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS read_time;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'featured') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS featured;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'published') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS published;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'likes') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS likes;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'comments') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS comments;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'views') THEN
    ALTER TABLE blog_posts DROP COLUMN IF EXISTS views;
  END IF;
END $$;

-- Step 3: Update indexes
DROP INDEX IF EXISTS idx_blog_posts_category;
DROP INDEX IF EXISTS idx_blog_posts_published;
DROP INDEX IF EXISTS idx_blog_posts_featured;

-- Only create indexes if the columns exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'slug') THEN
    CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'status') THEN
    CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'published_at') THEN
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
  END IF;
  
  CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'tags') THEN
    CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
  END IF;
END $$;

-- ============================================
-- MIGRATE EVENTS TABLE
-- ============================================

-- Step 1: Add new columns (if they don't exist)
DO $$ 
BEGIN
  -- Add start_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'start_at') THEN
    ALTER TABLE events ADD COLUMN start_at TIMESTAMPTZ;
    -- Migrate event_date + event_time to start_at
    -- Handle NULL event_date by using created_at as fallback
    UPDATE events 
    SET start_at = CASE
      WHEN event_date IS NOT NULL THEN 
        (event_date::text || ' ' || COALESCE(event_time, '00:00:00'))::timestamptz
      ELSE 
        created_at
    END
    WHERE start_at IS NULL;
    -- Make start_at NOT NULL after migration
    ALTER TABLE events ALTER COLUMN start_at SET NOT NULL;
  END IF;

  -- Add end_at column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'end_at') THEN
    ALTER TABLE events ADD COLUMN end_at TIMESTAMPTZ;
    -- You can set end_at based on start_at + duration if needed
    -- For now, leave it NULL
  END IF;

  -- Update status column values
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'status') THEN
    -- Migrate old status values to new ones
    UPDATE events 
    SET status = CASE 
      WHEN status = 'upcoming' THEN 'published'
      WHEN status = 'past' THEN 'archived'
      WHEN status = 'cancelled' THEN 'archived'
      ELSE 'draft'
    END
    WHERE status IN ('upcoming', 'past', 'cancelled');
    
    -- Update constraint
    ALTER TABLE events DROP CONSTRAINT IF EXISTS events_status_check;
    ALTER TABLE events ADD CONSTRAINT events_status_check 
      CHECK (status IN ('draft', 'published', 'archived'));
  ELSE
    -- Add status column if it doesn't exist
    ALTER TABLE events ADD COLUMN status TEXT DEFAULT 'draft';
    ALTER TABLE events ADD CONSTRAINT events_status_check 
      CHECK (status IN ('draft', 'published', 'archived'));
    ALTER TABLE events ALTER COLUMN status SET NOT NULL;
  END IF;

  -- Add cover_image_url column (rename from image_url)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'cover_image_url') THEN
    ALTER TABLE events ADD COLUMN cover_image_url TEXT;
    -- Migrate image_url to cover_image_url
    UPDATE events 
    SET cover_image_url = image_url 
    WHERE image_url IS NOT NULL;
  END IF;
END $$;

-- Step 1.5: Update events RLS policy BEFORE dropping columns
-- This must happen before dropping any columns that policies might depend on
DROP POLICY IF EXISTS "Allow public read events" ON events;
CREATE POLICY "Allow public read published events" ON events
  FOR SELECT
  USING (status = 'published');

-- Step 2: Drop old columns (after migration)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'event_date') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS event_date;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'event_time') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS event_time;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'event_type') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS event_type;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'speaker') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS speaker;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'speaker_role') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS speaker_role;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'image_url') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS image_url;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'recording_link') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS recording_link;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'attendees') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS attendees;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'views') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS views;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'max_attendees') THEN
    ALTER TABLE events DROP COLUMN IF EXISTS max_attendees;
  END IF;
END $$;

-- Step 3: Update indexes
DROP INDEX IF EXISTS idx_events_date;
DROP INDEX IF EXISTS idx_events_type;

-- Only create indexes if the columns exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'status') THEN
    CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'start_at') THEN
    CREATE INDEX IF NOT EXISTS idx_events_start_at ON events(start_at ASC);
  END IF;
  
  CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
END $$;

-- ============================================
-- UPDATE RLS POLICIES (service role only)
-- ============================================

-- Note: Public read policies were already updated in Step 1.5 before dropping columns

-- Add service role policies if they don't exist
DROP POLICY IF EXISTS "Allow service role full access" ON blog_posts;
CREATE POLICY "Allow service role full access" ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access" ON events;
CREATE POLICY "Allow service role full access" ON events
  FOR ALL
  USING (true)
  WITH CHECK (true);

