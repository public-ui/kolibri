> [English version](./CONTRIBUTING.en.md)

# Contributing zum `KoliBri` Theme `KERN UX-Standard`

## Wichtige Git-Konfiguration für openCode.de

Um Push-Probleme mit großen Repositories nach openCode.de zu vermeiden, stellen Sie bitte lokal folgende Einstellungen ein:

```bash
git config pack.packSizeLimit 5m
git config pack.window 0
git config pack.threads 1
```

Diese Einstellungen helfen, Fehler beim Pushen großer Commits zu vermeiden.

Vielen Dank für Ihr Interesse am Beitrag zu diesem Projekt! Diese Anleitung hilft Ihnen beim Einstieg.

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js 22+ und npm
- Git

### Setup

```bash
# Repository klonen
git clone https://gitlab.opencode.de/kern-ux/kern-developer-kit.git
cd kern-developer-kit

# Abhängigkeiten installieren
npm install

# Playwright-Browser installieren
npx playwright install

# Entwicklung starten (Theme Watch & Beispiel-App)
npm start
```

Der Start-Befehl kombiniert `rollup --watch` mit einem lokalen Beispiel auf Basis von `@public-ui/sample-react`. So können Sie die Styles im Kontext einer Anwendung prüfen, während das Theme kontinuierlich neu gebaut wird.

Sind Sie fertig, überprüfen Sie das Ergebnis mit den Snapshot-Tests und checken Sie bei Bedarf aktualisierte Referenz-Snapshots ein:

```bash
npm test              # Snapshots prüfen
npm run test-update   # Referenz-Snapshots aktualisieren
```

## Architektur verstehen

### CSS Layer Struktur

Dieses Theme verwendet CSS Cascade Layers für vorhersagbares Styling:

```scss
// Layer-Reihenfolge (niedrigste bis höchste Spezifität)
@layer kol-theme-global; // Globale Theme-Styles
@layer kol-theme-component; // Component-spezifische Styles
```

### Dateiorganisation

```text
src/
├── components/              # Component-Styles (@layer kol-theme-component)
│   ├── button.scss
│   ├── input.scss
│   └── ...
├── global.scss              # Globale Theme-Styles (@layer kol-theme-global)
├── global/                  # Zusätzliche globale Styles (z. B. Icons)
├── kern/                    # Lokale KERN Tokens & Utilities
├── mixins/                  # Sass Mixins und Utilities (keine Layer)
├── globals.d.ts             # TypeScript Deklarationen für SCSS-Module
└── index.ts                 # Theme-Einstiegspunkt (exportiert `KERN_V2`)
```

**WICHTIG**: Das Projekt nutzt `@kern-ux/native` dort, wo es möglich ist. Da einzelne Token derzeit noch nicht nachnutzbar sind, bleiben lokale Dateien im Ordner `src/kern/` weiterhin Bestandteil des Themes.

## Styling-Regeln

### Layer-Durchsetzung

Custom Stylelint-Regeln stellen ordnungsgemäße Layer-Nutzung sicher:

1. **Component-Dateien** (`src/components/*.scss`) **MÜSSEN** `@layer kol-theme-component` verwenden
2. **Global-Datei** (`src/global.scss`) **MUSS** `@layer kol-theme-global` verwenden
3. **Utility-Dateien** (Mixins, Helfer) **DÜRFEN KEINE** Layer verwenden
4. Nur zugelassene Layer-Namen sind erlaubt: `kol-theme-global`, `kol-theme-component`

### Web Component Encapsulation

**WICHTIG**: Theme-Dateien **MÜSSEN** `:host` statt `:root` verwenden für Web Component Kapselung:

```scss
// ✅ Korrekt: :host für Web Component Styling
@layer kol-theme-global {
	:host {
		--font-family: var(--kern-font-family);
		background-color: white;
		color: black;
	}
}
@@ -169,189 +172,190 @@ Diese Regeln stellen sicher:
}
```

2. Erstellen und testen:

```bash
npm run build
npm run lint
npm test
```

### Globale Styles ändern

