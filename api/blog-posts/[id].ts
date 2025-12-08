import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Blog post ID is required' });
  }

  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message 
    });
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
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error?.message 
    });
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    throw error;
  }

  return res.status(200).json(data);
}

async function handleUpdate(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  const body = req.body || {};
  
  // Check if post exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, published_at')
    .eq('id', id)
    .single();

  if (!existing) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  // Build update object
  const updateData: any = {};
  
  if (body.title !== undefined) updateData.title = body.title;
  if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
  if (body.content !== undefined) updateData.content = body.content;
  if (body.author !== undefined) updateData.author = body.author;
  if (body.authorAvatar !== undefined || body.author_avatar !== undefined) {
    updateData.author_avatar = body.authorAvatar || body.author_avatar;
  }
  if (body.category !== undefined) updateData.category = body.category;
  if (body.imageUrl !== undefined || body.image_url !== undefined) {
    updateData.image_url = body.imageUrl || body.image_url;
  }
  if (body.readTime !== undefined || body.read_time !== undefined) {
    updateData.read_time = body.readTime || body.read_time;
  }
  if (body.featured !== undefined) updateData.featured = body.featured;
  if (body.published !== undefined) {
    updateData.published = body.published;
    if (body.published && !existing.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return res.status(200).json(data);
}

async function handleDelete(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  // Check if post exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return res.status(200).json({ 
    message: 'Blog post deleted successfully',
    deletedId: id 
  });
}
