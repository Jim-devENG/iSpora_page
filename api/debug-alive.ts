/**
 * API Route Pattern for this project:
 * - API routes live in api/*.ts (root level api/ directory)
 * - Handler style: export default async function handler(req: VercelRequest, res: VercelResponse)
 * - This is Vercel Serverless Functions pattern
 * - Configured in vercel.json: "api/**/*.ts" with maxDuration: 30
 * 
 * This debug endpoint helps verify that new deployments are actually being served.
 * After deployment, hit /api/debug-alive and confirm:
 * - JSON response (not HTML)
 * - commitHint matches the current deployment
 */

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
    commitHint: 'deployment-62jW9CwSA-verified'
  });
}

