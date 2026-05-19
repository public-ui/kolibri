← [8. Querschnittliche Konzepte](08-cross-cutting-concepts.md)

# 9. Architekturentscheidungen

Dieser Abschnitt dokumentiert die bedeutenden Architekturentscheidungen, die während der Entwicklung von Public UI - KoliBri getroffen wurden. Jeder Architecture Decision Record (ADR) erfasst den Kontext, die Entscheidung und die Konsequenzen wichtiger Entscheidungen und bietet Transparenz und Begründung für zukünftige Wartende und Beitragende.

## 9.1 Entscheidungsaufzeichnungen

### ADR-001: Web Components als Fundament verwenden

**Status:** Akzeptiert

**Kontext:**
KoliBri muss Framework-agnostisch sein und mit jedem JavaScript-Framework (React, Angular, Vue) oder Vanilla JavaScript funktionieren. Wir benötigen eine Technologie, die standardisiert ist und langfristig unterstützt wird.

**Entscheidung:**
Web Components (Custom Elements, Shadow DOM) als Fundament für alle Komponenten verwenden.

**Konsequenzen:**

- ✅ Framework-agnostisch by Design
- ✅ Basiert auf W3C-Standards (langfristige Stabilität)
- ✅ Native Browser-Unterstützung (kein Framework-Overhead)
- ✅ Echte Kapselung via Shadow DOM
- ❌ Erfordert Polyfills für ältere Browser
- ❌ Shadow DOM kann bestimmte Styling-Szenarien erschweren
- ❌ Begrenzt auf Custom Elements API-Fähigkeiten

**Betrachtete Alternativen:**

- React-Komponenten: Zu stark an React-Ökosystem gekoppelt
- Framework-spezifische Bibliotheken: Verletzt Framework-agnostisches Ziel
- Reines HTML/CSS: Keine Komponenten-Logik oder Wiederverwendbarkeit

### ADR-002: Stencil.js als Compiler verwenden

**Status:** Akzeptiert

**Kontext:**
Das direkte Schreiben von Web Components ist verbose und fehleranfällig. Wir benötigen ein Tool, das die Entwicklererfahrung verbessert und dennoch Standard-Web-Components generiert.

**Entscheidung:**
Stencil.js als Web-Component-Compiler verwenden.

**Konsequenzen:**

- ✅ Hervorragende Entwicklererfahrung (TypeScript, JSX, Decorators)
- ✅ Generiert Framework-Adapter automatisch
- ✅ Optimierte Ausgabe (Lazy Loading, Code-Splitting)
- ✅ Starke TypeScript-Unterstützung
- ❌ Abhängigkeit vom Stencil-Projekt
- ❌ Lernkurve für Beitragende
- ❌ Build-Schritt erforderlich

**Betrachtete Alternativen:**

- Lit: Gute DX, aber keine automatische Framework-Adapter-Generierung
- Native Web Components: Zu verbose, schlechte DX
- Polymer: Deprecated und nicht aktiv gewartet
- Custom Solution: Zu viel Wartungsaufwand

### ADR-003: Themes von Komponenten trennen

**Status:** Akzeptiert

**Kontext:**
Verschiedene Organisationen benötigen verschiedene visuelle Designs (Corporate Design, Design-Systeme). Die Kopplung von Styling mit Komponenten erschwert die Anpassung.

**Entscheidung:**
Themes in unabhängige Pakete trennen, die zur Laufzeit registriert werden können.

**Konsequenzen:**

- ✅ Organisationen können benutzerdefinierte Themes ohne Forking erstellen
- ✅ Runtime-Theme-Wechsel möglich
- ✅ Mehrere Themes können unabhängig gewartet werden
- ✅ Theme-Updates erfordern keine Komponenten-Rebuilds
- ❌ Komplexere Architektur
- ❌ Theme- und Komponentenversionen müssen synchronisiert werden
- ❌ Zusätzliche Pakete zu warten

**Betrachtete Alternativen:**

- Nur CSS-Variablen: Unzureichend für komplexes Theming
- Inline-Styles: Koppelt Styling mit Logik
- Mehrere Komponentenversionen: Wartungs-Alptraum
- Fork pro Organisation: Fragmentierung, keine Zusammenarbeit

### ADR-004: Shadow DOM für Kapselung verwenden

**Status:** Akzeptiert

**Kontext:**
Komponenten benötigen Style-Isolation, um CSS-Konflikte zu verhindern. Globales CSS in großen Anwendungen führt oft zu unbeabsichtigten Seiteneffekten.

