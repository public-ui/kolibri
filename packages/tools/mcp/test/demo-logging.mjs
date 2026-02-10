#!/usr/bin/env node
/**
 * Simple demonstration of MCP logging functionality
 */

import { createKolibriMcpServer } from '../dist/mcp.mjs';

console.log('==========================================');
console.log('KoliBri MCP Server - Logging Demo');
console.log('==========================================\n');

console.log('📝 Logging Configuration:');
console.log('   Environment variable: MCP_LOGGING');
console.log('   Values: "true" or "1" to enable\n');

console.log('🔍 When enabled, logs will show:');
console.log('   • [TOOL] Tool invocations (search, fetch)');
console.log('   • [RESOURCE] Resource accesses (info, best-practices)');
console.log('   • [ERROR] Error conditions\n');

console.log('📋 Log format:');
console.log('   [timestamp] [TYPE] message {data}\n');

console.log('💡 Example usage:');
console.log('   # Enable logging for HTTP server:');
console.log('   MCP_LOGGING=true node dist/mcp.cjs\n');
console.log('   # Enable logging for stdio mode:');
console.log('   MCP_LOGGING=true npx @public-ui/mcp\n');

console.log('✅ Current status:');
if (process.env.MCP_LOGGING === 'true' || process.env.MCP_LOGGING === '1') {
	console.log('   🔍 Logging is ENABLED');
} else {
	console.log('   ⚪ Logging is DISABLED');
	console.log('   💡 Set MCP_LOGGING=true to enable');
}

console.log('\n==========================================');
console.log('Creating server instance...');
createKolibriMcpServer();
console.log('✅ Server created successfully!');
console.log('==========================================\n');
