# arc42 Architektur-Dokumentation – KoliBri / Public UI

> Dieses Dokument folgt der arc42-Struktur. Inhalte, die noch offen sind, sind als solche gekennzeichnet.

## 1. Einführung und Ziele

### 1.1 Aufgabenstellung

KoliBri (Public UI) ist eine barrierefreie, wiederverwendbare Web-Component-Bibliothek mit Mehr-Themen-Unterstützung. Ziel ist es, HTML-Kompositionen semantisch korrekt und zugänglich bereitzustellen und damit als Referenzimplementierung für WCAG/BITV zu dienen.

Weiterführende Informationen:

- Projektübersicht: <https://github.com/public-ui/kolibri/blob/main/README.md>
- Contribution Guide: <https://github.com/public-ui/kolibri/blob/main/CONTRIBUTING.md>

### 1.2 Qualitätsziele (Top 3)

1. **Barrierefreiheit** – Fokus auf WCAG/BITV-konforme Umsetzung von UI-Komponenten.
2. **Wiederverwendbarkeit & Framework-Agnostik** – Web-Components als Basis für verschiedene Frameworks.
3. **Anpassbarkeit durch Themen** – Mehr-Themen-Ansatz und Design Token/Styles für flexible Designs.

### 1.3 Stakeholder

| Stakeholder            | Erwartung                                      | Kommentar                         |
| ---------------------- | ---------------------------------------------- | --------------------------------- |
| UI-/Frontend-Teams     | Einfach integrierbare, zugängliche Komponenten | Nutzung der npm-Pakete und Themes |
| Accessibility-Experten | Nachvollziehbare A11y-Umsetzung                | Orientierung an WCAG/BITV         |
| Designer               | Thematisierung/Branding                        | Themenpakete und CSS-Tokens       |
| Open-Source-Community  | Beiträge, Transparenz                          | CONTRIBUTING & Dokumentation      |
| Product Owner          | Planbarkeit & Release-Sicherheit               | Roadmap und Release-Prozess       |

## 2. Randbedingungen

- **Monorepo mit pnpm & Nx**; mehrere Packages unter `packages/` (Components, Themes, Samples, Tools).
- **Format-first**: Vor Commit zwingend `pnpm format` ausführen.
- **SemVer** pro Package, versioniert in jeweiligen `package.json`-Dateien.
- **KoliBri** Schreibweise ist verbindlich (außer KolKolibri-Komponente).

Weiterführende Informationen:

- Monorepo- und Arbeitsregeln: <https://github.com/public-ui/kolibri/blob/main/AGENTS.md>

## 3. Kontextabgrenzung

### 3.1 Fachlicher Kontext

- **Nutzeranwendungen** (z. B. Webapps) konsumieren KoliBri-Komponenten als UI-Bausteine.
- KoliBri stellt _keine_ Fachlogik oder Datentransfer bereit, sondern ausschließlich Präsentationslogik.

### 3.2 Technischer Kontext

- Bereitstellung als npm-Pakete (`@public-ui/components`, `@public-ui/theme-default` etc.).
- Integration via Web-Components-Loader und Registrierung der Theme-Schicht.

Weiterführende Informationen:

- Installation & Quickstart: <https://github.com/public-ui/kolibri/blob/main/README.md#installation>
- Öffentliche Dokumentation: <https://public-ui.github.io/en/>

## 4. Lösungsstrategie

- **Web-Components (Stencil)** als Framework-unabhängige Grundlage für UI-Komponenten.
- **Mehrschichtiges Theming** (A11y Preset, Basis, Theme Global/Component) für robuste Styles und Anpassbarkeit.
- **Accessibility-first**: Standardisierte, semantische HTML-Kompositionen mit Fokus auf A11y-Regeln.
- **Publikation über npm** mit Provenance/Attestations (Supply Chain Sicherheit).

## 5. Bausteinsicht

### 5.1 Ebene 1 – Gesamtübersicht (Pakete)

- `packages/components`: Stencil-Web-Components (Kernbibliothek).
- `packages/themes/*`: Themenpakete (primär `default`).
- `packages/samples/*`: Beispielanwendungen (React, Angular).
- `packages/adapters/*`: Generierte Framework-Adapter (nicht manuell bearbeiten).
- `packages/tools/kolibri-cli`: Migrationstooling.
- `docs/`: Projektdokumentation.

