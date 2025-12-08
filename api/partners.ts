import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

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
      const { status } = req.query;
      
      let query = supabase
        .from('partner_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      
      if (!body.fullName || !body.email || !body.country || !body.orgName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const partnerData = {
        full_name: body.fullName,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        linkedin: body.linkedin || null,
        org_name: body.orgName,
        org_type: body.orgType || null,
        role: body.role || null,
        org_website: body.orgWebsite || null,
        org_social_media: body.orgSocialMedia || null,
        partnership_focus: body.partnershipFocus || [],
        other_focus: body.otherFocus || null,
        about_work: body.aboutWork || null,
        why_partner: body.whyPartner || null,
        how_contribute: body.howContribute || null,
        what_expect: body.whatExpect || null,
        additional_notes: body.additionalNotes || null,
        ip_address: body.ipAddress || null,
        user_agent: body.userAgent || null,
      };

      const { data, error } = await supabase
        .from('partner_submissions')
        .insert(partnerData)
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

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


