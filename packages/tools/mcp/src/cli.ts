#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createKolibriMcpServer } from './mcp-server.js';

async function main() {
	const server = createKolibriMcpServer();
	const transport = new StdioServerTransport();

	await server.connect(transport);

	console.error('KoliBri MCP Server running on stdio');
}

main().catch((error) => {
	console.error('Failed to start server:', error);
	process.exit(1);
});
