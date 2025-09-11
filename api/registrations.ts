import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb.js';
import { Registration } from './models/Registration.js';
import { rateLimit, validateInput, addSecurityHeaders, isSuspiciousRequest, getClientIP } from './_lib/security.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security checks
  if (isSuspiciousRequest(req)) {
    console.log('Suspicious request blocked:', getClientIP(req));
    return res.status(403).json({ error: 'Access denied' });
  }

  // Rate limiting
  const rateLimitResult = rateLimit(req);
  if (!rateLimitResult.allowed) {
    console.log('Rate limit exceeded for IP:', getClientIP(req));
    return res.status(429).json({ 
      error: 'Too many requests', 
      retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
    });
  }

  // Add security headers
  res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  res.setHeader('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

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
      
      // Input validation
      const validationSchema = {
        name: { required: true, type: 'string', maxLength: 100 },
        email: { required: true, type: 'email', maxLength: 255 },
        whatsapp: { required: true, type: 'phone', maxLength: 20 },
        countryOfOrigin: { required: true, type: 'string', maxLength: 100 },
        countryOfResidence: { required: true, type: 'string', maxLength: 100 },
        group: { required: false, type: 'string', maxLength: 20 }
      };
      
      const validation = validateInput(body, validationSchema);
      if (!validation.valid) {
        console.log('Validation failed:', validation.errors);
        return res.status(400).json({ 
          error: 'Invalid input', 
          details: validation.errors 
        });
      }
      
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


