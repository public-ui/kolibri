# @public-ui/mcp

> **Minimal KoliBri MCP Server**

A basic Model Context Protocol (MCP) server implementation using the official `@modelcontextprotocol/sdk`.

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

Currently, this is a minimal implementation with one test tool:

- `hello_kolibri` - A simple greeting tool

## Development

```bash
# Build
pnpm build

# Start
pnpm start

# Format
pnpm format

# Test
pnpm test
```

## License

EUPL-1.2
