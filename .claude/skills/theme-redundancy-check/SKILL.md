---
name: theme-redundancy-check
description: Identifiziert redundante Styles in Theme-Paketen, die besser im Basis-Styling des Components-Pakets verortet werden sollten. Analysiert alle Themes außer `theme-unstyled`, konsolidiert Dopplungen und sichert Null-Visuelle-Deltas durch Tests. Trigger: "Theme-Redundanz-Check", "redundante Theme-Styles finden", "Styles konsolidieren", "Theme-Styles verschieben".
---

# Theme Redundancy Check

Styles in Theme-Paketen sollen nur theme-spezifische Customisierung enthalten — Basis-Layout, gemeinsame Defaults und Struktur-Styling gehören ins `@public-ui/components` Package. Doppelte Definitionen über mehrere Themes erschweren Wartung und führen zu Inkonsistenzen.

## 1. Ziel

- **Redundanzen finden**: gleiche oder sehr ähnliche CSS-Regeln in mehreren Themes
- **Basis-Eignung prüfen**: kann die Regel zentral in `components` platziert werden?
- **Null-Visuelle-Delta**: Verschiebung darf keine visuellen Änderungen verursachen (siehe `zero-visual-delta-handoff` Skill)
- **Dokumentation**: Fund pro Regel, Verschiebungs-Plan, Test-Ergebnisse

## 2. Voraussetzungen

### 2.1 Theme-Struktur kennen

```
packages/themes/
├── default/          # primäres Theme
├── classic/
├── swiss/
├── austria/
└── unstyled/         # AUSNEHMEN — minimalistisches Theme ohne Konsolidierung
```

### 2.2 Basis-Styling kennen

```
packages/components/src/
├── component/        # Komponenten-SCSS (Basis-Styles)
└── schema/           # Prop-Definitionen
```

### 2.3 Zero Visual Delta Handoff verfügbar

Der Skill `zero-visual-delta-handoff` muss im `.claude/skills/` Ordner liegen — jede Verschiebung muss gegen `develop` geprüft werden.

## 3. Vorgehensweise

### Phase 1: Theme-Styles extrahieren und katalogisieren

```bash
# Alle Theme-Mixins auflisten
find packages/themes -name "*.scss" -path "*/component/*" | grep -v unstyled

# Pro Theme-Datei: BEM-Selektoren extrahieren
# Beispiel: .kol-button, .kol-button--variant-primary, .kol-button__label
```

Erstelle eine Tabelle je Komponente:

| Theme | Selektor | Eigenschaft | Wert | Datei |
| ----- | -------- | ----------- | ---- | ----- |

### Phase 2: Redundanzen identifizieren

1. **Exakte Dopplungen**: gleicher Selektor + Eigenschaft + Wert in ≥2 Themes
2. **Ähnliche Werte**: gleicher Selektor + Eigenschaft mit minimalen Abweichungen (z.B. `1rem` vs `16px`)
3. **Strukturelle Dopplungen**: gleiche Layout-Regeln in allen Themes (flex, grid, spacing)

Muster für typische Redundanzen:

- Box-Model: `display`, `flex-direction`, `justify-content`, `align-items`
- Spacing: `padding`, `margin`, `gap` — wenn identisch in allen Themes
- Dimensions: `width`, `height`, `min-width`, `max-height`
- Positioning: `position`, `top`, `left`, `right`, `bottom`
- Typography-Basis: `font-size`, `line-height`, `text-align` — wenn nicht theme-spezifisch

### Phase 3: Basis-Eignung prüfen

Nur in Basis verschieben, wenn:

- ✅ Regel gilt für ALLE Themes (oder alle außer einem dokumentierten Sonderfall)
- ✅ Regel ist Layout/Struktur, keine optische Customisierung
- ✅ Keine Theme-spezifischen Variablen wie `--kolibri-color-...` involviert
- ❌ Regel hängt von Theme-Variables ab → bleibt im Theme
- ❌ Regel ist bewusst unterschiedlich je Theme → bleibt im Theme

Frage: **Würde sich die Regel beim Wechsel eines Themes visuell ändern?**

- Nein → Basis-Eignung hoch
- Ja → bleibt im Theme

### Phase 4: Verschiebungs-Plan erstellen

Für jede redundante Regel:

```
## [Komponente]: [Selektor].[Eigenschaft]

**Redundanz in**:
- theme-default: [Datei]:[Zeile]
- theme-classic: [Datei]:[Zeile]
- theme-swiss: [Datei]:[Zeile]

**Basis-Eignung**: HOCH/MITTEL/NIEDRIG
**Begründung**: ...

**Verschiebung nach**:
- `packages/components/src/component/[component]/[component].scss`
- Zeile: [einzufügen]

**Zu entfernen aus**:
- Alle Theme-Dateien (Liste)

**Null-Visuelle-Delta-Test**:
- [ ] Vorher: `docker compose run --rm snapshot-check` — X Diffs
- [ ] Nachher: `docker compose run --rm snapshot-check` — 0 Diffs (erwartet)
- [ ] Status: BESTÄTIGT / FEHLGESCHLAGEN
```

