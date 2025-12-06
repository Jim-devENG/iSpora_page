import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient, transformRegistration } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message,
      stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined
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
    if (req.method === 'POST') {
      const body = req.body || {};
      console.log('Received registration data:', JSON.stringify(body, null, 2));
      
      // Basic validation
      if (!body.name || !body.email || !body.whatsapp || !body.countryOfOrigin || !body.countryOfResidence) {
        return res.status(400).json({ 
          error: 'Missing required fields' 
        });
      }
      
      // Normalize group value
      const groupType = (body.group === 'local' || body.group === 'diaspora') ? body.group : 'diaspora';
      
      // Prepare data for Supabase
      const registrationData = {
        name: body.name,
        email: body.email,
        whatsapp: body.whatsapp,
        country_of_origin: body.countryOfOrigin,
        country_of_residence: body.countryOfResidence,
        group_type: groupType,
        ip_address: body.ipAddress || null,
        location: body.location || null,
        status: body.status || 'pending',
        user_agent: body.userAgent || null,
      };

      console.log('Normalized registration data:', JSON.stringify(registrationData, null, 2));
      
      const { data, error } = await supabase
        .from('registrations')
        .insert(registrationData)
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Registration created successfully:', data.id);
      return res.status(201).json(transformRegistration(data));
    }

    if (req.method === 'GET') {
      console.log('Fetching registrations...');
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} registrations`);
      return res.status(200).json(data?.map(transformRegistration) || []);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error?.message,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}


