// API Route Pattern: api/*.ts files with export default async function handler
// This route implements /api/join-requests
// GET: Returns JoinRequest[] (array directly, matching partners.ts pattern)
// POST: Accepts join request data and returns { joinRequest: JoinRequest }

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[JOIN_REQUESTS] Supabase connection failed:', err);
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
      const { status } = req.query;
      
      let query = supabase
        .from('join_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[JOIN_REQUESTS_GET] Supabase error:', error);
        throw error;
      }

      // Return array directly (matching partners.ts pattern)
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      if (!body.name || !body.email) {
        return res.status(400).json({ error: 'Missing required fields: name and email' });
      }

      const joinRequestData = {
        name: body.name,
        email: body.email,
        role: body.role || null,
        status: body.status || 'pending',
        message: body.message || null,
      };

      const { data, error } = await supabase
        .from('join_requests')
        .insert(joinRequestData)
        .select()
        .single();

      if (error) {
        console.error('[JOIN_REQUESTS_POST] Supabase error:', error);
        throw error;
      }

      return res.status(201).json({ joinRequest: data });
    }

    // Method not allowed
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[JOIN_REQUESTS] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process join request', 
      details: error?.message
    });
  }
}

