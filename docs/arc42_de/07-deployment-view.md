← [6. Laufzeitsicht](06-runtime-view.md)

# 7. Verteilungssicht

Dieser Abschnitt beschreibt die Infrastruktur und Verteilungsszenarien für Public UI - KoliBri. Er umfasst Entwicklungsumgebungen, CI/CD-Pipelines, Paketverteilungsstrategien und verschiedene Anwendungs-Verteilungsmuster, die Konsumenten bei der Integration von KoliBri-Komponenten in ihre Projekte verwenden können.

## 7.1 Infrastrukturübersicht

```mermaid
graph TB
    subgraph Development
        Dev[Entwickler-Workstation]
        Git[Git Repository<br/>GitHub]
    end

    subgraph CI/CD
        Actions[GitHub Actions]
        Tests[Test-Runner]
        Build[Build-Pipeline]
        Security[Sicherheits-Scanner<br/>CodeQL]
    end

    subgraph Distribution
        NPM[npm Registry]
        CDN1[unpkg.com]
        CDN2[jsDelivr]
    end

    subgraph Deployment
        StaticSite[Statische Websites]
        SPA[Single Page Apps]
        SSR[Server-Side Rendered Apps]
    end

    Dev -->|push code| Git
    Git -->|trigger| Actions
    Actions -->|führe aus| Tests
    Actions -->|führe aus| Build
    Actions -->|führe aus| Security
    Actions -->|veröffentliche| NPM

    NPM -->|spiegele| CDN1
    NPM -->|spiegele| CDN2

    NPM -->|installiere| StaticSite
    NPM -->|installiere| SPA
    NPM -->|installiere| SSR

    CDN1 -->|lade| StaticSite
    CDN2 -->|lade| StaticSite
```

## 7.2 Entwicklungsumgebung

### Entwickler-Workstation-Anforderungen

| Komponente         | Anforderung                       | Zweck                                         |
| ------------------ | --------------------------------- | --------------------------------------------- |
| **Betriebssystem** | Windows 10+, macOS 11+ oder Linux | Plattformunabhängige Entwicklung              |
| **Node.js**        | Version 22.x (erforderlich)       | Runtime für Build-Tools                       |
| **pnpm**           | Version 10.x                      | Paketmanager                                  |
| **Git**            | Version 2.30+                     | Versionskontrolle                             |
| **IDE**            | VS Code (empfohlen)               | Code-Bearbeitung mit TypeScript-Unterstützung |
| **Browser**        | Chrome/Edge (zum Testen)          | Entwicklung und Testing                       |

### Lokales Setup

```bash
# Repository klonen
git clone https://github.com/public-ui/kolibri.git
cd kolibri

# Node.js 22 installieren
# (plattformspezifische Installation)

# pnpm aktivieren
corepack enable pnpm

# Abhängigkeiten installieren
pnpm i --ignore-scripts

# Alle Pakete bauen
pnpm -r build

# Entwicklungsserver starten
cd packages/samples/react
pnpm start
```

### Entwicklungs-Ports

| Port     | Dienst               | URL                   |
| -------- | -------------------- | --------------------- |
| 9191     | React-Beispiel-App   | http://localhost:9191 |
| 4200     | Angular-Beispiel-App | http://localhost:4200 |
| Variabel | Stencil-Dev-Server   | http://localhost:3333 |

## 7.3 CI/CD-Pipeline

```mermaid
graph LR
    subgraph GitHub Actions Workflows
        PR[Pull Request] -->|trigger| CI
        Push[Push to main] -->|trigger| CI
        Tag[Tag-Erstellung] -->|trigger| Publish

        CI[CI Workflow]
        Publish[Publish Workflow]
        Snapshots[Update Snapshots]

        CI -->|bei Erfolg| Merge
        Merge[Merge to main]
        Merge -->|trigger| Tag
        Tag -->|trigger| Publish
    end

    subgraph CI Steps
        Install[Abhängigkeiten installieren]
        Build[Alle Pakete bauen]
        Lint[Code linten]
        Test[Tests ausführen]
        Security[Sicherheits-Scans]

        Install --> Build
        Build --> Lint
        Lint --> Test
        Test --> Security
    end

    subgraph Publish Steps
        VerifyBuild[Build verifizieren]
        Pack[Pakete packen]
        Provenance[Provenance generieren]
        NPMPublish[Zu npm veröffentlichen]

        VerifyBuild --> Pack
        Pack --> Provenance
        Provenance --> NPMPublish
    end
```

### GitHub Actions Workflows