`src/global.scss` innerhalb des globalen Layers bearbeiten:

```scss
@layer kol-theme-global {
	:host {
		// Globale Theme-Variablen und Styles
	}
}
```

### Utilities erstellen

Utilities in `src/mixins/` **ohne** Layer hinzufügen:

```scss
// src/mixins/my-utility.scss
@mixin my-utility {
	// Utility-Styles (kein @layer nötig)
}
```

## Build-Prozess

### Entwicklungs-Build

```bash
npm run dev    # Watch-Modus mit Hot Reload
npm start      # Entwicklungsserver
```

### Produktions-Build

```bash
npm run build  # Optimierter Produktions-Build
```

### Build-Output

- `assets/` - Statische Assets und Schriftarten
- `dist/` - Kompilierte CSS-Dateien

## Testing

### Visual Regression Tests

```bash
npm test             # Visual Tests ausführen
npm run test-update  # Visual Snapshots aktualisieren
```

#### Assets und Visual Tests

Die Visual Tests benötigen korrekt geladene Assets (Schriftarten und Icons), um aussagekräftige Screenshots zu erstellen:

- **inject-assets.css** - Zentrale Asset-Injektionsdatei mit @import-Anweisungen für:
  - `assets/material-symbols-subset/style.css` - Reduziertes Material Icons Set
  - `assets/fira-sans-v17-latin/style.css` - Fira Sans Schriftfamilie (400-700)

Die Visual Tests setzen `THEME_CSS=$(pwd)/inject-assets.css`, um genau diese Datei in die Beispiel-Anwendung zu laden.

**Wichtig**: Ohne korrekt geladene Assets würden Visual Tests fälschlicherweise als "geändert" erkannt, da Fallback-Schriftarten oder fehlende Icons verwendet würden.

### Code-Qualität

```bash
npm run lint     # Stylelint + ESLint
npm run format   # Prettier-Formatierung
```

## Vor dem Committen

Führen Sie immer den vollständigen Validierungs-Workflow aus:

```bash
npm run build   # Sauberen Build sicherstellen
npm run format  # Formatierung korrigieren
npm run lint    # Code-Qualität prüfen
npm test        # Visual Tests validieren
```

## Releases und Changelog (SemVer)

Dieses Repository pflegt [CHANGELOG.md](CHANGELOG.md) und die Paketversion automatisch – basierend auf **Conventional Commits** und **Semantic Versioning**.

### Commit Messages (Conventional Commits)

Verwenden Sie eines dieser Muster:

- `fix: ...` → Patch-Release
- `feat: ...` → Minor-Release
- `feat!: ...` oder `BREAKING CHANGE: ...` (Footer) → Major-Release

### Release-Commit + Tag erstellen

Führen Sie einen der Release-Befehle aus (aktualisiert `package.json` und [CHANGELOG.md](CHANGELOG.md), erstellt anschließend einen Git-Commit und Tag):

```bash
npm run release        # empfohlener Versionssprung basierend auf Commit-Historie
npm run release:patch  # Patch erzwingen
npm run release:minor  # Minor erzwingen
npm run release:major  # Major erzwingen
```

Vorschau ohne Änderungen an Dateien:

```bash
npm run release:dry
```

Release-Commit und Tag pushen:

```bash
git push --follow-tags
```

**CI-Hinweis**: Das Pushen eines Tags wie `v2.5.0` triggert die tag-basierte Publish-Pipeline.

## Code-Style

- Verwenden Sie **Tabs** für Einrückung (außer Markdown-Dateien verwenden Leerzeichen)
- Zeilenlänge: **160 Zeichen**
- Einfache Anführungszeichen in SCSS/CSS
- BEM-Namenskonvention für CSS-Klassen befolgen
- Semantische Variablennamen verwenden

## Layer-Richtlinien

