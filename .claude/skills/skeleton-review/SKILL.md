---
name: skeleton-review
description: Reviewt genau eine KoliBri-Stencil-Komponente gegen die Skeleton-Architektur (BaseWebComponent, Komponenten-FC mit BemRootNodeFC als Wurzel, flaches DOM) und die Regeln aus ARC42 und AGENTS.md und legt einen priorisierten Optimierungsplan als Issue mit dem Label `skeleton-review` an. Nur Report, keine Code-Änderung. Nutze diesen Skill, wenn der Nutzer oder eine Routine eine Komponente gegen die Spezifikation prüfen lassen will – auch bei Formulierungen wie "Skeleton-Review", "nächste Komponente reviewen", "Komponente gegen Spec prüfen", "Optimierungsplan für Komponente" oder "welche Komponente weicht von der Architektur ab".
---

# Skeleton-Review einer Komponente

Die Komponenten von KoliBri werden schrittweise auf die Skeleton-Architektur umgestellt. Dieser Skill
prüft **genau eine Komponente pro Aufruf** gegen die Architektur- und Styling-Regeln und hält das
Ergebnis als priorisierten Optimierungsplan in einem GitHub-Issue fest. Die Issues sind zugleich das
Gedächtnis des Skills: Eine Komponente mit Review-Issue kommt in dieser Runde nicht erneut dran.

Der Skill **ändert keine Dateien**: kein Commit, kein Push, kein PR. Das Einzige, was er nach außen
schreibt, ist das Review-Issue. Die Umsetzung der Befunde ist ein eigener Schritt, bei Architektur-
Verstößen typischerweise über den Skill `migrate-to-skeleton`.

Ausgabe und Issue auf Deutsch.

## 1. Spezifikation und Vorrang

In dieser Reihenfolge maßgeblich:

1. Die Pflichtregeln und Prüfpunkte in diesem Skill (Abschnitt 4). Sie haben Vorrang vor allen
   Dokumenten.
2. `packages/components/src/components/_skeleton/ARC42.md`
3. `AGENTS.md`: Theming, Color schemes, CSS Custom Properties and SASS Variables, SCSS Architecture
   Guidelines, General rules for custom themes, Coding Conventions, Inline code documentation, Semantic
   Versioning
4. `docs/BASE_STYLING_VS_THEMING_CONCEPT.md` und `docs/DoD.md`

## 2. Komponente auswählen

Kandidaten sind alle Ordner unter `packages/components/src/components`, deren `component.tsx` einen
`@Component`-Dekorator enthält, alphabetisch sortiert:

```bash
grep -l "@Component(" packages/components/src/components/*/component.tsx | sort
```

Ausgenommen sind:

- `tooltip`: `kol-tooltip-wc` ist absichtlich deprecated und bleibt unverändert (siehe `AGENTS.md`).
- `_skeleton`: Referenzimplementierung der Architektur.
- `@else`: Hilfskomponenten.

Bereits reviewt sind Komponenten, zu denen ein Issue mit dem Label `skeleton-review` und dem Titel
„Skeleton-Review: <ordnername>“ existiert, offen oder geschlossen:

```bash
gh issue list --repo public-ui/kolibri --state all --label skeleton-review --limit 200 --json number,title,state,createdAt
```

Ohne `gh` dasselbe über das GitHub-MCP-Tool `search_issues` mit der Query
`repo:public-ui/kolibri label:skeleton-review`.

- Hat der Nutzer eine Komponente genannt, diese nehmen, auch wenn es schon ein Review-Issue gibt. Das
  bestehende Issue dann verlinken und in der Ausgabe fragen, ob ein neues angelegt oder das alte ergänzt
  werden soll.
- Sonst den ersten Kandidaten ohne Review-Issue nehmen.
- Kurz nennen, welche Komponente es ist, dann weiter.

**Sind alle Kandidaten reviewt**, kein Issue anlegen. Stattdessen melden, dass die Runde abgeschlossen
ist, mit einer Tabelle der offenen Befunde pro Schweregrad über alle offenen Review-Issues, und die
Komponente mit dem ältesten Review-Issue als Start der nächsten Runde vorschlagen. Danach Ende.

## 3. Kontext sammeln

Für die gewählte Komponente lesen:

- `component.tsx` und alle weiteren Dateien im Komponenten-Ordner (Basis-SCSS, Tests)
- die Komponenten-FC und ihre untergeordneten FCs unter
  `packages/components/src/internal/functional-components/<name>/`
- das Komponenten-SCSS im Theme `packages/themes/default`
- das Schema unter `packages/components/src/schema` und den Eintrag in
  `packages/components/src/schema/bem-registry.ts`
- das React-Sample unter `packages/samples/react` (`basic.tsx`, Eintrag in `routes.ts`)
- offene Issues und PRs, die die Komponente nennen (`gh search issues` / `gh search prs` bzw.
  `search_issues` / `search_pull_requests`)

## 4. Prüfen

### Pflichtregeln

Ein Verstoß hat den Schweregrad **Blocker (Architektur)**.

- **R1:** Jede Stencil-Komponente erbt von `BaseWebComponent`. Fehlt das, auf den Skill
  `migrate-to-skeleton` als Lösungsweg verweisen.
- **R2:** `render()` rendert in `<Host>` genau eine Komponenten-FC (z. B. `<AlertFC>`) und keine freie
  Markup-Struktur.
- **R3:** Die Wurzel dieser Komponenten-FC ist `BemRootNodeFC` mit dem Block der Komponente.
  Untergeordnete FCs (Teilbausteine wie die `form-field`-FCs) nutzen kein `BemRootNodeFC`, sondern
  BEM-Elementklassen des umgebenden Blocks.
