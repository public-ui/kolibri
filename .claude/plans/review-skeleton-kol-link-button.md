# Review: Kol-Link & Kol-Link-Button vs. Skeleton-Konzept (Kreuzverhör)

## Context

Auf dem Branch `claude/migrate-kollink-skeleton-W6i6v` wurden `kol-link` und `kol-link-button`
bereits auf die **Skeleton-Architektur** migriert (Web Component → Controller → Functional
Component → Props/Schema). Aufgabe: den migrierten Stand gegen das dokumentierte Skeleton-Konzept
reviewen und per **Kreuzverhör** (adversariale Verifikation jeder Annahme) echtes
Optimierungspotenzial von Schein-Findings trennen.

**Verdict vorab:** Die Migration ist **funktional solide** — kein Critical. Der Kern (Controller +
FC werden zwischen beiden Komponenten geteilt, `LinkApi` als gemeinsamer Kontrakt) ist sauber. Die
Findings betreffen **Skeleton-Konformität, Doku-Vollständigkeit, DRY und Cleanup**.

---

## Was das Kreuzverhör überworfen hat (3 Schein-Findings eliminiert)

Diese hätte ein oberflächliches Review als echte Befunde gemeldet — die Verifikation widerlegt sie:

1. **„`_variant: string` ist eine Typ-Regression"** → **FALSCH.** `VariantClassNamePropType` ist
   buchstäblich `type = string` ([variant-class-name.ts:5](packages/components/src/schema/props/variant-class-name.ts:5)).
   Funktional identisch, kein Safety-Verlust. (Bleibt nur als kosmetische Naming-Konsistenz, L3.)
2. **„`schema/components/link.ts` ist totes Legacy-Schema"** → **FALSCH & gefährlich.** `LinkProps`
   ist **load-bearing**: genutzt von `skip-nav`/`breadcrumb`/`table`/`toolbar-items`-Schemas und
   **öffentlich exportiert** ([components.d.ts:19](packages/components/dist/types/components.d.ts)).
   Löschen wäre ein Breaking Change gewesen. **Nicht anfassen.**
3. **„`kol-link` hat die `@deprecated`-Doku bei `_role` verloren"** → **FALSCH.** Auch `develop`s
   Quelle hatte kein `@deprecated` an `kol-link._role`, trotzdem zeigt die readme `[DEPRECATED]`
   (kommt aus dem Typ, nicht aus dem Prop-JSDoc). Keine Regression. (Verbleibt als Open Question Q2.)

---

## Findings nach Severity

### Critical

**Keine.** Kein WCAG-Verstoß, kein `any`-Leak, kein API-Bruch ohne Migrationspfad, kein gebrochener
Event-/Slot-Kontrakt. Public-Prop-Set, Event-Dispatch (`KolEvent.click`) und Methoden
(`focus`/`click`, jetzt async + `delegateFocus` gem. Focus-Delegation-Pattern) sind erhalten.

### High

**H1 — `kol-link-button`-Migration ist unvollständig ggü. den dokumentierten Skeleton-Regeln.**
Die Skill-Doku schreibt für die Web-Component-Schicht zwei Dinge vor:

- `…/{name}/component.tsx` als Dateiname ([migrate-to-skeleton.md:99](.claude/commands/migrate-to-skeleton.md))
- `extends BaseWebComponent<Api> implements WebComponentInterface<Api>` ([migrate-to-skeleton.md:101](.claude/commands/migrate-to-skeleton.md))

`kol-link` erfüllt **beides** ([component.tsx:27](packages/components/src/components/link/component.tsx:27)).
`kol-link-button` erfüllt **keines**: liegt weiter als `shadow.tsx` (Legacy-Name) und deklariert nur
`extends BaseWebComponent<LinkApi>` **ohne** `implements WebComponentInterface<LinkApi>`
([shadow.tsx:40](packages/components/src/components/link-button/shadow.tsx:40)). Das fehlende Interface
kostet die Compile-Zeit-Garantie, dass das `@Prop`/`@Watch`/Methoden-Set vollständig zum `LinkApi`
passt. → **Datei nach `component.tsx` umbenennen + Interface implementieren.**
(Kontext: 20 migrierte Komponenten nutzen `component.tsx`, 42 Legacy-Komponenten noch `shadow.tsx`.)

