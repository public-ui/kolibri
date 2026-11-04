# Konzept: Umstieg auf die offiziellen Stencil Output Targets

**Stand:** erarbeitet gegen `@stencil/core` 4.45.2, `@stencil/react-output-target` 1.6.x, `@stencil/angular-output-target` 1.5.x, `@stencil/vue-output-target` 0.14.x, `@stencil/ssr` 0.4.x
**Umfang:** packages/components (Stencil-Build), packages/adapters/\*, Doku und Migration-Guide
**Ziel:** Die vier eigenen Forks der Framework-Output-Targets werden durch die offiziellen Stencil-Pakete ersetzt. Das TagName-Replace-Feature (`transformTagName`) bleibt dabei als öffentliche Funktion erhalten und wird auf die native Stencil-API (`setTagTransformer`/`transformTag`) umgestellt.

---

## 1. Ausgangslage

### 1.1 Warum es die Forks gibt

Das TagName-Replace erlaubt Anwendungen, zur Laufzeit alle `kol-*` Tags umzubenennen, zum Beispiel auf `app-kol-button` oder `v2-kol-button`, um Namensräume pro Einsatzkontext oder Versionslinien zu trennen. Als das Feature gebaut wurde, sahen die offiziellen Stencil-Output-Targets keine solche Erweiterung vor. Deshalb pflegt KoliBri eigene Forks:

