import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseClient } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Match working pattern: Supabase connection first
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (err: any) {
    console.error('[UPLOAD_IMAGE] Supabase connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message
    });
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS,GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Allow GET for health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      message: 'Image upload API is available',
      methods: ['POST', 'OPTIONS', 'GET'],
      endpoint: '/api/upload-image',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      console.log('[UPLOAD_IMAGE] Image upload request received');
      console.log('[UPLOAD_IMAGE] Content-Type:', req.headers['content-type']);
      console.log('[UPLOAD_IMAGE] Body type:', typeof req.body);
      console.log('[UPLOAD_IMAGE] Body keys:', req.body ? Object.keys(req.body) : 'no body');

      // Check if request has file (multipart/form-data)
      // Note: Vercel serverless functions handle multipart differently
      // We'll need to parse the request body
      const contentType = req.headers['content-type'] || '';
      
      if (contentType.includes('multipart/form-data')) {
        // For Vercel, we need to use a library to parse multipart
        // For now, we'll accept base64 encoded images in JSON
        return res.status(400).json({ 
          error: 'Please use base64 image upload format',
          message: 'Send image as base64 string in JSON body: { image: "data:image/png;base64,...", type: "blog" }'
        });
      }

      // Handle JSON with base64 image
      const { image, type, fileName } = req.body || {};
      
      console.log('Parsed body - image present:', !!image, 'type:', type, 'fileName:', fileName);

      if (!image) {
        console.error('No image provided in request body');
        return res.status(400).json({ 
          error: 'Image is required',
          message: 'Provide an image as base64 string: { image: "data:image/png;base64,..." }',
          received: { hasBody: !!req.body, bodyKeys: req.body ? Object.keys(req.body) : [] }
        });
      }

      // Validate base64 image format
      if (!image.startsWith('data:image/')) {
        return res.status(400).json({ 
          error: 'Invalid image format',
          message: 'Image must be a base64 encoded image (data:image/...)'
        });
      }

      // Extract image data
      const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ 
          error: 'Invalid base64 format',
          message: 'Image must be in format: data:image/png;base64,...'
        });
      }

      const [, imageType, base64Data] = matches;
      const imageBuffer = Buffer.from(base64Data, 'base64');
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageBuffer.length > maxSize) {
        return res.status(400).json({ 
          error: 'Image too large',
          message: 'Image must be less than 5MB'
        });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 15);
      const folder = type === 'event' ? 'events' : 'blog';
      const fileExtension = imageType === 'jpeg' ? 'jpg' : imageType;
      const filePath = `${folder}/${timestamp}-${randomStr}.${fileExtension}`;

      // Upload to Supabase Storage
      console.log('[UPLOAD_IMAGE] Uploading to Supabase Storage:', filePath, 'Size:', imageBuffer.length);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageBuffer, {
          contentType: `image/${imageType}`,
          upsert: false
        });

      if (uploadError) {
        console.error('[UPLOAD_IMAGE] Supabase storage upload error:', uploadError);
        return res.status(500).json({ 
          error: 'Failed to upload image to Supabase Storage',
          details: uploadError.message,
          code: uploadError.statusCode || uploadError.error || 'unknown'
        });
      }
      
      console.log('[UPLOAD_IMAGE] Upload successful:', uploadData);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return res.status(200).json({
        success: true,
        imageUrl: urlData.publicUrl,
        filePath: filePath,
        type: type || 'general',
        message: 'Image uploaded successfully'
      });
    } catch (error: any) {
      console.error('[UPLOAD_IMAGE] Image upload error:', error);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        details: error?.message
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
