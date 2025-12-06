import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient, transformRegistration } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Registration ID is required' });
  }

  let supabase;
  try {
    console.log(`[${req.method}] Registration ${id}: Connecting to Supabase...`);
    supabase = getSupabaseClient();
    console.log(`[${req.method}] Registration ${id}: Supabase connected successfully`);
  } catch (err: any) {
    console.error(`[${req.method}] Registration ${id}: Supabase connection failed:`, err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message 
    });
  }

  try {
    switch (req.method) {
      case 'DELETE':
        return await handleDelete(req, res, id, supabase);
      case 'PATCH':
        return await handleUpdate(req, res, id, supabase);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error(`[${req.method}] Registration ${id}: Error:`, error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error?.message 
    });
  }
}

async function handleDelete(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  
  console.log(`DELETE Registration ${id}: Starting deletion...`);
  
  // Check if registration exists
  const { data: existing } = await supabase
    .from('registrations')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`DELETE Registration ${id}: Not found`);
    return res.status(404).json({ error: 'Registration not found' });
  }

  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`DELETE Registration ${id}: Error:`, error);
    throw error;
  }

  console.log(`DELETE Registration ${id}: Successfully deleted`);
  
  return res.status(200).json({ 
    message: 'Registration deleted successfully',
    deletedId: id 
  });
}

async function handleUpdate(req: VercelRequest, res: VercelResponse, id: string, supabase: ReturnType<typeof getSupabaseClient>) {
  
  console.log(`PATCH Registration ${id}: Starting update...`);
  
  const { status } = req.body;
  
  if (!status || !['pending', 'active', 'verified'].includes(status)) {
    return res.status(400).json({ 
      error: 'Valid status is required (pending, active, or verified)' 
    });
  }

  // Check if registration exists
  const { data: existing } = await supabase
    .from('registrations')
    .select('*')
    .eq('id', id)
    .single();

  if (!existing) {
    console.log(`PATCH Registration ${id}: Not found`);
    return res.status(404).json({ error: 'Registration not found' });
  }

  // Update status
  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`PATCH Registration ${id}: Error:`, error);
    throw error;
  }
  
  console.log(`PATCH Registration ${id}: Status updated to ${status}`);
  
  return res.status(200).json({
    message: 'Registration status updated successfully',
    registration: transformRegistration(data)
  });
}