| Paket                                      | Version | Zusatz gegenüber Upstream                                                                                                                                |
| ------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@public-ui/stencil-angular-output-target` | 0.9.0   | Generiert `ReplaceTagDirective`, `StencilProxyComponent` und `tagNameTransformer` (Runtime-Re-Hosting, da Angular-Selektoren zur Compilezeit feststehen) |
| `@public-ui/stencil-react-output-target`   | 0.6.0   | Generiert `setTagNameTransformer`-Export; `createComponent` löst den Tag zur Renderzeit auf                                                              |
| `@public-ui/stencil-vue-output-target`     | 0.9.0   | Generiert `setTagNameTransformer`-Export, `defineContainer` löst zur Renderzeit auf                                                                      |
| `@public-ui/stencil-solid-output-target`   | 0.2.0   | Wie React/Vue, `tagNameTransformer` im `solid-component-lib`                                                                                             |
| `@revolist/svelte-output-target`           | 0.0.7   | Community-Paket, **ohne** Tag-Replacement                                                                                                                |

### 1.2 Wie das Feature heute verdrahtet ist

Das Feature existiert heute in drei Schichten, die unabhängig voneinander gesetzt werden müssen:

1. **Core** (`packages/components/src/core/component-names.ts`): `bootstrap({ transformTagName })` ruft `setCustomTagNames()` auf und mutiert die exportierten `Kol*Tag`-Konstanten. Interne Kompositionen (zum Beispiel rendert der Toaster `KolButtonTag`) folgen dadurch der Umbenennung.
2. **Adapter**: Jede generierte Proxy-Datei enthält den Fork-Hook (`setTagNameTransformer` beziehungsweise die Angular-Direktiven-Maschinerie). Die Anwendung ruft `setTagNameTransformer(fn)` aus dem jeweiligen Adapter-Paket auf (siehe `packages/tools/visual-tests/app/src/react.main.tsx`).
3. **Loader**: `defineCustomElements(window, { transformTagName: fn })` benennt beim Lazy-Loading die definierbaren Tags um, aktiviert über `extras.tagNameTransform: true` in der Stencil-Konfiguration. Diese Option ist in Stencil als deprecated markiert.

Diese Dreiteilung ist fehleranfällig: Wer eine Schicht vergisst, bekommt unaufgelöste Elemente. Zusätzlich lastet die Fork-Pflege vier Upstream-Repositories ab, mit wachsendem Abstand bei SSR-, React-19- und Typfeatures.

---

## 2. Was die neuen Output Targets mitbringen

### 2.1 Native Runtime-API im Core

Stencil Core bringt seit 4.4x die Laufzeit-APIs `setTagTransformer(fn)` und `transformTag(tag)` mit (siehe `stencil-public-runtime.d.ts`). Damit wird der Tag an **einer einzigen Stelle** gesetzt und wirkt auf:

- `customElements.define/get/whenDefined` und `document.createElement` (injiziert der Compiler in den generierten Component-Dateien),
- das interne Rendering: `h()` transformiert VNode-Tag-Namen, der Lazy-Host löst `transformTag(cmpMeta.$tagName$)` auf,
- den Komponenten-Lookup des Lazy-Loaders,
- SSR: das Hydrate-Modul exportiert `setTagTransformer`/`transformTag`, das neue `@stencil/ssr`-Paket setzt es automatisch,
- CSS-Strings sowie `querySelector(All)`/`closest`-Selektoren, wenn `extras.additionalTagTransformers: true` gesetzt ist.

Deprecated und damit ersatzlos entfallend: `extras.tagNameTransform` und `defineCustomElements(window, { transformTagName })`.

### 2.2 Die neuen Target-Pakete (Monorepo `stenciljs/output-targets`)

Alle drei Framework-Targets haben eine Option `transformTag: boolean`:

- **React** (`outDir` statt `proxiesFile`, Runtime aus `@stencil/react-output-target/runtime`, basierend auf `@lit/react`, React 18 und 19 kompatibel): generiert zusätzlich eine `tag-transformer.ts` und Proxies, die `transformTag` an `createComponent` durchreichen. SSR über `hydrateModule` erzeugt `components.server.ts`. Einschränkung: der finale Tag wird **beim Modul-Import einmalig** aufgelöst (eager binding), nicht pro Render.
- **Vue** (`includeImportCustomElements` oder Lazy über Loader-Plugin): transformiert den Tag **pro Renderaufruf**, passt also zum bisherigen Verhalten. Generiert eine Plugin-Datei, in der `setTagTransformer` vor dem `defineCustomElements` gesetzt werden kann.
- **Angular** (`outputType: component | scam | standalone`, `directivesArrayFile`): löst das Runtime-Problem anders. Bei `transformTag: true` generiert es ein Skript `patch-transform-selectors.mjs`, das als `postinstall` in der konsumierenden Anwendung die `@Component`-Selektoren (und die `.d.ts`-Deklarationen) der installierten Angular-Wrapper-Library im `node_modules` umschreibt. Ein Runtime-Re-Hosting wie im KoliBri-Fork gibt es nicht.
- **Solid und Svelte haben keine offiziellen Targets.** Das Monorepo führt nur React, Angular, Vue, `@stencil/ssr` und `@stencil/types-output-target`.

### 2.3 Konsequenz für die Adapter-Generierung

Der neue React-Generator bindet `defineCustomElement` pro Komponente aus dem `dist-custom-elements`-Output ein und ersetzt damit das bisherige Lazy-Loading über `applyPolyfills`/`defineCustomElements` aus dem Loader. Für Vue bleibt der Lazy-Pfad über Loader und Plugin möglich. Das ist eine Verhaltensänderung (Definition der Elemente, Bundle-Schnitt, Polyfill-Pfad) und gehört in die Migrationsplanung, sie ist aber unabhängig vom TagName-Feature der eigentliche technische Gewinn der Umstellung.

---

## 3. Zielbild

### 3.1 Single Source of Truth für die Umbenennung

Nach der Migration gibt es genau eine Instanz, die den Transformer kennt: die native Stencil-Runtime.

- `bootstrap({ transformTagName })` **bleibt die öffentliche API** in `@public-ui/components`. Intern ruft sie statt `setCustomTagNames` die native `setTagTransformer` auf.
- Jede Adapter-Package exportiert weiterhin `setTagNameTransformer(fn)` als Brücke. Sie delegiert an dieselbe native API, damit Adapter-Proxy und Core definitionsgemäß synchron sind.
- `setCustomTagNames()` und die Mutation der `Kol*Tag`-Konstanten entfallen. Die Konstanten bleiben als Public API exportiert, tragen aber dauerhaft den Wert `kol-*`. Das interne Rendering funktioniert ohne Mutation, weil die Stencil-Runtime VNode-Namen selbst transformiert.
- **Achtung Doppeltransformation:** Solange die Konstanten mutiert würden und die Runtime zusätzlich transformiert, entstünde `app-kol-button` zu `app-app-kol-button`. Die Mutation muss stillgelegt werden, sobald der native Pfad aktiviert wird.

### 3.2 Zielzustand der `stencil.config.ts`

```ts
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
// solid: vorerst @public-ui/stencil-solid-output-target (kein offizielles Target)
// svelte: vorerst @revolist/svelte-output-target (kein offizielles Target)

