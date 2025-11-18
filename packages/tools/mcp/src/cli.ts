#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createRequire } from 'node:module';
import { getSampleIndexMetadata } from './data.js';
import { createKolibriMcpServer } from './mcp.js';

const require = createRequire(import.meta.url);
const { version: PACKAGE_VERSION = '0.0.0' } = require('../package.json') as { version?: string };

const ENABLE_LOGGING = process.env.MCP_LOGGING === 'true' || process.env.MCP_LOGGING === '1';

/**
 * CLI entry point for KoliBri MCP Server (stdio transport).
 * Used for local MCP clients like Claude Desktop, VS Code, etc.
 */
function main() {
	const server = createKolibriMcpServer();
	const transport = new StdioServerTransport();

	server.connect(transport);

	// Log to stderr to avoid interfering with stdio protocol
	const metadata = getSampleIndexMetadata();
	console.error(`\n🚀 KoliBri MCP Server v${PACKAGE_VERSION}`);
	console.error('━'.repeat(50));
	console.error(`📊 Loaded ${metadata.counts.total} entries:`);
	console.error(`   • ${metadata.counts.totalSamples} samples`);
	console.error(`   • ${metadata.counts.totalSpecs ?? 0} specs`);
	console.error(`   • ${metadata.counts.totalScenarios ?? 0} scenarios`);
	console.error(`   • ${metadata.counts.totalDocs} docs`);
	console.error('━'.repeat(50));

	if (ENABLE_LOGGING) {
		console.error('🔍 Logging: ENABLED (MCP_LOGGING=true)');
	} else {
		console.error('💡 Logging: disabled (set MCP_LOGGING=true to enable)');
	}

	console.error('🔌 Transport: stdio');
	console.error('✅ Ready for MCP requests\n');
}

main();
