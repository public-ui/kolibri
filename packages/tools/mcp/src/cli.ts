#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createKolibriMcpServer } from './mcp.js';

/**
 * CLI entry point for KoliBri MCP Server (stdio transport).
 * Used for local MCP clients like Claude Desktop.
 */
function main() {
	const server = createKolibriMcpServer();
	const transport = new StdioServerTransport();

	server.connect(transport);

	// Log to stderr to avoid interfering with stdio protocol
	console.error('KoliBri MCP Server running on stdio');
}

main();
