import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb.js';
import { Registration } from '../models/Registration.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await connectToDatabase();
  } catch (err: any) {
    return res.status(500).json({ error: 'Database connection failed', details: err?.message });
  }

  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [total, daily, weekly, monthly, recentActivity] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ createdAt: { $gte: oneDayAgo } }),
      Registration.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      Registration.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Registration.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const topCountriesAgg = await Registration.aggregate([
      { $group: { _id: '$countryOfResidence', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topCountries = topCountriesAgg.map((c) => ({ country: c._id || 'Unknown', count: c.count }));

    return res.status(200).json({ total, daily, weekly, monthly, topCountries, recentActivity });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to compute stats', details: error?.message });
  }
}


