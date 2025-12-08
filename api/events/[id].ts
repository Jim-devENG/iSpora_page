import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from '../_lib/supabase.js';
import type { Event, EventResponse, ApiError } from '../_types/content.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers immediately
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Event ID is required' } as ApiError);
  }

  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[EVENTS_ID] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message 
    } as ApiError);
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
    console.error(`[EVENTS_ID] ${req.method} error:`, error);
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
  console.log(`[EVENTS_GET_ID] Fetching event: ${id}`);

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.log(`[EVENTS_GET_ID] Event not found: ${id}`);
      return res.status(404).json({ error: 'Event not found' } as ApiError);
    }
    console.error(`[EVENTS_GET_ID] Query error:`, error);
    throw error;
  }

  const response: EventResponse = {
    event: data as Event
  };

  return res.status(200).json(response);
}

async function handleUpdate(
  req: VercelRequest, 
  res: VercelResponse, 
  id: string, 
  supabase: ReturnType<typeof getSupabaseClient>
) {
  console.log(`[EVENTS_PATCH_ID] Updating event: ${id}`);
  
  const body = req.body || {};
  
  // Check if event exists
  const { data: existing } = await supabase
    .from('events')
    .select('id, start_at')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`[EVENTS_PATCH_ID] Event not found: ${id}`);
    return res.status(404).json({ error: 'Event not found' } as ApiError);
  }

  // Build update object
  const updateData: Partial<Event> = {};
  
  if (body.title !== undefined) updateData.title = body.title;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.start_at !== undefined || body.startAt !== undefined) {
    const startAt = new Date(body.start_at || body.startAt);
    if (isNaN(startAt.getTime())) {
      return res.status(400).json({ error: 'Invalid start_at date format' } as ApiError);
    }
    updateData.start_at = startAt.toISOString();
  }
  if (body.end_at !== undefined || body.endAt !== undefined) {
    if (body.end_at || body.endAt) {
      const endAt = new Date(body.end_at || body.endAt);
      if (isNaN(endAt.getTime())) {
        return res.status(400).json({ error: 'Invalid end_at date format' } as ApiError);
      }
      const startAt = updateData.start_at ? new Date(updateData.start_at) : new Date(existing.start_at);
      if (endAt < startAt) {
        return res.status(400).json({ error: 'end_at must be after start_at' } as ApiError);
      }
      updateData.end_at = endAt.toISOString();
    } else {
      updateData.end_at = null;
    }
  }
  if (body.location !== undefined) updateData.location = body.location;
  if (body.registration_link !== undefined || body.registrationLink !== undefined) {
    updateData.registration_link = body.registration_link || body.registrationLink || null;
  }
  if (body.status !== undefined) {
    updateData.status = body.status;
  }
  if (body.cover_image_url !== undefined || body.coverImageUrl !== undefined || body.image_url !== undefined || body.imageUrl !== undefined) {
    updateData.cover_image_url = body.cover_image_url || body.coverImageUrl || body.image_url || body.imageUrl || null;
  }

  // updated_at is set automatically by trigger

  console.log(`[EVENTS_PATCH_ID] Updating with data:`, { ...updateData, description: updateData.description ? '[truncated]' : undefined });

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`[EVENTS_PATCH_ID] Update error:`, error);
    throw error;
  }

  console.log(`[EVENTS_PATCH_ID] Event updated successfully: ${id}`);

  const response: EventResponse = {
    event: data as Event
  };

  return res.status(200).json(response);
}

async function handleDelete(
  req: VercelRequest, 
  res: VercelResponse, 
  id: string, 
  supabase: ReturnType<typeof getSupabaseClient>
) {
  console.log(`[EVENTS_DELETE_ID] Deleting event: ${id}`);
  
  // Check if event exists
  const { data: existing } = await supabase
    .from('events')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`[EVENTS_DELETE_ID] Event not found: ${id}`);
    return res.status(404).json({ error: 'Event not found' } as ApiError);
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`[EVENTS_DELETE_ID] Delete error:`, error);
    throw error;
  }

  console.log(`[EVENTS_DELETE_ID] Event deleted successfully: ${id}`);
  
  return res.status(204).end();
}
