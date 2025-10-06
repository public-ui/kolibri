# @public-ui/mcp

Dieses Paket stellt einen einfachen Node.js-gestützten Backend-Dienst für das Model Context Protocol (MCP) bereit. Darüber können KI-Agents strukturierte Informationen zu den KoliBri-Beispielen abrufen und sich den Original-Quellcode zurückgeben lassen.

## Starten des Servers

```bash
pnpm --filter @public-ui/mcp start
```

Standardmäßig lauscht der Dienst auf Port `3030`. Über die Umgebungsvariable `PORT` kann ein anderer Port gewählt werden. Die lokalen Endpunkte sind anschließend unter `http://localhost:<port>/api/mcp/...` erreichbar.

## Serverless-Einsatz auf Vercel

Für den Serverless-Betrieb steht eine Vercel-Funktion im Verzeichnis `packages/tools/mcp/api/mcp.js` bereit. Sie beantwortet alle MCP-Routen (`/health`, `/samples`, `/sample`, `/refresh`) unter dem Vercel-Standardpräfix `/api/mcp`.

Vor dem Deploy sollte ein vorkompilierter Sample-Index erzeugt werden, damit die Funktion ohne Dateisystemzugriff arbeiten kann:

```bash
pnpm --filter @public-ui/mcp prebuild
```

Der Befehl schreibt die Datei `vercel/sample-index.json`, die beim Deployment neben die Funktion gelegt wird. Wird kein Index gefunden, erzeugt die Funktion ihn beim ersten Aufruf dynamisch.

Nach dem Deployment erreichst du die Endpunkte auf Vercel beispielsweise über `https://<projekt>.vercel.app/api/mcp/health`, `https://<projekt>.vercel.app/api/mcp/samples` oder `https://<projekt>.vercel.app/api/mcp/sample?id=button/basic`.

## Endpunkte

- `GET /api/mcp/health` – liefert den Status des Backends sowie Metadaten zum aktuellen Sample-Index.
- `GET /api/mcp/samples` – listet alle verfügbaren Samples. Optional kann über den Query-Parameter `q` gefiltert werden.
- `GET /api/mcp/sample?id=<component/sample>` – liefert Pfad und Quellcode eines spezifischen Samples zurück.
- `POST /api/mcp/refresh` – baut den Sample-Index neu auf, falls sich Dateien verändert haben.

Alle Antworten werden als JSON ausgeliefert und enthalten bereits die relativen Pfade innerhalb des Repositorys.

## Funktionsweise

Beim Start werden sämtliche `routes.ts`-Dateien aus dem React-Sample-Projekt analysiert. Die darin referenzierten Komponentendateien werden aufgelöst, gelesen und in einem Index zwischengespeichert. Auf Basis dieses Indexes beantwortet der Server Anfragen von MCP-kompatiblen Clients.

## Weiterentwicklung

- Zusätzliche Filter oder Volltextsuche können direkt im `SampleIndex` umgesetzt werden.
- Für produktive Umgebungen empfiehlt sich das Hinterlegen einer Authentifizierung vor dem MCP-Backend.
