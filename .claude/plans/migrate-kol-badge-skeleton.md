# Skeleton-Migration `kol-badge` (Issue #9564)

Branch: `claude/peaceful-babbage-qpr0bn` · Base: `develop`

## Goal

`kol-badge` auf die Skeleton-Blueprint-Architektur umbauen (WC-Orchestrator → FC, kein
Controller-/Aspect-Layer), **ohne** öffentliche API-Änderung und **ohne** visuelles Delta.

Kriterium (Pixel-Gate): null geänderte Snapshot-Bilder gegen `origin/develop`.

Messbefehl:

```bash
git diff --name-only origin/develop...HEAD -- '*.png' | wc -l   # Tracking-Metrik
node scripts/snapshots-docker.mjs <theme> --check                # Evidenz (Exit-Code)
```

Der DOM-identische Port (Commit `427bec23a9`) war über die CI-Jobs `visual-tests (<paket>)` mit
0 Diffs abgenommen. Der spätere `kol-button-wc`-Ausbau (`f971400`) ändert das DOM bewusst und hat
zunächst 8 Bilder verändert; Stand und Evidenz dazu unter Open work, Abschnitt 1 (Baseline
`001397bfb1` = develop). Das ist die in § 1 des Handoff-Skills vorgesehene
unabhängige Evidenz — kein PNG wurde neu committet (`git diff --name-only origin/develop...HEAD --
'*.png'` = 0), der Vergleich lief also echt gegen die Base-Baselines.

| Paket                       | Status                      | Evidenz                                           |
| --------------------------- | --------------------------- | ------------------------------------------------- |
| `unstyled`                  | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (unstyled)`                  |
| `theme-default`             | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (theme-default)`             |
| `theme-bwst`                | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (theme-bwst)`                |
| `theme-ecl`                 | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (theme-ecl)`                 |
| `theme-kern`                | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (theme-kern)`                |
| `theme-desy`                | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (theme-desy)`                |
| `test-tag-name-transformer` | ✅ 408 unchanged, 0 changed | CI-Job `visual-tests (test-tag-name-transformer)` |

## Current state

| Datum      | Commit      | Zusammenfassung                                                                                                                                                                                                               |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-14 | _dieser PR_ | Skeleton-Migration `kol-badge`: WC-Orchestrator + `BadgeFC` + `badgePropsConfig`, neue `smartButtonProp`, `kol-badge` im BEM-Registry, `shadow.tsx` entfernt, öffentliche API in `_skeleton/public-api.spec.ts` festgenagelt. |

### DOM-Parität ist der Kern dieser Migration

