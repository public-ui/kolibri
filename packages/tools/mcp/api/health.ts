import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSampleIndexMetadata } from '../dist/data.mjs';

/**
 * Health Check Endpoint
 * GET /api/health - Returns server status
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(204).end();
	}

	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const metadata = getSampleIndexMetadata();

	const health = {
		status: 'ok',
		timestamp: new Date().toISOString(),
		version: '1.0.0',
		endpoints: {
			sse: '/api/sse',
			message: '/api/message',
			health: '/api/health',
		},
		transport: 'sse',
		index: {
			generatedAt: metadata.generatedAt,
			buildMode: metadata.buildMode,
			counts: metadata.counts,
			repo: metadata.repo,
		},
	};

	return res.status(200).json(health);
}
