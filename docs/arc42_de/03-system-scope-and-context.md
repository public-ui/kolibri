# 3. Kontextabgrenzung

Dieser Abschnitt definiert die Grenzen von Public UI - KoliBri, indem er identifiziert, was innerhalb und außerhalb des Systems liegt. Er klärt die Beziehungen zu externen Systemen, Nutzern und Abhängigkeiten und bietet sowohl geschäftliche als auch technische Perspektiven auf die Systemumgebung.

## 3.1 Fachlicher Kontext

```mermaid
graph TB
    subgraph External Systems
        Frameworks[Web Frameworks<br/>React, Angular, Vue, etc.]
        Browser[Web Browser<br/>Chrome, Firefox, Safari, Edge]
        Assistive[Assistive Technologien<br/>Screenreader, etc.]
        CDN[Content Delivery Networks<br/>npm, unpkg, jsDelivr]
        DesignSystems[Design-Systeme<br/>Corporate Design Guidelines]
    end

    subgraph KoliBri System
        Components[Web Components Library]
        Themes[Theme-Pakete]
        Adapters[Framework-Adapter]
        CLI[Migrations-CLI-Tool]
        Docs[Dokumentations-Website]
    end

    subgraph Users
        Developers[Anwendungsentwickler]
        EndUsers[Endnutzer mit/ohne Behinderungen]
        Designers[UX/UI-Designer]
        Contributors[Open-Source-Beitragende]
    end

    Developers -->|integrieren| Components
    Developers -->|verwenden| Adapters
    Developers -->|migrieren mit| CLI
    Developers -->|lesen| Docs

    Designers -->|anpassen| Themes
    Designers -->|folgen| DesignSystems

    Contributors -->|tragen bei zu| Components
    Contributors -->|erstellen| Themes

    Components -->|läuft in| Browser
    Components -->|verwendet| Themes
    Components -->|konsumiert von| Frameworks

    Browser -->|rendert| Components
    Browser -->|bietet API| Assistive

    EndUsers -->|interagieren über| Browser
    EndUsers -->|verwenden| Assistive

    Components -->|verteilt via| CDN
    Adapters -->|verteilt via| CDN
    Themes -->|verteilt via| CDN
```

### Beschreibung des fachlichen Kontexts

| Partner/Schnittstelle | Eingabe | Ausgabe | Beschreibung |
|-------------------|-------|--------|-------------|
| **Anwendungsentwickler** | Integrationsanforderungen, Bug-Reports, Feature-Requests | Web-Komponenten, Framework-Adapter, Dokumentation | Hauptnutzer, die KoliBri in ihre Anwendungen integrieren |
| **Web-Frameworks** | Framework-APIs und -Konventionen | Framework-spezifische Adapter (React, Angular, Vue, etc.) | KoliBri bietet native Integrationen für beliebte Frameworks |
| **Web-Browser** | Webstandard-APIs (Custom Elements, Shadow DOM) | Gerenderte barrierefreie Komponenten | KoliBri-Komponenten laufen in modernen Browsern |
| **Assistive Technologien** | ARIA-Attribute, semantisches HTML | Barrierefreie Benutzeroberfläche | Komponenten stellen korrekte Barrierefreiheitsinformationen bereit |
| **Design-Systeme** | Design-Tokens, Style-Guides, Markenrichtlinien | Themenbezogene Komponenten | Organisationen wenden ihr Design-System über Themes an |
| **npm Registry** | Paketverteilungsinfrastruktur | Veröffentlichte npm-Pakete | Primärer Verteilungskanal für Komponenten und Themes |
| **Endnutzer** | Nutzerinteraktionen (Klick, Tastatur, Touch) | Barrierefreie Nutzererfahrung | Letztliche Nutznießer barrierefreier Komponenten |
| **Open-Source-Community** | Beiträge, Bug-Reports, Diskussionen | Verbesserte Komponenten, neue Features | Community treibt Evolution und Qualität voran |

## 3.2 Technischer Kontext

