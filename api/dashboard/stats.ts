import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { Registration } from '../models/Registration.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  console.log('Stats API: Starting request...');
  
  try {
    console.log('Stats API: Connecting to database...');
    await connectToDatabase();
    console.log('Stats API: Database connected successfully');
  } catch (err: any) {
    console.error('Stats API: Database connection failed:', err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err?.message,
      stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined
    });
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

    const topCountries = topCountriesAgg.map((c) => ({ country: c._id || 'Unknown', count: c.count }));
    console.log('Stats API: Top countries computed:', topCountries);

    const result = { total, daily, weekly, monthly, topCountries, recentActivity };
    console.log('Stats API: Returning result:', result);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Stats API: Error computing stats:', error);
    return res.status(500).json({ 
      error: 'Failed to compute stats', 
      details: error?.message,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}


