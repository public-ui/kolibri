---
name: skeleton-review
description: Reviewt eine KoliBri-Stencil-Komponente (oder im Sammel-Review alle) gegen die Skeleton-Architektur (BaseWebComponent, Komponenten-FC mit BemRootNodeFC als Wurzel, flaches DOM) und die Regeln aus ARC42 und AGENTS.md und legt einen priorisierten Optimierungsplan als Issue mit dem Label `skeleton-review` an. Nur Report, keine Code-Änderung. Nutze diesen Skill, wenn der Nutzer oder eine Routine eine Komponente gegen die Spezifikation prüfen lassen will – auch bei Formulierungen wie "Skeleton-Review", "nächste Komponente reviewen", "Komponente gegen Spec prüfen", "Optimierungsplan für Komponente", "alle Komponenten reviewen" oder "welche Komponente weicht von der Architektur ab".
---

# Skeleton-Review einer Komponente

Die Komponenten von KoliBri werden schrittweise auf die Skeleton-Architektur umgestellt. Dieser Skill
prüft **eine Komponente pro Aufruf** gegen die Architektur- und Styling-Regeln und hält das Ergebnis
als priorisierten Optimierungsplan in einem GitHub-Issue fest. Die Issues sind zugleich das Gedächtnis
des Skills: Eine Komponente mit Review-Issue kommt in dieser Runde nicht erneut dran. Auf Wunsch prüft
er mehrere oder alle Komponenten in einem Sammel-Review (Abschnitt 7).

Der Skill **ändert keine Dateien**: kein Commit, kein Push, kein PR. Nach außen schreibt er nur
Issues und Issue-Kommentare: das Review-Issue, im Sammel-Review die Cluster-Issues und das Epic, und
nach Rückfrage den Kommentar zu einem bereits gelösten Issue. Die Umsetzung der Befunde ist ein eigener
Schritt, bei Architektur-Verstößen typischerweise über den Skill `migrate-to-skeleton`.

Ausgabe und Issue auf Deutsch.

Geprüft wird der Branch `release/4`, sofern der Nutzer keinen anderen nennt. Code, Doku, Themes und
Skill werden ausschließlich auf diesem Branch gelesen. Jedes Issue nennt Branch und Commit, gegen den
geprüft wurde, und alle Datei:Zeile-Angaben beziehen sich auf diesen Commit.

Für mehrere oder alle Komponenten in einem Durchgang gilt zusätzlich Abschnitt 7 (Sammel-Review).

## 1. Spezifikation und Vorrang

In dieser Reihenfolge maßgeblich:

1. Die Pflichtregeln und Prüfpunkte in diesem Skill (Abschnitt 4). Sie haben Vorrang vor allen
   Dokumenten.
2. `packages/components/docs/ARC42-SKELETON.md`
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
- `skeleton` und `click-button`: Referenzimplementierung der Architektur.
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
- gemergte PRs seit dem letzten Review der Komponente, damit bereits Behobenes nicht erneut gemeldet
  wird

Ist ein offenes Issue im Code bereits gelöst, das mit Beleg (Datei:Zeile, Commit bzw. PR, der es
behoben hat) in der Ausgabe nennen und vorschlagen, es zu schließen. Geschlossen wird es erst nach
Rückfrage beim Nutzer, mit einem Kommentar, der den Beleg enthält.

## 4. Prüfen

### Pflichtregeln

Ein Verstoß hat den Schweregrad **Blocker (Architektur)**.

- **R1:** Jede Stencil-Komponente erbt von `BaseWebComponent`, direkt oder über eine Basisklasse wie
  `BaseFormFieldWebComponent` oder `BaseTextInputWebComponent`. Die Vererbungskette prüfen; eine Suche
  nach dem Klassennamen in `component.tsx` reicht nicht. Fehlt die Vererbung, auf den Skill
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

Gemeldet wird ein Wrapper-Element, das genau ein Element ohne Geschwister umschließt und sich
entfernen lässt, ohne dass ein Knoten zwei Blöcke trägt. DOM vorher und nachher sowie die alten und
neuen BEM-Klassen nennen.

Vor dem Melden das umschlossene Kind einordnen:

| Umschlossenes Kind                                                                                                                        | Bewertung                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Element der eigenen Komponente (Klasse `kol-<block>__…`)                                                                                  | melden: Das Kind wird zur Wurzel bzw. zum Element und übernimmt Block oder Elementklasse des Wrappers.                                                                                                                       |
| Teilbaustein, der Block oder Elementklasse vom Aufrufer übernimmt (z. B. `DialogFC` mit `blockClass` in drawer)                           | melden: Der Teilbaustein bekommt die Klasse des Wrappers, es entsteht kein zweiter Block.                                                                                                                                    |
| Wurzel einer eingebetteten Komponenten-FC mit eigenem Block (`ButtonFC` → `kol-button`, `LinkFC` → `kol-link`, `BadgeFC` → `kol-badge` …) | **nicht als Befund melden.** Der eigene Block der eingebetteten FC ist korrekt: Über ihn erreichen Basis-Styles und Theme die eingebettete Komponente (ARC42-SKELETON, „Embedded Components (Items)“, Designentscheidung 5). |

Für den dritten Fall gilt:

- Ist der Wrapper die Wurzel der Komponente selbst (z. B. `div.kol-version > div.kol-badge`), ist er
  immer berechtigt. Ohne ihn hätte die Komponente einen fremden Block an der Wurzel, und das verletzt R3.
