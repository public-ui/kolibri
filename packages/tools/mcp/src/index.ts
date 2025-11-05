export { hasSearchableQuery, performFuzzySearch } from './fuzzy-search.js';
export { handleApiRequest } from './http-handler.js';
export { AI_HINTS_KEY, AI_HINTS_MESSAGES } from './mcp-content.js';
export { createKolibriMcpServer } from './mcp-server.js';
export { SampleIndex, buildSampleIndex } from './sample-index.js';
export { startServer } from './server.js';

const executedModule = process.argv[1] ? `file://${process.argv[1]}` : null;

if (executedModule && import.meta.url === executedModule) {
	startServer().catch((error) => {
		console.error('[mcp] failed to start server', error);
		process.exitCode = 1;
	});
}
