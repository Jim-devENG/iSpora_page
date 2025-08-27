import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb.js';
import { Registration } from './models/Registration.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectToDatabase();
  } catch (err: any) {
    console.error('Database connection failed:', err);
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
      // Normalize group value
      if (body.group !== 'local' && body.group !== 'diaspora') {
        body.group = 'diaspora';
      }
      console.log('Normalized registration data:', JSON.stringify(body, null, 2));
      const doc = await Registration.create(body);
      console.log('Registration created successfully:', doc._id);
      return res.status(201).json(doc.toObject());
    }

    if (req.method === 'GET') {
      console.log('Fetching registrations...');
      const docs = await Registration.find().sort({ createdAt: -1 }).lean();
      console.log(`Found ${docs.length} registrations`);
      return res.status(200).json(docs);
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