**H2 — `kol-link` dokumentiert seinen `expert`-Slot nicht.**
Die geteilte FC rendert für **beide** Komponenten `<slot name="expert">`
([link FC component.tsx:101](packages/components/src/internal/functional-components/link/component.tsx:101)),
und `_label={false}` aktiviert ihn. `kol-link-button` dokumentiert das per Klassen-JSDoc
`@slot expert` ([shadow.tsx:28-32](packages/components/src/components/link-button/shadow.tsx:28)) →
readme hat eine „## Slots"-Sektion. `kol-link` hat **kein** Klassen-JSDoc → seine
[readme.md](packages/components/src/components/link/readme.md) hat **keine** Slots-Sektion. Stencil
generiert Slot-Doku aus diesem JSDoc; der Slot-Kontrakt ist für `kol-link` somit undokumentiert.
Trifft direkt die User-Präferenz „alle Stencil-relevanten Infos immer angeben". → **Klassen-JSDoc
mit `@slot expert` an `kol-link` ergänzen.**

**H3 — Erhebliche WC-Duplikation; der teilbare Anteil ist nicht extrahiert.**
`link/component.tsx` und `link-button/shadow.tsx` sind zu ~95 % identisch. Davon ist der größte Teil
(`@Prop`/`@Watch`-Dreieck, ~150 Zeilen) **systembedingt** — Stencils statischer Compiler verlangt
Decorator-Deklarationen je Klasse, das lässt sich nicht vererben. **Aber** zwei Blöcke sind
byte-identisch und echt extrahierbar:

- `componentWillLoad`-Mapping (~24 Zeilen) → es existiert bereits `initLinkControllerFromProps(ctrl, props)`
  ([controller.ts:320](packages/components/src/internal/functional-components/link/controller.ts:320)),
  das **7 andere Komponenten** (nav, breadcrumb, toolbar, table-stateless, skip-nav, form, tree-item)
  schon nutzen — die beiden WCs inlinen es stattdessen. → `initLinkControllerFromProps(this.ctrl, this)`.
- `render()`-Prop-Verdrahtung (~28 Props an `LinkFC`, identisch) → in eine kleine Helper-Funktion
  `renderLinkFC(ctrl, ariaCurrent, onAnchorClick)` ziehen.

### Low

