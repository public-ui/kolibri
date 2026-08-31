# Theme Redundancy Check - Companion Plan

## Goal

Redundante Styles in Theme-Paketen identifizieren und ins Basis-Styling des `@public-ui/components` Pakets verschieben.

**Kriterium**: Alle Verschiebungen müssen Null-Visuelle-Delta gegen `origin/develop` erreichen.

**Messbefehl**:

```bash
# Analyse läuft
node /Users/moppitz/Workspace/kolibri/scripts/theme-redundancy-check.js

# Prüfung nach Verschiebung
cd packages/themes/default && git checkout origin/develop -- snapshots
docker compose run --rm snapshot-check
```

**Prüfbefehle je Komponente**:

- `kol-table-stateless-wc`: 37 Redundanzen → siehe Abschnitt 1
- `input-text`: 12 Redundanzen → siehe Abschnitt 2
- `input`: 11 Redundanzen → siehe Abschnitt 3
- `pagination-mixin`: 10 Redundanzen → siehe Abschnitt 4

## Current state

| Datum      | Commit  | Zusammenfassung                                                                |
| ---------- | ------- | ------------------------------------------------------------------------------ |
| 2025-08-31 | Initial | Analyse-Skript erstellt, 97 Redundanzen gefunden (62 HIGH, 31 MEDIUM, 4 NEVER) |

## Open work

### 0. Kriterium: Null-Visuelle-Delta

**Status**: ⏳ Offen — Verschiebungen noch nicht begonnen

**Validierung**:

- [ ] Baselines auf `origin/develop` stellen
- [ ] Docker-Check laufen: `docker compose run --rm snapshot-check`
- [ ] Ergebnis dokumentieren

---

### 1. kol-table-stateless-wc (37 Redundanzen)

**Basis-Eignung**: HOCH — überwiegend Layout und Box-Model

**Redundanz-Tabelle**:

| Selektor                         | Eigenschaft           | Wert       | Themes        |
| -------------------------------- | --------------------- | ---------- | ------------- |
| :host                            | display               | flex       | default, bwst |
| :host                            | flex-direction        | column     | default, bwst |
| .kol-table                       | top                   | 0          | default, bwst |
| .kol-table                       | z-index               | 10         | default, bwst |
| .kol-table                       | padding-top           | to-rem(12) | default, bwst |
| .kol-table                       | padding-bottom        | to-rem(4)  | default, bwst |
| .kol-table                       | overflow              | auto       | default, bwst |
| .kol-table                       | border-style          | solid      | default, bwst |
| .kol-table                       | border-width          | 0          | default, bwst |
| .kol-table                       | display               | block      | default, bwst |
| .kol-table                       | right                 | 0          | default, bwst |
| .kol-table                       | left                  | 0          | default, bwst |
| .kol-table                       | height                | to-rem(8)  | default, bwst |
| .kol-button                      | font-weight           | 700        | default, bwst |
| .kol-table__cell                 | padding-top           | to-rem(8)  | default, bwst |
| .kol-table__cell                 | align-items           | center     | default, bwst |
| .kol-table__cell                 | grid-template-columns | 1fr auto   | default, bwst |
| .kol-table__cell                 | min-width             | to-rem(20) | default, bwst |
| .kol-table__cell                 | height                | to-rem(20) | default, bwst |
| .kol-table__cell                 | padding-right         | to-rem(4)  | default, bwst |
| .kol-table__cell                 | padding-left          | to-rem(4)  | default, bwst |
| .kol-table__cell                 | font-size             | to-rem(11) | default, bwst |
| .kol-table__cell                 | line-height           | 1          | default, bwst |
| (weitere MEDIUM-Priority Regeln) | ...                   | ...        | ...           |

**Verschiebung nach**: `packages/components/src/components/table/style.scss` oder `packages/components/src/components/@shared/_table-stateless.mixin.scss`

**Zu entfernen aus**:

- `packages/themes/default/src/mixins/kol-table-stateless-wc.scss`
- `packages/themes/bwst/src/mixins/kol-table-stateless-wc.scss`
- `packages/themes/desy/src/mixins/kol-table-stateless-wc.scss` (wenn vorhanden)
- `packages/themes/kern/src/mixins/kol-table-stateless-wc.scss` (wenn vorhanden)

**Null-Visuelle-Delta-Test**:

