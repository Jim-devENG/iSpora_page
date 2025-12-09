import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from '../_lib/supabase.js';
import type { BlogPost, BlogPostResponse, ApiError } from '../_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Match working pattern: Supabase connection first
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[BLOG_POSTS_ID] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message 
    } as ApiError);
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Blog post ID is required' } as ApiError);
  }

  try {
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, id, supabase);
      case 'PUT':
      case 'PATCH':
        return await handleUpdate(req, res, id, supabase);
      case 'DELETE':
        return await handleDelete(req, res, id, supabase);
      default:
        return res.status(405).json({ error: 'Method not allowed' } as ApiError);
    }
  } catch (error: any) {
    console.error(`[BLOG_POSTS_ID] ${req.method} error:`, error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error?.message 
    } as ApiError);
  }
}

async function handleGet(
  req: VercelRequest, 
  res: VercelResponse, 
  id: string, 
  supabase: ReturnType<typeof getSupabaseClient>
) {
  console.log(`[BLOG_POSTS_GET_ID] Fetching post: ${id}`);

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log(`[BLOG_POSTS_GET_ID] Post not found: ${id}`);
      return res.status(404).json({ error: 'Blog post not found' } as ApiError);
    }
    console.error(`[BLOG_POSTS_GET_ID] Query error:`, error);
    throw error;
  }

  const response: BlogPostResponse = {
    post: data as BlogPost
  };

  return res.status(200).json(response);
}

async function handleUpdate(
  req: VercelRequest, 
  res: VercelResponse, 
  id: string, 
  supabase: ReturnType<typeof getSupabaseClient>
) {
  console.log(`[BLOG_POSTS_PATCH_ID] Updating post: ${id}`);
  
  const body = req.body || {};
  
  // Check if post exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, published_at')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`[BLOG_POSTS_PATCH_ID] Post not found: ${id}`);
    return res.status(404).json({ error: 'Blog post not found' } as ApiError);
  }

  // Build update object
  const updateData: Partial<BlogPost> = {};
  
  if (body.title !== undefined) updateData.title = body.title;
  if (body.slug !== undefined) updateData.slug = body.slug;
  if (body.content !== undefined) updateData.content = body.content;
  if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
  if (body.tags !== undefined) {
    updateData.tags = Array.isArray(body.tags) ? body.tags : (body.tags ? [body.tags] : []);
  }
  if (body.status !== undefined) {
    updateData.status = body.status;
    // If status is being set to 'published' and published_at is not set, set it now
    if (body.status === 'published' && !existing.published_at && !body.published_at && !body.publishedAt) {
      updateData.published_at = new Date().toISOString();
    }
  }
  if (body.cover_image_url !== undefined || body.coverImageUrl !== undefined || body.image_url !== undefined || body.imageUrl !== undefined) {
    updateData.cover_image_url = body.cover_image_url || body.coverImageUrl || body.image_url || body.imageUrl || null;
  }
  if (body.author_name !== undefined || body.authorName !== undefined || body.author !== undefined) {
    updateData.author_name = body.author_name || body.authorName || body.author || null;
  }
  if (body.published_at !== undefined || body.publishedAt !== undefined) {
    updateData.published_at = body.published_at || body.publishedAt || null;
  }

  // updated_at is set automatically by trigger

  console.log(`[BLOG_POSTS_PATCH_ID] Updating with data:`, { ...updateData, content: updateData.content ? '[truncated]' : undefined });

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`[BLOG_POSTS_PATCH_ID] Update error:`, error);
    
    // Handle unique constraint violation (duplicate slug)
    if (error.code === '23505') {
      return res.status(400).json({ 
        error: 'A blog post with this slug already exists',
        details: error.message
      } as ApiError);
    }
    
    throw error;
  }

  console.log(`[BLOG_POSTS_PATCH_ID] Post updated successfully: ${id}`);

  const response: BlogPostResponse = {
    post: data as BlogPost
  };

  return res.status(200).json(response);
}

async function handleDelete(
  req: VercelRequest, 
  res: VercelResponse, 
  id: string, 
  supabase: ReturnType<typeof getSupabaseClient>
) {
  console.log(`[BLOG_POSTS_DELETE_ID] Deleting post: ${id}`);
  
  // Check if post exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`[BLOG_POSTS_DELETE_ID] Post not found: ${id}`);
    return res.status(404).json({ error: 'Blog post not found' } as ApiError);
  }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`[BLOG_POSTS_DELETE_ID] Delete error:`, error);
    throw error;
  }

  console.log(`[BLOG_POSTS_DELETE_ID] Post deleted successfully: ${id}`);
  
  return res.status(204).end();
}
