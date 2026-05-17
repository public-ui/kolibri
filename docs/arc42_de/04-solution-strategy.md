← [3. Kontextabgrenzung](03-system-scope-and-context.md)

# 4. Lösungsstrategie

Dieser Abschnitt präsentiert den grundlegenden Ansatz und die wichtigsten Entscheidungen, die die Architektur von Public UI - KoliBri prägen. Er beschreibt die gewählten Technologien, Architekturmuster und Strategien zur Erreichung der Qualitätsziele des Projekts bei gleichzeitiger Erfüllung der Kernanforderungen.

## 4.1 Technologieentscheidungen

| Entscheidung             | Begründung                                                                           | Konsequenzen                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Web Components**       | Framework-agnostisch, standardbasiert, native Browser-Unterstützung                  | Funktioniert mit jedem Framework, langfristige Stabilität, benötigt aber Polyfills für ältere Browser |
| **Stencil.js**           | Bester Web-Component-Compiler, generiert Framework-Adapter, exzellente DX            | Bindet Build-Prozess an Stencil, bietet aber enormen Mehrwert bei der Codegenerierung                 |
| **Shadow DOM**           | Echte Style-Kapselung, verhindert CSS-Konflikte                                      | Komponenten sind isoliert, können aber nicht von außen gestylt werden (by Design)                     |
| **TypeScript**           | Typsicherheit, bessere IDE-Unterstützung, erkennt Fehler früh                        | Erfordert Kompilierungsschritt, verbessert aber die Codequalität dramatisch                           |
| **pnpm Workspace**       | Effizientes Abhängigkeitsmanagement, schnelle Installationen, strikte Abhängigkeiten | Komplexeres Setup als npm, aber besser für Monorepos                                                  |
| **Adopted Style Sheets** | Effizienter Theme-Wechsel, Style-Komposition                                         | Erfordert moderne Browser-Unterstützung, ermöglicht aber mächtiges Theming                            |
| **SASS**                 | Variablen, Mixins, mächtige Theme-Erstellung                                         | Kompilierung erforderlich, bietet aber essenzielle Features für komplexe Themes                       |

## 4.2 Top-Level-Zerlegung

KoliBri ist als Monorepo mit klarer Trennung der Verantwortlichkeiten strukturiert:

```
┌─────────────────────────────────────────────────────────┐
│                    KoliBri-System                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Komponenten│  │   Themes    │  │   Adapter   │     │
│  │   (Kern)    │  │  (Styling)  │  │ (Framework) │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                 │                 │             │
│         └─────────────────┴─────────────────┘            │
│                           │                               │
│  ┌─────────────┐  ┌──────┴──────┐  ┌─────────────┐     │
│  │   Samples   │  │    Tools    │  │     Docs    │     │
│  │ (Beispiele) │  │  (Tooling)  │  │  (Wissen)   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Komponenten-Schichten

1. **Kern-Komponenten** (`packages/components/`)
   - Atomare Web-Komponenten
   - Geschäftslogik und Barrierefreiheit
   - Framework-agnostische Implementierung

2. **Themes** (`packages/themes/`)
   - Visuelle Gestaltung getrennt von Logik
   - Mehrere Themes für verschiedene Design-Systeme
   - CSS/SASS mit strikten Scoping-Regeln

3. **Framework-Adapter** (`packages/adapters/`)
   - Auto-generierte Wrapper für React, Angular, Vue, etc.
   - Framework-spezifische APIs und Muster
   - Generiert von Stencil Output Targets

4. **Samples** (`packages/samples/`)
   - Beispiel-Implementierungen
   - Testumgebung für neue Features
   - Dokumentation durch funktionierenden Code

5. **Tools** (`packages/tools/`)
   - Migrations-CLI für Versions-Upgrades
   - Visual Regression Testing
   - Entwicklungsdienstprogramme

## 4.3 Architekturmuster

### Muster: Komposition über Vererbung

- Komponenten sind atomar und komponierbar
- Komplexe UI durch Kombination einfacher Komponenten aufgebaut
- Keine Vererbungshierarchien, flache Komponentenstruktur

### Muster: Trennung der Verantwortlichkeiten

- **Struktur/Logik**: Stencil-Komponenten (TypeScript)
- **Styling**: Theme-Pakete (SASS/CSS)
- **Integration**: Framework-Adapter (generiert)
- **Dokumentation**: Separate Dokumentations-Website

### Muster: Fünf-Schichten-Styling-System

1. **A11y-Preset-Schicht**: Barrierefreiheits-Baseline von `adopted-style-sheets`
2. **Basis Global-Schicht**: Globales Komponenten-Layout (keine Farben/Abstände)
3. **Basis Komponenten-Schicht**: Komponenten-spezifisches Layout (keine Farben/Abstände)
4. **Theme Global-Schicht**: Globale Theme-Styles (Farben, Schriften)
5. **Theme Komponenten-Schicht**: Komponenten-spezifische Theme-Styles

Diese Schichtung gewährleistet:

- Barrierefreiheit standardmäßig
- Themebar ohne Layout-Bruch
- Klare Trennung von Struktur und Erscheinung

### Muster: Keine Runtime-Abhängigkeiten

- Komponenten haben minimale Runtime-Abhängigkeiten
- Keine schweren Framework-Anforderungen
- Optimiert für Bundle-Größe und Performance

## 4.4 Qualitätsstrategie

### Barrierefreiheit zuerst

- Jede Komponente implementiert WCAG 2.2 Level AAA Standards
- Tastaturnavigation obligatorisch für alle interaktiven Elemente
- Screenreader-Tests für alle interaktiven Komponenten
- Automatisierte axe-core-Tests in CI
- Manuelle Barrierefreiheitsüberprüfungen und Compliance-Verifizierung

### Standardkonformität

- Strikte Einhaltung der W3C-Spezifikationen
- Valides HTML, semantisches Markup
- Korrekter Einsatz von ARIA-Attributen
- Progressive Enhancement-Prinzipien

### Performance

- Lazy Loading von Komponenten
- Tree-shakeable Exports
- Minimaler CSS-Footprint
- Shadow DOM für effizientes Rendering
- Bundle-Größen-Monitoring

### Entwicklererfahrung

- Umfassende TypeScript-Typen
- Klare, durchsuchbare Dokumentation
- Funktionierende Code-Beispiele
- Migrations-Tools für Versions-Upgrades
- Framework-spezifische Integrationen

## 4.5 Organisationsstrategie

### Open Source zuerst

- Öffentliche Entwicklung auf GitHub
- Community-Beiträge willkommen
- Transparente Roadmap und Entscheidungsfindung
- Klare Beitrags-Richtlinien

### LTS/STS Release-Modell

- **LTS (Long-Term Support)**: 3 Jahre Support, Hauptversionen
- **STS (Short-Term Support)**: 15 Monate Support, schnelle Innovation
- Semantische Versionierung strikt befolgt
- Migrations-Leitfäden für alle Breaking Changes

### Quality Gates

- Automatisierte Tests (Unit, E2E, Barrierefreiheit)
- Code-Review erforderlich für alle Änderungen
- Linting und Formatierung durchgesetzt
- Sicherheits-Scanning (CodeQL, Abhängigkeiten)
- SLSA Build Level 3 für veröffentlichte Pakete

## 4.6 Theming-Strategie

### Multi-Theming-Architektur

Themes sind separate Pakete, die zur Laufzeit gewechselt werden können:

```typescript
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/theme-default';

// Komponenten mit einem Theme registrieren
register(DEFAULT, defineCustomElements);
```

### Theme-Struktur

- Themes enthalten nur CSS/SASS (keine Logik)
- Verwenden CSS-Schichten zur Steuerung der Spezifität
- Minimale CSS Custom Properties zur Vermeidung von Konflikten
- SASS-Variablen für interne Berechnungen
- Assets (Schriften, Icons) in Theme-Paketen enthalten

### Vorteile

- Organisationen können benutzerdefinierte Themes ohne Forking erstellen
- Mehrere Themes können in einer Anwendung koexistieren
- Theme-Updates erfordern keine Komponenten-Rebuilds
- Flexibilität des Design-Systems

→ [5. Bausteinsicht](05-building-block-view.md)
