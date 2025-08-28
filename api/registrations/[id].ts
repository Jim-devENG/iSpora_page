import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { Registration } from '../models/Registration.js';

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

  try {
    console.log(`[${req.method}] Registration ${id}: Connecting to database...`);
    await connectToDatabase();
    console.log(`[${req.method}] Registration ${id}: Database connected successfully`);
  } catch (err: any) {
    console.error(`[${req.method}] Registration ${id}: Database connection failed:`, err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message 
    });
  }

  try {
    switch (req.method) {
      case 'DELETE':
        return await handleDelete(req, res, id);
      case 'PATCH':
        return await handleUpdate(req, res, id);
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

async function handleDelete(req: VercelRequest, res: VercelResponse, id: string) {
  console.log(`DELETE Registration ${id}: Starting deletion...`);
  
  const registration = await Registration.findById(id);
  if (!registration) {
    console.log(`DELETE Registration ${id}: Not found`);
    return res.status(404).json({ error: 'Registration not found' });
  }

  await Registration.findByIdAndDelete(id);
  console.log(`DELETE Registration ${id}: Successfully deleted`);
  
  return res.status(200).json({ 
    message: 'Registration deleted successfully',
    deletedId: id 
  });
}

async function handleUpdate(req: VercelRequest, res: VercelResponse, id: string) {
  console.log(`PATCH Registration ${id}: Starting update...`);
  
  const { status } = req.body;
  
  if (!status || !['pending', 'active', 'verified'].includes(status)) {
    return res.status(400).json({ 
      error: 'Valid status is required (pending, active, or verified)' 
    });
  }

  const registration = await Registration.findById(id);
  if (!registration) {
    console.log(`PATCH Registration ${id}: Not found`);
    return res.status(404).json({ error: 'Registration not found' });
  }

  registration.status = status;
  registration.updatedAt = new Date();
  await registration.save();
  
  console.log(`PATCH Registration ${id}: Status updated to ${status}`);
  
  return res.status(200).json({
    message: 'Registration status updated successfully',
    registration: {
      id: registration._id,
      name: registration.name,
      email: registration.email,
      whatsapp: registration.whatsapp,
      countryOfOrigin: registration.countryOfOrigin,
      countryOfResidence: registration.countryOfResidence,
      status: registration.status,
      group: registration.group,
      createdAt: registration.createdAt,
      updatedAt: registration.updatedAt
    }
  });
}
