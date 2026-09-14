# Working Plan: `refactor/migrate-kol-details-skeleton`

> Companion plan for AI-assisted development. Keep this file updated — every planned or completed
> step on this branch belongs here so another session can pick up seamlessly. Commit plan updates
> together with (or ahead of) the work they describe.

Issue: [#9570](https://github.com/public-ui/kolibri/issues/9570) — Skeleton - Details
Vorbild: [#10652](https://github.com/public-ui/kolibri/pull/10652) (`kol-link`, gemergt `7bcc611`)
und [#10734](https://github.com/public-ui/kolibri/pull/10734) (`kol-button`).
Disziplin: `.claude/skills/zero-visual-delta-handoff/SKILL.md`.

## Ziel

`kol-details` (shadow: true) rendert den neuen `DetailsFC` (`internal/functional-components/details/`)
direkt statt über den Legacy-`KolCollapsibleFc` zu gehen. Öffentliche API byte-identisch zu develop.

**Akzeptanzkriterium: die Migration ist visuell unsichtbar** — null geänderte Snapshot-PNGs gegen
develop (Docker-Check je Theme, Baselines auf Base-Stand).

## Gap-Analyse (Phase 1, abgeschlossen)

| Aspect      | Legacy (develop)                                                                                           | Skeleton (target)                                                                                            | Action                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Inheritance | Standalone Stencil class, `@State() state: DetailsStates` Bag                                              | `BaseWebComponent<DetailsApi>` + `WebComponentInterface<DetailsApi>` + `implements DetailsProps`             | WC neu schreiben (`component.tsx` ersetzt `shadow.tsx`)                       |
| Logic layer | Schema-Validatoren (`validateLabel/Disabled/Open/DetailsCallbacks`, `watchHeadingLevel`) in Watcher        | Prop-Factories in `internal/props/`, Watcher wenden `xxxProp.apply(...)` inline an                           | 2 neue Prop-Dateien (`open.ts`, `details-callbacks.ts`), Rest wiederverwendet |
| Rendering   | Legacy `KolCollapsibleFc` (`functional-components/Collapsible`) → legacy `KolHeadingFc` + `KolButtonWcTag` | Neuer `DetailsFC` (`internal/functional-components/details/`), Root via `BemRootNodeFC(block="kol-details")` | Neuer FC + BEM-Registrierung                                                  |
| State       | `state`-Bag, `_open` als `@Prop({mutable, reflect})`                                                       | Render-Props; `_open` bleibt `@Prop({mutable: true, reflect: true})` (Public-Parität)                        | —                                                                             |
| Methods     | `focus()`/`click()` via `delegateFocus/delegateClick('ctaRef')`                                            | identisch; `ctaRef` kommt als `Refs.headingButton` in den FC                                                 | —                                                                             |
| Tests       | `test/snapshot.spec.tsx` (importiert `../shadow`), `details.e2e.ts`                                        | Import auf `../component`, Public-API-Pin in `_skeleton/public-api.spec.ts`                                  | Update + Pin                                                                  |

### Bewusste Entscheidungen (DOM-Parität)

1. **`DetailsFC` rendert weiterhin `KolButtonWcTag`** (nicht `ButtonFC` direkt). Grund: Zero-Visual-Delta.
   Der Wegfall des `kol-button-wc`-Host-Elements würde die Theme-Selektoren brechen, die auf dem
   Host-Klassenträger sitzen (z. B. ecl `.kol-details__heading-button .kol-button`,
   desy `kol-link('kol-details__heading-button')`, default `.kol-details__heading-button .kol-icon`)
   — die Klasse würde auf dieselbe Ebene wie `.kol-button` rutschen. Außerdem would ButtonFC-direkt
   im SSR einen zusätzlichen `kol-button--normal`-Klassenpfad öffnen (der SSR-Abbruch-Bug in
   `kol-button-wc` ist vorbestehend und dokumentiert, siehe Button-Plan §4). Das Ablösen der
   `kol-button-wc`-Konsumenten ist separat getrackt (Button-Plan §2).
2. **Kein Root-`id`-Attribut mehr** (`id="details-<nonce>"` am Wurzel-`div`): `BemRootNodeFC`
   rendert nur `class`. Die ID war inert (kein CSS-/ARIA-/JS-Bezug; heading/control-IDs werden in
   der WC aus `createUniqueId('details')` via `createRelatedUniqueId` abgeleitet, wie bisher).
   Attribut-Delta ohne Pixel-Delta; Class-ORDER am Root ändert sich accordingly
   (`kol-details collapsible …` statt `collapsible … kol-details`).
3. **Icon bleibt fix `kolicon-chevron-right`** — die Rotation mache CSS (`details/style.scss`,
   Themes). Kein `open ? down : right`-Switch aus dem Legacy-Collapsible (der für details nie griff).
4. **`labelProp` (2–80-Zeichen-Validierung + Hints)** statt Legacy-`validateLabel`:
   Repo-Präzedenz (meter, quote). Deviations: 1-Zeichen-/81+-Zeichen-Labels erzeugen künftig einen
   `devWarning` und fallen auf `''` zurück (Legacy: akzeptiert). Nicht sichtbar im Pixel-Lauf mit
   Sample-Labels; als Verhaltens-Note in die PR-Beschreibung.

## Current state

**DONE (2026-09-14) — implementiert, validiert, pixelgleich, PR erstellt.**

- Branch `refactor/migrate-kol-details-skeleton` angelegt (von develop `d883c6e3e9`).
- Implementierung: `internal/props/{open,details-callbacks}.ts`, `internal/functional-components/
details/{api,component}.tsx`, `components/details/component.tsx` (ersetzt `shadow.tsx`),
  BEM-Registrierung `kol-details` (Type + Runtime, Elemente content/heading/heading-button/
  wrapper/wrapper-animation, Modifier null), Public-API-Pin in `_skeleton/public-api.spec.ts`,
  Test-Import auf `../component` umgestellt.
- `kol-details` bleibt BEM-Root via `BemRootNodeFC`; `headingId`/`controlId` als `States`-Bucket
  (`@State`-Felder der WC, Button-`ariaDescriptionId`-Präzedenz).
- Hydrate-SSR-Snapshot aktualisiert (einziger Delta: Root-`id` entfällt + Root-Class-Reihenfolge).
- **Public-API-Parität verifiziert**: 7/7 `@Prop`/`@Method`-Member byte-identisch zu
  `origin/develop:…/details/shadow.tsx` (Deklaration, Typ, Default, JSDoc, `mutable/reflect`).

## Open work, nach Priorität

1. ~~Implementierung~~ — DONE.
2. **GOAL Zero Visual Delta — ✅ DONE (2026-09-14): alle 6 Pakete 293/293 passed, Exit 0.**
   - `node scripts/snapshots-docker.mjs {default,bwst,ecl,kern,desy,unstyled} --check` → je
     293 passed, 0 failed, Exit 0 (Baselines auf Base-Stand, Ergebnisordner vorher geräumt).
   - `git diff --name-only origin/develop...HEAD -- '*.png' | wc -l` = 0.
   - Stage-1-Stichprobe vorher: `--check -- --grep details` → 4/4 passed.
3. ~~Hydrate-SSR-Snapshot~~ — DONE (2 Einträge: renderToString/streamToString).
4. ~~Public-API-Diff~~ — DONE (identisch).

## Decision points (Owner, nicht eigenmächtig)

- Root-`id`-Drop (siehe Entscheidung 2) — bei Owner-Wunsch leicht wiederherstellbar (manueller Root).
- `labelProp`-Validierungs-Delta (siehe Entscheidung 4).

## Pitfalls

- Jest `newSpecPage` ohne Registrierung von `KolButtonWc` (attachInternals-Crash) — KolDetails-Test
  registriert nur `KolDetails`, der `kol-button-wc`-Stub bleibt inert (wie develop).
- Hydrate-Snapshot testet den letzten Build — Components-Build davor.
- `createRelatedUniqueId('details-<nonce>', 'heading')` → `details-heading-<nonce>` (Nonce-Segment
  wandert nach hinten) — unter Jest ist die Nonce literal `nonce` (Snapshot), in e2e hex (`/-heading-/`-Matcher).

## Validation commands (vor jedem Commit)

```bash
pnpm --filter @public-ui/components format
pnpm --filter @public-ui/components lint
pnpm -r test:unit                                   # NICHT nur --filter components
# DOM-Änderungen zusätzlich:
pnpm --filter @public-ui/components build && pnpm --filter @public-ui/hydrate test:update:unit
node scripts/snapshots-docker.mjs <theme> --check && git diff origin/develop..HEAD -- '*.png'
```
