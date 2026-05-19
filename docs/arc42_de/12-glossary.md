← [11. Risiken und technische Schulden](11-risks-and-technical-debt.md)

# 12. Glossar

Dieses Glossar bietet Definitionen für Schlüsselbegriffe, Konzepte und Abkürzungen, die in der Public UI - KoliBri Architekturdokumentation verwendet werden. Es dient als Referenz, um ein konsistentes Verständnis über alle Stakeholder hinweg sicherzustellen.

## A

**Barrierefreiheit (A11y)**
Die Praxis, Webinhalte für Menschen mit Behinderungen nutzbar zu machen. Public UI - KoliBri fokussiert sich darauf, WCAG 2.2 Level AAA Standards zu erfüllen.

**Adapter**
Framework-spezifischer Wrapper um KoliBri-Komponenten. Auto-generiert von Stencil Output Targets für React, Angular, Vue, etc.

**Adopted Style Sheets**
Web-API, die das Teilen von Style Sheets über mehrere Shadow-DOM-Instanzen ermöglicht. Von KoliBri für effizientes Theming verwendet.

**ARIA (Accessible Rich Internet Applications)**
Sammlung von Attributen, die Wege definieren, um Webinhalte für Menschen mit Behinderungen zugänglicher zu machen.

**Atomare Komponente**
Kleine, einzelne Komponente (Button, Input, Icon), die zu größeren Komponenten komponiert werden kann. KoliBri fokussiert sich auf atomare Komponenten.

## B

**BEM (Block Element Modifier)**
CSS-Benennungskonvention, die im KoliBri-Styling verwendet wird. Beispiel: `.kol-button__icon--small`

**BITV (Barrierefreie-Informationstechnik-Verordnung)**
Deutsche Barrierefreiheitsverordnung, die KoliBri einhält. Basiert auf WCAG-Standards.

**Bundle-Größe**
Gesamtgröße von JavaScript- und CSS-Dateien. KoliBri optimiert Bundle-Größe durch Lazy Loading und Code-Splitting.

## C

**Komponente**
Wiederverwendbares UI-Element mit gekapselter Struktur, Styling und Verhalten. In KoliBri bezieht sich dies auf Web Components.

**Komponenten-Bibliothek**
Sammlung wiederverwendbarer Komponenten. KoliBri ist eine Komponenten-Bibliothek für barrierefreies HTML.

**CSP (Content Security Policy)**
Sicherheitsstandard, der hilft, XSS-Angriffe zu verhindern. KoliBri-Komponenten sind CSP-kompatibel.

**Custom Element**
Webstandard zur Definition neuer HTML-Elemente. KoliBri-Komponenten sind Custom Elements (z.B. `<kol-button>`).

**Custom Element Manifest**
JSON-Datei, die Custom Elements' APIs beschreibt. Generiert von Stencil und verwendet für Dokumentation und IDE-Support.

## D

**Declarative Shadow DOM**
Server-Side-Rendering-Technik für Web Components. KoliBri hat derzeit begrenzte Unterstützung.

**Design-System**
Sammlung wiederverwendbarer Komponenten und Design-Richtlinien. KoliBri bietet Fundament für Design-Systeme.

**Design-Token**
Benannter Wert (Farbe, Abstand, Schrift), der in Design-Systemen verwendet wird. KoliBri-Themes verwenden Design-Tokens.

**DX (Developer Experience)**
Wie einfach und angenehm es ist, ein Tool oder eine Bibliothek zu verwenden. KoliBri priorisiert gute DX.

## E

**Kapselung**
Isolation der Komponenten-Implementierung von externem Code. Erreicht durch Shadow DOM.

**EUPL (European Union Public License)**
Open-Source-Lizenz, die von KoliBri verwendet wird (Version 1.2).

**Event**
Signal, das von Komponente emittiert wird, wenn etwas passiert (Klick, Änderung, etc.). KoliBri verwendet CustomEvent API.

## F

**Framework-Adapter**
Paket, das KoliBri-Komponenten natürlich in spezifischen Frameworks funktionieren lässt (React, Angular, Vue).

**Framework-agnostisch**
Funktioniert mit jedem oder keinem Framework. Kernprinzip von KoliBri.

## H

**Hydratisierung**
Prozess des Anhängens von Event-Handlern an server-gerendertes HTML. Relevant für SSR-Szenarien.

## I

**ITZBund (Informationstechnikzentrum Bund)**
Deutscher Bundes-IT-Dienstleister, der KoliBri erstellt und als Open Source veröffentlicht hat.