**Entscheidung:**
Shadow DOM für alle Komponenten verwenden, um echte Style-Kapselung zu erreichen.

**Konsequenzen:**

- ✅ Perfekte Style-Isolation
- ✅ Keine CSS-Namenskonflikte
- ✅ Komponenten können nicht versehentlich durch globale Styles kaputt gehen
- ✅ Vorhersagbares Rendering-Verhalten
- ❌ Kann Komponenten-Interna nicht von außen stylen (by Design)
- ❌ Einige CSS-Selektoren funktionieren nicht über Shadow-Grenze
- ❌ Etwas komplexeres Debugging

**Betrachtete Alternativen:**

- Kein Shadow DOM: Style-Konflikte und unvorhersagbares Verhalten
- Scoped Styles (wie Vue): Keine echte Kapselung
- CSS Modules: Erfordert Build-Tooling, nicht standardbasiert
- BEM-Benennung: Konventionen können gebrochen werden, nicht erzwungen

### ADR-005: Adopted Style Sheets verwenden

**Status:** Akzeptiert

**Kontext:**
Themes müssen effizient auf viele Komponenteninstanzen angewendet werden. Traditionelle Style-Injection wäre ineffizient und würde viele duplizierte Style-Elemente erstellen.

**Entscheidung:**
Adopted Style Sheets API für Theme-Anwendung verwenden.

**Konsequenzen:**

- ✅ Effizientes Style-Sharing über Komponenten
- ✅ Runtime-Theme-Wechsel ohne Neu-Rendering
- ✅ Memory-effizient (Styles geteilt, nicht dupliziert)
- ✅ Schnelle Theme-Änderungen
- ❌ Erfordert modernen Browser (oder Polyfill)
- ❌ Komplexere Theming-Implementierung

**Betrachtete Alternativen:**

- Style-Tags in jeder Komponente: Ineffizient, memory-intensiv
- Globale Styles mit CSS Custom Properties: Bricht Kapselung
- Inline-Styles: Nicht wartbar, keine CSS-Features
- Einzelnes Style-Tag: Schwer zu verwalten, keine Kapselung

### ADR-006: TypeScript verwenden

**Status:** Akzeptiert

**Kontext:**
JavaScripts dynamische Natur führt zu Runtime-Fehlern, die zur Compile-Zeit abgefangen werden könnten. Komponenten-APIs benötigen starke Typisierung für gute Entwicklererfahrung.

**Entscheidung:**
Gesamten Code in TypeScript mit aktiviertem Strict-Modus schreiben.

**Konsequenzen:**

- ✅ Typsicherheit fängt Fehler früh ab
- ✅ Hervorragende IDE-Unterstützung (Autocomplete, Refactoring)
- ✅ Selbstdokumentierender Code durch Typen
- ✅ Bessere Wartbarkeit
- ❌ Kompilierungsschritt erforderlich
- ❌ Lernkurve für Beitragende
- ❌ Verboserer Code

**Betrachtete Alternativen:**

- JavaScript mit JSDoc: Begrenzte Typ-Überprüfung
- Flow: Weniger Ökosystem-Support als TypeScript
- Reines JavaScript: Zu fehleranfällig für große Codebasis
- Reason/ReScript: Zu nischig, begrenzte Adoption

### ADR-007: pnpm Workspace Monorepo verwenden

**Status:** Akzeptiert

**Kontext:**
KoliBri besteht aus vielen Paketen (Komponenten, Themes, Adapter, Tools), die zusammen entwickelt, aber unabhängig released werden müssen.

**Entscheidung:**
pnpm Workspace als Monorepo-Lösung mit Nx für Build-Orchestrierung verwenden.

**Konsequenzen:**

- ✅ Effizientes Abhängigkeitsmanagement
- ✅ Geteilte Abhängigkeiten (Festplattenplatz-Einsparungen)
- ✅ Strikte Abhängigkeitsauflösung (keine Phantom-Abhängigkeiten)
- ✅ Schnelle Installationen
- ✅ Nx bietet intelligentes Caching und Task-Orchestrierung
- ❌ Komplexeres Setup als einzelnes Paket
- ❌ pnpm weniger verbreitet als npm/yarn
- ❌ Steilere Lernkurve für neue Beitragende

**Betrachtete Alternativen:**

- npm-Workspaces: Weniger effizient als pnpm
- Yarn-Workspaces: Phantom-Abhängigkeits-Problem
- Lerna: Overhead ohne pnpm-Vorteile
- Separate Repositories: Koordinations-Alptraum