export const config: Config = {
	// ...
	extras: {
		// tagNameTransform entfällt (deprecated)
		additionalTagTransformers: true, // transformiert CSS-Strings und Selektoren mit
		enableImportInjection: true,
	},
	outputTargets: [
		{ type: 'dist' }, // Lazy-Loader weiterhin für Vue, Solid, Svelte, Vanilla
		{ type: 'www' },
		{ type: 'dist-custom-elements' }, // Basis für React und Angular-Standalone
		reactOutputTarget({ outDir: '../adapters/react/src', excludeComponents: EXCLUDE_TAGS, transformTag: true }),
		reactOutputTarget({ outDir: '../adapters/react-v19/src', excludeComponents: EXCLUDE_TAGS, transformTag: true }),
		angularOutputTarget({
			componentCorePackage: '@public-ui/components',
			directivesProxyFile: '../adapters/angular/v20/src/components.ts',
			directivesArrayFile: '../adapters/angular/v20/src/index.ts',
			excludeComponents: EXCLUDE_TAGS,
			transformTag: true,
		}),
		// analog v21
		vueOutputTarget({/* wie heute plus transformTag: true */}),
		// hydrate, docs-* unverändert
	],
};
```

Die Brücke im Core (`bootstrap.ts`) verkürzt sich im Wesentlichen auf:

```ts
import { setTagTransformer } from '@stencil/core';

