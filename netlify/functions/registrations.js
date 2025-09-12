const { connectToDatabase } = require('./_lib/mongodb');
const { Registration } = require('./models/Registration');
const { validateRegistrationData, checkRateLimit } = require('./_lib/security');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    await connectToDatabase();
  } catch (err) {
    console.error('Database connection failed:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Database connection failed',
        details: err?.message,
      }),
    };
  }

  try {
    if (event.httpMethod === 'POST') {
      // Rate limiting
      const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
      if (!checkRateLimit(clientIP, 5, 15 * 60 * 1000)) { // 5 requests per 15 minutes
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        };
      }

      const body = JSON.parse(event.body || '{}');
      console.log('Received registration data:', JSON.stringify(body, null, 2));
      
      // Validate and sanitize input data
      const validation = validateRegistrationData(body);
      if (!validation.isValid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid data provided',
            details: validation.errors 
          }),
        };
      }
      
      console.log('Validated registration data:', JSON.stringify(validation.data, null, 2));
      const doc = await Registration.create(validation.data);
      console.log('Registration created successfully:', doc._id);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(doc.toObject()),
      };
    }

    if (event.httpMethod === 'GET') {
      console.log('Fetching registrations...');
      const docs = await Registration.find().sort({ createdAt: -1 }).lean();
      console.log(`Found ${docs.length} registrations`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(docs),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error?.message,
      }),
    };
  }
};