## J

**JSX (JavaScript XML)**
Syntaxerweiterung für JavaScript, die in Stencil-Komponenten-Templates verwendet wird.

## K

**KoliBri**
Component Library for Accessibility - der Name dieses Projekts. Immer mit dieser Schreibweise geschrieben.

## L

**Lazy Loading**
Code nur bei Bedarf laden. KoliBri-Komponenten werden lazy geladen für optimale Performance.

**LTS (Long-Term Support)**
Version mit 3 Jahren Support. Bietet Stabilität für Unternehmensnutzer.

**Loader**
JavaScript-Modul, das Custom Elements definiert. KoliBri bietet Loader für Lazy Loading.

## M

**Monorepo**
Einzelnes Repository mit mehreren Paketen. KoliBri verwendet pnpm Workspace Monorepo.

**Multi-Theming**
Fähigkeit, verschiedene visuelle Themes auf gleiche Komponenten anzuwenden. Kern-KoliBri-Feature.

## N

**npm (Node Package Manager)**
Paket-Registry, wo KoliBri-Pakete veröffentlicht werden.

**Nx**
Build-System für Monorepos. KoliBri verwendet Nx für Build-Orchestrierung und Caching.

## O

**Output Target**
Stencil-Konfiguration zur Generierung von Framework-Adaptern. KoliBri verwendet Output Targets für React, Angular, Vue, etc.

## P

**pnpm (Performant npm)**
Schneller, festplatteneffizienter Paketmanager. KoliBri verwendet pnpm Workspaces.

**Polyfill**
Code, der Funktionalität bereitstellt, die von Browsern nicht nativ unterstützt wird. Kann für ältere Browser benötigt werden.

**Props (Properties)**
Konfigurationsoptionen, die an Komponenten übergeben werden. KoliBri verwendet Unterstrich-Präfix (z.B. `_label`).

**Provenance**
Build-Attestierung, die Paket-Authentizität beweist. KoliBri veröffentlicht mit SLSA Build Level 3 Provenance.

## R

**React**
Beliebtes JavaScript-Framework. KoliBri bietet React-Adapter.

**Responsive**
Passt sich verschiedenen Bildschirmgrößen an. KoliBri-Komponenten sind standardmäßig responsive.

**RTL (Right-to-Left)**
Textrichtung für Sprachen wie Arabisch und Hebräisch. KoliBri unterstützt RTL-Layouts.

## S

**SASS (Syntactically Awesome Style Sheets)**
CSS-Präprozessor, der für KoliBri-Themes verwendet wird.

**Screenreader**
Assistive Technologie, die Webinhalte laut vorliest. KoliBri gewährleistet Screenreader-Kompatibilität.

**Semantisches HTML**
HTML-Elemente gemäß ihrer Bedeutung verwenden (Button für Buttons, nicht Div). KoliBri erzwingt semantisches HTML.

**SemVer (Semantic Versioning)**
Versionierungsschema (MAJOR.MINOR.PATCH). KoliBri folgt strikt SemVer 2.0.

**Shadow DOM**
Webstandard zur Kapselung von Komponenten-DOM und -Styles. Kern von KoliBris Architektur.

**SLSA (Supply-chain Levels for Software Artifacts)**
Sicherheits-Framework für Software-Supply-Chains. KoliBri strebt Build Level 3 an.

**Slot**
Web-Components-Mechanismus für Content-Projektion. Verwendet für flexible Komponenten-Komposition.

**SSR (Server-Side Rendering)**
Komponenten auf Server rendern. KoliBri hat begrenzte SSR-Unterstützung über Hydrate-Adapter.

**Stencil**
Web-Component-Compiler, der zum Bau von KoliBri verwendet wird. Entwickelt vom Ionic-Team.

**STS (Short-Term Support)**
Version mit 15 Monaten Support. Ermöglicht schnelle Innovation.

## T

**Theme**
Paket mit visuellen Styles für Komponenten. KoliBri trennt Themes von Komponenten-Logik.

**Tree Shaking**
Entfernen ungenutzten Codes während des Bundlings. KoliBri unterstützt Tree Shaking für kleinere Bundles.

**TypeScript**
Typisierte Obermenge von JavaScript. Gesamter KoliBri-Code in TypeScript geschrieben.

## V

**Vue.js**
Progressives JavaScript-Framework. KoliBri bietet Vue-Adapter.

## W