| Workflow                 | Trigger                      | Zweck                                          |
| ------------------------ | ---------------------------- | ---------------------------------------------- |
| **ci.yml**               | Push, Pull Request           | Tests, Linting, Builds ausführen               |
| **publish.yml**          | Tag-Erstellung               | Pakete zu npm mit Provenance veröffentlichen   |
| **update-pnpm-lock.yml** | Manueller Trigger            | `pnpm-lock.yaml` für einen Branch erneuern     |
| **update-snapshots.yml** | Manueller Trigger            | Visual Regression Test Snapshots aktualisieren |
| **codeql.yml**           | Push, Pull Request, Schedule | Sicherheits-Scanning mit CodeQL                |

### CI Quality Gates

Alle PRs müssen bestehen:

1. **Build**: Alle Pakete müssen ohne Fehler bauen
2. **Linting**: ESLint, Stylelint, TypeScript-Checks müssen bestehen
3. **Unit-Tests**: Alle Jest-Tests müssen bestehen
4. **E2E-Tests**: Playwright-Tests müssen bestehen
5. **Sicherheit**: CodeQL-Analyse muss bestehen, keine kritischen Schwachstellen
6. **Formatierung**: Code muss mit Prettier formatiert sein

## 7.4 Paketverteilung

### npm Registry

Primärer Verteilungskanal für KoliBri-Pakete:

```mermaid
graph TB
    subgraph "Published Packages"
        Core["@public-ui/components"]
        DefaultTheme["@public-ui/theme-default"]
        ECLTheme["@public-ui/theme-ecl"]
        ReactAdapter["@public-ui/react"]
        AngularAdapter["@public-ui/angular-v21"]
        VueAdapter["@public-ui/vue"]
        CLI["@public-ui/kolibri-cli"]
    end

    subgraph "npm Registry"
        Registry[npm Registry]
    end

    subgraph CDN
        unpkg[unpkg.com]
        jsDelivr[jsDelivr.net]
    end

    Core --> Registry
    DefaultTheme --> Registry
    ECLTheme --> Registry
    ReactAdapter --> Registry
    AngularAdapter --> Registry
    VueAdapter --> Registry
    CLI --> Registry

    Registry -->|spiegele| unpkg
    Registry -->|spiegele| jsDelivr
```

### Paketstruktur

Jedes zu npm veröffentlichte Paket enthält:

```
@public-ui/components/
├── dist/                   # Kompiliertes JavaScript
│   ├── index.js           # ES-Modul-Einstieg
│   ├── index.cjs.js       # CommonJS-Einstieg
│   ├── types/             # TypeScript-Definitionen
│   └── esm/               # ES2017-Module
├── loader/                # Lazy-Loading-Wrapper
├── assets/                # Statische Assets (Icons, etc.)
├── doc/                   # Generierte Dokumentation
├── custom-elements.json   # Custom Elements Manifest
└── package.json           # Paket-Metadaten
```

### SLSA Provenance

KoliBri veröffentlicht Pakete mit SLSA Build Level 3 Provenance:

- Pakete in GitHub Actions mit OIDC-Identität gebaut
- Mit `--provenance`-Flag veröffentlicht
- Verifizierbare Attestierungen für alle veröffentlichten Artefakte
- Gewährleistet Build-Integrität und Supply-Chain-Sicherheit

Verifizierung:

```bash
# Provenance-Metadaten anzeigen
pnpm view @public-ui/components dist.provenance

# Signaturen verifizieren (falls npm-Client unterstützt)
pnpm audit signatures --package=@public-ui/components@latest
```

## 7.5 Anwendungs-Verteilungsszenarien

### Szenario 1: Statische Website

```mermaid
graph LR
    Build[Build-Prozess] -->|bundle| Static[Statische Assets]
    Static -->|deploy| CDN[CDN/Static Host]
    CDN -->|serve| Browser[Nutzer-Browser]
    Browser -->|lade| Components[KoliBri-Komponenten]
```

**Verteilung:**

- Komponenten mit Anwendungscode gebündelt
- Zu statischem Hosting deployed (Netlify, Vercel, GitHub Pages, S3, etc.)
- Kein Server-Side Rendering
- Alle Assets von CDN gecacht

**Beispiel:**

```html
<!DOCTYPE html>
<html>
	<head>
		<script type="module" src="./kolibri-components.js"></script>
		<link rel="stylesheet" href="./theme-default.css" />
	</head>
	<body>
		<kol-button _label="Klick mich"></kol-button>
	</body>
</html>
```

### Szenario 2: Single Page Application (SPA)

```mermaid
graph LR
    Framework[React/Angular/Vue App] -->|bundle| Webpack[Bundler]
    Webpack -->|build| Assets[Optimierte Assets]
    Assets -->|deploy| Server[Web-Server]
    Server -->|serve| Browser[Nutzer-Browser]
    Browser -->|lazy load| Components[KoliBri-Komponenten]
```

**Verteilung:**