**L1 — Totes Legacy-Schema `schema/components/link-button.ts`** (`LinkButtonProps`): keine
Consumer, **nicht** im Public-Export → nach Migration entfernbar (inkl. Barrel-Eintrag
[index.ts:30](packages/components/src/schema/components/index.ts:30)).
⚠️ **`link.ts` NICHT löschen** (siehe Überwurf #2). `button-link.ts` wirkt ebenfalls tot — out of
scope, siehe Q3.

**L2 — `ariaCurrent`-State-Sichtbarkeit inkonsistent:** `public` in `kol-link`
([component.tsx:161](packages/components/src/components/link/component.tsx:161)) vs. `private` in
`kol-link-button` ([shadow.tsx:45](packages/components/src/components/link-button/shadow.tsx:45)).
Kein externer Zugriff verifiziert → in `kol-link` auf `private` angleichen.

**L3 — Prop-Typ-Stil divergiert:** `kol-link` nutzt rohe TS-Typen (`string`, `boolean`, `_variant: string`),
`kol-link-button` + Schema die benannten Alias-Typen (`HrefPropType`, `AccessKeyPropType`,
`DownloadPropType`, `LabelWithExpertSlotPropType`, `VariantClassNamePropType`, …). Für konsistente
generierte Doku `kol-link` auf die benannten Typen angleichen (funktional identisch).

**L4 — JSDoc-Inhalt divergiert** bei identischen Props (z. B. `_ariaControls` mit MDN-Link in
link-button, ohne in link; ein- vs. mehrzeilig). Harmonisieren, damit beide readmes übereinstimmen.

### Open Questions / Needs Deeper Look

- **Q1:** Soll `kol-link` überhaupt button-orientierte `_variant`/`_customClass` exponieren
  (semantischer Link vs. Button-Styling)? Auf `develop` bereits vorhanden → Produkt-/API-Entscheidung,
  kein Migrationsdefekt.
- **Q2:** `_role`-Deprecation kommt vermutlich aus dem Typ, nicht aus dem Prop-JSDoc. Verifizieren,
  dass `[DEPRECATED]` nach Doku-Regenerierung erhalten bleibt; sonst Tag an `kol-link._role` ergänzen.
- **Q3:** `button-link`-Komponente + `schema/components/button-link.ts` wirken ungenutzt — ist
  `button-link` ein deprecated Duplikat von `link-button`? Separater Pass.
- **Q4:** Committete `readme.md` regenerieren der Build vor dem Merge? Sicherstellen, dass die
  Doku-Artefakte zur migrierten Quelle passen.

---

## Empfohlene Remediation (gestaffelt)

> **Entscheidung:** Review-only — in dieser Session **keine Umsetzung**. Die folgende Staffelung ist
> die Empfehlung für einen späteren Implementierungs-Pass.

| Stufe                        | Umfang                                                                                  | Findings       | Risiko                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------- |
| **A — Safe Doc/Consistency** | nur JSDoc/Typen, kein Verhalten                                                         | H2, L2, L3, L4 | minimal                                                 |
| **B — Skeleton-Konformität** | `link-button`: rename `shadow.tsx`→`component.tsx` + `implements WebComponentInterface` | H1             | gering (Datei-/Test-Pfade)                              |
| **C — DRY-Refactor**         | `initLinkControllerFromProps` + `renderLinkFC`-Helper in beiden WCs                     | H3             | mittel (Snapshot-Verifikation nötig)                    |
| **D — Schema-Cleanup**       | `link-button.ts` entfernen (+ Barrel)                                                   | L1             | gering (unused, aber Public-Barrel — Type-Check danach) |

`link.ts` bleibt unangetastet. `@Prop`/`@Watch`-Dreieck-Duplikation bleibt (Stencil-Constraint).

## Verification (nach Umsetzung)

- **Typcheck/Build** des betroffenen Packages: `nx build components` (bzw. Projekt-Äquivalent) —
  fängt Interface-Mismatch (H1) und Schema-Removal-Folgen (D) ab.
- **Snapshots** für `link` + `link-button`: `nx test components` — muss nach C/A grün/unverändert
  bleiben (DOM/ARIA identisch).
- **readme-Regenerierung** prüfen: nach H2 erscheint eine „## Slots"-Sektion in `link/readme.md`.
- **Dead-Schema-Gegencheck (D):** `grep -rn "LinkButtonProps" packages` muss leer bleiben.

---

## Pädagoge-Zusammenfassung

**Prozess:** 3 Explore-Agents (parallel) für Anatomie/Beziehung/Skeleton-Konzept → Architect-geführtes
Kreuzverhör per direkter Quell-Verifikation (Reads + gezielte greps/git). Token-effizient: kein
Repo-Healthcheck, keine Routine-Builds.

**Wirksamkeit des Kreuzverhörs:** Hoch — **3 von ~9 Kandidaten-Findings wurden widerlegt**, darunter
ein Schein-Critical (Variant-Typ) und eine gefährliche Lösch-Empfehlung (`link.ts`/`LinkProps` ist
Public-API). Das ist genau der Mehrwert des adversarialen Vorgehens.

**Rollen-Feedback (Architect/Reviewer):**

- Confidence: 8/10 · Aufgaben-Klarheit: 5/5
- Begründung: Findings sind mit Datei:Zeile belegt und gegen die aktuelle Quelle verifiziert.
- Hindernis: readme-Deprecation-Mechanik (Typ vs. Prop-JSDoc) nicht 100 % aufgelöst → bewusst als Q2.
- Positives: Skeleton-Konzept klar dokumentiert (migrate-to-skeleton.md + \_skeleton/), Gold-Standards
  (icon/heading) vorhanden.
- Verbesserungsvorschlag: Migration sollte den Skeleton-Konformitäts-Check (Dateiname + Interface)
  und den `@slot`-Doku-Check als feste Abschlussschritte führen — beide Lücken (H1/H2) wären sonst
  systematisch vermeidbar.
