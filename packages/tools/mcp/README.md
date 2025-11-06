# @public-ui/mcp

> **KoliBri MCP Server with Search and HTTP Transport**

A Model Context Protocol (MCP) server implementation using the official `@modelcontextprotocol/sdk` with fuzzy search capabilities for KoliBri component samples and documentation. Supports both stdio and HTTP/StreamableHTTP transports.

## Installation

```bash
pnpm add @public-ui/mcp
# or
npm install @public-ui/mcp
```

## Usage

### As CLI (stdio transport)

```bash
npx @public-ui/mcp
# or
pnpm exec kolibri-mcp
```

### As HTTP Server

```bash
# Start the HTTP server on default port 3000
node dist/mcp.mjs

# Or specify a custom port
PORT=8080 node dist/mcp.mjs
```

The HTTP server provides a StreamableHTTP transport endpoint at `POST /mcp` and loads all KoliBri samples and documentation at startup.

### Programmatically (stdio)

```typescript
import { createKolibriMcpServer } from '@public-ui/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = createKolibriMcpServer();
const transport = new StdioServerTransport();

await server.connect(transport);
```

## Logging

The MCP server supports optional request logging for debugging and monitoring. Logging is **disabled by default**.

### Enable Logging

Set the environment variable `MCP_LOGGING=true` or `MCP_LOGGING=1`:

```bash
# HTTP Server with logging
MCP_LOGGING=true node dist/mcp.mjs

# CLI with logging
MCP_LOGGING=true npx @public-ui/mcp

# Custom port with logging
MCP_LOGGING=true PORT=8080 node dist/mcp.mjs
```

### Log Types

When enabled, logs include:

- **[TOOL]** - Tool invocations (search, get_entry) with parameters and results
- **[RESOURCE]** - Resource accesses (info, best-practices)
- **[ERROR]** - Error conditions and failures

### Log Format

```
[timestamp] [TYPE] message {json_data}
```

**Example:**

```
[2025-11-06T09:45:23.456Z] [TOOL] search called {
  "query": "button",
  "kind": "sample",
  "limit": 10
}
[2025-11-06T09:45:23.478Z] [TOOL] search completed {
  "query": "button",
  "resultCount": 5,
  "options": { "limit": 10, "kind": "sample" }
}
```

## Available Tools

### 1. `hello_kolibri`

A simple greeting tool for testing the connection and getting server metadata.

**Parameters:**

- `name` (string, optional): Name to greet

**Example:**

```json
{
	"name": "hello_kolibri",
	"arguments": { "name": "World" }
}
```

### 2. `search`

Search for KoliBri component samples and documentation using fuzzy search powered by Fuse.js.

**Parameters:**

- `query` (string, required): Search query
- `kind` (string, optional): Filter by "sample" or "doc"
- `limit` (number, optional): Maximum results (default: 10)

**Example:**

```json
{
	"name": "search",
	"arguments": {
		"query": "button",
		"kind": "sample",
		"limit": 5
	}
}
```

### 3. `get_entry`

Get a specific sample or documentation entry by its ID.

**Parameters:**

- `id` (string, required): Entry ID (e.g., "button/basic")

**Example:**

```json
{
	"name": "get_entry",
	"arguments": { "id": "button/basic" }
}
```

## Available Resources

### 1. `info`

Get information about the KoliBri MCP Server and available samples.

**Resource URI:** `kolibri://info`

**Example:**

```json
{
	"method": "resources/read",
	"params": { "uri": "kolibri://info" }
}
```

### 2. `best-practices`

Essential guidelines for working with KoliBri Web Components. This resource provides base knowledge that AI agents should always consider when working with KoliBri components.

**Resource URI:** `kolibri://best-practices`

**Includes:**

1. Always register KoliBri Web Components in the browser runtime before rendering them
2. Choose the integration guide that matches your project setup to load and bundle the components correctly
3. Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render
4. Wrap input elements with `<kol-form>` and feed its `_errorList` to surface validation issues via the generated error summary

**Example:**

```json
{
	"method": "resources/read",
	"params": { "uri": "kolibri://best-practices" }
}
```

## Example Searches

**Search for button components:**

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"button"}}}' | npx @public-ui/mcp
```

**Search for accessibility documentation:**

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"query":"accessibility","kind":"doc"}}}' | npx @public-ui/mcp
```

**Get a specific sample:**

```bash
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_entry","arguments":{"id":"button/basic"}}}' | npx @public-ui/mcp
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Start (stdio mode)
pnpm start

# Format
pnpm format

# Test
pnpm test
```

## Deployment

### Vercel

This package can be deployed to Vercel as a serverless API:

```bash
# Quick start
pnpm run generate-index
pnpm run build
vercel --prod
```

After deployment, the following endpoints are available:

- `GET /` - Landing page with API documentation
- `POST /mcp` - MCP server endpoint (StreamableHTTP transport)

For detailed deployment instructions:

- **Quick Start**: See [QUICK_START_VERCEL.md](./QUICK_START_VERCEL.md)
- **Full Guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Local stdio mode

```bash
# Start server locally
pnpm start
# or
npx @public-ui/mcp
```

## Sample Data

Currently includes example entries for:

- **Samples**: button/basic, input/text, table/basic
- **Docs**: getting-started, accessibility

In production, this would be replaced with actual KoliBri component data.

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.21.0 - Official MCP SDK
- `fuse.js`: ^7.1.0 - Fuzzy search library
- `zod`: ^3.23.8 - Schema validation

## License

EUPL-1.2