- [ ] Feature-Branch erstellen: `git checkout -b refactor/theme-redundancy-kol-table-stateless-wc`
- [ ] Vorher-Check: `docker compose run --rm snapshot-check` — X Diffs
- [ ] Nachher-Check: `docker compose run --rm snapshot-check` — 0 Diffs (erwartet)
- [ ] Status: ⏳

---

### 2. input-text (12 Redundanzen)

**Basis-Eignung**: HOCH — Box-Model und Layout

**Verschiebung nach**: `packages/components/src/components/input-text/style.scss` oder Shared Mixin

**Null-Visuelle-Delta-Test**:

- [ ] Feature-Branch erstellen
- [ ] Vorher-Check dokumentieren
- [ ] Nachher-Check: 0 Diffs erwartet
- [ ] Status: ⏳

---

### 3. input (11 Redundanzen)

**Basis-Eignung**: HOCH — Container-Layout und Box-Model

**Verschiebung nach**: `packages/components/src/components/@shared/_input.mixin.scss`

**Null-Visuelle-Delta-Test**:

- [ ] Feature-Branch erstellen
- [ ] Vorher-Check dokumentieren
- [ ] Nachher-Check: 0 Diffs erwartet
- [ ] Status: ⏳

---

### 4. pagination-mixin (10 Redundanzen)

**Basis-Eignung**: HOCH/MIXED — Typography, aber auch Border-Styles

**Hinweis**: `box-shadow: 0 2px 8px 2px rgb(8, 35, 48, 0.24)` ist HARD-CODED → sollte in Theme-Variable konvertiert werden, nicht verschoben

**Null-Visuelle-Delta-Test**:

- [ ] Feature-Branch erstellen
- [ ] Vorher-Check dokumentieren
- [ ] Nachher-Check: 0 Diffs erwartet
- [ ] Status: ⏳

---

### 5. kol-table-settings-wc (7 Redundanzen)

**Basis-Eignung**: HOCH — Layout und Positioning

**Null-Visuelle-Delta-Test**:

- [ ] Feature-Branch erstellen
- [ ] Vorher-Check dokumentieren
- [ ] Nachher-Check: 0 Diffs erwartet
- [ ] Status: ⏳

---

## Decision points

**OFFEN**: Sollte kern-Theme analysiert werden? (aktuell nur default, desy, bwst im Mixins-Ordner erkannt)

**OFFEN**: MEDIUM-Priority Regeln (31 Stück) — wie viele sollen auch verschoben werden?

**OFFEN**: `pagination-mixin` hard-coded box-shadow → in Variable konvertieren oder als Theme-spezifisch belassen?

---

## Pitfalls

### 1. SCSS-Variablen in Values (z.B. `$option-height`, `to-rem()`)

- **Problem**: Wenn eine SCSS-Variable nur im Theme definiert ist, kann die Regel nicht in Basis verschoben werden
- **Lösung**: Prüfen, ob Variable global verfügbar oder im Basis-Package definiert ist

### 2. Nur 2 Themes redundant (default + desy, aber nicht bwst)

- **Problem**: Nicht alle Themes haben die gleiche Regel
- **Lösung**: Prüfen, ob kern-Theme auch diese Regel hat — wenn ja, Kandidat für Basis

### 3. Mixin-Struktur unterschiedlich

- **Problem**: Einige Themes haben keine `src/mixins` (z.B. ecl, itzbund)
- **Lösung**: Diese Themes separat prüfen oder ausnehmen

### 4. Hard-coded Werte mit spezifischer Optik

- **Problem**: `box-shadow: 0 2px 8px 2px rgb(8, 35, 48, 0.24)` ist zwar redundant, aber eine bewusste Design-Entscheidung
- **Lösung**: Als Theme-spezifisch belassen oder in Variable konvertieren, nicht in Basis verschieben

---

## Validation commands

**Vor jedem Commit ausführen**:

```bash
# Formatierung
pnpm format

# Lint
pnpm lint

# Für Theme-Änderungen
pnpm --filter @public-ui/themes/default lint:stylelint --fix

# Für Component-Änderungen
pnpm --filter @public-ui/components lint

# Null-Visuelle-Delta (nach Verschiebungen)
cd packages/themes/default && git checkout origin/develop -- snapshots && docker compose run --rm snapshot-check
```
