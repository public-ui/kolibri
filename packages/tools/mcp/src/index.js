import { startServer } from './server.js';

startServer().catch((error) => {
	console.error('[mcp] failed to start server', error);
	process.exitCode = 1;
});
