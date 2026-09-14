# Working Plan: `refactor/migrate-kol-accordion-skeleton`

> Companion plan for AI-assisted development. Keep this file updated — every planned or completed
> step on this branch belongs here so another session can pick up seamlessly. Commit plan updates
> together with (or ahead of) the work they describe.

Issue: [#9561](https://github.com/public-ui/kolibri/issues/9561) — Skeleton - Accordion
PR: [#10886](https://github.com/public-ui/kolibri/pull/10886) — **gestapelt auf** [#10884](https://github.com/public-ui/kolibri/pull/10884) (`kol-details`): Branch per `git rebase --onto` auf den Details-Branch gesetzt, PR-Base accordingly; `openProp`/`open.ts` wird aus #10884 wiederverwendet (kein doppelter Add). #10884 zuerst mergen — GitHub retargetet #10886 dann automatisch auf develop.
Vorbild: [#10884](https://github.com/public-ui/kolibri/pull/10884) (`kol-details`, noch offen,
Basis dieses Plans) und [#10652](https://github.com/public-ui/kolibri/pull/10652) (`kol-link`,
gemergt). Disziplin: Skill `.claude/commands/migrate-to-skeleton.md`.

## Ziel

`kol-accordion` (shadow: true) rendert den neuen `AccordionFC`
(`internal/functional-components/accordion/`) direkt statt über den Legacy-`KolCollapsibleFc` zu
gehen. Öffentliche API byte-identisch zu develop. **Akzeptanzkriterium: die Migration ist visuell
unsichtbar** — null geänderte Snapshot-PNGs gegen develop.

## Gap-Analyse (Phase 1, abgeschlossen)

| Aspect      | Legacy (develop)                                                                                         | Skeleton (target)                                                                                          | Action                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Inheritance | Standalone Stencil class, `implements AccordionAPI, ClickableElement, FocusableElement`, `@State`-Bag    | `BaseWebComponent<AccordionApi>` + `WebComponentInterface<AccordionApi>` + `implements AccordionProps`     | WC neu schreiben (`shadow.tsx` → `component.tsx`)                                         |
| Logic layer | Schema-Validatoren (`validateLabel/Disabled/Open/AccordionCallbacks`, `watchHeadingLevel`) in Watchern   | Prop-Factories in `internal/props/`, Watcher wenden `xxxProp.apply(...)` inline an                         | Neue Prop-Dateien (`open.ts`, `accordion-callbacks.ts`); Reuse `label/level/disabledProp` |
| Rendering   | Legacy `KolCollapsibleFc` → `KolHeadingFc` + `KolButtonWcTag`                                            | Neuer `AccordionFC`, Root via `BemRootNodeFC(block="kol-accordion")`                                       | Neuer FC + BEM-Registrierung                                                              |
| State       | `state`-Bag, `_open` als `@Prop({mutable, reflect})`                                                     | Render-Props; `_open` bleibt `@Prop({mutable: true, reflect: true})` (Public-Parität)                      | —                                                                                         |
| Events      | `handleOnClick`: flips `_open`, setTimeout → `onClick`+`onToggle` + `KolEvent.click`+`KolEvent.toggle`   | identisch im WC (`handleToggle`); KEIN clearTimeout im Legacy-Accordion → Verhalten unverändert übernehmen | —                                                                                         |
| Icon        | **open-abhängig**: `open ? 'kolicon-chevron-down' : 'kolicon-chevron-right'` (Snapshot-Spielraum belegt) | AccordionFC behält den Switch (⚠️ bewusste Abweichung von DetailsFC, der fix `chevron-right` rendert)      | —                                                                                         |
| IDs         | Root-`id="accordion-<nonce>"` (inert) + `accordion-heading/control-<nonce>`                              | headingId/controlId als `States`; Root-`id` entfällt (Details-Präzedenz, BemRootNodeFC rendert nur class)  | Root-id-Drop im PR dokumentieren                                                          |
| Methods     | `focus()`/`click()` via `delegateFocus/delegateClick('ctaRef')`                                          | identisch; `ctaRef` kommt als `Refs.headingButton` in den FC                                               | —                                                                                         |
| Tests       | `test/snapshot.spec.tsx` (importiert `../shadow`), `accordion.e2e.ts`                                    | Import auf `../component`, Public-API-Pin in `_skeleton/public-api.spec.ts`                                | Update + Pin                                                                              |

### Bewusste Entscheidungen (DOM-Parität)

1. **AccordionFC rendert weiterhin `KolButtonWcTag`** (nicht ButtonFC direkt) — Zero-Visual-Delta.
   Theme-Selektoren nutzen `kol-accordion__heading-button` als Vorfahren (default
   `.kol-accordion__heading-button .kol-button/.kol-icon`, ecl, desy, bwst, kern). Details-Präzedenz.
2. **Kein Root-`id`-Attribut** mehr (`accordion-<nonce>` war inert, keine CSS-/ARIA-/JS-Referenz).
   Class-Order am Root ändert sich (`kol-accordion collapsible …` statt `collapsible … kol-accordion`),
   sonst identisches DOM. heading/control-IDs unverändert (`accordion-heading-<nonce>`,
   `accordion-control-<nonce>`).
3. **Icon-Switch bleibt**: Legacy-Collapsible rendert `open ? down : right` für das Accordion
   (Snapshots belegen `_icons="kolicon-chevron-down"` bei `_open: true`). DetailsFC weicht davon
   bewusst ab (fix `chevron-right`, Rotation via CSS) — für das Accordion ist der Switch das
   Legacy-Verhalten und bleibt erhalten.
4. **`labelProp` (2–80-Zeichen-Validierung + Hints)** statt Legacy-`validateLabel(required)`:
   Repo-Präzedenz (meter, quote, details). Deviation: 1-Zeichen-/81+-Zeichen-Labels erzeugen künftig
   einen `devWarning` und fallen auf `''` zurück (Legacy: akzeptiert). Note in PR-Beschreibung.
5. **Kein `clearTimeout` im Toggle** — Legacy-Accordion hat keinen (anders als Details); Verhalten
   byte-gleich übernehmen.
6. **Feature-Hints fallen weg** (Legacy-`featureHint`-Aufrufe in shadow.tsx) — Dev-Hinweise, kein
   Public API, kein DOM. Details-Präzedenz (Legacy-Details hatte ebenfalls featureHint-freien Kopf
   nach Migration).

## Current state

**DONE (2026-09-14) — implementiert, validiert, pixelgleich, PR erstellt.**

- Branch `refactor/migrate-kol-accordion-skeleton` angelegt (von origin/develop `f082d27f0b`).
- Implementierung: `internal/props/{accordion-callbacks,open}.ts` (+ index-Exports),
  `internal/functional-components/accordion/{api,component}.tsx`, WC
  `components/accordion/component.tsx` (ersetzt `shadow.tsx`, gelöscht), BEM-Registrierung
  `kol-accordion` (Typ + Runtime), component-list-Import umgestellt, Public-API-Pin
  in `_skeleton/public-api.spec.ts`, Snapshot-Test-Import auf `../component` umgestellt.
- Validation: prettier grün, `lint:eslint` grün (13 vorbestehende Warnungen, 0 Fehler), `lint`
  grün (inkl. TS + i18n-Checks), `test:unit` **948/948**, Hydrate-SSR-Snapshots aktualisiert
  (Root-id-Delta), **Public-API-Diff gegen develop: byte-identisch (7 Member: focus, click,
  \_disabled, \_label, \_level, \_on, \_open)**.
- **GOAL Zero Visual Delta — ✅ DONE (2026-09-14):** Baselines auf develop `f082d27f0b`
  generiert (6 Themes × 408 PNGs), dann `node scripts/snapshots-docker.mjs default bwst ecl
kern desy unstyled --check` → je **293 passed, 0 failed, Exit 0**.
  `git diff origin/develop...HEAD -- '*.png'` = 0.

## Open work, nach Priorität

1. ~~Implementierung~~ — DONE.
2. ~~GOAL Zero Visual Delta~~ — DONE (siehe oben).
3. ~~Hydrate-SSR-Snapshot~~ — DONE (2 Einträge: renderToString/streamToString).
4. ~~Public-API-Diff~~ — DONE (identisch).
5. ~~PR + Issue #9561 in Review~~ — DONE.

## Pitfalls (aus Vorbild-PRs übernommen)

- Jest `newSpecPage` ohne Registrierung von `KolButtonWc` (attachInternals-Crash) — Accordion-Test
  registriert nur `KolAccordion`, der `kol-button-wc`-Stub bleibt inert (wie develop).
- Hydrate-Snapshot testet den letzten Build — Components-Build davor.
- `FunctionalComponentProps` ist StrictFields: der FC bekommt ALLE Props-Config-Felder + alle
  States-Felder, auch solche, die er nur durchreicht.
- Snapshot-Serializer sortiert Klassen alphabetisch — Reihenfolge im Snapshot ist kein
  DOM-Order-Signal.
- `labelProp`-Default `''` vs. Legacy-`_label: ''` (⚠ required) — identisches Endergebnis.