- Ist der Wrapper ein Element der umgebenden Komponente (z. B. `div.kol-breadcrumb__link > div.kol-link`),
  wäre die Alternative ein BEM-Mix am selben Knoten (`div.kol-link.kol-breadcrumb__link`). Ob ein Mix
  zulässig ist, ist nicht entschieden (#11516). Solche Wrapper nur unter „Offene Fragen“ führen, mit
  Verweis auf #11516.

Weitere Regeln:

- Hat das Element Geschwister (z. B. Tooltip, Beschreibung), ist der Wrapper berechtigt und wird nicht
  gemeldet.
- Ein Wrapper, den eine Animation oder ein Layout-Mechanismus braucht (z. B. die Grid-Höhen-Transition
  von `__wrapper-animation`), wird nur gemeldet, wenn der Befund zeigt, dass das Verhalten ohne ihn
  erhalten bleibt.
- Fehlt das benötigte Tag in der `component`-Union von `BemRootNodeFC`, dafür keinen eigenen Befund
  anlegen, sondern auf #11521 („BemRootNodeFC: component-Union erweitern“) verweisen, solange es offen
  ist. Ist es geschlossen und das Tag weiterhin nicht enthalten, den Punkt im Abschnitt „Querschnitt“
  des Plans aufführen.

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
  `!important`, keine `@layer` in Utility-Dateien. Folgende Fälle sind keine Verstöße, sondern werden
  mit ⚖ als Entscheidungsbedarf geführt, solange AGENTS.md keine Ausnahme dafür nennt: `!important` in
  `forced-colors`-, `prefers-reduced-motion`-, `[hidden]`- und `.visually-hidden`-Regeln;
  `overflow: hidden` für `text-overflow: ellipsis` und in `.visually-hidden`; 0-Resets der
  User-Agent-Abstände (#10756).
- **Theme-SCSS:** flache BEM-Struktur, kein `$root` und kein `@at-root`, nur Tokens referenzieren, keine
  eigenen Scheme-Media-Queries, keine Redundanz zum Basis-Styling.
- **CSS Custom Properties:** nur dokumentierte `--kol-<komponente>-<name>`-Tokens, sonst SASS-Variablen.
  Custom Properties, die JavaScript zur Laufzeit setzt (z. B. per `style={{ '--level': … }}`), lassen sich
  nicht durch SASS ersetzen; bei ihnen nur das Namensschema prüfen und mit ⚖ führen.
- **Inline-Doku:** keine Historie, keine Wiederholung des Codes.
- **Tests und Sample:** Unit- und Snapshot-Tests sowie das React-Sample sind vorhanden und aussagekräftig.
- **Konventionen:** keine Barrel-Dateien; Listen, Imports und Union-Literale alphabetisch.

## 5. Plan erstellen

Befunde absteigend nach Schweregrad sortieren:

| Schweregrad           | Bedeutung                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------ |
| Blocker (Architektur) | Verstoß gegen R1–R5                                                                        |
| Blocker (Bug/A11y)    | nachvollziehbares Fehlverhalten oder Barriere (Eingabe → falsches Ergebnis)                |
| Breaking API          | erfordert ein Major-Release                                                                |
| Breaking Theming      | DOM-/BEM-Änderung; Minor-Release mit Label `release:theming`, alle Themes im Repo anpassen |
| UX/visuell            | sichtbare Abweichung ohne Bruch                                                            |
| Polish                | Konventionen, Doku, Kleinigkeiten                                                          |

„Blocker (Bug/A11y)“ nur vergeben, wenn sich ein konkreter Ablauf mit falschem Ergebnis benennen lässt.
Ein Änderungswunsch am dokumentierten Verhalten ist „UX/visuell“, ein verletzter Vertrag ohne
sichtbare Folge „Polish“.

Markierungen:

- **⚑** — Der Fehler ist aus Code und Event-Fluss abgeleitet, aber nicht im Browser beobachtet. Der
  Vorschlag beginnt dann mit einem e2e-Test, der den Fehler reproduziert.
- **⚖** — Die Regel kollidiert mit einer berechtigten Nutzung. Statt einer Korrektur wird eine
  Entscheidung vorgeschlagen: umsetzen oder als Ausnahme in AGENTS.md und diesem Skill dokumentieren.

Pro Befund:

- Schweregrad
- Kurzbeschreibung
- Beleg: Datei:Zeile und die verletzte Regel bzw. die Spec-Stelle (Dokument und Abschnitt)
- Vorschlag zur Behebung in 1–2 Sätzen
- Aufwand: S (unter 2 h), M (bis 1 Tag), L (mehr als 1 Tag)
- bestehendes Issue oder PR, falls vorhanden
- Darstellung: ob der Fix Pixel ändert. Ein Refactor muss ohne Bild-Diff bleiben
  (`zero-visual-delta-handoff`). Ein Bugfix, der Pixel ändern muss, nennt die betroffenen Snapshots;
  sie werden auf der Review-Seite des PRs bewusst freigegeben (`docs/visual-review.md`).

Nur Befunde mit Beleg melden. Was unsicher ist, unter „Offene Fragen“ führen statt als Befund.

### Begründung je Befund-Cluster

Befunde, die auf dieselbe Regel und dieselbe Ursache zurückgehen, bilden einen Cluster (z. B. „R4:
Wurzel per `bem.forBlock`“ oder „Flaches DOM: Wrapper um eine eingebettete FC“). Damit die Maintainer
beurteilen können, ob ein Befund echten Nutzen bringt oder nur zwischen zwei Regelauslegungen hin und
her optimiert, erläutert der Plan **jeden Cluster an genau einem nachvollziehbaren Beispiel** aus dem
geprüften Code:

1. **Ist:** ein kurzer Code- oder DOM-Ausschnitt mit Datei:Zeile, so wie er heute im Repo steht.
2. **Warum ein Befund:** die verletzte Regel mit Fundstelle und die konkrete Auswirkung. Die Auswirkung
   benennt, wen es trifft, also Nutzende (Bug, Barriere), Theme-Autoren (Selektoren, Spezifität) oder nur
   die Code-Konsistenz (Typsicherheit, Einheitlichkeit). Trifft es nur die Konsistenz, das so schreiben.
3. **Soll:** derselbe Ausschnitt korrigiert, als Code oder DOM, mit den alten und neuen BEM-Klassen,
   wenn sich Klassen ändern.
4. **Bewertung:** ob die Korrektur das gerenderte DOM ändert (Theming-Bruch) oder nicht (reiner
   Refactor), und eine Empfehlung: umsetzen, bündeln oder zurückstellen.

Vor dem Anlegen des Issues jeden Cluster auf Widersprüche prüfen und gefundene Widersprüche unter
„Offene Fragen“ führen statt als Befund:

- gegen bestehende Entscheidungen: Migrationspläne unter `docs/`, ADRs, geschlossene Issues und
  gemergte PRs, die genau diese Struktur bewusst festgelegt haben (z. B. „DOM und BEM bleiben“);
- zwischen den Regeln dieses Skills: Ein Soll-Zustand, den eine Regel verlangt, darf nicht zugleich
  von einer anderen Regel als Befund gewertet werden, etwa wenn das Entfernen eines Wrappers (Flaches
  DOM) die Wurzel einer eingebetteten FC zur Wurzel der Komponente macht und dadurch R3 verletzt.

## 6. Issue anlegen und ausgeben

- Titel: `Skeleton-Review: <ordnername>`
- Label: `skeleton-review`. Gibt es das Label im Repo nicht, das Issue ohne Label anlegen, im Chat
  darauf hinweisen und für die Auswahl in Abschnitt 2 zusätzlich nach dem Titel suchen.
- Unmittelbar vor dem Anlegen jeden Befund gegen den aktuellen Kopf des geprüften Branches nachprüfen.
  Was inzwischen behoben ist, entfällt; geänderte Zeilen werden aktualisiert.
- Inhalt:

```markdown
## Zusammenfassung

<2–3 Sätze, Anzahl der Befunde pro Schweregrad>

## Befunde

| #   | Schweregrad | Befund | Beleg | Vorschlag | Aufwand | Bezug |
| --- | ----------- | ------ | ----- | --------- | ------- | ----- |
| 1   | …           | …      | …     | …         | …       | …     |

## Begründung je Cluster

### <Cluster, z. B. „R4: Wurzel per bem.forBlock“> (Befunde #…)

- **Ist** (`<datei>:<zeile>`): <Ausschnitt>
- **Warum ein Befund:** <Regel mit Fundstelle; wen es trifft und wie>
- **Soll:** <korrigierter Ausschnitt; alte → neue BEM-Klassen>
- **Bewertung:** <DOM ändert sich ja/nein; umsetzen / bündeln / zurückstellen>

## Querschnitt

<Befunde, die nicht nur diese Komponente betreffen, oder „keine“>

## Offene Fragen

<oder „keine“>

## Hinweis zur Umsetzung

Theming-Änderungen werden nach dem Skill `zero-visual-delta-handoff` abgesichert, Architektur-Verstöße
über den Skill `migrate-to-skeleton` behoben.
```

Zum Schluss im Chat den Link zum Issue und die Zusammenfassung ausgeben.

## 7. Sammel-Review mehrerer Komponenten

Verlangt der Nutzer ein Review mehrerer oder aller Komponenten, gelten die Abschnitte 1–5 je
Komponente, mit diesen Abweichungen:

1. **Zwei Durchläufe.** Durchlauf 1 sammelt die Befunde je Komponente. Durchlauf 2 prüft jeden Befund
   kritisch am Code nach: Beleg, Regel und Schweregrad stimmen; offene Fragen werden geklärt, wo der
   Code es zulässt; übersehene Befunde werden ergänzt. Jeder Befund trägt danach einen Status
   (bestätigt, korrigiert, neu), Gestrichenes wird mit Grund festgehalten. Mehrere Agenten dürfen
   parallel arbeiten, jeweils mit festen Gruppen von Komponenten.
2. **Bündeln statt einzeln anlegen.** Die Befunde werden nach Ursache zu Clustern zusammengefasst
   (Abschnitt 5, „Begründung je Befund-Cluster“) und dem Nutzer als klassifizierte Übersicht mit Zahlen
   je Schweregrad und Cluster vorgelegt. Ein Issue je Komponente wird nicht automatisch angelegt.
3. **Vor dem Anlegen fragen.** Issues werden erst angelegt, wenn der Nutzer es für einen Cluster
   verlangt. Ein Issue je Cluster enthält alle Fundstellen mit Datei:Zeile, Ursache, Folge, Soll und
   eine Checkliste, damit jeder Punkt als eigener PR umgesetzt werden kann. Punkte mit eigenem Issue
   werden nur verlinkt.
4. **Epic.** Gibt es Issues für mehrere Cluster, fasst ein Issue vom Typ Epic sie als Sub-Issues
   zusammen, mit einer Tabelle Cluster → Issue und einer empfohlenen Reihenfolge: Fehler für Nutzende
   zuerst, Architekturentscheidungen vor den Refactors, die von ihnen abhängen.
5. **Zuweisen und einplanen.** Zuweisungen und Labels setzt der Skill auf Wunsch des Nutzers. Felder
   eines GitHub-Projekts (Sprint, Status) lassen sich aus einer Claude-Code-Sitzung nicht setzen, weil
   GraphQL und die Projekt-Endpunkte der Organisation gesperrt sind. Das dem Nutzer am Ende sagen, statt
   es zu versuchen.
