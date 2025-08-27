import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb';
import { Registration } from './models/Registration';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectToDatabase();
  } catch (err: any) {
    return res.status(500).json({ error: 'Database connection failed', details: err?.message });
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
      // Normalize group value
      if (body.group !== 'local' && body.group !== 'diaspora') {
        body.group = 'diaspora';
      }
      const doc = await Registration.create(body);
      return res.status(201).json(doc.toObject());
    }

    if (req.method === 'GET') {
      const docs = await Registration.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(docs);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error', details: error?.message });
  }
}


