/**
 * Logs the available tools to stderr when the server starts
 */
export function logAvailableTools(): void {
	// Detect if running in local development (via pnpm/npm start)
	const isLocal = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
	const sseUrl = isLocal ? 'http://localhost:3000/api/sse' : 'https://kolibri-mcp.vercel.app/api/sse';

	console.error('╔══════════════════════════════════════════════════════════════╗');
	console.error('║        KoliBri MCP Server running on stdio                   ║');
	console.error('╚══════════════════════════════════════════════════════════════╝');
	console.error('');
	console.error('🔗 MCP Server (stdio): npx -y @public-ui/mcp');
	console.error(`🔗 MCP Server (SSE): ${sseUrl}`);
	console.error('🌐 Documentation: https://public-ui.github.io');
	console.error('📦 Repository: https://github.com/public-ui/kolibri');
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
