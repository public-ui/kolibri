# KoliBri MCP Server - Agent Instructions# Agent Instructions

## OverviewThis package provides a simple Node.js-based REST API backend service for the Model Context Protocol (MCP). Through this, AI agents can retrieve structured information about KoliBri examples and get the original source code returned.

This is a **minimal Model Context Protocol (MCP) server** implementation using the official `@modelcontextprotocol/sdk`. It provides a foundation for building MCP-compliant tools that can be used by AI agents.## Development

## Project Structure### Start Development Mode

```````bash

packages/tools/mcp/pnpm --filter @public-ui/mcp dev

├── src/```

│   ├── index.ts          # Main entry point with server initialization

│   ├── cli.ts            # CLI wrapper for stdio transport### Create Production Build

│   ├── mcp-server.ts     # Server configuration and tool registration

│   └── _old/             # Legacy files (not in use)```bash

├── dist/                 # Built outputpnpm --filter @public-ui/mcp build

├── package.jsonpnpm --filter @public-ui/mcp start

├── build.config.ts       # Unbuild configuration```

└── README.md

```By default, the service listens on port `3030`. The endpoints are accessible both under `/api/mcp/...` and `/mcp/...`.



## Key Components## Vercel Deployment



### 1. MCP Server (`src/mcp-server.ts`)After deployment to Vercel, the API is available under the following URLs:



The core server implementation uses the official SDK:- **Landing Page:** `https://<project>.vercel.app/`

- **API Endpoints:** `https://<project>.vercel.app/mcp/...`

```typescript

import { Server } from '@modelcontextprotocol/sdk/server/index.js';### Example URLs

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

```- `https://<project>.vercel.app/mcp/health`

- `https://<project>.vercel.app/mcp/samples`

The server:- `https://<project>.vercel.app/mcp/sample?id=sample/button/basic`

- Registers tools via `setRequestHandler(ListToolsRequestSchema, ...)`- `https://<project>.vercel.app/mcp/concepts`

- Handles tool calls via `setRequestHandler(CallToolRequestSchema, ...)`- `https://<project>.vercel.app/mcp/concept?id=concept/README`

- Currently provides one test tool: `hello_kolibri`

## Endpoints

### 2. CLI Entry Point (`src/cli.ts`)

- `GET /api/mcp/health` – returns the backend status and metadata about the current sample index.

Provides a command-line interface using stdio transport:- `GET /api/mcp/samples` – lists all available samples. Can optionally be filtered using the query parameter `q`.

- `GET /api/mcp/sample?id=sample/<component>/<sample>` – returns path and source code of a specific sample.

```bash- `GET /api/mcp/concepts` – lists all available concept and documentation entries.

node dist/cli.mjs- `GET /api/mcp/concept?id=concept/<identifier>` – returns metadata and Markdown source of a specific concept.

# or

npx @public-ui/mcpRefresh requests are not available on deployed environments because the indexes are embedded during the build.

```

All responses are delivered as JSON and already contain the relative paths within the repository.

### 3. Programmatic Usage (`src/index.ts`)

## How it works

Can be imported and used in other projects:

At startup, all `routes.ts` files from the React sample project are analyzed. The component files referenced in them are resolved, read, and cached in an index. Based on this index, the server responds to requests from MCP-compatible clients.

```typescript

import { createKolibriMcpServer } from '@public-ui/mcp';## Build Process

```

The package uses a two-stage build process optimized for Vercel deployment:

## Development Workflow

1. **GitHub Actions**: Builds the complete package with all 136+ samples from the monorepo

### 1. Install Dependencies2. **Vercel**: Skips the build process and uses pre-built artifacts



```bash
# GitHub Actions Build
pnpm install
pnpm build  # → runs scripts/build-sample-index.mjs pre && unbuild && scripts/build-sample-index.mjs post
```

### 2. Build



```bash### Vercel Build Strategy

pnpm build

``````bash

echo 'Skipping build - using pre-built artifacts'  # → uses existing dist/ and api/ files

This uses `unbuild` to:```

- Compile TypeScript to JavaScript

- Generate both ESM (`.mjs`) and CommonJS (`.cjs`) outputsThis approach ensures that:

- Bundle dependencies appropriately

- GitHub Actions has access to the full monorepo and can collect all samples

### 3. Test the Server- Vercel receives pre-built artifacts with embedded sample data

- No "0 samples" issues occur due to missing monorepo context

**List available tools:**

## Further Development

```bash

echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/cli.mjs- Additional filters or full-text search can be implemented directly in the `SampleIndex`.

```- For production environments, it is recommended to implement authentication in front of the MCP backend.

- The prebuild system can be extended to support additional sample sources beyond React samples.

**Call a tool:**

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"hello_kolibri","arguments":{"name":"Test"}}}' | node dist/cli.mjs
```

### 4. Format Code

```bash
pnpm format
```

## Adding New Tools

To add new tools to the MCP server:

1. **Open `src/mcp-server.ts`**
2. **Add tool to `ListToolsRequestSchema` handler:**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: 'hello_kolibri',
				description: 'A simple test tool',
				inputSchema: { ... }
			},
			// Add new tool here
			{
				name: 'your_tool_name',
				description: 'Your tool description',
				inputSchema: {
					type: 'object',
					properties: {
						param1: {
							type: 'string',
							description: 'Parameter description'
						}
					}
				}
			}
		]
	};
});
```

3. **Add tool handler in `CallToolRequestSchema`:**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
	if (request.params.name === 'your_tool_name') {
		const param1 = (request.params.arguments as { param1?: string })?.param1;
		return {
			content: [
				{
					type: 'text',
					text: `Result: ${param1}`
				}
			]
		};
	}

	// ... existing handlers
});
```

4. **Rebuild and test:**

```bash
pnpm build
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/cli.mjs
```

## Integration with AI Agents

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
	"mcpServers": {
		"kolibri": {
			"command": "node",
			"args": ["/path/to/kolibri/lib/packages/tools/mcp/dist/cli.mjs"]
		}
	}
}
```

### VS Code Copilot

This minimal server can be integrated with VS Code extensions that support MCP.

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.21.0 - Official MCP SDK

## Next Steps

Future enhancements can include:

1. **Resource support** - Add `resources` capability
2. **Prompt templates** - Add `prompts` capability
3. **KoliBri-specific tools** - Add tools for component search, documentation access
4. **HTTP transport** - Add support for HTTP/SSE transport
5. **Sample data integration** - Re-integrate sample index functionality

## Troubleshooting

### Build fails

```bash
# Clean and rebuild
rm -rf dist/
pnpm install
pnpm build
```

### Server doesn't respond

- Ensure you're using stdio transport (default)
- Check that JSON-RPC messages are properly formatted
- Look for error messages in stderr

### TypeScript errors

- Ensure `@modelcontextprotocol/sdk` is installed
- Run `pnpm install` to update dependencies

## References

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [KoliBri Documentation](https://public-ui.github.io)
```````
