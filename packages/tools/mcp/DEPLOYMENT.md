# MCP Deployment Setup

Dieses Dokument beschreibt, wie das MCP-Tool auf Netlify und Vercel bereitgestellt werden kann. Der Netlify-Abschnitt deckt den
bestehenden GitHub-Actions-Workflow ab, der Vercel-Abschnitt erklärt das manuelle bzw. Vercel-automatisierte Deployment.

## Deployment auf Netlify

### Voraussetzungen

#### 1. Netlify-Account und Site erstellen

1. Gehe zu [netlify.com](https://netlify.com) und melde dich an
2. Erstelle eine neue Site:
   - Klicke auf "Add new site" → "Deploy manually"
   - Ziehe einfach einen leeren Ordner rein (wird später über GitHub ersetzt)
   - Notiere dir die **Site ID** (findest du unter Site settings → General → Site details)

#### 2. Netlify Auth Token generieren

1. Gehe zu [Netlify User Settings → Applications](https://app.netlify.com/user/applications)
2. Klicke auf "New access token"
3. Gib einen Namen ein (z.B. "GitHub Actions MCP Deployment")
4. Kopiere den generierten Token

#### 3. GitHub Secrets konfigurieren

Gehe in dein GitHub Repository → Settings → Secrets and variables → Actions und füge folgende Secrets hinzu:

| Secret Name           | Wert                        | Beschreibung                 |
| --------------------- | --------------------------- | ---------------------------- |
| `NETLIFY_AUTH_TOKEN`  | `dein-netlify-access-token` | Der Auth Token aus Schritt 2 |
| `NETLIFY_MCP_SITE_ID` | `deine-site-id`             | Die Site ID aus Schritt 1    |

### Deployment-Workflow

#### Automatische Deployments

Der Workflow wird automatisch ausgelöst bei:

- **Production Deploy**: Push auf `develop` Branch
- **Preview Deploy**: Pull Requests gegen `develop` Branch
- **Manual Deploy**: Über "Actions" Tab → "Deploy MCP to Netlify" → "Run workflow"

#### Deployment-Branches

- **`develop`**: Deployed zur Production-URL (Standard Branch)
- **Pull Requests**: Deployed zu einer temporären Preview-URL (mit Kommentar in der PR)

### Endpunkte nach Deployment

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

### Netlify Site Konfiguration

#### Funktions-Konfiguration

Die `netlify.toml` im Repository-Root konfiguriert:

- **Build Command**: `pnpm --filter @public-ui/mcp prebuild` erzeugt den Sample-Index vor dem Deployment
- **Functions Directory**: `packages/tools/mcp/netlify/functions`
- **URL Redirects**: Alle API-Calls werden zur MCP-Funktion weitergeleitet
- **CORS Headers**: Automatische CORS-Header für API-Endpunkte

#### Environment Variables (Optional)

Falls du zusätzliche Umgebungsvariablen brauchst, kannst du diese in Netlify unter:
**Site settings → Environment variables** hinzufügen.

### Troubleshooting

#### Deployment schlägt fehl

1. Prüfe die GitHub Actions Logs
2. Stelle sicher, dass alle Secrets korrekt gesetzt sind
3. Prüfe ob die `netlify.toml` korrekt ist

#### Funktionen funktionieren nicht

1. Prüfe ob der Functions-Pfad in `netlify.toml` stimmt
2. Teste die lokale Funktion: `cd packages/tools/mcp && pnpm start`
3. Prüfe Netlify Function Logs im Netlify Dashboard

#### API gibt 404 zurück

1. Prüfe die Redirects in `netlify.toml`
2. Stelle sicher, dass `netlify/functions/mcp.js` existiert
3. Teste direkt: `https://site.netlify.app/.netlify/functions/mcp/health`

## Deployment auf Vercel

### Voraussetzungen

1. [Vercel](https://vercel.com) Konto und Teamzugriff
2. Zugriff auf das Git-Repository (GitHub/GitLab/Bitbucket)
3. Aktiviertes `pnpm` in der Vercel-Organisation (Vercel nutzt automatisch die lockfile)

### Projekt anlegen oder importieren

1. Wähle in Vercel "Add New..." → "Project" und importiere das Repository.
2. Wähle als Projektnamen `kolibri-mcp`.
3. Setze **Root Directory** auf `packages/tools/mcp`.
4. Framework Preset: `Other`.
5. Install Command: leer lassen (Vercel führt automatisch `pnpm install --frozen-lockfile` aus).
6. Build Command: `pnpm --filter @public-ui/mcp vercel:build`.
7. Output Directory: leer lassen (Serverless Functions werden direkt aus `api/` erzeugt).
8. Optional: `NODE_VERSION` auf eine unterstützte Node-18-Version setzen (z.B. `18`).

Der Build-Command ruft das Skript `packages/tools/mcp/vercel/build.mjs` auf. Dieses Skript generiert den Sample-Index einmal für
Netlify und kopiert ihn zusätzlich nach `packages/tools/mcp/vercel/sample-index.json`, sodass die Vercel-Funktion den gleichen
Index nutzen kann.

### Environment Variables (optional)

| Name                     | Standardverhalten                                    | Beschreibung                                               |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| `KOLIBRI_MCP_INDEX_PATH` | Automatische Suche (`vercel/sample-index.json`, ...) | Erzwingt einen konkreten Pfad zur JSON-Datei mit dem Index |
| `PORT` (lokale Tests)    | `3030`                                               | Lokaler Port für `pnpm start`                              |

### Endpunkte nach Deployment

Die Vercel-Funktion liegt unter `/api/mcp`. Beispiele:

```bash
https://<projekt>.vercel.app/api/mcp/health
https://<projekt>.vercel.app/api/mcp/samples?q=button
https://<projekt>.vercel.app/api/mcp/sample?id=button/basic
```

Die `POST /api/mcp/refresh`-Route lädt den vorkompilierten Index neu. Sofern der Build-Command ausgeführt wurde, lädt die
Funktion die Datei erneut; andernfalls fällt sie auf einen dynamischen Neuaufbau zurück.

### Automatisiertes Deployment mit GitHub Actions

Für kontinuierliche Deployments steht der Workflow `.github/workflows/mcp-vercel.yml` bereit.
Er nutzt die Vercel CLI, baut den Sample-Index über `pnpm --filter @public-ui/mcp vercel:build`
vor und triggert anschließend ein Deployment.

#### Benötigte GitHub Secrets

Lege in GitHub unter **Settings → Secrets and variables → Actions** folgende Secrets an:

- `VERCEL_MCP_TOKEN`: Persönliches Access Token aus dem Vercel Dashboard unter Account Settings → Tokens (https://vercel.com/account/tokens)
- `VERCEL_MCP_TEAM_ID`: Team-ID aus **Vercel → Settings → General → IDs → Team ID** (wird im Workflow als `VERCEL_ORG_ID` an die CLI weitergereicht)
- `VERCEL_MCP_PROJECT_ID`: Projekt-ID aus **Vercel → Project → Settings → General → Project ID**

> Tipp: Kopiere die Werte direkt aus der `vercel.json`, die du über `vercel pull --yes` lokal erzeugen kannst.

#### Workflow-Ablauf

- **Production Deploy**: Push auf `develop`
- **Preview Deploy**: Pull Requests gegen `develop` (inkl. Kommentar mit Vercel-URL in der PR)
- **Manuelles Deploy**: Über den "Run workflow" Button im Actions-Tab

Der Workflow lädt die passende Vercel-Umgebung (`vercel pull`), erzeugt das Build-Artefakt (`vercel build`)
und deployt es (`vercel deploy --prebuilt`). Für Pull Requests wird die erzeugte Preview-URL automatisch als
Kommentar geteilt (Kommentar wird bei erneuten Läufen aktualisiert).

### Manuelles Deployment mit der Vercel CLI

```bash
# Einmalig CLI installieren (global)
npm install -g vercel

# Repository vorbereiten
pnpm install
pnpm --filter @public-ui/mcp vercel:build

# Deploy (Preview)
cd packages/tools/mcp
vercel

# Deploy (Production)
vercel --prod
```

> Hinweis: Das Skript `pnpm --filter @public-ui/mcp vercel:build` muss vor jedem Deploy ausgeführt werden, damit die Datei
> `vercel/sample-index.json` aktualisiert wird und im Serverless Bundle landet. Das anschließende `vercel`-Kommando wird in
> `packages/tools/mcp` ausgeführt, sodass keine zusätzlichen `--cwd`-Parameter mehr notwendig sind.

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
- **Vercel Dashboard**: Builds, Serverless-Logs und Traffic-Statistiken
- **Uptime Monitoring**: Nutze externe Services für Production-Monitoring