- Komponenten über Framework-Adapter importiert
- Mit Anwendung über Webpack/Vite/Rollup gebündelt
- Lazy Loading für Code-Splitting
- Zu Anwendungsserver oder CDN deployed

**Beispiel (React):**

```typescript
import { KolButton } from '@public-ui/react';
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

await register(DEFAULT, defineCustomElements);

function App() {
	return <KolButton _label="Klick mich" />;
}
```

### Szenario 3: Server-Side Rendering (SSR)

```mermaid
graph LR
    SSR[SSR Server] -->|render| HTML[Initiales HTML]
    HTML -->|sende| Browser[Nutzer-Browser]
    Browser -->|hydrate| Components[KoliBri-Komponenten]
    Browser -->|request| SSR
```

**Verteilung:**

- Komponenten auf Client nach SSR hydratisiert
- Initiales HTML server-seitig gerendert
- Client-seitige Hydratisierung für Interaktivität
- Zu Node.js-Server oder Serverless-Funktionen deployed

**Überlegungen:**

- Verwende Hydrate-Adapter für SSR-Unterstützung
- Komponenten benötigen client-seitige Hydratisierung
- Shadow DOM erfordert sorgfältiges SSR-Handling

### Szenario 4: Nur CDN (Kein Build)

```mermaid
graph LR
    CDN[unpkg/jsDelivr] -->|serve| Browser[Nutzer-Browser]
    Browser -->|lade| Components[KoliBri-Komponenten]
```

**Verteilung:**

- Komponenten direkt von CDN laden
- Kein Build-Schritt erforderlich
- Ideal für Prototypen und einfache Websites

**Beispiel:**

```html
<script type="module">
	import { defineCustomElements } from 'https://unpkg.com/@public-ui/components@latest/loader/index.mjs';
	import { register } from 'https://unpkg.com/@public-ui/components@latest/dist/index.js';
	import { DEFAULT } from 'https://unpkg.com/@public-ui/theme-default@latest/index.js';

	await register(DEFAULT, defineCustomElements);
</script>
```

## 7.6 Verteilungstopologie

### Multi-Tier-Architektur

```mermaid
graph TB
    subgraph "User Tier"
        Browser[Web Browser]
        AT[Assistive Technologie]
    end

    subgraph "CDN Tier"
        CDN[Content Delivery Network]
    end

    subgraph "Application Tier"
        AppServer[Anwendungsserver - Node.js/Static]
        API[Backend-API - optional]
    end

    subgraph "Data Tier"
        DB[Datenbank - optional]
    end

    Browser -->|HTTPS| CDN
    Browser -->|HTTPS| AppServer
    AT -->|Accessibility API| Browser

    CDN -->|fallback| AppServer
    AppServer -->|HTTP/REST| API
    API -->|query| DB
```

### Komponenten-Lade-Strategie

1. **Initialer Ladevorgang**:
   - HTML-Seite mit Komponenten-Tags
   - Kern-Component-Loader-Skript
   - Theme-CSS

2. **Lazy Loading**:
   - Individuelle Komponenten-Bundles on-demand geladen
   - Nur verwendete Komponenten heruntergeladen
   - Browser-Caching für nachfolgende Ladevorgänge

3. **Caching-Strategie**:
   - Komponenten: Langer Cache (unveränderliche Versionen)
   - Themes: Langer Cache (unveränderliche Versionen)
   - Anwendungscode: Cache mit Revalidierung

## 7.7 Monitoring und Observability

### Client-Side-Monitoring

Empfehlungen für Anwendungen mit KoliBri:

- **Performance-Monitoring**: Web Vitals
- **Fehler-Tracking**: Sentry, Rollbar (Anwendungsebene)
- **Barrierefreiheits-Monitoring**: axe DevTools, automatisierte Scans
- **Bundle-Size-Tracking**: bundlephobia, webpack-bundle-analyzer

### Build-Pipeline-Monitoring

- **CI/CD-Status**: GitHub Actions Status-Badges
- **Test-Abdeckung**: Jest-Coverage-Reports
- **Sicherheits-Warnungen**: GitHub Dependabot, CodeQL-Warnungen
- **Paket-Gesundheit**: npm-Paket-Gesundheits-Score

### Metriken

Wichtige verfolgte Metriken:

- **Build-Zeit**: Vollständige Build-Dauer (~2 Minuten)
- **Test-Dauer**: Unit + E2E-Test-Ausführung (~3 Minuten)
- **Paketgröße**: Individuelle Paketgrößen
- **Download-Statistiken**: npm-Download-Zahlen
- **Issue-Auflösungszeit**: Zeit bis zum Schließen von Issues/PRs

→ [8. Querschnittliche Konzepte](08-cross-cutting-concepts.md)
