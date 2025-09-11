const { connectToDatabase } = require('./_lib/mongodb');
const { Registration } = require('./models/Registration');

exports.handler = async (event, context) => {
  console.log('Stats API: Starting request...');
  
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    console.log('Stats API: Connecting to database...');
    await connectToDatabase();
    console.log('Stats API: Database connected successfully');
  } catch (err) {
    console.error('Stats API: Database connection failed:', err);
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
    console.log('Stats API: Computing basic statistics...');
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    console.log('Stats API: Running count queries...');
    const [total, daily, weekly, monthly, recentActivity] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ createdAt: { $gte: oneDayAgo } }),
      Registration.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      Registration.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Registration.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    console.log('Stats API: Basic stats computed:', { total, daily, weekly, monthly });

    console.log('Stats API: Computing top countries...');
    const topCountriesAgg = await Registration.aggregate([
      { $group: { _id: '$countryOfResidence', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topCountries = topCountriesAgg.map(item => ({
      country: item._id,
      count: item.count
    }));

    console.log('Stats API: Top countries computed:', topCountries);

    const stats = {
      total,
      daily,
      weekly,
      monthly,
      topCountries,
      recentActivity
    };

    console.log('Stats API: Final stats object:', JSON.stringify(stats, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    console.error('Stats API: Error computing stats:', error);
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
