/**
 * API Route Pattern for this project:
 * - API routes live in api/*.ts (root level api/ directory)
 * - Handler style: export default async function handler(req: VercelRequest, res: VercelResponse)
 * - This is Vercel Serverless Functions pattern
 * - Configured in vercel.json: "api/**/*.ts" with maxDuration: 30
 * 
 * This route implements /api/events
 * - GET: Returns { events: Event[] }
 * - POST: Accepts { title, start_at, ... } and returns { event: Event }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';
import type { Event } from './_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[EVENTS] Supabase connection failed:', err);
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
      const { status, upcoming, limit } = req.query;
      
      let query = supabase
        .from('events')
        .select('*');

      // Filter by status (default: 'published' if not provided)
      if (status && typeof status === 'string' && ['draft', 'published', 'archived'].includes(status)) {
        query = query.eq('status', status);
      } else if (status !== 'all') {
        // Default: only published events
        query = query.eq('status', 'published');
      }

      // Filter by upcoming (only events with start_at >= now)
      const upcomingFilter = upcoming === 'true' || (upcoming === undefined && status !== 'all');
      if (upcomingFilter) {
        const now = new Date().toISOString();
        query = query.gte('start_at', now);
      }

      // Sort by start_at ascending
      query = query.order('start_at', { ascending: true });

      // Apply limit
      const limitNum = limit ? parseInt(limit as string, 10) : 20;
      if (limitNum > 0 && limitNum <= 100) {
        query = query.limit(limitNum);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[EVENTS_GET] Supabase query error:', error);
        throw error;
      }

      console.log(`[EVENTS_GET] Found ${data?.length || 0} events`);
      return res.status(200).json({ events: (data || []) as Event[] });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      // Validate required fields
      if (!body.title || !body.start_at) {
        return res.status(400).json({ 
          error: 'Missing required fields: title and start_at are required' 
        });
      }

      // Validate start_at is a valid date
      const startAt = new Date(body.start_at);
      if (isNaN(startAt.getTime())) {
        return res.status(400).json({ 
          error: 'Invalid start_at date format' 
        });
      }

      // Prepare event data
      const eventData: Partial<Event> = {
        title: body.title,
        description: body.description || null,
        start_at: startAt.toISOString(),
        end_at: body.end_at ? new Date(body.end_at).toISOString() : null,
        location: body.location || null,
        registration_link: body.registration_link || null,
        status: body.status || 'draft',
        cover_image_url: body.cover_image_url || null,
      };

      // Validate end_at if provided
      if (eventData.end_at) {
        const endAt = new Date(eventData.end_at);
        if (isNaN(endAt.getTime()) || endAt < startAt) {
          return res.status(400).json({ 
            error: 'Invalid end_at date: must be after start_at' 
          });
        }
      }

      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) {
        console.error('[EVENTS_POST] Supabase insert error:', error);
        throw error;
      }

      console.log('[EVENTS_POST] Event created successfully:', data.id);
      return res.status(201).json({ event: data as Event });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('[EVENTS] API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message
    });
  }
}