- **R4:** Das Wurzel-Tag ist frei wählbar über die Prop `component` von `BemRootNodeFC` (Standard `div`;
  ebenso `span`, `a`, `button`, `label`, `fieldset`, `abbr`, `svg` usw.). Eine Wurzel, die direkt mit
  `bem.forBlock(...)` statt mit `BemRootNodeFC` gebaut wird, ist ein Verstoß. Diese Regel hat Vorrang
  vor den Stellen der ARC42, die `BemRootNodeFC` auf `div` festlegen und `bem.forBlock` als Ausnahme
  beschreiben.
- **R5:** Der BEM-Block ist in `bem-registry.ts` an beiden Stellen registriert: im Typ
  `KoliBriComponentsBemSchema` und in der Laufzeit-Konstante `BEM`.

### Prüfpunkt „Flaches DOM“

Schweregrad **Breaking Theming**.

- Jedes Wrapper-Element melden, das genau ein Element ohne Geschwister umschließt und durch dieses als
  `BemRootNodeFC`-Wurzel ersetzt werden könnte. DOM vorher und nachher sowie die alten und neuen
  BEM-Klassen nennen.
- Hat das Element Geschwister (z. B. Tooltip, Beschreibung), ist der Wrapper berechtigt und wird nicht
  gemeldet.
- Fehlt das benötigte Tag in der `component`-Union von `BemRootNodeFC`, dafür keinen eigenen Befund
  anlegen, sondern auf das offene Issue mit dem Label `skeleton-review` und dem Titel
  „BemRootNodeFC: component-Union erweitern“ verweisen. Gibt es dieses Issue nicht, den Punkt im
  Abschnitt „Querschnitt“ des Plans aufführen.

### Weitere Prüfpunkte

- **Öffentliche API:** Props, Events, Methoden, Slots, Typen. Props aus `internal/props` werden
  wiederverwendet (z. B. `disabledProp`). Öffentliche Member haben JSDoc.
- **Barrierefreiheit:** Semantik, ARIA, Fokus, Tastaturbedienung, Mindestgröße interaktiver Elemente,
  `forced-colors`.
- **Member-Reihenfolge** der Klasse laut ARC42: statics, `@Element`, `@State`, Felder, Konstruktor,
  `@Prop`, `@Event`, `@Method`, Lifecycle, `@Listen`, Helfer, `render`; `@Watch` direkt nach dem
  beobachteten Member.
- **Basis-SCSS** (Layer `kol-global`/`kol-component`): kein `margin`/`padding`, keine Farben, kein
  `color-scheme`, `light-dark()` oder `prefers-color-scheme`, kein `overflow: hidden`, kein
  `!important`, keine `@layer` in Utility-Dateien.
- **Theme-SCSS:** flache BEM-Struktur, kein `$root` und kein `@at-root`, nur Tokens referenzieren, keine
  eigenen Scheme-Media-Queries, keine Redundanz zum Basis-Styling.
- **CSS Custom Properties:** nur dokumentierte `--kol-<komponente>-<name>`-Tokens, sonst SASS-Variablen.
- **Inline-Doku:** keine Historie, keine Wiederholung des Codes.
- **Tests und Sample:** Unit- und Snapshot-Tests sowie das React-Sample sind vorhanden und aussagekräftig.
- **Konventionen:** keine Barrel-Dateien; Listen, Imports und Union-Literale alphabetisch.

## 5. Plan erstellen

Befunde absteigend nach Schweregrad sortieren:

| Schweregrad           | Bedeutung                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------- |
| Blocker (Architektur) | Verstoß gegen R1–R5                                                                          |
| Blocker (Bug/A11y)    | fehlerhaftes Verhalten oder Barriere                                                         |
| Breaking API          | erfordert ein Major-Release                                                                  |
| Breaking Theming      | DOM-/BEM-Änderung; Minor-Release mit Label `release:theming`, alle Themes im Repo anpassen |
| UX/visuell            | sichtbare Abweichung ohne Bruch                                                              |
| Polish                | Konventionen, Doku, Kleinigkeiten                                                            |

Pro Befund:

- Schweregrad
- Kurzbeschreibung
- Beleg: Datei:Zeile und die verletzte Regel bzw. die Spec-Stelle (Dokument und Abschnitt)
- Vorschlag zur Behebung in 1–2 Sätzen
- Aufwand: S (unter 2 h), M (bis 1 Tag), L (mehr als 1 Tag)
- bestehendes Issue oder PR, falls vorhanden

Nur Befunde mit Beleg melden. Was unsicher ist, unter „Offene Fragen“ führen statt als Befund.

## 6. Issue anlegen und ausgeben

- Titel: `Skeleton-Review: <ordnername>`
- Label: `skeleton-review`
- Inhalt:

```markdown
## Zusammenfassung

<2–3 Sätze, Anzahl der Befunde pro Schweregrad>

## Befunde

| #   | Schweregrad | Befund | Beleg | Vorschlag | Aufwand | Bezug |
| --- | ----------- | ------ | ----- | --------- | ------- | ----- |
| 1   | …           | …      | …     | …         | …       | …     |

## Querschnitt

<Befunde, die nicht nur diese Komponente betreffen, oder „keine“>

## Offene Fragen

<oder „keine“>

## Hinweis zur Umsetzung

Theming-Änderungen werden nach dem Skill `zero-visual-delta-handoff` abgesichert, Architektur-Verstöße
über den Skill `migrate-to-skeleton` behoben.
```

Zum Schluss im Chat den Link zum Issue und die Zusammenfassung ausgeben.