if (koliBriOptions?.transformTagName) {
	setTagTransformer(koliBriOptions.transformTagName);
}
```

Da der Transformer vor dem ersten `define` gesetzt sein muss, prüft der Core die Reihenfolge und gibt im Zweifel die native Warnung plus einen KoliBri-Hinweis aus. Die Adapter-Brücken (`kolibri-src`-Schicht der Adapter-Packages) exportieren `setTagNameTransformer` weiter und rufen dieselbe native API.

### 3.3 Verbleibende Eigenbauten

Zwei Punkte lassen sich mit den offiziellen Targets nicht ohne Weiteres abbilden und werden bewusst als kleine, repo-eigene Post-Processing-Schritte geführt statt als Forks:

1. **React: Auflösung des Tags zur Renderzeit.** Der offizielle Generator bindet den Tag beim Import fest. Die KoliBri-UX (Transformer wird in `bootstrap` gesetzt, also nach den statischen Imports) bräche. Lösung: ein Script im Components-Build (`packages/components/scripts/`, analog zu `autogen.doc.js` und `vaadin.js`, die bereits nach jedem Build in `../adapters/*` schreiben) tauscht in der generierten `components.ts` den `createComponent`-Import gegen einen dünnen KoliBri-Wrapper aus `kolibri-src`, der `transformTag(tagName)` erst beim ersten Render aufruft. Sobald Upstream eine verzögerte Auflösung anbietet, fällt der Codemod weg.
2. **Angular: Runtime-Re-Hosting statt `node_modules`-Patching.** Der offizielle Pfad verlangt bei `transformTag: true` einen `postinstall` in jeder konsumierenden Anwendung, der die Selektoren im installierten Paket umschreibt. Das kollidiert mit pnpm-Workflows, CI-Caches und der Nachvollziehbarkeit von Supply Chains. Stattdessen bleiben `ReplaceTagDirective`, `StencilProxyComponent` und `tagNameTransformer` als repo-eigene Dateien (Vorlage im Components-Paket, kopiert wie heute durch `copyResources` beziehungsweise das Build-Script) erhalten, und ein zweiter Codemod-Schritt apliciert auf die offiziell generierte `components.ts` die KoliBri-Proxy-Vorlage. Das Ergebnis ist funktional das heutige Verhalten, die Logik liegt aber im KoliBri-Repository und nicht mehr in einem gepflegten Fork.

### 3.4 Adapter im Einzelnen

| Adapter                                   | Ziel                                                                                                       | Tag-Replacement                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| React 18 (`@public-ui/react`)             | offizielles Target + Codemod (Renderzeit-Auflösung), Umstieg auf `dist-custom-elements`                    | vollständig, wie heute                 |
| React 19 (`@public-ui/react-v19`)         | dito; perspektivisch Zusammenführung mit react, da die neue Runtime 18 und 19 abdeckt                      | vollständig                            |
| Angular v20/v21                           | offizielles Target + eigene `angular-component-lib`-Vorlagen und Proxy-Codemod                             | vollständig, Runtime statt Postinstall |
| Vue                                       | offizielles Target, `transformTag: true`, Lazy-Pfad über Loader-Plugin                                     | vollständig (offiziell)                |
| Solid                                     | Fork vorerst weiter (kein offizielles Target); mittelfristig eigenes Target ins Repo holen oder upstreamen | vollständig (Fork)                     |
| Svelte                                    | Community-Target ohne Tag-Replacement; Lücke dokumentieren, Upstream-Issue zu `svelte:element` prüfen      | **Lücke wie heute**                    |
| Preact, Vaadin, react-standalone, hydrate | ohne Transformer wie heute weiter; hydrate bleibt Basis für späteres `@stencil/ssr`-Angebot                | unverändert                            |

---

## 4. Migrationsplan

Jede Phase endet mit `pnpm format`, `pnpm lint`, `pnpm test` und einem grünen visual-tests-Lauf mit `ENABLE_TAG_NAME_TRANSFORMER=true` (Zero-Visual-Delta-Handoff gegen den Base-Branch, da die Umbenennung das DOM nicht sichtbar verändern darf).

### Phase 0: Bestandsaufnahme und Entscheidungen

- Diff der vier Forks gegen die jeweiligen Upstream-Versionen ziehen und alle Abweichungen außer dem Tag-Transformer auflisten (Event-Typen, `excludeRenderWait`, Bugfixes), damit nichts beim Wechsel verloren geht.
- Verifizieren, dass der mit 4.45.2 generierte Loader `setTagTransformer` exportiert (der generierte `dist/esm/loader.js` des aktuellen Workspace-Builds enthält es noch nicht; Teil des nächsten Component-Builds).
- Entscheidung nach Abschnitt 3.3 fällen (React-Codemod, Angular-Re-Hosting) und den Umstieg Lazy-Loader zu `dist-custom-elements` für React als eigenen, vorziehenden Schritt befestigen oder in Phase 2 integrieren.
- E2E-Abdeckung für das Feature je Adapter in `visual-tests` ergänzen (Transformation aktiviert, alle Elemente unter dem umbenannten Tag funktionsfähig, inklusive intern komponierter Komponenten wie Toaster-Button).

### Phase 1: Core umstellen

- `bootstrap`: `transformTagName` an native `setTagTransformer` delegieren.
- `setCustomTagNames` stilllegen (Funktionskörper entkoppeln, `Kol*Tag`-Konstanten unveränderlich), inklusive Anpassung der Komponenten-Tests, die die Mutation bislang indirekt nutzen.
- `extras.additionalTagTransformers: true` setzen, `extras.tagNameTransform` entfernen.
- Unit-Tests: Transformer nach `bootstrap` setzt Warnung; interner Toaster rendert unter dem transformierten Tag; Selektoren und Styles transformieren mit `additionalTagTransformers`.

### Phase 2: React-Adapter

- Offizielle Targets für `adapters/react` und `adapters/react-v19` aktivieren, Generierung prüfen (`_`-Props, Events, Ref-Verhalten unter `@lit/react`).
- Post-Gen-Codemod für Renderzeit-Auflösung umsetzen und in `build:light`-Pipeline einhängen.
- Umstieg der Registrierung von `defineCustomElements` (Loader) auf die per-Komponente-Definition des Custom-Elements-Outputs; `kolibri-src`-Exports (`createReactRenderElement`, `setTagNameTransformer`) anpassen.
- Samples (`packages/samples/react`), `visual-tests` und React Hook Form Adapter gegen die neuen Pakete laufen lassen; Verbraucher-Migration (`defineCustomElements(window, { transformTagName })` entfällt) im Migration-Guide festhalten.

### Phase 3: Angular-Adapter (v20, v21)

- Offizielles Target generieren lassen, `angular-component-lib`-Vorlagen als KoliBri-eigene Dateien im Components-Paket ablegen, Proxy-Codemod umsetzen, `ng-module.js`-Nachbearbeitung an das neue Generat anpassen (`directivesArrayFile` prüfen).
- Smoke-Test mit `packages/samples/angular` (nur lesen) und einem Angular-20-/21-Sandbox-App-Durchlauf inklusive Transformer.

### Phase 4: Vue-Adapter

- Offizielles Target mit `transformTag: true` und Lazy-Plugin übernehmen; `vue-component-lib` durch die offizielle Runtime ersetzen; `setTagNameTransformer`-Export als Brücke behalten.

### Phase 5: Aufräumen und Publizieren

- Fork-Pakete `@public-ui/stencil-{angular,react,vue}-output-target` als deprecated markieren (Readme-Hinweis auf die offiziellen Pakete), Solid-Fork behalten mit Kommentar im Config-File.
- Doku auf public-ui.github.io: Feature-Seite TagName-Transform auf den neuen Pfad umstellen, `defineCustomElements({ transformTagName })` als entfernt kennzeichnen, Migration-Guide für die App-Umstellung.
- Release-Koordination: Components und alle Adapter in einem Release-Zug ausliefern, da Generierung und Runtime zusammengehören. SemVer: Major für Adapter mit Verhaltensänderung (React-Registrierung), Minor beziehungsweise Patch, wo nur intern wechselt. Kein Komponenten-API-Bruch: `bootstrap({ transformTagName })`, `Kol*Tag`-Exports und `setTagNameTransformer` je Adapter bleiben unverändert.

---

## 5. Risiken und offene Punkte

- **React eager binding:** Gelöst durch Codemod (Abschnitt 3.3). Fällt der Codemod weg, muss die Doku den Import vor der Transformer-Registrierung verlangen, was die heutige Bootstrap-UX bricht.
- **Angular-Postinstall des offiziellen Pfads:** Bewusst nicht übernommen (pnpm, CI, Supply Chain). Falls der Codemod-Ansatz auf Dauer zu pflegeintensiv wird, ist der offizielle Patch-Pfad der dokumentierte Rückfallweg.
- **Registrierungswechsel bei React:** Lazy-Loader hin zu per-Komponenten-Define ändert Ladeverhalten und Bundle-Zuschnitt. Getrennt messen (Bundle-Analyse, Performance-Sample) und gegebenenfalls in einem eigenen Schritt vor Phase 2 ausrollen.
- **`@lit/react`-Semantik:** Props mit Unterstrich-Präfix, Event-Namen und Ref-Weitergabe gegen die goldenen Samples testen; das `className`-Merging der offiziellen Runtime ist neu.
- **Doppeltransformation im Übergang:** Core-Mutation und native Transformation dürfen nie gleichzeitig aktiv sein; Phase 1 und 2 daher nacheinander und mit Tests absichern.
- **Solid und Svelte bleiben Sonderfälle:** Kein offizielles Target beziehungsweise kein Tag-Replacement. Beides ist heute schon so, die Migration verschärft es nicht, muss es aber dokumentieren.
- **Upstream-Kopplung:** Die `transformTag`-Option der Targets ist relativ jung (Angular-Patch-Script, React-eager-Binding). Vor dem Abschluss von Phase 2 bis 4 die verwendeten Minor-Versionen pinnen und Änderungen im Monorepo verfolgen.

## 6. Entscheidungspunkte

1. React: Codemod für Renderzeit-Auflösung (Empfehlung) oder dokumentierter API-Bruch mit Transform-vor-Import?
2. Angular: Runtime-Re-Hosting aus repo-eigenen Vorlagen (Empfehlung) oder offizieller Postinstall-Selektor-Patch?
3. React-Registrierungswechsel (Lazy-Loader zu `dist-custom-elements`): in Phase 2 integrieren oder als separaten, vorlaufenden Schritt?
