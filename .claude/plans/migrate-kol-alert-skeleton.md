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

1. Zero-Visual-Delta Docker-Check je Theme (`node scripts/snapshots-docker.mjs <theme> --check`).
2. Commit + PR + Issue #9562 auf Status Review.

## Pitfalls

- Jest-Snapshot serialisiert `class` alphabetisch — Klassenreihenfolge ist kein Regressions Signal.
- `newSpecPage` braucht Registrierung beider WCs (`KolAlert`, `KolAlertWc`) wie bisher.
- Nonce unter Jest literal `nonce`, im Browser hex.
- ToastItem/FormFieldMsg müssen JEDE FC-Prop übergeben (StrictFields-Vertrag, pitfall #9).
