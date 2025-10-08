#!/usr/bin/env node

import { handleApiRequest } from './index.js';
import { createServer } from 'http';

const PORT = process.env.PORT || 3030;

const server = createServer((req, res) => {
	// Add CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	handleApiRequest(req, res);
});

server.listen(PORT, () => {
	console.log(`🚀 KoliBri MCP Server running on http://localhost:${PORT}`);
	console.log(`📊 API endpoints:`);
	console.log(`   GET  /mcp/health   - Server status`);
	console.log(`   GET  /mcp/samples  - List all samples`);
	console.log(`   GET  /mcp/sample   - Get specific sample`);
	console.log(`   GET  /mcp/docs - List docs`);
	console.log(`   GET  /mcp/doc  - Get specific doc`);
	console.log(`📚 Documentation: https://www.npmjs.com/package/@public-ui/mcp`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('🛑 Received SIGTERM, shutting down gracefully...');
	server.close(() => {
		console.log('✅ Server closed');
		process.exit(0);
	});
});

process.on('SIGINT', () => {
	console.log('🛑 Received SIGINT, shutting down gracefully...');
	server.close(() => {
		console.log('✅ Server closed');
		process.exit(0);
	});
});