### ADR-008: Fünf-Schichten-Styling-Architektur

**Status:** Akzeptiert

**Kontext:**
Styling muss zwischen Barrierefreiheitsanforderungen, Layout-Struktur und visuellem Design getrennt werden. Teams müssen Erscheinungsbild anpassen können, ohne Barrierefreiheit oder Layout zu brechen.

**Entscheidung:**
Fünf-Schichten-Styling-Architektur implementieren:

1. A11y-Preset-Schicht (Barrierefreiheits-Baseline)
2. Basis Global-Schicht (globales Layout)
3. Basis Komponenten-Schicht (Komponenten-Layout)
4. Theme Global-Schicht (globales Theme)
5. Theme Komponenten-Schicht (Komponenten-Theme)

**Konsequenzen:**

- ✅ Klare Trennung der Verantwortlichkeiten
- ✅ Barrierefreiheit kann nicht versehentlich gebrochen werden
- ✅ Themes können Erscheinungsbild anpassen ohne Layout zu brechen
- ✅ Vorhersagbare Style-Präzedenz
- ❌ Anfangs komplexer zu verstehen
- ❌ Mehr Dateien zu warten
- ❌ Strikte Konventionen erforderlich

**Betrachtete Alternativen:**

- Flache CSS-Struktur: Zu einfach, Dinge zu brechen
- Zwei-Schichten (Komponente + Theme): Unzureichende Trennung
- Nur Theme-Styling: Barrierefreiheit nicht garantiert
- Inline-Styles mit Theme-Tokens: Nicht wartbar

### ADR-009: CSS Custom Properties minimieren

**Status:** Akzeptiert

**Kontext:**
CSS Custom Properties (Variablen) durchqueren die Shadow-DOM-Grenze und bleiben in der globalen Cascade. Übermäßige Verwendung kann zu Namenskonflikten und unvorhersagbarem Verhalten führen.

**Entscheidung:**
CSS Custom Properties sparsam verwenden, nur für Werte, die von außen anpassbar sein müssen. SASS-Variablen für interne Berechnungen verwenden.

**Konsequenzen:**

- ✅ Verhindert Variablen-Namenskonflikte
- ✅ Robustere Komponenten
- ✅ Klarere API-Oberfläche
- ✅ Weniger Verwirrung darüber, was anpassbar ist
- ❌ Weniger Flexibilität für fortgeschrittene Nutzer
- ❌ Mehr SASS-Kompilierung erforderlich

**Betrachtete Alternativen:**

- Starke Nutzung von CSS Custom Properties: Zu viele Konflikte
- Keine CSS Custom Properties: Nicht anpassbar genug
- Alles als Custom Properties: Globale Namespace-Verschmutzung
- Nur komponentenspezifische Präfixe: Birgt noch Konfliktrisiko

### ADR-010: LTS/STS Release-Modell

**Status:** Akzeptiert

**Kontext:**
Unternehmen benötigen stabile, langfristig unterstützte Versionen. Innovation erfordert schnelle Iteration. Diese Bedürfnisse sind im Konflikt.

**Entscheidung:**
Duales Release-Modell implementieren:

- **LTS (Long-Term Support)**: 3 Jahre Support, konservative Änderungen
- **STS (Short-Term Support)**: 15 Monate Support, schnelle Innovation

**Konsequenzen:**

- ✅ Unternehmen erhalten Stabilität (LTS)
- ✅ Innovation setzt sich fort (STS)
- ✅ Klare Erwartungen an Support-Dauer
- ✅ Vorhersagbare Upgrade-Zyklen
- ❌ Mehr Versionen zu warten
- ❌ Komplexeres Release-Management
- ❌ Dokumentation für mehrere Versionen

**Betrachtete Alternativen:**

- Einzelne Release-Linie: Kann Stabilität und Innovation nicht ausbalancieren
- Nur LTS: Verlangsamt Innovation
- Nur STS: Keine Unternehmens-Adoption
- Mehrere gleichzeitige Majors: Zu viel Wartung

### ADR-011: Strikte Einhaltung semantischer Versionierung

**Status:** Akzeptiert

**Kontext:**
Nutzer müssen darauf vertrauen können, dass Updates ihre Anwendungen nicht unerwartet brechen. Klare Versionierung hilft beim Abhängigkeitsmanagement.

**Entscheidung:**
Strikte Einhaltung der Semantic Versioning 2.0:

