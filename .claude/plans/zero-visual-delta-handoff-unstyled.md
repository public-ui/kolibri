# Zero-Visual-Delta für unstyled Theme

> Ziel: Visuell unsichtbare Refactorings und Komponenten-Migrationen – null geänderte
> Snapshot-Bilder gegen den Base-Branch als hartes Akzeptanzkriterium.

## Goal

Für das `unstyled` Theme sicherstellen, dass alle Änderungen am Komponenten-Code visuell
unsichtbar bleiben. Das `unstyled` Theme registriert keine Theme-CSS (nur Basis-Layer),
weshalb Snapshots hier reine Komponenten-Basis-Styling zeigen – ein sensitiver Indikator
für DOM-Umbauten.

**Kriterium:** `git diff origin/develop -- packages/unstyled/snapshots` = **0 PNG-Dateien geändert**.

## Prüfbefehl

```bash
# Snapshot-Diff gegen develop
git diff --name-only origin/develop -- packages/unstyled/snapshots
# Sollte leer sein (keine PNGs geändert)

# Optional: Lokalen Testlauf (mit Docker für deterministische Resultate)
node scripts/snapshots-docker.mjs unstyled --check
```

Hinweis: Das `unstyled` Theme verwendet `theme.ts` (kein Build-Schritt nötig) und liegt
in `packages/unstyled/`, nicht unter `packages/themes/`. Docker-Support muss zuerst
hinzugefügt werden.

## Open work

### 0. Snapshot-Diff gegen origin/develop prüfen

**Status:** ✅ Keine Änderungen gegen `origin/develop` (git diff zeigt 0 PNGs)

```bash
git diff --quiet origin/develop -- packages/unstyled/snapshots && echo "No differences"
# Ergebnis: No differences
```

**VERIFIED (2026-08-31)** - Alle 408 Snapshots identisch mit develop

### 1. Docker-Snapshot-Support für unstyled hinzufügen

Der `scripts/snapshots-docker.mjs` erkennt aktuell nur Themes unter `packages/themes/`.
Für `unstyled` (unter `packages/unstyled/`) muss Unterstützung hinzugefügt werden.

**Status:** ✅ DONE (2026-08-31) — `discoverThemes()` liest jetzt auch `packages/unstyled`
(pkg-Name aus package.json statt `@public-ui/theme-*`-Konvention). Check läuft:
`node scripts/snapshots-docker.mjs unstyled --check`

### 2. Validierung im aktuellen Branch

Wenn Docker-Support da ist: deterministischen Check gegen develop-Baselines laufen.

**Status:** ✅ DONE (2026-08-31) — `node scripts/snapshots-docker.mjs unstyled --check`
im CI-gleichen Container (playwright v1.60.0-noble, Firefox/Linux): **293 passed,
0 failed** (4,7 min), Exit 0. Baselines unverändert, nichts zurückgeschrieben.

## Pitfalls

### Unstyled Theme Spezifika

- **Kein Build-Schritt:** Anders als `packages/themes/*` verwendet `unstyled`
  `theme.ts` direkt, kein `rollup`-Build nötig. Der Test läuft direkt über
  `kolibri-visual-test` ohne `THEME_CSS`.
- **Icon/Font-Route:** Die Route `icon/font` wird für `THEME_EXPORT=UNSTYLED`
  übersprungen (siehe `sample-app.routes.js`). Das Theme hat kein Icon-Font.
- **Nur Basis-Layer:** Das unstyled Theme zeigt NUR das `kol-component` CSS-Layer.
  Jede visuelle Änderung deutet auf DOM-Umbauten im Basis-Layer hin.
- **Plattform-spezifische Snapshots:** Die CI verwendet Linux (Firefox/Linux), lokale
  Tests erstellen macOS-Snapshots (Firefox/Darwin). Diese dürfen nicht committet werden.

### Gemeinsame Muster (aus Skill)

- Fokus-Optik am falschen Wrapper
- Padding/Color am Host statt am Anker
- UA-Unterstreiche
- Sass-`X &`-Verschachtelung
- Selector-Probleme (kompiliertes CSS prüfen!)

## Validation Commands

```bash
# Snapshot-Diff gegen develop
git diff --stat origin/develop -- packages/unstyled/snapshots

# Lokaler Testlauf (plattform-spezifisch, ohne Docker)
pnpm --filter @public-ui/unstyled test
# Achtung: Erzeugt firefox-darwin Snapshots, nicht committen!

# Deterministischer Check (nach Docker-Support)
node scripts/snapshots-docker.mjs unstyled --check
```

## Current State

| Datum      | Commit     | Zusammenfassung                                                       |
| ---------- | ---------- | --------------------------------------------------------------------- |
| 2026-08-31 | 6a028d8c37 | `unstyled` Theme und Snapshots Suite hinzugefügt (408 PNGs auf Linux) |
| 2026-08-31 | -          | Snapshot-Diff gegen `origin/develop`: 0 Änderungen ✅                 |

## Decision Points

Keine offenen Fragen. Das unstyled Theme ist auf `develop`-Stand bereit. Lediglich Docker-
Snapshot-Support muss noch hinzugefügt werden (Schritt 1 in Open work).
