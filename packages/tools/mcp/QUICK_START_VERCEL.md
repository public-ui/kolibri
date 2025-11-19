# Quick Start für Vercel Deployment

## Voraussetzungen

```bash
# Vercel CLI installieren (global)
npm i -g vercel

# Im Projektverzeichnis
cd packages/tools/mcp
```

## Deployment-Schritte

**Wichtig:** Der Build erfolgt automatisch in GitHub Actions. Für manuelles Deployment:

### 1. Sample-Index generieren

```bash
pnpm run generate-index
```

Dieser Befehl erstellt `shared/sample-index.json` mit allen KoliBri-Komponenten-Samples.

### 2. Build durchführen

```bash
pnpm run build
```

Kompiliert TypeScript (`src/`) nach JavaScript (`dist/`). Die API (`api/index.js`) importiert diese vorgebauten Module.

### 3. Vercel Login

```bash
vercel login
```

### 4. Deployment

```bash
# Preview Deployment (für Testing)
vercel

# Production Deployment
vercel --prod
```

**Hinweis:** Vercel führt keinen Build aus - es verwendet die bereits kompilierten Dateien aus `dist/`.

## Deployment-Architektur

```
/                      → public/index.html (Landingpage)
/mcp                   → api/index.js (MCP Server Handler)
/api/index             → api/index.js (direkte API-Route)
```

### Dateistruktur für Vercel

```text
packages/tools/mcp/
├── api/
│   └── index.js           # Vercel Serverless Function (plain JavaScript, no build needed)
├── src/
│   ├── data.ts            # Datenzugriff (TypeScript source)
│   ├── search.ts          # Fuzzy-Search-Engine (TypeScript source)
│   └── mcp.ts             # Core MCP Logic (für lokale Entwicklung)
├── shared/
│   └── sample-index.json  # Generierter Sample-Index (statisch)
├── public/
│   └── index.html         # Landingpage
├── dist/
│   └── ...                # Kompiliertes TypeScript (von src/ → dist/)
├── vercel.json            # Vercel-Konfiguration
└── package.json
```

## Testen des Deployments

### Lokaler Vercel Dev Server

```bash
vercel dev
```

Öffne <http://localhost:3000>:

- `/` - Landingpage
- `/mcp` - MCP-Endpunkt

### MCP-Request testen

```bash
# Liste alle Tools
curl -X POST https://your-deployment.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'

# Suche nach Samples
curl -X POST https://your-deployment.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "search",
      "arguments": {
        "query": "button",
        "limit": 5
      }
    }
  }'
```

## Claude Desktop Integration

Nach dem Deployment, konfiguriere Claude Desktop:

### macOS/Linux: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
	"mcpServers": {
		"kolibri": {
			"url": "https://your-deployment.vercel.app/mcp",
			"transport": {
				"type": "http"
			}
		}
	}
}
```

## Umgebung-Spezifische Konfiguration

### Vercel Environment Variables (optional)

Keine erforderlich für grundlegende Funktionalität. Optional:

```bash
# In Vercel Dashboard oder CLI
vercel env add NODE_ENV production
```

## Monitoring und Debugging

### Vercel Logs ansehen

```bash
# In Echtzeit
vercel logs

# Letzte 100 Einträge
vercel logs --since 1h
```

### Deployment-URLs

- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-xyz.vercel.app` (bei jedem `vercel` ohne `--prod`)

## Troubleshooting

### "Cannot find module" Fehler

```bash
# Stelle sicher, dass Build durchgelaufen ist
pnpm run generate-index
pnpm run build

# Prüfe ob dist/ existiert
ls -la dist/
```

### "Sample index not found"

```bash
# Sample-Index neu generieren
pnpm run generate-index

# Prüfe ob shared/sample-index.json existiert
cat shared/sample-index.json | jq '.metadata'
```

### Vercel CLI Probleme

```bash
# Logout und erneut einloggen
vercel logout
vercel login

# Projekt-Link entfernen und neu verbinden
rm -rf .vercel
vercel
```

## Weiterführende Ressourcen

- [Vercel Documentation](https://vercel.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [KoliBri Dokumentation](https://public-ui.github.io/)
- [Ausführliche Deployment-Anleitung](./VERCEL_DEPLOYMENT.md)
