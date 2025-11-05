# KoliBri MCP Server

[![npm version](https://badge.fury.io/js/@public-ui%2Fmcp.svg)](https://www.npmjs.com/package/@public-ui/mcp)
[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL--1.2-blue.svg)](https://opensource.org/licenses/EUPL-1.2)

A **Model Context Protocol (MCP) server** that provides AI agents with access to **136+ KoliBri component examples** and their source code. This enables LLMs to understand and generate code using the KoliBri design system components.

## 🚀 Quick Start

### Installation

```bash
npm install @public-ui/mcp
# or
pnpm add @public-ui/mcp
# or
yarn add @public-ui/mcp
```

### Usage as MCP Server

Start the MCP server for AI agents:

```bash
npx @public-ui/mcp
```

The server listens on `http://localhost:3030` and speaks the **Streamable HTTP** transport provided by the
[`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk).
Three convenience paths are exposed:

| Path(s)                                                                     | Purpose                                                                                               |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `POST http://localhost:3030/mcp`<br/>`POST http://localhost:3030/api/mcp`   | Default entry point. Negotiates streaming vs. JSON automatically based on request headers.            |
| `POST http://localhost:3030/http`<br/>`POST http://localhost:3030/api/http` | Forces plain JSON responses. Perfect for `curl`, custom scripts, or environments without SSE support. |
| `GET http://localhost:3030/sse`<br/>`GET http://localhost:3030/api/sse`     | Opens a dedicated Server-Sent Events stream that receives JSON-RPC responses as they arrive.          |

> **Important:** JSON-RPC requests **must** include an `Accept` header with both
> `application/json` and `text/event-stream`, as mandated by the MCP specification:
>
> ```http
> Accept: application/json, text/event-stream
> Content-Type: application/json
> ```

All responses implement the official MCP protocol. The underlying sample index is prebuilt for deployments, so
there is no refresh endpoint in production builds.

### Resources exposed by the server

The MCP handshake advertises a set of structured resources. Each resource is addressed by URI – clients should use the
standard `resources/list` and `resources/read` JSON-RPC methods rather than bespoke HTTP routes.

| Resource URI                | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| `kolibri://overview`        | High-level metadata about the server and currently indexed content.             |
| `kolibri://health`          | Health status with diagnostic counters and timestamps.                          |
| `kolibri://catalog/samples` | JSON catalogue of every component sample (includes fuzzy-search metadata).      |
| `kolibri://catalog/docs`    | JSON catalogue of Markdown documentation entries.                               |
| `kolibri-sample://{id}`     | Dynamic resource returning the source code and metadata for a specific sample.  |
| `kolibri-doc://{id}`        | Dynamic resource returning Markdown content for a specific documentation entry. |

Each dynamic URI supports completions so clients can offer auto-complete behaviour when prompting for identifiers.

### Tools available to models

In addition to resources, the server registers a rich set of tools that LLMs can call via `tools/list` and `tools/call`:

| Tool name      | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `search`       | Free-text search across samples and docs with optional kind and result limits. |
| `list-samples` | Lists sample summaries and supports optional filtering/limits.                 |
| `get-sample`   | Returns full source code and metadata for a specific sample.                   |
| `list-docs`    | Lists documentation entries with optional filtering/limits.                    |
| `get-doc`      | Retrieves Markdown for a specific documentation entry.                         |
| `fetch`        | Generic fetch that works with both sample and doc identifiers.                 |
| `get-health`   | Returns the current health status (alias: `health`).                           |

All tool responses include a `structuredContent` payload plus textual JSON output, making them easy to consume from both
LLM-driven workflows and traditional scripts.

### Integration with AI Tools

#### Claude Desktop (Anthropic)

Add to your Claude Desktop configuration:

```json
{
	"mcpServers": {
		"kolibri": {
			"command": "npx",
			"args": ["@public-ui/mcp"],
			"env": {}
		}
	}
}
```

#### Custom MCP Client

```javascript
import { spawn } from 'child_process';

// Start MCP server
const mcpServer = spawn('npx', ['@public-ui/mcp']);

// Make a JSON-RPC request via the Streamable HTTP transport
const response = await fetch('http://localhost:3030/http', {
	method: 'POST',
	headers: {
		Accept: 'application/json, text/event-stream',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		jsonrpc: '2.0',
		id: 1,
		method: 'tools/call',
		params: {
			name: 'list-samples',
			arguments: { limit: 3 },
		},
	}),
});

const samples = await response.json();
```

## 📚 What's Included

This MCP server provides access to **136+ KoliBri component examples** and the core **Markdown documentation** of the project, including:

- **Basic Components**: Button, Input, Link, Icon, Badge, etc.
- **Form Components**: Form, Select, Textarea, Checkbox, Radio, etc.
- **Layout Components**: Card, Accordion, Tabs, Modal, etc.
- **Navigation**: Breadcrumb, Pagination, Navigation, etc.
- **Data Display**: Table, Alert, Toast, Progress, etc.
- **Advanced Components**: Tree, Tooltip, Popover, etc.
- **Docs**: `README.md`, `docs/*.md`, migration guides, security guidelines, and more.

Each sample includes:

- ✅ **Complete source code** (React/TypeScript)
- ✅ **Component usage examples**
- ✅ **Accessibility implementations**
- ✅ **Responsive design patterns**

## 🔌 API Reference

### Initialization

The first call every MCP client should make is an `initialize` request. The server will negotiate the protocol version and
describe its capabilities:

```bash
curl \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","clientInfo":{"name":"curl","version":"8"}}}' \
  http://localhost:3030/http
```

### Listing resources

Use `resources/list` to discover the URIs of available data sets:

```bash
curl \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"resources/list"}' \
  http://localhost:3030/http
```

### Reading a resource

Once you have a URI (for example `kolibri-sample://sample/button/basic`), read its contents via `resources/read`:

```bash
curl \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"resources/read","params":{"uri":"kolibri-sample://sample/button/basic"}}' \
  http://localhost:3030/http
```

### Calling tools

Tools encapsulate higher-level workflows. For example, the snippet below returns the first three samples along with AI hints:

```bash
curl \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"list-samples","arguments":{"limit":3}}}' \
  http://localhost:3030/http
```

Tool responses contain both `content` (textual JSON) and `structuredContent` so they are simple to consume in either
automation scripts or LLM pipelines.

All JSON responses contain an `ai-hints` string array that reiterates in English that KoliBri Web Components must be registered, that the correct integration guide and icon font assets need to be bundled, and that `<kol-form>` with an `_errorList` exposes validation errors via its summary.

### 🔁 Server-Sent Events Streaming

Prefer streaming responses? Switch to the SSE transport by issuing a `GET` request to `/sse` and then POSTing JSON-RPC messages
over the same connection. The TypeScript SDK automatically multiplexes events so each JSON-RPC response arrives as its own SSE
message, making incremental rendering straightforward.

```bash
# Terminal 1 - open SSE stream
curl -N http://localhost:3030/sse

# Terminal 2 - send requests bound to the SSE session
curl \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"search","arguments":{"query":"button"}}}' \
  http://localhost:3030/http
```

Each SSE message contains the JSON-RPC payload, allowing UI clients to render partial results without waiting for the entire
response to complete.

## 🛠️ Use Cases

### For AI Agents

- **Code Generation**: Generate KoliBri components with proper usage patterns
- **Documentation**: Understand component APIs and props
- **Best Practices**: Learn accessibility and responsive design implementations
- **Debugging**: Find working examples for troubleshooting

### For Developers

- **Component Discovery**: Browse all available KoliBri components
- **Copy-Paste Examples**: Get ready-to-use component code
- **Learning Resource**: Understand KoliBri design system patterns
- **Integration Guide**: See how components work together

## 🌐 Online Demo

Try the live API at: [https://public-ui-kolibri-mcp.vercel.app/mcp/](https://public-ui-kolibri-mcp.vercel.app/mcp/)

- Landing page with API documentation
- Interactive sample browser
- Real-time health status
- Direct API access

## 🔧 Configuration

### Environment Variables

```bash
PORT=3030          # Server port (default: 3030)
NODE_ENV=production # Environment mode
```

### Programmatic Usage

```javascript
import { handleApiRequest } from '@public-ui/mcp';

// Create custom server
const server = require('http').createServer((req, res) => {
	void handleApiRequest(req, res);
});

server.listen(3030, () => {
	console.log('KoliBri MCP Server running on port 3030');
});
```

## 📖 About KoliBri

[KoliBri](https://public-ui.github.io) is a comprehensive design system and component library focused on:

- ♿ **Accessibility-first** design (WCAG 2.1 AA compliant)
- 🎨 **Themeable** components with design tokens
- 🔧 **Framework-agnostic** (React, Angular, Vue, etc.)
- 🏛️ **Government-ready** (developed by ITZBund)

## 📄 License

This project is licensed under the [EUPL-1.2](https://opensource.org/licenses/EUPL-1.2) license.

## 🤝 Contributing

See [AGENTS.md](./AGENTS.md) for development instructions and contribution guidelines.

---

**Made with ❤️ by [ITZBund](https://www.itzbund.de) for the German government and open source community.**
