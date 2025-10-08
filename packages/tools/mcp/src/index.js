import { startServer } from './server.js';

// Export functions for Vercel API
export { handleApiRequest, AI_HINTS_KEY, AI_HINTS_MESSAGE } from './api-handler.js';
export { buildSampleIndex } from './sample-index.js';

// Only start server when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	startServer().catch((error) => {
		console.error('[mcp] failed to start server', error);
		process.exitCode = 1;
	});
}
