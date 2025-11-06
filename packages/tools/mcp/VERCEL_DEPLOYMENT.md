# Vercel Deployment Guide

Diese Anleitung beschreibt, wie der KoliBri MCP Server auf Vercel deployed wird.

## Vercel-Konfiguration

Der MCP Server wird als **vorgebaute Vercel Serverless Function** deployed:

- **Build-Prozess**: Erfolgt in GitHub Actions, nicht auf Vercel
- **Deployment**: Nur fertig kompilierte Dateien (`dist/`, `api/`, `shared/`) werden hochgeladen
- **Vercel Install**: Dependencies werden installiert (für imports in `api/index.js`)
- **Vercel Build**: Übersprungen (nur Echo-Nachricht)
- **API-Endpoint**: `/api/index.js` (importiert vorgebaute Module aus `dist/`)
- **Öffentlicher Rewrite**: `/mcp` wird zu `/api/index` umgeschrieben
- **Statische Seite**: `/` zeigt `public/index.html`

## Build-Workflow (GitHub Actions)

Der Build-Prozess läuft automatisch in GitHub Actions:

1. Sample-Index generieren (`pnpm run generate-index`)
2. TypeScript kompilieren (`pnpm run build`)
3. Artefakte hochladen
4. Zu Vercel deployen

**Wichtig:** Vercel führt **keinen** Build aus - es verwendet nur die vorgebauten Dateien.

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
pnpm install

# Sample-Index generieren
pnpm run generate-index

# Build für Vercel
pnpm run build

# Lokalen Express-Server starten (für Entwicklung)
pnpm run start

# Oder mit Nodemon für Hot-Reload
pnpm run dev
```

## Vercel CLI Deployment

### Installation

```bash
npm i -g vercel
```

### Deployment

```bash
# Erstmaliges Deployment (interaktiv)
vercel

# Production Deployment
vercel --prod

# Preview Deployment
vercel
```

### Lokale Vercel-Umgebung testen

```bash
# Vercel Dev Server starten
vercel dev
```

Dies startet einen lokalen Server, der die Vercel-Serverless-Funktionen simuliert.

## GitHub Actions Integration

Der Deploy-Prozess ist bereits in GitHub Actions integriert. Die Workflow-Datei befindet sich im Haupt-Repository.

**Wichtig:** Jeder Pull Request triggert automatisch ein Preview-Deployment über Vercel. Dadurch steht Reviewer:innen stets eine aktuelle Test-Instanz zur Verfügung, unabhängig davon, welche Dateien im PR geändert wurden.

**Build-Schritte in CI:**

1. Dependencies installieren
2. Sample-Index generieren (`pnpm run generate-index`)
3. TypeScript kompilieren (`pnpm run build` → `dist/`)
4. Zu Vercel deployen (nur `dist/`, `api/`, `shared/`, `public/`)

**Vercel-Verhalten:**

- `installCommand`: Standard (Dependencies werden installiert für imports)
- `buildCommand`: Übersprungen (gibt nur Info-Nachricht aus)
- Alle Dateien (`dist/`) sind bereits gebaut und einsatzbereit

## Umgebungsvariablen

Keine speziellen Umgebungsvariablen erforderlich. Der Server verwendet statische Daten aus `shared/sample-index.json`.

## API-Endpunkt Nutzung

### MCP über HTTP

```bash
# POST Request an den MCP-Endpunkt
curl -X POST https://your-deployment.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'
```

### Als MCP-Client konfigurieren

Für Claude Desktop oder andere MCP-Clients:

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

## Vercel-spezifische Konfiguration

### vercel.json

Die Konfiguration in `vercel.json`:

- **buildCommand**: Überspringt den Build, da dieser bereits in GitHub Actions erfolgt
- **rewrites**: Schreibt `/mcp` auf die Serverless Function `api/index` um (Root `/` bleibt bei der statischen Landingpage)
- **headers**: CORS-Header für Cross-Origin-Zugriffe
- **functions**: Timeout-Konfiguration für Serverless Functions

### Wichtige Dateien für Vercel

**Deployed werden:**

- `api/index.js` - Haupthandler für MCP-Requests (Vercel Serverless Function, plain JavaScript)
- `dist/` - Vorgebaute JavaScript-Module (importiert von `api/index.js`)
  - `dist/data.js` - Datenzugriff für Sample-Index
  - `dist/search.js` - Fuzzy-Search-Implementierung
  - `dist/mcp.js` - Core MCP Server Logic (für lokale Entwicklung)
- `shared/sample-index.json` - Statischer Index aller Komponenten-Samples (vor-generiert)
- `public/index.html` - Landingpage
- `vercel.json` - Deployment-Konfiguration

**Nicht deployed (nur für Entwicklung):**

- `src/` - TypeScript-Quellcode
- `node_modules/` - Nicht hochgeladen (werden von Vercel installiert für Runtime)

## Troubleshooting

### Build Fehler: "Cannot find module"

Stelle sicher, dass:

1. `pnpm run generate-index` vor dem Build ausgeführt wurde
2. `pnpm run build` erfolgreich durchgelaufen ist
3. Die `dist/` Verzeichnis vorhanden ist

### Timeout-Fehler

Vercel Free Tier hat ein 10s Timeout, Hobby/Pro 30s. Bei komplexen Queries:

- Limit-Parameter nutzen: `{"limit": 5}`
- Kind-Filter anwenden: `{"kind": "sample"}`

### CORS-Fehler

Überprüfe die `headers` Konfiguration in `vercel.json`. Die CORS-Header sind für alle `/api/*` Routen konfiguriert.

## Performance-Optimierung

1. **Caching**: Sample-Index wird beim Startup geladen und gecacht
2. **Fuzzy Search**: Fuse.js mit optimierten Schwellwerten (0.4)
3. **Serverless Cold Start**: Erste Request kann ~1-2s dauern

## Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Model Context Protocol](https://modelcontextprotocol.io/)
