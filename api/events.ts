import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers immediately - BEFORE any other logic
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
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
    if (req.method === 'GET') {
      const { status } = req.query;
      
      let query = supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      // Filter by status (upcoming, past, or all)
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      if (!body.title || !body.description || !body.eventDate || !body.eventTime || !body.eventType || !body.speaker) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Determine status based on date
      const eventDate = new Date(body.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const status = eventDate < today ? 'past' : 'upcoming';

      const eventData = {
        title: body.title,
        description: body.description,
        event_date: body.eventDate || body.event_date,
        event_time: body.eventTime || body.event_time,
        event_type: body.eventType || body.event_type,
        speaker: body.speaker,
        speaker_role: body.speakerRole || body.speaker_role || null,
        image_url: body.imageUrl || body.image_url || null, // Accept both camelCase and snake_case
        registration_link: body.registrationLink || body.registration_link || null,
        recording_link: body.recordingLink || body.recording_link || null,
        status: body.status || status,
        max_attendees: body.maxAttendees || body.max_attendees || null,
      };

      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
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

