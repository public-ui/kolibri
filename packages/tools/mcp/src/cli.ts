#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logAvailableTools } from './logging.js';
import { createKolibriMcpServer } from './mcp-server.js';

async function main() {
	const server = createKolibriMcpServer();
	const transport = new StdioServerTransport();

	await server.connect(transport);

	logAvailableTools();
}

main().catch((error) => {
	console.error('Failed to start server:', error);
	process.exit(1);
});
