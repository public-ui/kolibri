import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logAvailableTools } from './logging.js';
import { createKolibriMcpServer } from './mcp-server.js';

export { createKolibriMcpServer } from './mcp-server.js';

// Start server when run directly
const executedModule = process.argv[1] ? `file://${process.argv[1]}` : null;

if (executedModule && import.meta.url === executedModule) {
	const server = createKolibriMcpServer();
	const transport = new StdioServerTransport();

	server
		.connect(transport)
		.then(() => {
			logAvailableTools();
		})
		.catch((error) => {
			console.error('[mcp] failed to start server', error);
			process.exitCode = 1;
		});
}
