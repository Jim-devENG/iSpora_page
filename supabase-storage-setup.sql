-- Supabase Storage Setup for Image Uploads
-- Run this in Supabase SQL Editor to create the storage bucket

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public read access
CREATE POLICY IF NOT EXISTS "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users to upload
CREATE POLICY IF NOT EXISTS "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- For public uploads (if needed), you can use service role
-- Or create a policy that allows public inserts
-- Note: This is less secure, consider using authenticated uploads

-- Allow public uploads (for API uploads using service role)
-- The API uses service role key, so this should work
-- If you want to restrict, remove this policy and ensure API uses authenticated requests

