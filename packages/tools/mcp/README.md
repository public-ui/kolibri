# @public-ui/mcp

Dieses Paket stellt einen einfachen Node.js-gestützten Backend-Dienst für das Model Context Protocol (MCP) bereit. Darüber können KI-Agents strukturierte Informationen zu den KoliBri-Beispielen abrufen und sich den Original-Quellcode zurückgeben lassen.

## Starten des Servers

```bash
pnpm --filter @public-ui/mcp start
```

Standardmäßig lauscht der Dienst auf Port `3030`. Über die Umgebungsvariable `PORT` kann ein anderer Port gewählt werden.

## Serverless-Einsatz auf Netlify

Neben dem lokalen Node.js-Server stellt das Paket eine Netlify-Funktion bereit. Beim Deployen reicht es aus, das Verzeichnis `packages/tools/mcp/netlify/functions` als Funktionsordner zu konfigurieren. Die Funktion `mcp` übernimmt alle Routen (`/health`, `/samples`, `/sample`, `/refresh`) und kümmert sich intern um CORS-Header sowie die Index-Aktualisierung.

Damit die Funktion ohne direkten Zugriff auf das Repository-Dateisystem antworten kann, muss vor dem Deploy ein vorkompilierter Sample-Index erzeugt werden:

```bash
pnpm --filter @public-ui/mcp prebuild
```

Der Befehl schreibt die Datei `netlify/functions/sample-index.json`, die beim Deployment gemeinsam mit der Funktion gebündelt wird. Der in Netlify verwendete Build-Schritt sollte diesen Befehl daher immer ausführen (siehe `netlify.toml`).

Im lokalen Netlify-Dev-Modus können die Endpunkte beispielsweise unter `http://localhost:8888/.netlify/functions/mcp/health` angesprochen werden. In einer produktiven Netlify-Umgebung lautet der Pfad entsprechend `/.netlify/functions/mcp/...`.

## Endpunkte

- `GET /health` – liefert den Status des Backends sowie Metadaten zum aktuellen Sample-Index.
- `GET /samples` – listet alle verfügbaren Samples. Optional kann über den Query-Parameter `q` gefiltert werden.
- `GET /sample?id=<component/sample>` – liefert Pfad und Quellcode eines spezifischen Samples zurück.
- `POST /refresh` – baut den Sample-Index neu auf, falls sich Dateien verändert haben.

Alle Antworten werden als JSON ausgeliefert und enthalten bereits die relativen Pfade innerhalb des Repositorys.

## Funktionsweise

Beim Start werden sämtliche `routes.ts`-Dateien aus dem React-Sample-Projekt analysiert. Die darin referenzierten Komponentendateien werden aufgelöst, gelesen und in einem Index zwischengespeichert. Auf Basis dieses Indexes beantwortet der Server Anfragen von MCP-kompatiblen Clients.

## Weiterentwicklung

- Zusätzliche Filter oder Volltextsuche können direkt im `SampleIndex` umgesetzt werden.
- Für produktive Umgebungen empfiehlt sich das Hinterlegen einer Authentifizierung vor dem MCP-Backend.
