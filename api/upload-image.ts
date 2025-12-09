// API Route Pattern: api/*.ts files with export default async function handler
// This route implements /api/upload-image
// POST: Currently returns 501 (Not Implemented) stub
// TODO: Implement full Supabase Storage upload functionality
// Expected successful response: { success: true, imageUrl: string, ... }

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[UPLOAD_IMAGE] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message
    });
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Temporary stub: Image upload is not fully implemented yet
  // TODO: Implement full Supabase Storage upload functionality
  // Expected successful response shape: { success: true, imageUrl: string, ... }
  return res.status(501).json({ 
    error: 'Image upload is not implemented yet. Please configure Supabase Storage and update /api/upload-image.' 
  });
}
