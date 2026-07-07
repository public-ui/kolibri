# @public-ui/mcp

[![npm](https://img.shields.io/npm/v/@public-ui/mcp)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/mcp)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/mcp)](https://www.npmjs.com/package/@public-ui/mcp)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/mcp)](https://bundlephobia.com/result?p=@public-ui/kolibri-cli)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

> **Model Context Protocol Server for KoliBri – Access 200+ Component Examples**

Provides AI agents and MCP clients direct access to KoliBri component samples, specifications, scenarios, and documentation through the Model Context Protocol (MCP).

**Primary Usage**: Remote HTTP endpoint (StreamableHTTP transport) – zero installation required  
**Alternative**: Local stdio transport for Claude Desktop, VS Code, and other MCP clients

## Quick Start

### Recommended: Use Remote HTTP Server

No installation needed! Use the hosted MCP server directly:

```json
{
	"servers": {
		"kolibri": {
			"url": "https://public-ui-kolibri-mcp.vercel.app/mcp",
			"type": "http"
		}
	}
}
```

Add this to:

- **VS Code**: `mcp.json` in workspace root or `~/.config/mcp/mcp.json`
- **Claude Desktop**: `claude_desktop_config.json` (see below)

### Alternative: Local Installation

For offline use or local development:

```bash
npm install -g @public-ui/mcp
```

After installation, run with:

```bash
kolibri-mcp
```

## Usage

### Recommended: Remote HTTP Server

**Zero installation required!** Use the hosted endpoint directly:

#### VS Code Copilot

Create `mcp.json` in workspace root or `~/.config/mcp/mcp.json`:

```json
{
	"servers": {
		"kolibri": {
			"url": "https://public-ui-kolibri-mcp.vercel.app/mcp",
			"type": "http"
		}
	},
	"inputs": []
}
```

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
	"mcpServers": {
		"kolibri": {
			"url": "https://public-ui-kolibri-mcp.vercel.app/mcp",
			"type": "http"
		}
	}
}
```

**Benefits:**

- ✅ No installation needed
- ✅ Always up-to-date with latest samples
- ✅ Works from any device
- ✅ Zero maintenance

### Alternative: Local stdio Transport

For offline use, local development, or when you prefer local execution:

#### Running via CLI

```bash
# With npx (no installation needed)
npx @public-ui/mcp

# Or after global installation
kolibri-mcp
```

#### VS Code Copilot (Local)

Open the global configuration via `Strg` + `Shift` + `P` and search for "MCP: Open User Configuration" or define the MCP servers per project at `.vscode/mcp.json`. Add lokal server to the json file:

```json
{
	"servers": {
		"kolibri": {
			"command": "kolibri-mcp"
		}
	}
}
```

For general documentation about MCP in VSCode see https://code.visualstudio.com/docs/agent-customization/mcp-servers.

#### Claude Desktop (Local)

```json
{
	"mcpServers": {
		"kolibri": {
			"command": "npx",
			"args": ["@public-ui/mcp"]
		}
	}
}
```

### Self-Hosted HTTP Server

To run your own HTTP server instance:

```bash
# Start on default port 3000
node dist/mcp.mjs

# Or specify a custom port
PORT=8080 node dist/mcp.mjs
```

The server provides a StreamableHTTP endpoint at `POST /mcp`.

### Programmatically (stdio)

```typescript
import { createKolibriMcpServer } from '@public-ui/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = createKolibriMcpServer();
const transport = new StdioServerTransport();

await server.connect(transport);
```

## Logging

The MCP server supports optional request logging for debugging and monitoring. Logging is **disabled by default** and outputs to stderr to avoid interfering with the stdio protocol.

### Enable Logging

Set the environment variable `MCP_LOGGING=true` or `MCP_LOGGING=1`:

```bash
# stdio mode with logging (for debugging)
MCP_LOGGING=true npx @public-ui/mcp

# Or after global installation
MCP_LOGGING=true kolibri-mcp

# HTTP Server with logging
MCP_LOGGING=true node dist/mcp.mjs

# Custom port with logging
MCP_LOGGING=true PORT=8080 node dist/mcp.mjs
```

### Note for stdio Mode

All logs are written to **stderr** to ensure they don't interfere with the JSON-RPC communication on stdout. This allows you to debug stdio sessions without breaking the protocol.

### Log Types

When enabled, logs include:

- **[TOOL]** - Tool invocations (search, fetch) with parameters and results
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

Search for KoliBri component samples, scenarios, and documentation using fuzzy search powered by Fuse.js.

**Parameters:**

- `query` (string, optional): Search query (leave empty to return all entries)
- `kind` (string, optional): Filter by "doc", "sample", or "scenario"
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

### 3. `fetch`

Get a specific sample or documentation entry by its ID.

**Parameters:**

- `id` (string, required): Entry ID (e.g., "button/basic")

**Example:**

```json
{
	"name": "fetch",
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

## Example Usage

### With MCP Clients (Recommended)

The easiest way to use the MCP server is through an MCP-compatible client:

- **Claude Desktop**: Ask "@kolibri show me a button example"
- **VS Code Copilot**: Ask "@kolibri how do I use KolButton?"
- **MCP Inspector**: Visual debugging tool for testing tools and resources

### Direct stdio Testing (Advanced)

For testing the stdio transport directly with JSON-RPC messages:

**Search for button components:**

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"button"}}}' | kolibri-mcp
```

**Search for accessibility documentation:**

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"query":"accessibility","kind":"doc"}}}' | kolibri-mcp
```

**Get a specific sample:**

```bash
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"fetch","arguments":{"id":"sample/button/basic"}}}' | kolibri-mcp
```

### Testing with MCP Inspector

For visual testing and debugging:

```bash
# Install MCP Inspector globally
npm install -g @modelcontextprotocol/inspector

# Run the server with inspector
mcp-inspector kolibri-mcp
```

This opens a web interface where you can test all tools and resources interactively.

## Development

```bash
# Install dependencies
pnpm install

# Generate sample index (required before build)
pnpm generate-index

# Build
pnpm build

# Start stdio mode (for local MCP clients)
pnpm run start:stdio

# Start HTTP server (for remote access)
pnpm start

# Development with inspector
pnpm run inspect

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
# Start server locally (stdio)
pnpm run start:stdio
# or
kolibri-mcp
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
