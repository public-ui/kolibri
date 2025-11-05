import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
	version: PACKAGE_VERSION = '0.0.0',
	name: PACKAGE_NAME = '@public-ui/mcp',
	description: PACKAGE_DESCRIPTION,
} = require('../package.json') as {
	version?: string;
	name?: string;
	description?: string;
};

export function createKolibriMcpServer(): Server {
	const server = new Server(
		{
			name: PACKAGE_NAME,
			version: PACKAGE_VERSION,
		},
		{
			capabilities: {
				tools: {},
			},
		},
	);

	server.setRequestHandler(ListToolsRequestSchema, async () => {
		return {
			tools: [
				{
					name: 'hello_kolibri',
					description: 'A simple test tool that returns a greeting from KoliBri',
					inputSchema: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
								description: 'The name to greet',
							},
						},
					},
				},
			],
		};
	});

	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		if (request.params.name === 'hello_kolibri') {
			const name = (request.params.arguments as { name?: string })?.name ?? 'World';
			return {
				content: [
					{
						type: 'text',
						text: `Hello ${name}! This is KoliBri MCP Server v${PACKAGE_VERSION}.\n${PACKAGE_DESCRIPTION ?? ''}`,
					},
				],
			};
		}

		throw new Error(`Unknown tool: ${request.params.name}`);
	});

	return server;
}
