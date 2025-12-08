import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';
import type { Event, EventsResponse, EventResponse, ApiError } from './_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[EVENTS] Supabase connection failed:', err);
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
    console.error('[EVENTS] API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message
    } as ApiError);
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse, supabase: ReturnType<typeof getSupabaseClient>) {
  const { status, upcoming, limit } = req.query;
  
  console.log('[EVENTS_GET] Fetching events with filters:', { status, upcoming, limit });

  let query = supabase
    .from('events')
    .select('*');

  // Filter by status (default: 'published' if not provided)
  if (status && typeof status === 'string' && ['draft', 'published', 'archived'].includes(status)) {
    query = query.eq('status', status);
  } else if (status === 'all') {
    // Admin can see all - no filter
  } else {
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

  const response: EventsResponse = {
    events: (data || []) as Event[]
  };

  return res.status(200).json(response);
}

async function handlePost(req: VercelRequest, res: VercelResponse, supabase: ReturnType<typeof getSupabaseClient>) {
  const body = req.body || {};
  
  console.log('[EVENTS_POST] Creating event:', { title: body.title, start_at: body.start_at });

  // Validate required fields
  if (!body.title || !body.start_at) {
    console.error('[EVENTS_POST] Missing required fields');
    return res.status(400).json({ 
      error: 'Missing required fields: title and start_at are required' 
    } as ApiError);
  }

  // Validate start_at is a valid date
  const startAt = new Date(body.start_at || body.startAt);
  if (isNaN(startAt.getTime())) {
    return res.status(400).json({ 
      error: 'Invalid start_at date format' 
    } as ApiError);
  }

  // Prepare event data
  const eventData: Partial<Event> = {
    title: body.title,
    description: body.description || null,
    start_at: startAt.toISOString(),
    end_at: body.end_at || body.endAt ? new Date(body.end_at || body.endAt).toISOString() : null,
    location: body.location || null,
    registration_link: body.registration_link || body.registrationLink || null,
    status: body.status || 'draft',
    cover_image_url: body.cover_image_url || body.coverImageUrl || body.image_url || body.imageUrl || null,
  };

  // Validate end_at if provided
  if (eventData.end_at) {
    const endAt = new Date(eventData.end_at);
    if (isNaN(endAt.getTime()) || endAt < startAt) {
      return res.status(400).json({ 
        error: 'Invalid end_at date: must be after start_at' 
      } as ApiError);
    }
  }

  console.log('[EVENTS_POST] Inserting event data:', { ...eventData, description: eventData.description ? '[truncated]' : undefined });

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

  const response: EventResponse = {
    event: data as Event
  };

  return res.status(201).json(response);
}
