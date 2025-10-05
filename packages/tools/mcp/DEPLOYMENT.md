# MCP Netlify Deployment Setup

Dieses Dokument beschreibt, wie das MCP-Tool automatisch über GitHub Actions auf Netlify deployed wird.

## Voraussetzungen

### 1. Netlify-Account und Site erstellen

1. Gehe zu [netlify.com](https://netlify.com) und melde dich an
2. Erstelle eine neue Site:
   - Klicke auf "Add new site" → "Deploy manually"
   - Ziehe einfach einen leeren Ordner rein (wird später über GitHub ersetzt)
   - Notiere dir die **Site ID** (findest du unter Site settings → General → Site details)

### 2. Netlify Auth Token generieren

1. Gehe zu [Netlify User Settings → Applications](https://app.netlify.com/user/applications)
2. Klicke auf "New access token"
3. Gib einen Namen ein (z.B. "GitHub Actions MCP Deployment")
4. Kopiere den generierten Token

### 3. GitHub Secrets konfigurieren

Gehe in dein GitHub Repository → Settings → Secrets and variables → Actions und füge folgende Secrets hinzu:

| Secret Name           | Wert                        | Beschreibung                 |
| --------------------- | --------------------------- | ---------------------------- |
| `NETLIFY_AUTH_TOKEN`  | `dein-netlify-access-token` | Der Auth Token aus Schritt 2 |
| `NETLIFY_MCP_SITE_ID` | `deine-site-id`             | Die Site ID aus Schritt 1    |

## Deployment-Workflow

### Automatische Deployments

Der Workflow wird automatisch ausgelöst bei:

- **Production Deploy**: Push auf `develop` Branch
- **Preview Deploy**: Pull Requests gegen `develop` Branch
- **Manual Deploy**: Über "Actions" Tab → "Deploy MCP to Netlify" → "Run workflow"

### Deployment-Branches

- **`develop`**: Deployed zur Production-URL (Standard Branch)
- **Pull Requests**: Deployed zu einer temporären Preview-URL (mit Kommentar in der PR)

## Endpunkte nach Deployment

Nach erfolgreichem Deployment sind folgende Endpunkte verfügbar:

```bash
Production: https://deine-site-id.netlify.app/
Preview: https://deploy-preview-NUMMER--deine-site-id.netlify.app/

API Endpunkte:
- GET /health
- GET /samples
- GET /sample?id=<component/sample>
- POST /refresh
```

## Netlify Site Konfiguration

### Funktions-Konfiguration

Die `netlify.toml` im Repository-Root konfiguriert:

- **Functions Directory**: `packages/tools/mcp/netlify/functions`
- **URL Redirects**: Alle API-Calls werden zur MCP-Funktion weitergeleitet
- **CORS Headers**: Automatische CORS-Header für API-Endpunkte

### Environment Variables (Optional)

Falls du zusätzliche Umgebungsvariablen brauchst, kannst du diese in Netlify unter:
**Site settings → Environment variables** hinzufügen.

## Troubleshooting

### Deployment schlägt fehl

1. Prüfe die GitHub Actions Logs
2. Stelle sicher, dass alle Secrets korrekt gesetzt sind
3. Prüfe ob die `netlify.toml` korrekt ist

### Funktionen funktionieren nicht

1. Prüfe ob der Functions-Pfad in `netlify.toml` stimmt
2. Teste die lokale Funktion: `cd packages/tools/mcp && pnpm start`
3. Prüfe Netlify Function Logs im Netlify Dashboard

### API gibt 404 zurück

1. Prüfe die Redirects in `netlify.toml`
2. Stelle sicher, dass `netlify/functions/mcp.js` existiert
3. Teste direkt: `https://site.netlify.app/.netlify/functions/mcp/health`

## Lokales Testen

```bash
# MCP-Tool lokal starten
cd packages/tools/mcp
pnpm start

# Endpunkte testen
curl http://localhost:3030/health
curl http://localhost:3030/samples
```

## Monitoring

- **GitHub Actions**: Workflow-Status in der Actions-Tab
- **Netlify Dashboard**: Deployment-Logs und Function-Logs
- **Uptime Monitoring**: Nutze externe Services für Production-Monitoring
