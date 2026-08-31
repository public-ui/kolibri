# Working Plan: `claude/kol-button-skeleton-migration-dzkuid`

> Companion-Plan für KI-gestützte Entwicklung. Diese Datei aktuell halten — jeder geplante oder
> erledigte Schritt auf diesem Branch gehört hierher, damit eine neue Session nahtlos übernehmen
> kann. Plan-Updates zusammen mit (oder vor) der beschriebenen Arbeit committen.

PR: [#10734](https://github.com/public-ui/kolibri/pull/10734) (Draft)
Vorbild: [#10652](https://github.com/public-ui/kolibri/pull/10652) — `kol-link`, gemergt als
`7bcc611`.

## Ziel

`kol-button` (shadow: true) rendert `ButtonFC` direkt. Der transitional Wrapper `kol-button-wc`
(`packages/components/src/components/button/wc.tsx`) existiert nur noch für Legacy-Konsumenten, die
die inneren `.kol-button*`-Klassen aus ihren eigenen Stylesheets stylen. Sobald jeder Konsument
`ButtonFC` selbst rendert, wird `wc.tsx` gelöscht.

Architektur-Spec: `packages/components/src/components/_skeleton/ARC42.md` (führend).

**Akzeptanzkriterium: die Migration ist visuell unsichtbar** — null geänderte Snapshot-PNGs gegen
develop, siehe „Offene Arbeit / 1".

## Abgrenzung zur Link-Migration — die wichtigste Lehre

Der Link-PR umfasste 125 Dateien. Sein **gesamter SCSS-Anteil** (2 Shared-Mixins + 7 Theme-Pakete,
13 Iterationsrunden, 127 PNG-Diffs) geht auf **eine** Entscheidung zurück: `LinkFC` wurde in
`BemRootNodeFC` gewickelt, aus `<a class="kol-link">` wurde
`<div class="kol-link"><a class="kol-link__anchor">`. Jeder SCSS-Hunk dreht sich um `__anchor`;
**kein einziger** betrifft das Entfernen des `<kol-link-wc>`-Elements aus dem Shadow-Root.

`ButtonFC` macht das bewusst **nicht**: semantische Wurzel bleibt `<button class="kol-button">`, die
BEM-Klasse wird mit `bem.forBlock('kol-button')` gebaut. ARC42 § _„When not to use it"_ deckt genau
diesen Fall ab. Folge: der Button-PR ändert **keine SCSS-Zeile**.

Zusätzliches Argument gegen ein `kol-button__button`: der Link-PR hat den Theme-Mixins gerade erst
`$anchor-scoped: false` verpasst — mit der Begründung, dass das **Button-DOM kein `__anchor` hat**
(`themes/{desy,ecl,kern}/.../{nav,split-button,button-link,details}.scss`). Ein Anker-Wrapper im
Button würde diese frisch gebaute Unterscheidung entwerten.

**Merksatz für die nächsten Migrationen:** `BemRootNodeFC` nur dort, wo die semantische Wurzel
tatsächlich ein `<div>` ist. Bei interaktiven Wurzelelementen (`<button>`, `<a>`) kostet der Wrapper
mehr Theme-Arbeit, als er an Struktur bringt.

## Aktueller Stand

Alles im Commit `refactor(button): migrate KolButton to the skeleton architecture` plus den
Nachbesserungen aus dem Link-Review-Abgleich:

- **Props:** neu `aria-has-popup`, `aria-selected`, `button-callbacks`, `button-type`;
  wiederverwendet access-key, aria-controls, aria-description, aria-expanded, custom-class,
  disabled, hide-label, id, inline, label-with-expert-slot, link-role, name, short-key, span-icons,
  tab-index, tooltip-align, variant.
- **API/FC:** `internal/functional-components/button/{api.tsx,component.tsx}`;
  `buttonPropsConfig` → `ButtonApi` via `ApiFromConfig`; `ButtonWebComponentInterface` blendet
  `watchAriaHasPopup`/`watchId`/`watchTabIndex` aus, weil `kol-button` diese Props nicht öffentlich
  führt.
- **BEM:** Block `kol-button` in Typ **und** Runtime-Const von `schema/bem-registry.ts` registriert
  (Elemente `text`, `tooltip`; Modifier `disabled`, `hide-label`, `inline`, `standalone`).
- **WCs:** `button/component.tsx` = `kol-button` (shadow), `button/wc.tsx` = `kol-button-wc`
  (shadow: false, transitional), `button/shadow.tsx` gelöscht → Dateilayout wie `components/link/`.
- **Public API:** für beide Elemente byte-identisch zu develop, verifiziert mit dem Extraktor des
  Contract-Tests; gepinnt in `_skeleton/public-api.spec.ts` (dort jetzt nach Komponenten-Verzeichnis
  parametrisiert).
- **Nachbesserungen aus dem Link-Review:** `watchTabIndex` in `wc.tsx` setzt beim Unset wieder
  zurück (Link-Finding #3); die Normalizer von `aria-expanded`, `aria-selected`, `aria-has-popup`
  und `link-role` werfen bei ungültigen Werten, statt still auf `''` zu degradieren, sodass die
  Prop-Factory ein `devWarning` loggt (Link-Finding #6 / Issue #10719).
- **Hydrate-SSR-Snapshot** aktualisiert (der `kol-button`-Eintrag enthielt den `kol-button-wc`-Wrapper).

## Offene Arbeit, nach Priorität

### 1. GOAL: Zero Visual Delta — **noch nicht verifiziert**

Disziplin und Werkzeuge: `.claude/skills/zero-visual-delta-handoff/SKILL.md`.

```bash
node scripts/snapshots-docker.mjs <theme> --check     # je Theme, ca. 6 min
git diff origin/develop..HEAD -- '*.png'              # muss leer sein
```

Themes: default, bwst, ecl, kern, desy (+ unstyled). **„CI grün" ist kein Nachweis** — die
Snapshot-Workflows committen neue Baselines und werden dadurch selbst grün.

Erwartung: null Diffs. Begründung: alle Theme-Selektoren adressieren `.kol-button` (Klasse) und das
Button-DOM ist unverändert; die einzige DOM-Änderung ist das entfallene `<kol-button-wc>`-Element im
Shadow-Root von `kol-button`, und genau diese Art Änderung verursachte im Link-PR nachweislich null
SCSS-Anpassungen.

Restrisiko, falls doch Diffs auftauchen: aus
`host(inline-block) > kol-button-wc(inline) > button(flex, height:100%)` wurde
`host(inline-block) > button(flex, height:100%)`. Erst dort suchen (Block-in-Inline-Splitting,
Auflösung von `height: 100%`), bevor irgendetwas anderes verdächtigt wird.

Wurde in der Erst-Session nicht ausgeführt: kein Docker-Daemon verfügbar.

### 2. Konsumenten-Migration weg von `kol-button-wc` (der strategische Schritt)

Erst danach kann `wc.tsx` gelöscht und damit das ~350-Zeilen-Duplikat zwischen `component.tsx` und
`wc.tsx` aufgelöst werden (Link-Finding #4, dort bewusst nicht in-PR gelöst).

Konsumenten heute: accordion, badge, button-link, details, input-file, pagination, popover-button,
split-button, tabs, `mixins/kol-table-settings-wc`, `functional-components/Button` (→ IconButton).
Das sind deutlich mehr als bei `kol-link-wc` — der Wrapper lebt entsprechend länger, das
Duplikat-Argument „löst sich bald von selbst" trägt hier schwächer.

### 3. Entscheidungspunkte (brauchen Owner-Entscheidung, nicht eigenmächtig umsetzen)

- **`_customClass`-Gating** (Issue #10720, nennt button explizit). `LinkFC` gated auf
  `variant.includes('custom')`, `ButtonFC` behält bewusst das unbedingte Legacy-Verhalten.
  Blocker für ein Angleichen: **`kol-pagination` hat gar kein `_variant`-Prop**, nur `_customClass`
  — dessen JSDoc behauptet die dort nie erfüllbare `_variant="custom"`-Bedingung. Gaten würde
  `_customClass` an `kol-pagination` (und via `table-stateful`) still wirkungslos machen. Die
  Alternativen: `_variant` an pagination öffentlich nachrüsten (API-Wachstum an einer zweiten
  Komponente) oder `_variant="custom"` hart mitsenden (Verlust von `kol-button--normal` an den
  Pagination-Buttons). Entschieden am 2026-08-31: **nicht gaten**, Dokumentation statt Verhalten.
- **`ButtonStates` / `ButtonAPI`** in `schema/components/button.ts` sind seit der Migration
  unreferenziert — wie `LinkStates`/`LinkAPI` nach dem Link-PR. Bewusst stehen gelassen, weil sie
  Teil der publizierten Typfläche sind; Entfernen ist ein separater Breaking Change.
- **`_role` auf `kol-button`**: war deklariert, wurde aber nie an das innere Element durchgereicht,
  also wirkungslos. Jetzt verdrahtet. Bei `kol-link` hat der Owner stattdessen entschieden, `_role`
  aus der Public API zu entfernen („keine public role, nur an der FC"). Ob button denselben Weg
  gehen soll, ist offen.

### 4. Vorbestehender SSR-Bug: `componentWillLoad` bricht bei `shadow: false` still ab

Beim Aktualisieren des Hydrate-Snapshots entdeckt, **nicht** von dieser Migration verursacht.

Ablauf: Bei einer `shadow: false`-Komponente ist `@Element()` im Konstruktor der
Hydrate-/SSR-Laufzeit **noch nicht** befüllt (im Browser schon). `AssociatedInputController`
bekommt damit `host === undefined` und wirft in `attachInternals(undefined)`
(`TypeError: Cannot read properties of undefined (reading 'attachInternals')`). Die
Controller-Zuweisung ist die letzte Anweisung im Konstruktor, also bleibt das Feld `undefined`.
`componentWillLoad` ruft später `watchName` → `this.associatedController.validateName(…)` → wirft
erneut; Stencils `safeCall` schluckt den Fehler und rendert trotzdem. Alle Watcher **nach**
`watchName` laufen nie.

Beweis, dass das auf develop genauso ist: im Legacy-Hydrate-Snapshot hat der Accordion-Button
`class="kol-button kol-button--standalone"` — **ohne** `kol-button--normal`, obwohl ein
eigenständiges `kol-button` die Variante bekommt. `validateVariant` stand im Legacy-Code
ebenfalls hinter `validateName`.

Warum es jetzt auffiel: Legacy hatte für `_tabIndex` keinen State-Default, der Skeleton-Config
hat `tabIndexProp` mit Default `0`. Derselbe Abbruch produzierte damit plötzlich ein sichtbares
`tabindex="0"` an jedem `kol-button-wc` im SSR.

Betrifft **jede** `shadow: false`-Komponente mit `AssociatedInputController` — nicht nur button.
Nur SSR/Hydrate, im Browser tritt es nicht auf.

Naheliegender Fix (eigener PR, **nicht** hier): `attachInternals` gegen ein undefiniertes Element
absichern bzw. den Controller lazy erzeugen. Achtung — das repariert auch den Abbruch, wodurch
`_on`, `_role`, `_shortKey`, `_tooltipAlign`, `_type`, `_value` und `_variant` an allen
`kol-button-wc`-Instanzen erstmals wirksam werden. Das ist ein **sichtbares** Delta (u. a. neue
Varianten-Klassen an accordion/details/input-file/popover-button) und braucht den
Zero-Visual-Delta-Lauf plus Owner-Freigabe.

### 5. Verhaltenstests (Link-Finding #10, dort „teilweise")

Fehlen weiterhin: tabIndex-Reset am `wc`, ungültiges `_role`/`_ariaExpanded` (jetzt mit
`devWarning` — testbar), `_customClass` + `_variant="custom"`. Playwright/Interaction-Tests waren
für die Erst-Session ausdrücklich ausgeklammert.

## Pitfalls

- **Nur `@public-ui/components` zu testen reicht nicht.** Der SSR-Snapshot
  `packages/adapters/hydrate/test/__snapshots__/components.spec.js.mocha-snapshot` pinnt das
  gerenderte Shadow-DOM und wird von jeder DOM-Änderung getroffen. CI läuft `pnpm -r test:unit`.
  Der Link-PR ist in dieselbe Falle gelaufen („Latenter Folgefehler: hydrate-Snapshot ist veraltet").
- **`WebComponentInterface<Api>` verlangt einen Watcher pro Prop im Config.** Weil `kol-button` drei
  interne Props des Wrappers nicht führt, wird das Interface per `Omit` verengt
  (`ButtonWebComponentInterface`). Bei `kol-link` fehlt dieselbe Verengung — dort meldet TS den
  Verstoß aus unklarem Grund nicht, `KolLink` erfüllt `WebComponentInterface<LinkApi>` faktisch
  nicht. Nicht als Vorbild nehmen.
- **Prop-Defaults, die im Wrapper hingen.** `_variant` bezog seinen Default
  (`getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal'`) vom `@Prop`-Default des inneren
  `kol-button-wc`. Da `kol-button` jetzt selbst rendert, liegt der Fallback in dessen Watcher — als
  Fallback, nicht als `@Prop`-Default, damit die deklarierte API (und damit
  `custom-elements.json`) identisch zu develop bleibt. Der Flag ist über das Element theme-scoped;
  im Watcher ist `this.host` gesetzt, im Prop-Initializer nicht zwingend. Im Repo registriert kein
  Theme `buttonVariantDefault`, der Unterschied ist hier also inert.
- **`AssociatedInputController` ist Pre-Skeleton.** Er erwartet ein
  `Generic.Element.Component` (mutable `state`-Bag). Der WC übergibt ihm deshalb einen minimalen
  Adapter (`formAssociation`) statt sich selbst.
- **SSR-Abbruch in `componentWillLoad` bei `shadow: false` (vorbestehender Bug, siehe unten).**
  `componentWillLoad` kann mittendrin abbrechen, ohne dass irgendwer es merkt. Alles, was danach
  im Watcher-Block steht, behält dann seinen Config-Default. Deshalb wird `tabIndex` in **beiden**
  WCs direkt nach `initRenderProps` auf „unset" gesetzt und nicht erst vom Watcher — sonst leckt
  der Config-Default `0` als `tabindex="0"` in den SSR-Output.
- **`_value` und `_syncValueBySelector` gehören bewusst nicht in den Props-Config.** Beide werden
  nicht gerendert und sind opake Durchreichungen an den Controller.
- **`.kol-button-wc` in `themes/{default,bwst}/src/components/tabs.scss`** ist ein _Klassen_-Selektor
  und matcht nichts (tabs setzt keine solche Klasse). Vorbestehend tot, nicht von dieser Migration
  verursacht.

## Validierungskommandos (vor jedem Commit)

```bash
pnpm --filter @public-ui/components format
pnpm --filter @public-ui/components lint            # eslint + stylelint + tsc + i18n
pnpm -r test:unit                                   # NICHT nur --filter components (siehe Pitfalls)
pnpm unused

# DOM-/Struktur-Änderungen zusätzlich:
pnpm --filter @public-ui/hydrate build:deps && pnpm --filter @public-ui/hydrate test:unit
node scripts/snapshots-docker.mjs <theme> --check && git diff origin/develop..HEAD -- '*.png'
```
