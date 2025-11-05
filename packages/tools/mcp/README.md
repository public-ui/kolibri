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

The server will start on `http://localhost:3030` and provide the following endpoints:

- **Base paths**
  - `http://localhost:3030/mcp` – automatic transport detection (default)
  - `http://localhost:3030/http` – force plain JSON/HTTP responses
  - `http://localhost:3030/sse` – force Server-Sent Events streaming

  Use the explicit `/http/*` prefix for classic `fetch`/`curl` style requests and `/sse/*` when a Server-Sent Events transport is required. The automatic `/mcp/*` routes continue to exist but may negotiate a different transport depending on the headers a client sends.

- `POST /mcp/initialize` - Discover available resources and capabilities (JSON or SSE)
- `GET /mcp/health` - Server status and content counts (JSON or SSE)
- `GET /mcp/samples` - List all available component examples (JSON or SSE)
- `GET /mcp/sample?id=sample/button/basic` - Get specific sample source code (JSON or SSE)
- `GET /mcp/docs` - List Markdown documentation (JSON or SSE)
- `GET /mcp/doc?id=doc/README` - Get a specific documentation entry (JSON or SSE)

The sample and doc indexes are prebuilt for deployments, therefore no manual refresh endpoint is exposed in production.

### Resource catalogue

The MCP `initialize` handshake advertises the following resources so clients can understand how to query the server:

| ID      | Description                                                                        | Methods | Parameters |
| ------- | ---------------------------------------------------------------------------------- | ------- | ---------- |
| health  | Reports the service health together with counters for all indexed entries.         | `GET`   | –          |
| samples | Lists every indexed sample and supports optional filtering by free-text query.     | `GET`   | `q`        |
| sample  | Returns the source code, metadata, and AI hints for a specific component example.  | `GET`   | `id`       |
| docs    | Lists Markdown documentation entries such as guides, migration notes, and READMEs. | `GET`   | `q`        |
| doc     | Returns the Markdown content and metadata for a single documentation entry.        | `GET`   | `id`       |

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

// Make requests to the server
const response = await fetch('http://localhost:3030/http/samples');
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

### POST /mcp/initialize

Returns the server capabilities, available resources, and content counters so MCP clients can configure themselves without hard-coding endpoints.

```bash
curl -X POST http://localhost:3030/mcp/initialize
```

The response includes protocol metadata, streaming support information, and the exact endpoints exposed by the server.

### GET /mcp/health

Returns server status and metadata:

```json
{
	"status": "ok",
	"healthy": true,
	"totalEntries": 154,
	"totalSamples": 136,
	"totalDocs": 18,
	"message": "System healthy with 154 entries available",
	"generatedAt": "2024-05-28T08:15:30.000Z",
	"ai-hints": [
		"Always register KoliBri Web Components in the browser runtime before rendering them.",
		"Choose the integration guide that matches your project setup to load and bundle the components correctly.",
		"Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.",
		"Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary."
	]
}
```

### GET /mcp/docs

List Markdown-based documentation entries:

```bash
# Get all docs
curl http://localhost:3030/mcp/docs

# Filter by term
curl "http://localhost:3030/mcp/docs?q=theme"
```

### GET /mcp/doc?id={docId}

Fetch Markdown documentation by referencing its `docs/...` identifier:

```bash
curl "http://localhost:3030/mcp/doc?id=doc/README"
```

Returns the Markdown content together with metadata. Every sample or doc response exposes a `kind` field so that clients can distinguish between component examples and documentation entries.

```json
{
	"id": "sample/button/basic",
	"group": "button",
	"name": "basic",
	"path": "packages/samples/react/src/components/button/basic.tsx",
	"code": "import React from 'react';\nimport { KolButton } from '@public-ui/react';\n...",
	"kind": "sample",
	"ai-hints": [
		"Always register KoliBri Web Components in the browser runtime before rendering them.",
		"Choose the integration guide that matches your project setup to load and bundle the components correctly.",
		"Bundle the KoliBri icon font assets (for example codicon.css and codicon.ttf) so kol-icon glyphs can render.",
		"Wrap input elements with <kol-form> and feed its _errorList to surface validation issues via the generated error summary."
	]
}
```

### GET /mcp/docs

List Markdown-based documentation entries:

```bash
curl http://localhost:3030/mcp/docs

# Filter by term
curl "http://localhost:3030/mcp/docs?q=theme"
```

### GET /mcp/doc?id={docId}

Fetch Markdown documentation by referencing its `docs/...` identifier:

```bash
curl "http://localhost:3030/mcp/doc?id=doc/README"
```

Returns the Markdown content together with metadata. Every sample or doc response exposes a `kind` field so that clients can distinguish between component examples and documentation entries.

All JSON responses contain an `ai-hints` string array that reiterates in English that KoliBri Web Components must be registered, that the correct integration guide and icon font assets need to be bundled, and that `<kol-form>` with an `_errorList` exposes validation errors via its summary.

### 🔁 Server-Sent Events Streaming

Every resource can also be consumed as **Server-Sent Events (SSE)** so MCP clients that prefer streaming never have to switch transports mid-session. Request streaming responses by either:

- Sending the header `Accept: text/event-stream`
- Adding the query parameter `stream=1`
- Using the dedicated base path `http://localhost:3030/sse`, e.g. `http://localhost:3030/sse/samples`

The server emits a `meta` event with the query context followed by one event per resource (`initialize`, `health`, `sample`, `doc`, etc.) and an `end` event once streaming is complete. This enables MCP clients to render results immediately without waiting for the entire payload, even when requesting individual items.

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
	handleApiRequest(req, res);
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
