# @public-ui/mcp

> **Minimal KoliBri MCP Server with Search**

A Model Context Protocol (MCP) server implementation using the official `@modelcontextprotocol/sdk` with fuzzy search capabilities for KoliBri component samples and documentation.

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

### Programmatically

```typescript
import { createKolibriMcpServer } from '@public-ui/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = createKolibriMcpServer();
const transport = new StdioServerTransport();

await server.connect(transport);
```

## Available Tools

### 1. `hello_kolibri`

A simple greeting tool for testing the connection.

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

# Start
pnpm start

# Format
pnpm format

# Test
pnpm test
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