- Major: Breaking Changes
- Minor: Neue Features, rückwärtskompatibel
- Patch: Bugfixes, rückwärtskompatibel

**Konsequenzen:**

- ✅ Vorhersagbare Upgrade-Sicherheit
- ✅ Klare Kommunikation von Änderungen
- ✅ Besseres Abhängigkeitsmanagement
- ✅ Vertrauen von der Community
- ❌ Hauptversionen können häufig kommen
- ❌ Deprecation-Prozess braucht Zeit
- ❌ Design-Fehler können nicht einfach behoben werden

**Betrachtete Alternativen:**

- Rolling Releases: Unvorhersagbar, riskant
- Kalender-Versionierung: Kommuniziert keine Breaking Changes
- Lockeres SemVer: Untergräbt Vertrauen
- Für immer Pre-1.0: Signalisiert Instabilität

### ADR-012: Framework-Adapter auto-generieren

**Status:** Akzeptiert

**Kontext:**
Die Unterstützung mehrerer Frameworks (React, Angular, Vue, etc.) erfordert Framework-spezifische Wrapper. Diese manuell zu warten wäre zeitaufwändig und fehleranfällig.

**Entscheidung:**
Stencil Output Targets verwenden, um Framework-Adapter automatisch aus Komponentendefinitionen zu generieren.

**Konsequenzen:**

- ✅ Keine manuelle Adapter-Wartung
- ✅ Konsistente APIs über Frameworks hinweg
- ✅ Automatische Updates wenn Komponenten sich ändern
- ✅ Weniger Code zu warten
- ❌ Abhängig von Stencil Output Target Qualität
- ❌ Begrenzte Kontrolle über generierten Code
- ❌ Framework-spezifische Eigenheiten schwerer zu adressieren

**Betrachtete Alternativen:**

- Manuelle Adapter: Zu viel Wartung
- Einzelnes Framework: Verletzt Framework-agnostisches Ziel
- Keine Adapter (Web Components direkt nutzen): Schlechte DX in einigen Frameworks
- Separate Adapter-Projekte: Koordinations-Overhead

### ADR-013: SLSA Build Level 3 für Supply-Chain-Sicherheit

**Status:** Akzeptiert

**Kontext:**
Supply-Chain-Angriffe nehmen zu. Nutzer benötigen Gewissheit, dass veröffentlichte Pakete nicht manipuliert wurden und aus verifiziertem Quellcode gebaut wurden.

**Entscheidung:**
SLSA Build Level 3 mit npm Provenance für alle veröffentlichten Pakete implementieren.

**Konsequenzen:**

- ✅ Verifizierbare Build-Provenance
- ✅ Supply-Chain-Sicherheit
- ✅ Erhöhtes Vertrauen von Nutzern
- ✅ Erfüllt Behörden-/Unternehmens-Sicherheitsanforderungen
- ❌ Komplexeres CI/CD-Setup
- ❌ Erfordert GitHub OIDC-Konfiguration
- ❌ npm Provenance-Support erforderlich

**Betrachtete Alternativen:**

- Keine Provenance: Weniger sicher, erfüllt einige Anforderungen nicht
- SLSA Level 1/2: Unzureichende Sicherheitsgarantien
- Selbstsignierte Signaturen: Nicht vom Ökosystem verifizierbar
- Nur Paketsignierung: Beweist nicht die Quelle

### ADR-014: Playwright für E2E-Testing verwenden

**Status:** Akzeptiert

**Kontext:**
Komponenten benötigen End-to-End-Tests über mehrere Browser. Test-Framework sollte moderne Webtechnologien einschließlich Web Components und Shadow DOM unterstützen.

**Entscheidung:**
Playwright als E2E-Test-Framework verwenden.

**Konsequenzen:**

- ✅ Hervorragende Shadow-DOM-Unterstützung
- ✅ Multi-Browser-Testing (Chromium, Firefox, WebKit)
- ✅ Schnell und zuverlässig
- ✅ Gute Entwicklererfahrung
- ✅ Eingebaute Barrierefreiheits-Tests (axe-core-Integration)
- ❌ Lernkurve für Beitragende
- ❌ Test-Wartungs-Overhead

**Betrachtete Alternativen:**

- Cypress: Schwächere Shadow-DOM-Unterstützung zur Zeit der Entscheidung
- Puppeteer: Nur Chrome, weniger Features
- Selenium: Älter, langsamer, komplexer
- TestCafe: Weniger Ökosystem-Support

