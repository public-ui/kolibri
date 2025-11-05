/**
 * Logs the available tools to stderr when the server starts
 */
export function logAvailableTools(): void {
	console.error('╔══════════════════════════════════════════════════════════════╗');
	console.error('║        KoliBri MCP Server running on stdio                   ║');
	console.error('╚══════════════════════════════════════════════════════════════╝');
	console.error('');
	console.error('📋 Available Tools:');
	console.error('');
	console.error('  1. hello_kolibri');
	console.error('     Description: Test tool that returns a greeting');
	console.error('     Parameters: { name?: string }');
	console.error('');
	console.error('  2. search');
	console.error('     Description: Search for KoliBri component samples and docs');
	console.error('     Parameters: { query: string, kind?: "sample"|"doc", limit?: number }');
	console.error('     Example: { "query": "button", "kind": "sample", "limit": 5 }');
	console.error('');
	console.error('  3. get_entry');
	console.error('     Description: Get a specific sample or doc entry by ID');
	console.error('     Parameters: { id: string }');
	console.error('     Example: { "id": "button/basic" }');
	console.error('');
	console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.error('Server ready for MCP protocol requests via stdio');
	console.error('');
}
