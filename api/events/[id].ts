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
    return res.status(400).json({ error: 'Event ID is required' });
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
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Event not found' });
    }
    throw error;
  }

  return res.status(200).json(data);
}

async function handleUpdate(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  const body = req.body || {};
  
  // Check if event exists
  const { data: existing } = await supabase
    .from('events')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Build update object
  const updateData: any = {};
  
  if (body.title !== undefined) updateData.title = body.title;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.eventDate !== undefined || body.event_date !== undefined) {
    updateData.event_date = body.eventDate || body.event_date;
  }
  if (body.eventTime !== undefined || body.event_time !== undefined) {
    updateData.event_time = body.eventTime || body.event_time;
  }
  if (body.eventType !== undefined || body.event_type !== undefined) {
    updateData.event_type = body.eventType || body.event_type;
  }
  if (body.speaker !== undefined) updateData.speaker = body.speaker;
  if (body.speakerRole !== undefined || body.speaker_role !== undefined) {
    updateData.speaker_role = body.speakerRole || body.speaker_role;
  }
  if (body.imageUrl !== undefined || body.image_url !== undefined) {
    updateData.image_url = body.imageUrl || body.image_url;
  }
  if (body.registrationLink !== undefined || body.registration_link !== undefined) {
    updateData.registration_link = body.registrationLink || body.registration_link;
  }
  if (body.recordingLink !== undefined || body.recording_link !== undefined) {
    updateData.recording_link = body.recordingLink || body.recording_link;
  }
  if (body.status !== undefined) {
    updateData.status = body.status;
  } else if (body.eventDate || body.event_date) {
    // Auto-determine status based on date
    const eventDate = new Date(body.eventDate || body.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    updateData.status = eventDate < today ? 'past' : 'upcoming';
  }
  if (body.maxAttendees !== undefined || body.max_attendees !== undefined) {
    updateData.max_attendees = body.maxAttendees || body.max_attendees;
  }

  const { data, error } = await supabase
    .from('events')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return res.status(200).json(data);
}

async function handleDelete(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  // Check if event exists
  const { data: existing } = await supabase
    .from('events')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return res.status(200).json({ 
    message: 'Event deleted successfully',
    deletedId: id 
  });
}