### ADR-015: Automatisches komponentenbasiertes Lazy Loading via Stencil

**Status:** Akzeptiert

**Kontext:**
Anwendungen mit KoliBri benötigen möglicherweise nicht alle 50+ Komponenten sofort geladen. Bundle-Größe und Performance sind kritische Belange für Webanwendungen.

**Entscheidung:**
Auf Stencils eingebaute Lazy-Loading- und Code-Splitting-Fähigkeiten vertrauen, die automatisch nur die tatsächlich in der Anwendung verwendeten Komponenten auf Komponentenbasis laden.

**Konsequenzen:**

- ✅ Komponenten automatisch on-demand geladen, wenn erstmalig verwendet
- ✅ Keine manuelle Konfiguration für Lazy Loading erforderlich
- ✅ Minimale initiale Bundle-Größe
- ✅ Optimale Performance ohne Entwicklereingriff
- ✅ Jede Komponente in separates Bundle für effizientes Laden kompiliert
- ❌ Erfordert moderne Bundler-Unterstützung für ES-Module
- ❌ Zusätzliche HTTP-Requests für jede Komponente (durch HTTP/2 gemildert)

**Betrachtete Alternativen:**

- In Kategorie-Pakete aufteilen: Komplexere Wartung, weniger flexibel
- Einzelnes monolithisches Bundle: Größerer initialer Ladevorgang, langsamere Performance
- Manuelles Lazy Loading: Mehr Entwickler-Aufwand, fehleranfällig

### ADR-016: SASS-Variablen für Basis-Theme (Keine Design-Tokens)

**Status:** Akzeptiert

**Kontext:**
Design-Tokens (CSS Custom Properties) werden für Theming populär, aber sie durchqueren die Shadow-DOM-Grenze und können von außen manipuliert werden, was potenziell das Erscheinungsbild der Komponente brechen und Robustheit reduzieren kann.

**Entscheidung:**
SASS-Variablen exklusiv für interne Berechnungen und Styling im Basis-Theme verwenden. Organisationen können optional Design-Tokens in ihren benutzerdefinierten Themes verwenden, aber das Basis-Theme vermeidet sie zur Aufrechterhaltung der Komponenten-Robustheit und Vermeidung externer Manipulation.

**Konsequenzen:**

- ✅ Komponenten bleiben robust und vorhersagbar in allen Umgebungen
- ✅ Keine externe Manipulation von Komponenten-Interna via CSS-Variablen
- ✅ Ähnliche Wartbarkeitsvorteile wie Design-Tokens (Variablen, Berechnungen)
- ✅ Organisationen frei, Design-Tokens in benutzerdefinierten Themes zu verwenden
- ✅ Klare Trennung zwischen komponenten-internem Styling und externer Anpassung
- ❌ Weniger Runtime-Flexibilität im Vergleich zu CSS Custom Properties
- ❌ Theme-Änderungen erfordern Rekompilierung statt Runtime-Updates
- ❌ Kann einige moderne CSS-Features nicht nutzen, die auf Custom Properties basieren

**Betrachtete Alternativen:**

- Starke Nutzung von CSS Custom Properties: Externes Manipulationsrisiko, weniger robust
- Design Tokens W3C-Format: Gleiche Probleme wie CSS Custom Properties für Basis-Theme
- Keine Variablen überhaupt: Schlechte Wartbarkeit, Code-Duplizierung
- Nur komponenten-spezifische CSS-Variablen: Durchquert noch Shadow-DOM-Grenze

## 9.2 Offene Entscheidungen

Diese Entscheidungen werden in Betracht gezogen und werden in zukünftigen Planungszyklen adressiert, während sich das Projekt weiterentwickelt und neue Anforderungen aufkommen.

### OD-001: Server-Side-Rendering-Strategie

**Status:** Offen

**Kontext:**
SSR-Unterstützung für Web Components ist komplex. Aktueller Hydrate-Adapter ist begrenzt. Vollständige SSR-Lösung für einige Anwendungsfälle benötigt.

**Optionen:**

1. Bestehenden Hydrate-Adapter verbessern
2. Declarative Shadow DOM Ansatz
3. Mit SSR-Framework-Projekten zusammenarbeiten
4. Einschränkungen und Workarounds dokumentieren

**Entscheidungszeitlinie:** In kommenden vierteljährlichen Planungssitzungen zu überprüfen

→ [10. Qualitätsanforderungen](10-quality-requirements.md)
