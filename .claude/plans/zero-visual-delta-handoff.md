# Handoff: Zero-Visual-Delta für Default-Theme-Snapshots (PR #10652) — DONE

> Stand: 2026-08-30 · Branch `refactor/migrate-kol-link-skeleton-2th`
> **Erledigt am 2026-08-30:** `node scripts/snapshots-docker.mjs default --check` → **294 passed**, Exit 0.
> `git diff origin/develop -- packages/themes/default/snapshots` ist leer. Dieser Text ist
> Abgleich-Referenz für Folge-Sessions (andere Themes), keine offene Arbeit mehr.

## Was die letzte Runde (13) gelöst hat

Der Runde-12-Fix trug bereits: `padding-right: to-rem(8)` von `.kol-link` (Wrapper) nach
`.kol-link__anchor` verschoben (`packages/themes/default/src/components/tree-item.scss`).
Damit reicht die Focus-Outline des Ankers wieder bis zur Zeilenkante und überdeckt
wc-Border + ul-Rahmen exakt wie der ehemalige Full-Width-Anker — das letzte Delta
(`scenarios/focus-elements?component=tree`, x=281..283, erwartete Farbe (0,90,143) =
`--color-primary-variant`) ist damit verschwunden. Kein weiterer CSS-Fix nötig gewesen.

## Mit dem Fix gemeinsam verifizierter Gesamtstand der uncommitteten Quell-Fixes

Alle Fixes aus den Runden 1–12 (Shared-Mixins `__anchor`-Scoping, tabIndex-Sentinel in
`link/component.tsx` + `wc.tsx`, Skip-Nav `:focus-within`, Tree-Item Full-Width-Anker,
Span-FC Empty-Icon-Guard, Default-Theme nav/button/tree-Anpassungen) sind im selben
Check-Lauf mit 294/294 grün bestätigt.

## Für die übrigen Themes (bwst 31, ecl 27, kern 22, desy 21 offene PNGs)

- Dieselbe Docker-Pipeline: `node scripts/snapshots-docker.mjs <theme> --check` (≈6 min/Theme).
- Vor jedem Lauf root-Cleanup im Volume (siehe Skill `zero-visual-delta-handoff`, Abschnitt 3,
  bzw. die Befehle im Companion-Plan).
- Default-Theme-Snapshots NICHT anfassen — sie stehen auf develop-Stand und sind Teil des Fixes.