### 5.2 Ebene 2 – Komponentenpaket (Auszug)

- `packages/components/src/component`: UI-Komponenten-Implementierungen.
- `packages/components/src/schema`: Schema-Definitionen.

### 5.3 Ebene 2 – Themen (Auszug)

- `packages/themes/default`: Standard-Theme.
- Weitere Theme-Pakete gelten als nicht aktiv gepflegt.

## 6. Laufzeitsicht

### 6.1 Szenario: Nutzung in einer Webanwendung

1. Anwendung installiert `@public-ui/components` und ein Theme (z. B. `@public-ui/theme-default`).
2. Anwendung registriert Komponenten und lädt Theme-Schicht über `register` und `defineCustomElements`.
3. Komponenten rendern im DOM mit A11y- und Theme-Layern; CSS-Variablen dienen nur als externe Design-Tokens (begrenzter Einsatz).

### 6.2 Szenario: Release & Distribution

1. Release läuft über GitHub Actions.
2. npm-Release wird mit Provenance erzeugt.
3. Konsumenten erhalten nachvollziehbare Supply-Chain-Informationen.

Weiterführende Informationen:

- SLSA/Provenance: <https://github.com/public-ui/kolibri/blob/main/README.md#slsaprovenance>

## 7. Verteilungssicht

- **npm-Pakete**: Komponenten und Themes werden über npm veröffentlicht.
- **Dokumentation**: Öffentliche Docs via `public-ui.github.io`.

## 8. Querschnittliche Konzepte

- **Theming-Konzept**: Fünf Styling-Layer (A11y, Basis, Theme Global/Component).
- **A11y-Grundlagen**: Mindestgrößen, typografische Regeln, semantische Standards für Interaktionen.
- **CSS Custom Properties**: Zurückhaltender Einsatz, SASS-Variablen für interne Berechnungen.
- **SemVer & Migrationen**: Paketversionierung mit Migrationsleitfäden und CLI-Unterstützung.

Weiterführende Informationen:

- Theming-Regeln: <https://github.com/public-ui/kolibri/blob/main/AGENTS.md#theming>
- Migrationen: <https://github.com/public-ui/kolibri/blob/main/MIGRATION.md>

## 9. Architekturentscheidungen

- Aktuell keine zentralen ADRs im Repository hinterlegt.
- Empfehlung: Einführung eines ADR-Verzeichnisses (z. B. `docs/adr`) für zukünftige Entscheidungen.

## 10. Qualitätsanforderungen

| Qualitätsmerkmal     | Beschreibung                              | Begründung                                |
| -------------------- | ----------------------------------------- | ----------------------------------------- |
| Barrierefreiheit     | Komponenten müssen WCAG/BITV-konform sein | Kernziel von KoliBri                      |
| Wiederverwendbarkeit | Framework-agnostische Web-Components      | Wiederverwendbarkeit über Projekte hinweg |
| Konsistenz           | Einheitliche Styles via Layering          | Theme/Basis-Layer                         |
| Stabilität           | Abwärtskompatible Releases gemäß SemVer   | Nutzervertrauen bei Updates               |

## 11. Risiken und technische Schulden

- **Komplexität des Monorepos**: Mehrere Packages und Build-Abhängigkeiten erhöhen Pflegeaufwand.
- **CSS-Variablen-Kollisionen**: Externe Custom Properties können kollidieren; begrenzte Nutzung empfohlen.
- **Versionierung/Migration**: Änderungen an Komponenten erfordern konsistente SemVer-Updates und Migrationen.
- **Nicht gepflegte Themes**: Einige Theme-Pakete sind nicht aktiv maintained und können aktualisierungsbedürftig sein.

## 12. Glossar

| Begriff        | Bedeutung                                                                      |
| -------------- | ------------------------------------------------------------------------------ |
| KoliBri        | „component library for accessibility“; Web-Component-Bibliothek.               |
| Theme          | Paket mit globalen und komponentenspezifischen Styles für KoliBri-Komponenten. |
| A11y           | Abkürzung für Accessibility (Barrierefreiheit).                                |
| Web Components | Standardisierte, frameworkunabhängige UI-Komponenten-Technologie.              |
| SemVer         | Semantic Versioning für paketbasierte Releases.                                |