Der FC ist eine **DOM-identische Portierung** des Vorgänger-`render()` — dieselbe Strategie wie bei
der `kol-details`-Migration (Erfahrung #29 im `zero-visual-delta-handoff`-Skill), die das Pixel-Gate
ohne eine einzige Theme-Fix-Runde passierte:

- Wurzelknoten bleibt ein `<span>` (kein `BemRootNodeFC`, das immer ein `<div>` rendert). ARC42
  § "BemRootNodeFC Pattern" deckt das ab; der Block wird über `bem.forBlock('kol-badge')` aus
  demselben typisierten Schema gebaut.
- Der Smart Button rendert weiterhin das transitionale `kol-button-wc`. Base- und Theme-SCSS greifen
  über `.kol-badge__smart-button .kol-button` bzw. `… button` auf den inneren Button zu
  (`themes/{default,bwst,kern,ecl-ec}/…/badge.scss`, `components/badge/style.scss`); ein direktes
  `ButtonFC` würde die Klasse auf dieselbe Ebene wie `.kol-button` schieben und diese Selektoren
  stillschweigend brechen (Fallstrick 8 der Migrationsanleitung).
- Die instanz-eindeutige Label-ID (`createUniqueId('badge-label')`) liegt als `@State` am WC und
  wird nur gerendert, wenn ein Smart Button existiert — identisch zum Vorgänger.

Belege für Null-DOM-Delta (kein Ersatz für das Pixel-Gate, aber starke Indizien):

- `pnpm --filter @public-ui/components test:unit` → 949 passed, **774 Snapshots unverändert**; die
  sechs `kol-badge`-Snapshots sind byte-identisch zum Vorgänger (`git diff` auf
  `components/badge/__snapshots__/` ist leer, nur ein Rename).
- `pnpm --filter @public-ui/hydrate test:unit` → 102 passed; die SSR-Snapshots für `kol-badge` und
  `kol-version` (rendert intern ein Badge) sind unverändert.

## Open work

### 0. Pixel-Gate — DONE (2026-09-14)

In der Migrations-Session war kein Docker-Daemon verfügbar (`docker info` → nicht erreichbar);
gemäß § 0 des Skills `zero-visual-delta-handoff` wurde die visuelle Prüfung **nicht** durch lokale
Playwright-Läufe ersetzt, sondern offen übergeben. Abgenommen hat sie dann die CI: die sieben
`visual-tests`-Jobs auf PR #10889 sind grün, und der Visual-Review-Bot meldet „✅ No visual changes"
mit 408 unchanged / 0 changed je Paket. Erwartung bestätigt: **keine Theme-Arbeit nötig**, weil das
DOM byte-identisch portiert wurde.

### 1. `kol-button-wc` im Smart Button abgelöst — DONE (2026-09-14)

Auf Owner-Entscheidung umgesetzt: `BadgeFC` rendert `ButtonFC` direkt, das transitionale
`kol-button-wc` ist aus dem Badge verschwunden.

Damit das kein Nachbau der ~500 Zeilen aus `components/button/wc.tsx` in `KolBadge` wurde, ist die
Orchestrierung aufgeteilt:

- **Neu, wiederverwendbar:** `internal/functional-components/button/resolve-props.ts` —
  `resolveButtonProps(props, host)` normalisiert einen opaken `InternalButtonProps`-Satz in die
  Render-Props, die `ButtonFC` erwartet (inkl. `tabIndex`-Unset-Regel und
  `buttonVariantDefault`-Fallback). Davon profitieren die übrigen 16 `kol-button-wc`-Konsumenten.
- **Im WC geblieben (was Lifecycle braucht):** `TooltipBehavior` — der Smart Button rendert immer
  mit `hideLabel`, der Tooltip-Pfad ist also nie optional —, die vier Event-Handler samt
  `dispatchDomEvent` auf dem Badge-Host, `ctaRef` und `ariaDescriptionId`.
- **`ButtonFC` reicht jetzt seine `class`-Prop durch** an `BemRootNodeFC`. Vorher verwarf es sie
  ersatzlos, sodass `kol-badge__smart-button` beim ersten Umbau komplett aus dem DOM fiel — für
  jeden Konsumenten, der `ButtonFC` direkt rendert, war das ein Blocker. `LinkFC` hat dieselbe
  Lücke (dort noch ungenutzt).

DOM-Delta (bewusst, erstmals in dieser Migration):

```diff
- <kol-button-wc class="kol-badge__smart-button"></kol-button-wc>
+ <div class="kol-badge__smart-button kol-button kol-button--hide-label kol-button--inline kol-button--normal">
+   <button class="kol-button__interactive-element">…</button>
+   <div class="kol-button__tooltip">…</div>
+   <span class="visually-hidden" id="…">…</span>
+ </div>
```

Mitmigrierte Selektoren (Vorprüfung 2), weil `kol-badge__smart-button` jetzt **auf** dem
`.kol-button`-Block sitzt statt darüber:

| Datei                           | Änderung                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `themes/default`, `themes/bwst` | `&__smart-button .kol-button { … }` → `&__smart-button { … }`; Hover ins `__interactive-element` genestet |
| `themes/ecl/ecl-ec`             | `&__smart-button .kol-button { … }` → direkt auf `&__smart-button`                                        |
| `themes/kern`                   | unverändert — `&__smart-button button` ist ein Element-Selektor und greift weiter                         |
| `themes/desy`                   | unverändert — keine Smart-Button-Regeln                                                                   |
| `components/badge/style.scss`   | toter `.button`-Selektor entfernt; `width: auto` ergänzt (s. u.)                                          |

**Der eine nicht-selektorbedingte Fix:** `kol-button-wc-box-styles` gibt `.kol-button` ein
`width: 100%`. Das war harmlos, solange der Block im `kol-button-wc`-Element steckte; jetzt **ist**
der Block das Flex-Item von `.kol-badge` und hätte die volle Badge-Breite beansprucht.
`components/badge/style.scss` setzt deshalb `width: auto` auf `&__smart-button`.

**Pixel-Gate, erste Runde: 8 geänderte Bilder** (`f971400`) — `scenarios-focus-elements-component-badge`
in jedem Paket, in ecl zusätzlich `badge-basic--smart-button`. Ursache war **nicht** ein Selektor,
sondern zwei Defaults: `kol-button-wc` deklariert sie als Stencil-`@Prop`-Feld
(`_inline = false`, `_tooltipAlign = 'top'`), die geteilten Prop-Definitionen tragen dagegen die
Link-Konvention (`inline: true`, `tooltipAlign: 'right'`). Der Button wurde damit `--inline` statt
`--standalone` und sein Tooltip erschien rechts statt oben. `resolveButtonProps` setzt die
Element-Defaults jetzt über `BUTTON_ELEMENT_DEFAULTS` neu; der Snapshot zeigt wieder
`kol-button--standalone`. Zweite Runde läuft — abgenommen ist der Schritt erst bei 0 Diffs.

### 2. `packages/themes/ecl/src/ecl-eu` bleibt ungeprüft

Nur `ecl-ec` ist pixel-gated. `ecl-eu/components/badge.scss` stylt ausschließlich `.kol-badge`
selbst (Padding, Font, `text-transform`) — kein Selektor hängt an einem Element, das der Umbau
bewegt hätte. Risiko daher gering, aber formal ungeprüft.

## Decision points (für den Repo-Owner)

1. **`_color` akzeptiert nur noch Hex-Werte.** Der Vorgänger reichte ein `ColorPair`, dessen beide
   Felder irgendeine Zeichenkette waren, ungeprüft an `createContrastColorPair` weiter (`rgba-convert`
   hätte z. B. `'red'` aufgelöst). Die gemeinsame `colorProp`-Definition in `internal/props/color.ts`
   — seit der `kol-avatar`-Migration in Produktion — validiert Hex und verwirft alles andere mit einer
   Dev-Warnung, sodass der Prop-Default greift. Gleiche Verengung wie bei `kol-avatar`; bewusst
   übernommen statt eine badge-eigene Farb-Prop zu duplizieren. **Alle dokumentierten Beispiele und
   Samples verwenden Hex.** Rückfrage, falls das nicht gewünscht ist.
2. **Watcher-Umbenennung.** `validateColor` / `validateIcons` / `validateSmartButton` heißen jetzt
   `watchColor` / `watchIcons` / `watchSmartButton` (Konvention aus der Button-/Link-Migration).
   Sie sind keine `@Prop`/`@Method`-Member und damit nicht Teil des gepinnten öffentlichen
   Vertrags, aber technisch von außen erreichbar gewesen.

## Pitfalls (in dieser Migration real passiert)

- **`*/` in einem JSDoc-Block beendet den Kommentar.** Ein Verweis auf `themes/*/src/components/badge.scss`
  im FC-Kommentar hat den Kommentar mitten im Satz geschlossen; `tsc` meldete daraufhin vier
  unverständliche Syntaxfehler (`TS1443`, „Unterminated template literal") in Zeilen weit hinter der
  Ursache. Pfad-Globs in Kommentaren ausschreiben.
- **`perfectionist/sort-heritage-clauses`** erzwingt alphabetische `implements`-Reihenfolge:
  `BadgeProps, FocusableElement, WebComponentInterface<BadgeApi>`.
- **`tsc` und `eslint` sind ohne Components-Build nicht aussagekräftig**: ohne generiertes
  `src/components.d.ts` melden sie repo-weit ~365 Phantom-Probleme (fehlende `HTMLKol*Element`-Typen).
  Erst `pnpm --filter @public-ui/components build`, dann linten (Erfahrung #20 des Handoff-Skills).
- **`smartButton` ist die eine Render-Prop, die fehlen darf.** `StrictFields` kann das nicht
  ausdrücken, deshalb `unsetRenderProp('smartButton')` direkt nach `initRenderProps` und vor jedem
  `apply` — sonst leckt der Config-Default als leerer Button ins DOM (verwandt mit Erfahrung #21,
  dem `tabindex="0"`-Leak).

## Validation commands

```bash
pnpm --filter @public-ui/components build          # erzeugt components.d.ts — VOR dem Linten
pnpm --filter @public-ui/components format
pnpm --filter @public-ui/components lint           # eslint + stylelint + tsc + i18n
pnpm --filter @public-ui/components test:unit
pnpm --filter @public-ui/hydrate build && pnpm --filter @public-ui/hydrate test:unit
node scripts/snapshots-docker.mjs <theme> --check  # Pixel-Gate, braucht Docker
```

Stand: alle Befehle grün; das Pixel-Gate ist über die CI-Jobs abgenommen (siehe Goal-Tabelle).
