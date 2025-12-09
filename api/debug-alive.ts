// API Route Pattern: api/*.ts files with export default async function handler
// Debug endpoint to verify deployments are being served
// Returns JSON with commitHint to confirm new deployments

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    ok: true,
    route: '/api/debug-alive',
    timestamp: new Date().toISOString(),
    commitHint: 'deployment-6eqytp1nh-typescript-fix'
  });
}