```mermaid
graph TB
    subgraph Development Tools
        Node[Node.js 22+]
        pnpm[pnpm Package Manager]
        Nx[Nx Build System]
        TypeScript[TypeScript Compiler]
        Stencil[Stencil.js]
    end

    subgraph Build Artifacts
        ESM[ES Modules]
        CJS[CommonJS Modules]
        Types[TypeScript Definitionen]
        CustomElements[Custom Elements Bundle]
        Loader[Lazy Loading Wrapper]
    end

    subgraph Runtime Environment
        CustomElementsAPI[Custom Elements API]
        ShadowDOMAPI[Shadow DOM API]
        AdoptedStyleSheets[Adopted Style Sheets API]
        DOMAPI[DOM APIs]
    end

    subgraph Testing Tools
        Jest[Jest Unit Tests]
        Playwright[Playwright E2E Tests]
        AxeCore[axe-core Barrierefreiheits-Tests]
        Lighthouse[Lighthouse Performance]
    end

    subgraph Quality Tools
        ESLint[ESLint]
        Stylelint[Stylelint]
        Prettier[Prettier]
        CodeQL[CodeQL Security]
    end

    Stencil -->|kompiliert| TypeScript
    Stencil -->|generiert| ESM
    Stencil -->|generiert| CJS
    Stencil -->|generiert| Types
    Stencil -->|generiert| CustomElements
    Stencil -->|generiert| Loader

    Node -->|führt aus| Stencil
    pnpm -->|verwaltet| Node
    Nx -->|orchestriert| pnpm

    CustomElements -->|verwendet| CustomElementsAPI
    CustomElements -->|verwendet| ShadowDOMAPI
    CustomElements -->|verwendet| AdoptedStyleSheets
    CustomElements -->|verwendet| DOMAPI
```

### Technische Schnittstellen

| Schnittstelle | Technologie | Beschreibung |
|-----------|------------|-------------|
| **Komponentendefinition** | Stencil.js, TypeScript | Komponenten werden mit Stencil-Dekoratoren und TypeScript-Klassen definiert |
| **Komponentenregistrierung** | Custom Elements API | Komponenten registrieren sich als benutzerdefinierte HTML-Elemente |
| **Style-Kapselung** | Shadow DOM, Adopted Style Sheets | Styles sind über Shadow DOM auf Komponenten beschränkt |
| **Theme-Anwendung** | CSS, SASS, Adopted Style Sheets | Themes stellen CSS bereit, das als Adopted Style Sheets geladen wird |
| **Framework-Integration** | Framework-spezifische Adapter | Generierte Adapter umhüllen Komponenten für React, Angular, Vue, etc. |
| **Build-System** | pnpm, Nx, Rollup (über Stencil) | Monorepo-Build orchestriert von pnpm und Nx |
| **Modulformate** | ES Modules, CommonJS | Komponenten in mehreren Modulformaten verteilt |
| **Typdefinitionen** | TypeScript .d.ts-Dateien | Vollständige TypeScript-Unterstützung für Entwickler |
| **Testing** | Jest, Playwright, axe-core | Unit-Tests, E2E-Tests und Barrierefreiheitsvalidierung |
| **Paketverteilung** | npm-Registry | Komponenten als npm-Pakete veröffentlicht |

### Kommunikationskanäle

| Kanal | Technologie | Zweck |
|---------|------------|---------|
| **Komponenten-Props** | JavaScript/TypeScript-Objekte | Konfiguration und Datenübergabe |
| **Komponenten-Events** | CustomEvent API | Komponenten-zu-Anwendungs-Kommunikation |
| **CSS Custom Properties** | CSS-Variablen (begrenzt) | Theme-Anpassungspunkte |
| **Slots** | Shadow DOM Slots | Inhaltsprojektion in Komponenten |
| **CSS Parts** | ::part() Pseudo-Element | Externes Styling von Komponenten-Interna (begrenzte Nutzung) |
| **ARIA-Attribute** | HTML-Attribute | Barrierefreiheitsinformationen für assistive Technologien |
