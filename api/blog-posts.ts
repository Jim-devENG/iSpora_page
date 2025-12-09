/**
 * API Route Pattern for this project:
 * - API routes live in api/*.ts (root level api/ directory)
 * - Handler style: export default async function handler(req: VercelRequest, res: VercelResponse)
 * - This is Vercel Serverless Functions pattern
 * - Configured in vercel.json: "api/**/*.ts" with maxDuration: 30
 * 
 * This route implements /api/blog-posts
 * - GET: Returns { posts: BlogPost[] }
 * - POST: Accepts { title, slug, content, ... } and returns { post: BlogPost }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';
import type { BlogPost } from './_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[BLOG_POSTS] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message
    });
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    if (req.method === 'GET') {
      const { status, limit } = req.query;
      
      let query = supabase
        .from('blog_posts')
        .select('*');

      // Filter by status (default: 'published' if not provided)
      if (status && typeof status === 'string' && ['draft', 'published', 'archived'].includes(status)) {
        query = query.eq('status', status);
      } else if (status !== 'all') {
        // Default: only published posts
        query = query.eq('status', 'published');
      }

      // Sort by published_at desc, then created_at desc
      query = query
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      // Apply limit
      const limitNum = limit ? parseInt(limit as string, 10) : 20;
      if (limitNum > 0 && limitNum <= 100) {
        query = query.limit(limitNum);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[BLOG_POSTS_GET] Supabase query error:', error);
        throw error;
      }

      console.log(`[BLOG_POSTS_GET] Found ${data?.length || 0} posts`);
      return res.status(200).json({ posts: (data || []) as BlogPost[] });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      // Validate required fields
      if (!body.title || !body.slug || !body.content) {
        return res.status(400).json({ 
          error: 'Missing required fields: title, slug, and content are required' 
        });
      }

      // Prepare post data
      const postData: Partial<BlogPost> = {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || null,
        tags: Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []),
        status: body.status || 'draft',
        cover_image_url: body.cover_image_url || null,
        author_name: body.author_name || null,
        published_at: null,
      };

      // If status is 'published' and published_at is missing, set it to now
      if (postData.status === 'published' && !body.published_at) {
        postData.published_at = new Date().toISOString();
      } else if (body.published_at) {
        postData.published_at = body.published_at;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) {
        console.error('[BLOG_POSTS_POST] Supabase insert error:', error);
        
        // Handle unique constraint violation (duplicate slug)
        if (error.code === '23505') {
          return res.status(400).json({ 
            error: 'A blog post with this slug already exists',
            details: error.message
          });
        }
        
        throw error;
      }

      console.log('[BLOG_POSTS_POST] Post created successfully:', data.id);
      return res.status(201).json({ post: data as BlogPost });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('[BLOG_POSTS] API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message
    });
  }
}