1. **Niemals Layer-Regeln umgehen** - Alles CSS muss in entsprechenden Layern sein
2. **Component-Isolation** - Component-Styles betreffen nur ihre Component
3. **Globale Zurückhaltung** - Globaler Layer nur für theme-weite Variablen und Host-Styles
4. **Kein Layer-Mixing** - Layered und nicht-layered CSS nicht in derselben Datei mischen
5. **KERN UX-Standards respektieren** - Dateien in `src/kern/` niemals modifizieren, nur deren Variablen verwenden

## KERN UX Integration Regeln

- **`@kern-ux/native` Package**: Offizielle KERN UX-Standards als externe Abhängigkeit
- **CSS-Import**: Nutzen Sie `@import '@kern-ux/native/dist/kern.css'` für KERN-Basis
- **KERN Variablen**: Verwenden Sie `var(--kern-*)` CSS Custom Properties in Theme-Styles
- **Package Updates**: KERN UX-Standards werden über `npm update @kern-ux/native` aktualisiert
- **Lokale Ergänzungen**: Zusätzliche Tokens aus `src/kern/` bleiben aktiv, bis das Package vollständige Abdeckung bietet
- **CSS-basiert**: Package ist für CSS-Distribution optimiert, nicht für granulare Sass-Imports

## Konfigurationsdateien

| Datei                | Zweck                                          |
| -------------------- | ---------------------------------------------- |
| `.stylelintrc.json`  | Stylelint-Konfiguration mit Custom-Regeln      |
| `eslint.config.js`   | ESLint-Konfiguration für JavaScript/TypeScript |
| `rollup.config.js`   | Build-Konfiguration                            |
| `prettier.config.js` | Code-Formatierungsregeln                       |
| `stylelint-rules/`   | Custom Stylelint-Regel-Implementierungen       |

## Kern Design System Integration

### Design Tokens

**KERN Design Standards werden über das `@kern-ux/native` Package bereitgestellt:**

```scss
// Import der KERN CSS-Basis
@import '@kern-ux/native/dist/kern.css';
```

**Wichtige Architektur-Entscheidung**: Das `@kern-ux/native` Package ist primär für CSS-Distribution konzipiert, nicht für granulare Sass-Imports. Daher wird die komplette KERN CSS-Basis als CSS-Import eingebunden.

### Verwendung der KERN UX-Standards

```scss
// ✅ Korrekt: KERN CSS-Variablen in Theme-Komponenten verwenden
@layer kol-theme-component {
	.button {
		background: var(--kern-color-primary); // KERN Variable verwenden
		border-radius: var(--kern-border-radius); // KERN Variable verwenden
		font-family: var(--kern-font-family); // KERN Variable verwenden
	}
}

// ✅ Korrekt: KERN CSS wird als Basis importiert
@import '@kern-ux/native/dist/kern.css';

// ❌ Nicht verfügbar: Granulare Sass-Imports (Package-Limitation)
// @use '@kern-ux/native/src/scss/core/tokens' as kern-tokens; // Nicht unterstützt
```

**Zusammenspiel `src/kern/` und `@kern-ux/native`:**

- `@kern-ux/native` liefert die Standard-KERN-Variablen als CSS-Import
- `src/kern/` enthält zusätzliche Tokens und Workarounds, die aktuell noch nicht aus dem Package bezogen werden können
- Halten Sie lokale Tokens schlank und dokumentieren Sie Abweichungen für eine spätere Migration
- CSS Custom Properties (`--kern-*`) bleiben unverändert nutzbar

### Typografie

KERN Typografie-System wird über die CSS-Basis von `@kern-ux/native` bereitgestellt:

- Schriftfamilien und -gewichte
- Überschrift-Styles und Hierarchie
- Text-Größen und Abstände

### Farbsystem

```scss
// Kern Farb-Tokens (nur verwenden, nicht ändern!)
--kern-color-primary: #0073e6;
--kern-color-secondary: #6c757d;
--kern-color-success: #28a745;
--kern-color-warning: #ffc107;
--kern-color-danger: #dc3545;
```

## Fehlerbehebung

### Häufige Probleme

**Stylelint Layer-Fehler:**

```
CSS rule "selector" must be inside @layer kol-theme-component
```

→ Wrappen Sie alles CSS in den entsprechenden Layer für den Dateistandort

