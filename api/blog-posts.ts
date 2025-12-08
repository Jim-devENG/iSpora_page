import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';
import type { BlogPost, BlogPostsResponse, BlogPostResponse, ApiError } from './_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[BLOG_POSTS] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message
    } as ApiError);
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method === 'GET') {
      return await handleGet(req, res, supabase);
    }

    if (req.method === 'POST') {
      return await handlePost(req, res, supabase);
    }

    return res.status(405).json({ error: 'Method Not Allowed' } as ApiError);
  } catch (error: any) {
    console.error('[BLOG_POSTS] API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message
    } as ApiError);
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse, supabase: ReturnType<typeof getSupabaseClient>) {
  const { status, limit } = req.query;
  
  console.log('[BLOG_POSTS_GET] Fetching posts with filters:', { status, limit });

  let query = supabase
    .from('blog_posts')
    .select('*');

  // Filter by status
  if (status && typeof status === 'string' && ['draft', 'published', 'archived'].includes(status)) {
    query = query.eq('status', status);
  } else if (status === 'all') {
    // Admin can see all - no filter
  } else {
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

  const response: BlogPostsResponse = {
    posts: (data || []) as BlogPost[]
  };

  return res.status(200).json(response);
}

async function handlePost(req: VercelRequest, res: VercelResponse, supabase: ReturnType<typeof getSupabaseClient>) {
  const body = req.body || {};
  
  console.log('[BLOG_POSTS_POST] Creating post:', { title: body.title, slug: body.slug });

  // Validate required fields
  if (!body.title || !body.slug || !body.content) {
    console.error('[BLOG_POSTS_POST] Missing required fields');
    return res.status(400).json({ 
      error: 'Missing required fields: title, slug, and content are required' 
    } as ApiError);
  }

  // Generate slug if not provided (simple slugify)
  const slug = body.slug || body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Prepare post data
  const postData: Partial<BlogPost> = {
    title: body.title,
    slug: slug,
    content: body.content,
    excerpt: body.excerpt || null,
    tags: Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []),
    status: body.status || 'draft',
    cover_image_url: body.cover_image_url || body.coverImageUrl || body.image_url || body.imageUrl || null,
    author_name: body.author_name || body.authorName || body.author || null,
    published_at: null,
  };

  // If status is 'published' and published_at is missing, set it to now
  if (postData.status === 'published' && !body.published_at && !body.publishedAt) {
    postData.published_at = new Date().toISOString();
  } else if (body.published_at || body.publishedAt) {
    postData.published_at = body.published_at || body.publishedAt;
  }

  console.log('[BLOG_POSTS_POST] Inserting post data:', { ...postData, content: '[truncated]' });

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
      } as ApiError);
    }
    
    throw error;
  }

  console.log('[BLOG_POSTS_POST] Post created successfully:', data.id);

  const response: BlogPostResponse = {
    post: data as BlogPost
  };

  return res.status(201).json(response);
}
