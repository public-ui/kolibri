#!/usr/bin/env node

import { startServer } from './index.js';

async function main() {
	try {
		const server = await startServer();
		console.log('🚀 KoliBri MCP Server running on http://localhost:3030/mcp');
		console.log('📚 Documentation: https://www.npmjs.com/package/@public-ui/mcp');

		const shutdown = (signal: string) => {
			console.log(`🛑 Received ${signal}, shutting down gracefully...`);
			server.close(() => {
				console.log('✅ Server closed');
				process.exit(0);
			});
		};

		process.on('SIGTERM', () => shutdown('SIGTERM'));
		process.on('SIGINT', () => shutdown('SIGINT'));
	} catch (error) {
		console.error('[mcp] failed to start CLI server', error);
		process.exitCode = 1;
	}
}

void main();