**Build-Fehler:**

```bash
npm run clean  # Dist und Cache löschen
npm install    # Abhängigkeiten neu installieren
npm run build  # Neu erstellen
```

**Visual Test-Fehler:**

```bash
npm run test-update  # Snapshots aktualisieren wenn Änderungen beabsichtigt sind
```

### Hilfe bekommen

1. Prüfen Sie die [KERN UX-Standard](https://gitlab.opencode.de/kern-ux)
2. Überprüfen Sie bestehende Component-Implementierungen in `src/components/`
3. Untersuchen Sie die Custom Stylelint-Regeln in `stylelint-rules/`
4. Führen Sie `npm run lint` für spezifische Fehlermeldungen aus

## Troubleshooting

### Service Worker Cache-Probleme in Chrome

**Problem:** Assets werden trotz "Disable cache" nicht aktualisiert. Chrome lädt weiterhin alte Versionen, auch nach hartem Reload.

**Ursache:** In Chrome hängt sehr wahrscheinlich ein **Service Worker** dazwischen. Das DevTools-Häkchen „Disable cache" betrifft nur den **HTTP-Cache**, nicht den **Cache Storage** eines Service Workers. Der SW serviert dann weiterhin alte Assets.

#### Sofortige Lösung

1. **DevTools → Application → Service Workers**
   - „**Unregister**" klicken
   - Optional: „**Update on reload**" aktivieren

2. **Application → Clear storage**
   - Alle Häkchen an („Unregister service workers", „Cache storage", „IndexedDB", …)
   - **Clear site data** klicken

3. **Neu laden** (am besten mit Rechtsklick auf den Reload-Button → **Empty cache and hard reload**)

#### Dauerhaft vermeiden

- **Service Worker deaktivieren:** In `main.tsx`/`index.tsx` sicherstellen, dass der SW **nicht registriert** wird:

  ```javascript
  // serviceWorker.unregister() verwenden
  // oder registerServiceWorker entfernen
  ```

- **Nur in Produktion:** SW nur in Prod-Builds registrieren:

  ```javascript
  if (process.env.NODE_ENV === 'production') {
  	// Service Worker nur in Production registrieren
  }
  ```

- **Cache-Headers korrekt setzen:**
  - **`index.html`** bekommt `Cache-Control: no-store`
  - Hash-Dateien (`*.js`, `*.css`) dürfen gecacht werden

- **DevTools Einstellungen:** In Chrome DevTools (Application → Service Workers) **„Bypass for network"** oder **„Update on reload"** aktivieren während der Entwicklung

- **Keine falschen Proxy-Headers:** Bei Vite/Webpack keine Reverse-Proxy-Header oder CDN-Layer verwenden, die `max-age` auf HTML setzen

#### Alternative Ursachen

Falls es **kein** Service Worker ist:

- **DevServer-Headers prüfen:** HTML sollte `no-store` haben, Assets mit Hash + langes Caching
- **Back/Forward Cache:** Chrome's bfcache kann verwirren - teste mit `location.reload(true)` oder `window.onpageshow`-Handler (`event.persisted`)

**In 90% der Fälle ist es der Service Worker.** Unregister + Clear Storage behebt das sofort.

## Pull Request Prozess

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add amazing feature'`)
4. Pushen Sie zum Branch (`git push origin feature/amazing-feature`)
5. Öffnen Sie einen Pull Request

### Pull Request Richtlinien

- Beschreiben Sie Ihre Änderungen ausführlich
- Fügen Sie Screenshots bei UI-Änderungen hinzu
- Stellen Sie sicher, dass alle Tests bestehen
- Folgen Sie den Code-Style-Richtlinien
- Aktualisieren Sie die Dokumentation falls nötig

## Browser-Unterstützung

- Moderne Browser mit CSS Cascade Layers Unterstützung
- Chrome 99+, Firefox 97+, Safari 15.4+
- Für ältere Browser sollte ein CSS Layers Polyfill verwendet werden

---

Vielen Dank für Ihren Beitrag!
