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

| Theme      | Status       | Prüfbefehl                                           |
| ---------- | ------------ | ---------------------------------------------------- |
| `unstyled` | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs unstyled --check` |
| `default`  | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs default --check`  |
| `bwst`     | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs bwst --check`     |
| `ecl`      | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs ecl --check`      |
| `kern`     | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs kern --check`     |
| `desy`     | ⏳ ungeprüft | `node scripts/snapshots-docker.mjs desy --check`     |

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

### 0. Pixel-Gate — OFFEN (blockiert die Abnahme)

**In dieser Session war kein Docker-Daemon verfügbar** (`docker info` → nicht erreichbar). Gemäß
§ 0 des Skills `zero-visual-delta-handoff` wird die visuelle Prüfung **nicht** durch lokale
Playwright-Läufe ersetzt, sondern hier als offene Arbeit übergeben.

Zu tun in einer Session mit Docker:

1. Baselines auf Base-Stand stellen: `git checkout origin/develop -- packages/themes/*/snapshots packages/unstyled/snapshots`
2. Ergebnisordner im Volume räumen (siehe Skill § 2).
3. Je Theme `node scripts/snapshots-docker.mjs <theme> --check`, Stichproben-Strategie Stufe 1
   (`--grep badge`) zuerst, danach `version`, `heading`, `handout` (Badge-Konsumenten), dann der
   volle Lauf als Abnahme-Evidenz.
4. Statuszeilen in der Goal-Tabelle mit Exit-Code/„N passed" füllen.

Erwartung: 0 Diffs ohne Theme-Arbeit, weil das DOM unverändert ist (siehe oben). Sollte doch etwas
auffallen, zuerst Muster 1/2/4 aus § 6a des Skills prüfen.

### 1. `packages/themes/ecl/src/ecl-eu` bleibt ungeprüft

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

Stand dieser Session: alle Befehle außer dem Pixel-Gate grün.