### Phase 5: Null-Visuelle-Delta durchführen

Für jede Verschiebung (siehe `zero-visual-delta-handoff` Skill):

1. Feature-Branch erstellen: `git checkout -b refactor/theme-redundancy-[component]`
2. Baselines auf `origin/develop` stellen
3. Docker-Check laufen → Ergebnis dokumentieren
4. Verschiebung durchführen
5. Docker-Check laufen → muss 0 Diffs haben
6. Bei Diffs: Analyse mit `zero-visual-delta-handoff` Werkzeugen

### Phase 6: Erfahrungswerte dokumentieren

In diesem Skill (Abschnitt 7) Einträge hinzufügen mit:

- Komponente
- Redundanz-Typ
- Verschiebungs-Entscheidung
- Aufgetretene Probleme

## 4. Typische Muster (mit Basis-Eignung)

### Muster A: Layout-Styling → BASIS

```scss
// Alle Themes identisch:
.kol-button {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
}
```

**Basis-Eignung**: HOCH — Struktur, keine Optik

### Muster B: Spacing mit Theme-Variable → THEME

```scss
// Theme-spezifisch:
.kol-button {
	padding: var(--kolibri-spacing);
}
```

**Basis-Eignung**: NIEDRIG — Variable nur in Theme definiert

### Muster C: Dimensions → BASIS (mit Vorsicht)

```scss
// Alle Themes identisch:
.kol-input {
	min-height: rem(44);
}
```

**Basis-Eignung**: MITTEL — könnte a11y-Requirement sein, aber check Accessibility-Layer

### Muster D: Typography-Basis → BASIS

```scss
// Alle Themes identisch:
.kol-heading {
	font-weight: bold;
	line-height: 1.2;
}
```

**Basis-Eignung**: HOCH — Typografische Basis

### Muster E: Colors → IMMER THEME

```scss
// Jegliche Farbwerte oder Farb-Variablen:
.kol-button {
	background-color: var(--kolibri-color-primary);
}
```

**Basis-Eignung**: NIEDRIG — Farben sind immer theme-spezifisch

## 5. Werkzeuge und Hilfsskripte

### Redundanz-Finder (Python/Node)

```bash
# Skript: scripts/theme-redundancy-check.js
# - Scannt alle Theme-SCSS
# - Gruppiert nach Selektor/Eigenschaft
# - Meldet Dopplungen
node scripts/theme-redundancy-check.js
```

### Vergleichswerkzeuge

- `diff -u` für direkte Datei-Vergleiche
- `rg` (ripgrep) für Pattern-Suche über alle Themes
- `git grep` für Changes im Basis-Package

## 6. Checkliste pro Verschiebung

- [ ] Redundanz bestätigt (≥2 Themes identisch oder sehr ähnlich)
- [ ] Basis-Eignung bewertet (HOCH/MITTEL/NIEDRIG + Begründung)
- [ ] Ziel-Datei in `components` identifiziert
- [ ] Alle Theme-Quelldateien dokumentiert
- [ ] Feature-Branch erstellt
- [ ] Baselines auf `origin/develop` gestellt
- [ ] Vorher-Check mit Docker (Diffs dokumentiert)
- [ ] Verschiebung durchgeführt (Basis hinzufügen, Themes entfernen)
- [ ] Nachher-Check mit Docker (0 Diffs erwartet)
- [ ] Lint und Format ausgeführt
- [ ] Erfahrungswerte dokumentiert (Abschnitt 7)

## 7. Erfahrungswerte (fortlaufend aktualisiert)

### [Datum] — [Komponente/Theme-Gruppe]

**Szenario**: [Welche Komponenten/Themes betroffen, wie viele Redundanzen]
**Gefundene Redundanzen**:

- [Selektor].[Eigenschaft]: [Details]
- ...

**Verschoben**:

- [Selektor].[Eigenschaft] → `components/src/component/[...].scss` — 0 Diffs bestätigt
- ...

**Nicht verschoben**:

- [Selektor].[Eigenschaft] — Begründung: [z.B. hängt von Theme-Variable ab]

**Probleme/Lessons**:

- [Was lief schief, worauf muss man achten]

### 2025-08-30 — Erster Lauf

**Szenario**: Initial-Check über alle Themes (außer unstyled)
**Gefundene Redundanzen**: 97 (62 HIGH, 31 MEDIUM, 4 NEVER)
**Verschoben**: TBD
**Nicht verschoben**: 4 NEVER-Priority (Farben)
**Probleme/Lessons**:

- Theme-Struktur variiert (ecl, itzbund ohne src/mixins)
- SCSS-Variablen in Values benötigen Prüfung der Verfügbarkeit
- Hard-coded Werte wie box-shadow bleiben Theme-spezifisch
- Pfadauflösung in Node-Skripten: absoluter Pfad nutzen
