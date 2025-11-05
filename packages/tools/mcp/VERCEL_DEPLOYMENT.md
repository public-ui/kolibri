# KoliBri MCP Server - Vercel Deployment

## Deployment auf Vercel

### 1. Vorbereitung

```bash
# Build lokal testen
pnpm build

# Vercel CLI installieren (falls noch nicht vorhanden)
npm i -g vercel
```

### 2. Deployment

```bash
# Login bei Vercel
vercel login

# Projekt deployen
vercel

# Production deployment
vercel --prod
```

### 3. Umgebungsvariablen (optional)

Keine speziellen Umgebungsvariablen erforderlich.

## API Endpoints

Nach dem Deployment sind folgende Endpoints verfügbar:

- `GET /` - Landing Page mit Dokumentation
- `GET /api/sse` - SSE Endpoint für MCP Client-Verbindung
- `POST /api/message` - JSON-RPC Message Endpoint
- `GET /api/health` - Health Check

## Client-Integration

### JavaScript/TypeScript Client

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const transport = new SSEClientTransport(new URL('https://your-deployment.vercel.app/api/sse'));

const client = new Client(
	{
		name: 'kolibri-client',
		version: '1.0.0',
	},
	{
		capabilities: {},
	},
);

await client.connect(transport);

// Tools aufrufen
const result = await client.request({
	method: 'tools/call',
	params: {
		name: 'search',
		arguments: {
			query: 'button',
		},
	},
});
```

### cURL Test

```bash
# Health Check
curl https://your-deployment.vercel.app/api/health

# SSE Connection (Terminal bleibt offen)
curl -N https://your-deployment.vercel.app/api/sse

# Message senden
curl -X POST https://your-deployment.vercel.app/api/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

## Architektur

```
┌─────────────┐         ┌──────────────┐
│   Client    │◄────────┤  GET /api/sse │
│   (Browser) │         └──────────────┘
│             │         Server-Sent Events
└─────────────┘                ▲
       │                       │
       │                       │
       ├─────────────────►┌────────────────┐
       │ POST /api/message │  MCP Server    │
       │ JSON-RPC          │  (Serverless)  │
       └───────────────────┤  - search      │
                           │  - get_entry   │
                           │  - hello       │
                           └────────────────┘
```

## Features

- ✅ SSE (Server-Sent Events) Transport
- ✅ Serverless Functions auf Vercel
- ✅ CORS enabled für Browser-Clients
- ✅ Fuzzy Search mit fuse.js
- ✅ Health Check Endpoint
- ✅ Automatische Reconnection

## Troubleshooting

### SSE Verbindung bricht ab

Vercel hat ein 60-Sekunden Timeout für Serverless Functions. Der Code sendet Keep-Alive Pings alle 30 Sekunden.

### CORS Fehler

Alle API Endpoints haben `Access-Control-Allow-Origin: *` gesetzt. Prüfe Browser DevTools für Details.

### Build Fehler

```bash
# Clean und neu bauen
rm -rf dist/ .vercel/
pnpm build
vercel
```

## Lokale Entwicklung

```bash
# Vercel Dev Server starten
vercel dev

# Oder: Build + eigener Server
pnpm build
pnpm start
```

Der Server läuft dann auf `http://localhost:3000`.

## Produktionshinweise

1. **Rate Limiting**: Vercel Serverless Functions haben Limits - siehe [Vercel Limits](https://vercel.com/docs/limits)
2. **Cold Starts**: Erste Anfrage kann langsamer sein
3. **Logs**: Verwende `vercel logs` für Production Logs
4. **Monitoring**: Aktiviere Vercel Analytics für besseres Monitoring

## Links

- [Vercel Dokumentation](https://vercel.com/docs)
- [MCP Specification](https://modelcontextprotocol.io)
- [KoliBri Docs](https://public-ui.github.io)
