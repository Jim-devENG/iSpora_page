const { connectToDatabase } = require('./_lib/mongodb');
const { Registration } = require('./models/Registration');

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
      const body = JSON.parse(event.body || '{}');
      console.log('Received registration data:', JSON.stringify(body, null, 2));
      
      // Basic validation
      if (!body.name || !body.email || !body.whatsapp || !body.countryOfOrigin || !body.countryOfResidence) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }
      
      // Normalize group value
      if (body.group !== 'local' && body.group !== 'diaspora') {
        body.group = 'diaspora';
      }
      
      console.log('Normalized registration data:', JSON.stringify(body, null, 2));
      const doc = await Registration.create(body);
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
