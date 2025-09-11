const { connectToDatabase } = require('./_lib/mongodb');
const { Registration } = require('./models/Registration');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const { id } = event.pathParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Registration ID is required' }),
    };
  }

  try {
    console.log(`[${event.httpMethod}] Registration ${id}: Connecting to database...`);
    await connectToDatabase();
    console.log(`[${event.httpMethod}] Registration ${id}: Database connected successfully`);
  } catch (err) {
    console.error(`[${event.httpMethod}] Registration ${id}: Database connection failed:`, err);
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
    switch (event.httpMethod) {
      case 'DELETE':
        return await handleDelete(event, headers, id);
      case 'PATCH':
        return await handleUpdate(event, headers, id);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error(`[${event.httpMethod}] Registration ${id}: Error:`, error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error?.message,
      }),
    };
  }
};

async function handleDelete(event, headers, id) {
  console.log(`DELETE Registration ${id}: Starting deletion...`);
  
  const result = await Registration.findByIdAndDelete(id);
  
  if (!result) {
    console.log(`DELETE Registration ${id}: Not found`);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Registration not found' }),
    };
  }
  
  console.log(`DELETE Registration ${id}: Successfully deleted`);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Registration deleted successfully' }),
  };
}

async function handleUpdate(event, headers, id) {
  console.log(`PATCH Registration ${id}: Starting update...`);
  
  const body = JSON.parse(event.body || '{}');
  const { status } = body;
  
  if (!status) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Status is required' }),
    };
  }
  
  const result = await Registration.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true }
  );
  
  if (!result) {
    console.log(`PATCH Registration ${id}: Not found`);
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Registration not found' }),
    };
  }
  
  console.log(`PATCH Registration ${id}: Successfully updated to ${status}`);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result.toObject()),
  };
}
