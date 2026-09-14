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

Alle Themes sind über die CI-Jobs `visual-tests (<paket>)` auf PR #10889 abgenommen (Commit
`427bec23a9`, Baseline `001397bfb1` = develop). Das ist die in § 1 des Handoff-Skills vorgesehene
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

### 1. `kol-button-wc` im Smart Button ablösen — benannt, nicht erledigt

Nach der Regel in `migrate-to-skeleton/SKILL.md` § 6 („Transitionale `-wc`-Tags beim Konsumenten
ablösen") gehört der Umstieg von `KolButtonWcTag` auf `ButtonFC` grundsätzlich in die Migration.
Für Badge scheitert er an **Vorprüfung 1 (Prop-Aufwand)**, nachgemessen am Code:

- `ButtonFC` verlangt **26 normalisierte Render-Props, 4 `handle*`-Callbacks, 2 Refs und
  `ariaDescriptionId`** als State. `KolBadge` hat nichts davon — `_smartButton` ist ein opaker
  Pass-through von `InternalButtonProps`, der bewusst **nicht** aufgebrochen wird.
- Badge rendert den Button hart mit `_hideLabel={true}`. In `ButtonFC` hängt der Tooltip genau an
  `hideLabel && hasLabelText`, der Tooltip-Pfad ist hier also **immer** aktiv — `TooltipBehavior`
  samt `componentDidRender`-Sync und `disconnectedCallback`-Teardown wäre Pflicht, nicht optional.
- Dazu die DOM-Events, auf die `badge.e2e.ts` prüft (`click`, `mousedown` müssen am Host
  ankommen): die liefert heute `dispatchDomEvent` im Wrapper.

Zusammengerechnet wäre das ein Nachbau der ~500 Zeilen aus `components/button/wc.tsx` **innerhalb**
von `KolBadge` — genau das, was die Regel verbietet. Der saubere Weg ist eine wiederverwendbare
Orchestrierungs-Einheit (Behavior oder geteilter Normalisierungs-Helfer `InternalButtonProps` →
`ButtonFC`-Props + Handler), von der alle 17 `kol-button-wc`-Konsumenten profitieren. Das ist ein
architektonischer Schritt und gehört dem Owner vorgelegt, nicht nebenbei erledigt — er ist bereits
als „§ 2 Konsumenten-Migration weg von `kol-button-wc` (der strategische Schritt)" in
`.claude/plans/migrate-kol-button-skeleton.md` verzeichnet.

**Vorprüfung 2 (Selektor-Aufwand) ist bereits erhoben**, damit der spätere Schritt sie nicht neu
machen muss. Nach dem Tausch säße `kol-badge__smart-button` auf demselben Knoten wie `kol-button`;
diese Selektoren müssten theme-lokal mitwandern:

| Datei                                          | heute                              | nach dem Tausch                                                                                                                                                       |
| ---------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/badge/style.scss`                  | `.kol-badge__smart-button .button` | toter Selektor, schon vor der Migration: nichts rendert `class="button"` (verifiziert). Vorbestehend, deshalb hier bewusst nicht angefasst — gehört in den Ablöse-PR. |
| `themes/default/…/badge.scss`, `themes/bwst/…` | `&__smart-button .kol-button`      | `&__smart-button` selbst                                                                                                                                              |
| `themes/kern/…/badge.scss`                     | `&__smart-button button`           | `&__smart-button .kol-button__interactive-element`                                                                                                                    |
| `themes/ecl/ecl-ec/…/badge.scss`               | `&__smart-button .kol-button`      | `&__smart-button` selbst                                                                                                                                              |
| `themes/desy/…/badge.scss`                     | — (keine Smart-Button-Regeln)      | —                                                                                                                                                                     |

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
