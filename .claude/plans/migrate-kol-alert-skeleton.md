# Working Plan: `refactor/migrate-kol-alert-skeleton`

> Companion plan für KI-gestützte Entwicklung. Diese Datei aktuell halten — jeder geplante oder
> erledigte Schritt auf diesem Branch gehört hierher, damit eine andere Session nahtlos
> weiterarbeiten kann. Plan-Updates zusammen mit (oder vor) der beschriebenen Arbeit committen.

Issue: [#9562](https://github.com/public-ui/kolibri/issues/9562) — Skeleton - Alert
Vorbild: [#10884](https://github.com/public-ui/kolibri/pull/10884) (`kol-details`, offen),
[#10652](https://github.com/public-ui/kolibri/pull/10652) (`kol-link`), [#10734](`kol-button`).
Anleitung: `.claude/commands/migrate-to-skeleton.md`.

## Ziel

`kol-alert` (shadow: true) und das transitionale `kol-alert-wc` (shadow: false) werden auf die
Skeleton-Architektur migriert: Beide erweitern `BaseWebComponent<AlertApi>` und render den neuen
stateless `AlertFC` (`internal/functional-components/alert/`). Öffentliche API byte-identisch.

**Akzeptanzkriterium: null geänderte Snapshot-PNGs gegen develop** (Docker-Check je Theme).

## Gap-Analyse (Phase 1, abgeschlossen)

| Aspect      | Legacy (develop)                                                                                                 | Skeleton (target)                                                                                 | Action                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Inheritance | `KolAlert` (shadow.tsx, Pass-through-Wrapper) + `KolAlertWc` (component.tsx, shadow:false, State-Bag)            | `KolAlert` (component.tsx) + `KolAlertWc` (wc.tsx), beide `BaseWebComponent<AlertApi>`            | Beide WCs neu schreiben (shadow.tsx → component.tsx Rename wie Details-PR) |
| Logic layer | Schema-Validatoren (`watchBoolean`, `validateAlertType/Variant/HasCloser/Label`, `watchHeadingLevel`)            | Prop-Factories in `internal/props/`, Watcher wenden `xxxProp.apply(...)` inline an                | 5 neue Prop-Dateien, `label`/`level` wiederverwendet                       |
| Rendering   | Legacy `KolAlertFc` (`functional-components/Alert/Alert.tsx`) mit Seiteneffekten im Render (vibrate, setTimeout) | Neuer `AlertFC` stateless, Root via `BemRootNodeFC(block="kol-alert")`; Vibrate/Timeout in die WC | Neuer FC; BEM-Registry `kol-alert` existiert bereits unverändert           |
| Closer      | `KolButtonWcTag` mit `kol-alert__closer kol-close-button`                                                        | bleibt `KolButtonWcTag` (Zero-Visual-Delta: Themes selektieren `.kol-alert__closer .kol-button`)  | unverändert                                                                |
| State       | `state: AlertStates`-Bag, `id="heading"` statisch am Heading                                                     | Render-Props; `headingId` als `States`-Bucket (unique pro Instanz, `createUniqueId('alert')`)     | DOM-Delta ohne Pixel-Delta, dokumentiert                                   |
| Tests       | `test/snapshot.spec.tsx` (importiert `../shadow` + `../component`), `alert.e2e.ts` (getByTestId)                 | Import auf `../component` + `../wc`; E2E auf BEM-Selektoren                                       | Update + Public-API-Pin                                                    |

### Consumer-Radiation (alle geprüft)

| Consumer                                        | nutzt                        | Migration                                                        |
| ----------------------------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| `components/form/shadow.tsx`                    | `KolAlertFc` (class, ref)    | → `AlertFC` direkt (ref/HTML-Attrs via BemRootNodeFC-Forwarding) |
| `functional-components/ToastItem`               | `KolAlertFc` (onCloserClick) | → `AlertFC` direkt (`handleCloserClick`)                         |
| `functional-components/FormFieldMsg`            | `KolAlertFc` (id, …spread)   | → `AlertFC` direkt (id via Rest-Forwarding)                      |
| `components/table-stateless/table-settings.tsx` | `KolAlertWcTag`              | bleibt `KolAlertWcTag` (transitionales wc.tsx, Zero-Delta)       |
| `functional-components/index.ts`                | re-export `KolAlertFc`       | entfernen                                                        |

Kein Theme selektiert `kol-alert-wc` als Vorfahr (grep über alle `packages/themes/*/src`) — der
Wegfall des Elements im Shadow DOM von `kol-alert` ist stilisch sicher. Themes selektieren aber
`.kol-alert__closer .kol-button` (default/bwst) → Closer bleibt `KolButtonWcTag`.

### Bewusste Entscheidungen (DOM-/Verhaltens-Parität)

1. **`AlertFC` rendert den Closer weiterhin als `KolButtonWcTag`** — Theme-Selektoren wie
   `.kol-alert__closer .kol-button` (default) brächen sonst. Ablösen separat getrackt.
2. **`headingId` statt statischem `id="heading"`** — Skeleton-Regel „ARIA-Referenz-IDs unique pro
   Instanz"; fixt echten Doppel-ID-Bug bei mehreren Alerts in einem Shadow-Root (Toast-Container).
   DOM-Delta (Snapshot-Update), kein Pixel-Delta.
3. **`data-testid="alert"`/`"alert-close-button"` entfallen** — Skeleton-Konvention (keine
   testids im Markup, BEM-Selektoren in Tests). `alert.e2e.ts` + `e2e/input-msg.ts` stellen um
   (`.kol-alert__closer button`, `.kol-form-field__msg`).
4. **Vibrate + 10s-Timeout wandern aus dem FC in die WC** (`watchAlert`): FC wird stateless.
   Direkte FC-Konsumenten (ToastItem, FormFieldMsg, form) führen die Seiteneffekte künftig nicht
   aus — für ToastItem war das Timeout ein No-op (kein `onAlertTimeout`), Vibrate nur bei
   Grobzeiger + User-Geste. Legacy-FC hatte selbst `@todo Move side-effect out of render-function`.
5. **`labelProp` (2–80-Zeichen + Hints)** statt Legacy-`validateLabel` (beliebiger String):
   Repo-Präzedenz (details-PR, Entscheidung 4). Deviation: 1-Zeichen-/81+-Zeichen-Labels erzeugen
   künftig `devWarning` und fallen auf `''` zurück.
6. **`kol-alert-wc` bleibt** als transitionales `wc.tsx` (shadow:false) für `table-settings` —
   Button-Precedent (`button/wc.tsx`). Löschen, wenn alle Konsumenten migriert sind.
7. **`BemRootNodeFC` forwardet zukünftig Rest-HTML-Attribute + `ref` auf das Root-Div** —
   notwendig, damit `form` (ref), `FormFieldMsg` (id) und ToastItem (class) das FC ohne
   DOM-Verlust nutzen können. Additiv, rückwärtskompatibel.

## Umsetzungsplan

1. ~~Props~~ — `internal/props/{alert,alert-callbacks,alert-type,alert-variant,has-closer}.ts` + `index.ts`-Export.
2. ~~FC~~ — `internal/functional-components/alert/{api,component}.tsx`; BemRootNodeFC-Attribut-Forwarding.
3. ~~WCs~~ — `components/alert/component.tsx` (KolAlert, Rename von shadow.tsx) + `components/alert/wc.tsx` (KolAlertWc).
4. ~~Consumer~~ — form, ToastItem, FormFieldMsg auf AlertFC; functional-components/index.ts aufräumen.
5. ~~Aufräumen~~ — Legacy-FC `functional-components/Alert/` löschen (AlertIcon bleibt!), component-list.ts, Schema-Dead-Code-Check.
6. ~~Tests~~ — snapshot.spec.tsx, ToastItem/FormFieldMsg-Snapshots, public-api.spec.ts-Pin, e2e-Updates.
7. ~~Validierung~~ — format, lint, unit, hydrate-Snapshots, Docker-Pixel-Check.

## Validation commands (vor jedem Commit)

```bash
pnpm --filter @public-ui/components format
pnpm --filter @public-ui/components lint
pnpm -r test:unit
# DOM-Änderungen zusätzlich:
pnpm --filter @public-ui/components build && pnpm --filter @public-ui/hydrate test:update:unit
node scripts/snapshots-docker.mjs <theme> --check && git diff origin/develop..HEAD -- '*.png'
```

## Current state

**DONE (2026-09-14) — implementiert, validiert.**

- Branch auf `origin/develop` (f082d27f0b) basiert; anfänglich versehentlich auf dem lokalen
  Accordion-Branch aufgesetzt, per stash auf develop umgezogen und die 3 Konfliktdateien
  (public-api.spec.ts, component-list.ts, props/index.ts) händisch aufgelöst (nur Alert-Anteile).
- Umsetzung: `internal/props/{alert,alert-type,alert-variant,has-closer}.ts` (KEIN
  alert-callbacks — `_on` bleibt wie bei button/_value als roher `@Prop`, da nicht gerendert),
  `internal/functional-components/alert/{api,component,icon}.tsx` (AlertIcon aus
  functional-components/AlertIcon migriert), `components/alert/component.tsx` (KolAlert, Rename
  von shadow.tsx) + `components/alert/wc.tsx` (transitional KolAlertWc, shadow:false),
  BemRootNodeFC forwardet jetzt Rest-HTML-Attribute + ref aufs Root-Div.
- Consumer: form, ToastItem, FormFieldMsg rendern AlertFC direkt (FormFieldMsg + FormField:
  HTMLAttributes<HTMLDivElement> → <HTMLElement> wegen ref-Varianz); table-settings bleibt an
  KolAlertWcTag (transitional); functional-components/index.ts: KolAlertFc-Export entfernt.
- Tests: alert-snapshots (71) + ToastItem/FormFieldMsg/FormField regeneriert, public-api-Pin
  (7 Props, keine Methoden), alert.e2e.ts + e2e/input-msg.ts auf BEM-Selektoren umgestellt
  (`.kol-alert__closer button`, `.kol-form-field__msg`), hydrate-SSR-Snapshots aktualisiert
  (einziger DOM-Delta: kein kol-alert-wc-Wrapper mehr im kol-alert-Shadow, `id`/`aria-describedby`
  → `alert-heading-nonce`, data-testid entfallen).
- Validierung: prettier ✓, lint (eslint+stylelint+tsc) ✓, `pnpm -r test:unit` ✓ (components 950,
  hydrate 102, themes 131, adapters 45, cli 7).

## Open work

1. ~~Zero-Visual-Delta~~ — ✅ DONE (2026-09-15): alle 6 Themes einzeln gegen den Docker-Check
   verifiziert, je Exit 0 — `default`/`bwst`/`kern`/`desy` (`--grep alert` 5/5, `--grep card`
   11/11 je Theme), `ecl` (voller Lauf 297/297), `unstyled` (voller Lauf 297/297). Details der
   dabei gefundenen und behobenen Card-/Alert-Closer-Regressionen in Nachtrag 4.
2. ~~Push~~ — ✅ DONE: Rebase auf develop-Tip 5d733fe286 + alle Fix-Commits auf
   `origin/refactor/migrate-kol-alert-skeleton` (PR #10895) gepusht.
3. ~~CI~~ — ✅ DONE (2026-09-15): alle 20 Checks grün nach dem Fix-Push, inkl. `Visual Review:
No visual changes` (unabhängige Bestätigung des Docker-Checks über alle 6 Themes),
   `build-and-check`, `e2e-tests`. PR mergeable, keine Konflikte.
4. Issue #9562 Status Review: gh-Token ohne project-Scopes, OAuth-Geräte-Flow 2× ohne
   Nutzer-Bestätigung abgelaufen — manueller Schritt beim Owner offen.
5. PR #10895 ist noch **Draft** — Undraften (`gh pr ready 10895`) wurde vom Auto-Mode-Classifier
   als externer Schreibzugriff blockiert; Owner muss das manuell im PR oder mit `gh pr ready 10895`
   ausführen, sobald er den finalen Stand für review-reif hält.
6. PR #10895 ist noch **Draft** — Owner-Entscheidung, ob er auf Ready for Review gestellt wird.

## Nachtrag (2026-09-15): Closer auf ButtonFC direkt (Owner-Entscheidung)

Der Owner hat die Entscheidung 1 („Closer bleibt kol-button-wc") übersteuert: **AlertFC rendert
ButtonFC direkt**, `kol-button` + `kol-alert__closer` liegen auf demselben Element.

- AlertApi: + Refs {closerButton, closerTooltip}, + State closerAriaDescriptionId; Callback
  closerClick bekommt MouseEvent (stopPropagation wie der alte kol-button-wc-Handler).
- KolAlert/KolAlertWc komponieren TooltipBehavior für den Closer (componentWillLoad /
  componentDidRender syncListeners / disconnectedCallback destroy, hideTooltip beim Klick).
- **ButtonFC forwardet jetzt das eingehende `class`** auf seinen BemRootNodeFC-Root (BemRootNodeFC-
  Vertrag; ohne class-Übergabe unverändert) — ohne das würden dem Closer die Klassen verloren gehen.
- Theme-Migration: default/bwst/desy/ecl-ec/ecl-eu-Alert-Mixins — frühere
  `.kol-alert__closer .kol-button`-Nachfahre-Regeln zielen jetzt auf den Closer selbst;
  Button-Mixins (default/bwst/ecl-ec/desy) nutzen `:is()`-Union (Compound + Nachfahre), weil
  kol-card den Closer weiterhin als kol-button-wc rendert.
- ToastItem: Closer-Tooltip-Verhalten entfällt (FC ohne Lifecycle; Toast deprecated, #8372);
  refs/noop + nonce() ergänzt. form/FormFieldMsg: noop-refs (hasCloser=false).
- Neu: Snapshot-Case „closer as a single ButtonFC root". 951 Unit-Tests grün, Stylelint grün.
- Arbeitete im separaten Worktree `/Users/moppitz/Workspace/kolibri-alert`, weil eine parallele
  Session den Hauptbaum auf dem Breadcrumb-Branch belegt hielt.

## Nachtrag 2 (2026-09-15): kol-card ebenfalls auf ButtonFC (Owner-Anweisung)

„Ersetze hier bitte auch kol-button-wc mit ButtonFC" bezog sich auf den zweiten
`kol-close-button`-Renderer: `components/card/component.tsx` (KolCardWc, shadow:false, legacy).

- KolCardWc komponiert TooltipBehavior wie die Alert-WCs (stateLess-StateAccess — die Card hat
  kein eigenes Render-Props-System); `handleCloserClick` stopPropagation + hideTooltip +
  bestehendes `close()` (onClose + KolEvent.close). `on`-Bag für KolButtonWcTag entfällt.
- **ButtonFC forwardet jetzt generisch Rest-HTML-Attribute** (analog BemRootNodeFC) — braucht
  für `data-testid="card-close-button"`. `on`/`tooltipAlign` werden destrukturiert und per
  `void` konsumiert, damit sie nicht als DOM-Attribute durchs Rest-Spreading lecken.
- Theme-Selektoren auf Compound-only zurückgebaut (kein kol-button-wc-Closer mehr):
  default/bwst/ecl-ec `&:is(.#{$block-classname}--normal)`, desy
  `.kol-close-button:is(.kol-button--normal)`; desy drawer `&__close-button:is(.kol-button)`;
  kern card wendet `ghostButton()` direkt auf `&__close-button` an.
- Card-Snapshots (7) regeneriert: Ziel-DOM
  `kol-button kol-button--hide-label kol-button--normal kol-button--standalone
kol-card__close-button kol-close-button`. hydrate 102 grün (Badge-Fehler zuvor war stale
  Components-dist, nicht real).
- Rebase auf develop-Tip c760252b1f (#10750 Button-Refactor) — Konflikt nur in
  public-api.spec.ts (Sources-Liste + describe-Blöcke, union aufgelöst). Danach 962 Unit-Tests
  grün, lint grün. Vor dem Rebase: develop fetchen und prüfen, ob Kopf gewandert ist (#10750
  änderte button/api + button/wc + Themes — glücklicherweise nur additive Typen).

## Nachtrag 3 (2026-09-15, abends): Rebase auf develop 5d733fe286 + erster Fix-Commit

Owner bat, den Branch auf den aktuellen develop-Stand zu rebasen und die PR-Konflikte
(mergeStateStatus DIRTY) aufzulösen:

- Rebase von c760252b1f auf 5d733fe286 (develop inkl. gemergtem Breadcrumb-PR #10902); neue SHAs
  292d4db770 / e55e958f65 statt der alten 7a0c2f97d4 / d34236c442. Konflikte: `public-api.spec.ts`
  (Sources-Liste + describe-Blöcke, Union aus Alert- und Breadcrumb-Anteil) und
  `internal/functional-components/button/component.tsx` (nur ein zusätzlicher Kommentar
  stromaufwärts, Code identisch — HEAD-Version behalten).
- Docker-Zero-Delta-Check (Stichprobe `--grep alert`) deckte zwei echte, durch den ButtonFC-Closer-
  Umbau (Nachtrag 2) verursachte Regressionen auf, die die vorherige CI-Validierung nicht erfasst
  hatte (die lief nur gegen den älteren develop-Stand vor dem Rebase):
  1. **Farb-Spezifitäts-Kollision**: `.kol-alert__closer .kol-alert--variant-msg & .kol-button`
     (3 Klassen) wurde durch den DOM-Merge zu `.kol-alert--variant-msg .kol-alert__closer`
     (2 Klassen) — Tie mit `.kol-close-button:is(.kol-button--normal)` in button.scss, gewinnt je
     nach Quellreihenfolge. Fix: `&.kol-button` ergänzt, restauriert 3-Klassen-Spezifität
     (default, bwst, desy als `--text-color`-Override).
  2. **Grid-Row-Stretch**: Ein `display:flex`-Closer als mehrzeilig spannendes Grid-Item stretcht
     in Firefox trotz `align-self: self-start` auf die volle Zeilenhöhe des Grid-Bereichs
     (inkl. row-gap) statt auf seine eigene Content-Höhe — Legacy (`display:block`) tat das nicht.
     Fix: explizite `height: var(--a11y-min-size)` auf den Closer, aber **nur** in den Themes, die
     `align-self: self-start` für `.kol-close-button` deklarieren (default, bwst, ecl-ec); Details
     und die Themes, die das NICHT brauchen, in Nachtrag 4.
     Fix-Commit `be211d0b19`, Formatierungs-Nachzieh `a6dc87507e`. Diese Session hatte zwischenzeitlich
     neu committet und force-gepusht (`git push --force-with-lease`), nachdem ein `git pull` der
     Remote einen unnötigen Divergenz-Merge erzeugt hatte (`git merge --abort`, lokaler Zweig war
     Superset).
- Validierung nach diesen Commits: prettier ✓, `pnpm -r test:unit` ✓ (components 969
  Tests/777 Snapshots), eslint+tsc ✓, Stylelint alle Themes ✓. Docker-Zero-Delta war zu diesem
  Zeitpunkt noch nicht vollständig durchlaufen — siehe Nachtrag 4.

## Nachtrag 4 (2026-09-15, spät): Card-Variant-Fix korrigiert, alle 6 Themes grün

Der `height: var(--a11y-min-size)`-Fix aus Nachtrag 3 war zu pauschal: er wurde auf **alle** fünf
von `kol-close-button` betroffenen Themes angewendet (default, bwst, ecl-ec, desy, kern), obwohl
nur drei davon das Problem tatsächlich haben.

- **Ursache präzisiert**: Nur Themes mit `align-self: self-start` auf `.kol-close-button`
  (default, bwst, ecl-ec) leiden unter dem Grid-Row-Stretch-Bug — bei ihnen ignoriert Firefox
  `self-start` für den `display:flex`-Closer und stretcht ihn auf die volle (inkl. row-gap)
  Zeilenhöhe; `height` fest zu setzen repariert das (Legacy-Wert 44px in jedem Sample-Breakpoint
  bestätigt, inkl. 320px-Reflow).
- **desy und kern haben `align-self: self-start` nie deklariert** — ihr Closer stretcht schon
  immer über `align-items: stretch` (Grid-Default) auf die reale Zeilenhöhe, exakt wie das Legacy-
  `kol-button-wc` (baseline-verifiziert: 44px bei normaler Breite, 78px bei 320px-Reflow mit
  3-zeilig umgebrochener Card-Headline — beides korrektes Stretch-Verhalten, kein Bug). Der in
  Nachtrag 3 für diese beiden Themes gesetzte `height`-Fix (plus ein versehentlich für desy
  ergänztes `align-self: start`) hat dieses gewollte Stretchen unterbunden und brach
  `card-basic--basic-320` (Diff durch reproduzierbaren `--grep probe`-DOM-Vergleich gegen den
  develop-Baseline-Worktree `/Users/moppitz/Workspace/kolibri-baseline` bzw. dessen Docker-Volume
  `kolibri-vt-develop` gefunden) — beide Overrides für desy/kern wieder entfernt.
- **desy-Alert zusätzlich**: `#{$root}__closer` (absolut positioniert) hatte kein `top` gesetzt und
  verließ sich auf die statische Positionsberechnung — bei einem `display:flex`-Closer löst diese
  in Firefox anders auf als bei `display:block` (20px Versatz, wenn eine Überschrift vorausgeht,
  matching der Headline-Höhe). Legacy löste in beiden Fällen zu `top:0` auf; jetzt explizit
  `top: 0` gesetzt statt sich auf `auto` zu verlassen.
- **Diagnose-Methode**: `probe.spec.js` (temporär, nie committet) mit `getComputedStyle` +
  `getBoundingClientRect` über alle Shadow-Roots hinweg, parallel gegen den Branch-Container
  (`kolibri-visual-tests-work`) und einen zweiten, aus dem develop-Tip aufgebauten Baseline-
  Container (`kolibri-vt-develop`) gefahren — Zahlen statt Vermutung, siehe
  [[zero-visual-delta-handoff]] Diagnose-Goldweg.
- **Evidenz**: je Theme einzeln (nicht kombiniert — parallele `snapshots-docker.mjs`-Aufrufe auf
  demselben Volume erzeugen Build-Race-Conditions, siehe Pitfalls) `--grep alert` und
  `--grep card` grün (default/bwst/kern/desy: 5/5 bzw. 11/11); `ecl` und `unstyled` unterstützen
  kein `--grep` (eigener Test-Runner-Wrapper) → je ein voller Lauf, 297/297 passed, Exit 0.
- Fix-Commit folgt in dieser Session (siehe Current state).

## Pitfalls

- Jest-Snapshot serialisiert `class` alphabetisch — Klassenreihenfolge ist kein Regressions Signal.
- `newSpecPage` braucht Registrierung beider WCs (`KolAlert`, `KolAlertWc`) wie bisher.
- Nonce unter Jest literal `nonce`, im Browser hex.
- ToastItem/FormFieldMsg müssen JEDE FC-Prop übergeben (StrictFields-Vertrag, pitfall #9).
- snapshots-docker.mjs: `-- --grep "a|b"` bricht — das `|` überlebt die verschachtelte Shell-
  Quoting-Kette nicht (`/bin/sh: a: not found`). Specs einzeln greppen.
- snapshots-docker.mjs: Theme-Snapshot-Baselines sind git-ignored — ein lokales `--check` ohne
  vorher generierte Baselines failt mit „A snapshot doesn't exist … writing actual" (KEIN
  Pixel-Delta!). Lokale Zero-Delta-Prüfung nur gegen frisch aus develop generierte Baselines.
  (Seit db58c1189f wählt das Skript die Baseline über die neue Artefakt-API automatisch nach
  Commit-Abstammung — kein manuelles `git checkout origin/develop -- <snapshots>` mehr nötig.)
- Docker-Volume `kolibri-visual-tests-work`: root-gehörige Reste (durch --user-0-Läufe) blockieren
  mirror-dir mit EACCES → `docker run --rm --user 0 -v kolibri-visual-tests-work:/work alpine
sh -c 'find /work/repo -user 0 -exec chown 1001:1001 {} +'`.
- Nach Component-Markup-Änderungen: components dist neu bauen, BEVOR hydrate-Tests laufen —
  sonst rendern die hydrate-Specs gegen stale dist (falscher „Snapshot didn't match").
- **Nie zwei `snapshots-docker.mjs`-Aufrufe parallel gegen dasselbe Volume** (`kolibri-visual-
tests-work`): Beide bauen `@public-ui/components` im selben `/work/repo`, ein zweiter Lauf
  räumt/baut mitten in den Dateien des ersten → `ENOENT`/`mkdir: File exists`/fehlende Module.
  Immer sequenziell fahren, auch über mehrere Themes hinweg (`default bwst kern desy` in einem
  Aufruf ist ok, ein zweiter _gleichzeitiger_ Aufruf auf einem anderen Theme nicht) und vor dem
  nächsten Lauf mit `pgrep -f snapshots-docker.mjs` prüfen, ob noch einer läuft (auch von einer
  vorherigen, unterbrochenen Session — Prozesse überleben einen Session-Reset).
- `align-self: self-start` verhindert bei einem `display:flex`-Element, das als Grid-Item über
  mehrere Tracks (inkl. row-gap) spannt, in Firefox NICHT zuverlässig das Stretchen auf die volle
  Track-Höhe — nur eine explizite `height` reproduziert die alte (`display:block`) Größe. Das gilt
  nur für Themes, die dieses `align-self` überhaupt deklarieren; Themes ohne das Property
  stretchen bereits vorher (Default-Verhalten) und brauchen keinen `height`-Fix — den trotzdem zu
  setzen bricht das gewollte Stretchen bei größeren Zeilen (z. B. 320px-Reflow mit umgebrochener
  Headline). Vor jedem `align-self`/`height`-Fix erst grep: hat das Theme die Regel überhaupt?
- Absolut positionierte Elemente ohne explizites `top`/`left` verlassen sich auf die statische
  Positionsberechnung — die unterscheidet sich in Firefox zwischen `display:flex`- und
  `display:block`-Elementen, wenn vorausgehende Geschwister unterschiedliche Höhen haben (z. B.
  Closer nach optionaler Überschrift). Explizit `top: 0` (o. ä.) setzen statt auf `auto` zu bauen.
