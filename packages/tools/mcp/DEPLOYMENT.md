# MCP Deployment Setup

Dieses Dokument beschreibt, wie das MCP-Tool mit Vercel bereitgestellt werden kann. Der bisherige Netlify-Workflow wurde entfernt, alle Serverless-Deployments laufen über Vercel.

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
6. Build Command: `pnpm --filter @public-ui/mcp build:deps && pnpm --filter @public-ui/mcp vercel:build`.
7. Output Directory: leer lassen (Serverless Functions werden direkt aus `api/` erzeugt).
8. Optional: `NODE_VERSION` auf eine unterstützte Node-18-Version setzen (z.B. `18`).

Der Build-Command ruft das Skript `packages/tools/mcp/vercel/build.mjs` auf. Dieses Skript generiert den Sample-Index und legt ihn unter `packages/tools/mcp/vercel/sample-index.json` ab, sodass die Vercel-Funktion ohne Dateisystemzugriff arbeiten kann.

### Environment Variables (optional)

| Name                     | Standardverhalten                                    | Beschreibung                                               |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| `KOLIBRI_MCP_INDEX_PATH` | Automatische Suche (`vercel/sample-index.json`, ...) | Erzwingt einen konkreten Pfad zur JSON-Datei mit dem Index |
| `PORT` (lokale Tests)    | `3030`                                               | Lokaler Port für `pnpm start`                              |

### Endpunkte nach Deployment

Die Funktion wird von Vercel automatisch unter `/api/mcp` bereitgestellt. Zusätzliche Rewrites sind nicht erforderlich. Nach dem Deployment erreichst du die Endpunkte beispielsweise so:

```bash
https://<projekt>.vercel.app/api/mcp/health
https://<projekt>.vercel.app/api/mcp/samples?q=button
https://<projekt>.vercel.app/api/mcp/sample?id=button/basic
```

Die Route `POST /api/mcp/refresh` lädt den vorkompilierten Index neu. Sofern der Build-Command ausgeführt wurde, lädt die Funktion die Datei erneut; andernfalls fällt sie auf einen dynamischen Neuaufbau zurück.

### Automatisiertes Deployment mit GitHub Actions

Für kontinuierliche Deployments steht der Workflow `.github/workflows/mcp-vercel.yml` bereit. Er nutzt die Vercel CLI, baut den Sample-Index über `pnpm --filter @public-ui/mcp vercel:build` vor und triggert anschließend ein Deployment.

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

Der Workflow lädt die passende Vercel-Umgebung (`vercel pull`), erzeugt das Build-Artefakt (`vercel build`) und deployt es (`vercel deploy --prebuilt`). Für Pull Requests wird die erzeugte Preview-URL automatisch als Kommentar geteilt (Kommentar wird bei erneuten Läufen aktualisiert).

### Manuelles Deployment mit der Vercel CLI

```bash
# Einmalig CLI installieren (global)
npm install -g vercel

# Repository vorbereiten
pnpm install
pnpm --filter @public-ui/mcp build:deps
pnpm --filter @public-ui/mcp vercel:build

# Deploy (Preview)
cd packages/tools/mcp
vercel

# Deploy (Production)
vercel --prod
```

> Hinweis: Die Befehle `pnpm --filter @public-ui/mcp build:deps` und `pnpm --filter @public-ui/mcp vercel:build` müssen vor jedem Deploy ausgeführt werden, damit alle abhängigen Pakete gebaut werden und die Datei `vercel/sample-index.json` aktualisiert wird.
> Das anschließende `vercel`-Kommando wird in `packages/tools/mcp` ausgeführt, sodass keine zusätzlichen `--cwd`-Parameter mehr notwendig sind.

## Lokales Testen

```bash
# MCP-Tool lokal starten
cd packages/tools/mcp
pnpm start
```

Die lokale Instanz antwortet ebenfalls auf den Pfaden unter `/api/mcp`, zum Beispiel `http://localhost:3030/api/mcp/health`.
