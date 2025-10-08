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

- `GET /mcp/health` - Server status and content counts
- `GET /mcp/samples` - List all available component examples
- `GET /mcp/sample?id=sample/button/basic` - Get specific sample source code
- `GET /mcp/concepts` - List Markdown concept documentation
- `GET /mcp/concept?id=concept/README` - Get a specific concept document
- `POST /mcp/refresh` - Refresh sample index

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
const response = await fetch('http://localhost:3030/mcp/samples');
const samples = await response.json();
```

## 📚 What's Included

This MCP server provides access to **136+ KoliBri component examples** and the core **Markdown concept documentation** of the project, including:

- **Basic Components**: Button, Input, Link, Icon, Badge, etc.
- **Form Components**: Form, Select, Textarea, Checkbox, Radio, etc.
- **Layout Components**: Card, Accordion, Tabs, Modal, etc.
- **Navigation**: Breadcrumb, Pagination, Navigation, etc.
- **Data Display**: Table, Alert, Toast, Progress, etc.
- **Advanced Components**: Tree, Tooltip, Popover, etc.
- **Concept Docs**: `README.md`, `docs/*.md`, migration guides, security guidelines, and more.

Each sample includes:

- ✅ **Complete source code** (React/TypeScript)
- ✅ **Component usage examples**
- ✅ **Accessibility implementations**
- ✅ **Responsive design patterns**

## 🔌 API Reference

### GET /mcp/health

Returns server status and metadata:

```json
{
	"status": "ok",
	"healthy": true,
	"totalEntries": 154,
	"totalSamples": 136,
	"totalConcepts": 18,
	"totalDocs": 18,
	"message": "System healthy with 154 entries available",
	"generatedAt": "2024-05-28T08:15:30.000Z",
	"ai-hints": "KoliBri Web Components müssen im Browser registriert werden; abhängig vom Projekt-Setup stehen unterschiedliche Integrationswege bereit."
}
```

### GET /mcp/samples

List all available samples with optional filtering:

```bash
# Get all samples
curl http://localhost:3030/mcp/samples

# Filter by component
curl "http://localhost:3030/mcp/samples?q=button"
```

### GET /mcp/sample?id={sampleId}

Get complete source code for a specific sample:

```bash
curl "http://localhost:3030/mcp/sample?id=sample/button/basic"
```

Returns:

```json
{
	"id": "sample/button/basic",
	"group": "button",
	"name": "basic",
	"path": "packages/samples/react/src/components/button/basic.tsx",
	"code": "import React from 'react';\nimport { KolButton } from '@public-ui/react';\n...",
	"kind": "sample",
	"ai-hints": "KoliBri Web Components müssen im Browser registriert werden; abhängig vom Projekt-Setup stehen unterschiedliche Integrationswege bereit."
}
```

### GET /mcp/concepts

List Markdown-based concept documentation entries:

```bash
curl http://localhost:3030/mcp/concepts

# Filter by term
curl "http://localhost:3030/mcp/concepts?q=theme"
```

### GET /mcp/concept?id={conceptId}

Fetch Markdown documentation by referencing its `concepts/...` identifier:

```bash
curl "http://localhost:3030/mcp/concept?id=concept/README"
```

Returns the Markdown content together with metadata. Every sample or concept response exposes a `kind` field so that clients can distinguish between component examples and documentation entries.

All JSON responses contain an `ai-hints` field reminding clients that KoliBri Web Components have to be registered in the browser and that integration details depend on the chosen project setup.

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
