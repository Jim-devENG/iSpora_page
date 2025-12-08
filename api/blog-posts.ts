import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

// Blog Posts API Route
export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    if (req.method === 'GET') {
      const { featured, category, published } = req.query;
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by published status (default: only published)
      if (published === 'all') {
        // Admin can see all
      } else {
        query = query.eq('published', true);
      }

      // Filter by featured
      if (featured === 'true') {
        query = query.eq('featured', true);
      }

      // Filter by category
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      if (!body.title || !body.excerpt || !body.author || !body.category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const postData = {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content || null,
        author: body.author,
        author_avatar: body.authorAvatar || null,
        category: body.category,
        image_url: body.imageUrl || body.image_url || null, // Accept both camelCase and snake_case
        read_time: body.readTime || body.read_time || null,
        featured: body.featured || false,
        published: body.published || false,
        published_at: body.published ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message
    });
  }
}