**W3C (World Wide Web Consortium)**
Standards-Organisation für das Web. KoliBri folgt W3C-Standards.

**WCAG (Web Content Accessibility Guidelines)**
Internationale Barrierefreiheits-Standards. Public UI - KoliBri implementiert WCAG 2.2 Level AAA.

**Web Component**
Sammlung von Webstandards zur Erstellung wiederverwendbarer Custom Elements. Fundament von KoliBri.

**Webstandard**
Offizielle Spezifikation vom W3C. KoliBri auf Webstandards für Langlebigkeit gebaut.

## Abkürzungen

| Abkürzung | Vollständiger Begriff                          |
| --------- | ---------------------------------------------- |
| A11y      | Accessibility (Barrierefreiheit)               |
| API       | Application Programming Interface              |
| ARIA      | Accessible Rich Internet Applications          |
| BEM       | Block Element Modifier                         |
| BITV      | Barrierefreie-Informationstechnik-Verordnung   |
| CDN       | Content Delivery Network                       |
| CI/CD     | Continuous Integration / Continuous Deployment |
| CJS       | CommonJS                                       |
| CLI       | Command Line Interface                         |
| CSP       | Content Security Policy                        |
| CSS       | Cascading Style Sheets                         |
| DOM       | Document Object Model                          |
| DX        | Developer Experience                           |
| E2E       | End-to-End                                     |
| ES        | ECMAScript                                     |
| ESM       | ES Modules                                     |
| EUPL      | European Union Public License                  |
| HTML      | HyperText Markup Language                      |
| i18n      | Internationalization (Internationalisierung)   |
| IDE       | Integrated Development Environment             |
| ITZBund   | Informationstechnikzentrum Bund                |
| JSX       | JavaScript XML                                 |
| LTS       | Long-Term Support                              |
| MCP       | Model Context Protocol                         |
| npm       | Node Package Manager                           |
| OIDC      | OpenID Connect                                 |
| pnpm      | Performant npm                                 |
| PR        | Pull Request                                   |
| RTL       | Right-to-Left                                  |
| SASS      | Syntactically Awesome Style Sheets             |
| SemVer    | Semantic Versioning                            |
| SLSA      | Supply-chain Levels for Software Artifacts     |
| SPA       | Single Page Application                        |
| SSR       | Server-Side Rendering                          |
| STS       | Short-Term Support                             |
| UI        | User Interface                                 |
| UX        | User Experience                                |
| W3C       | World Wide Web Consortium                      |
| WCAG      | Web Content Accessibility Guidelines           |
| XSS       | Cross-Site Scripting                           |

## Komponentenbenennung

Alle KoliBri-Komponenten sind mit "Kol" präfixiert, um Namenskonflikte zu vermeiden:

- `<kol-button>` - Button-Komponente
- `<kol-input-text>` - Texteingabe-Komponente
- `<kol-table>` - Tabellen-Komponente
- `<kol-modal>` - Modal-Dialog-Komponente
- etc.

## Property-Benennung

Komponenten-Properties sind mit Unterstrich präfixiert, um Konflikte mit nativen HTML-Attributen zu vermeiden:

- `_label` - Komponenten-Label
- `_disabled` - Deaktiviert-State
- `_variant` - Visuelle Variante
- `_icons` - Icon-Konfiguration
- etc.

## Dateiendungen

| Endung     | Zweck                                    |
| ---------- | ---------------------------------------- |
| `.tsx`     | TypeScript mit JSX (Komponenten-Dateien) |
| `.ts`      | TypeScript (Utilities, Typen)            |
| `.scss`    | SASS-Stylesheet                          |
| `.css`     | CSS-Stylesheet                           |
| `.spec.ts` | Unit-Test-Datei                          |
| `.e2e.ts`  | E2E-Test-Datei                           |
| `.md`      | Markdown-Dokumentation                   |

## Paket-Scopes

| Scope                    | Zweck                       |
| ------------------------ | --------------------------- |
| `@public-ui/components`  | Kern-Komponenten-Bibliothek |
| `@public-ui/theme-*`     | Theme-Pakete                |
| `@public-ui/react`       | React-Adapter               |
| `@public-ui/angular-*`   | Angular-Adapter             |
| `@public-ui/vue`         | Vue-Adapter                 |
| `@public-ui/solid`       | Solid-Adapter               |
| `@public-ui/svelte`      | Svelte-Adapter              |
| `@public-ui/kolibri-cli` | Migrations-CLI-Tool         |
