---
name: migrate-to-skeleton
description: Migriert eine Legacy-KoliBri-Komponente auf die Skeleton-Blueprint-Architektur (WC-Orchestrator → optionale Behaviors + FC + Props-Pattern). Führt durch Gap-Analyse, Props-First, Layer-Refactor, Legacy-Rückbau und die Abnahme-Gates (Unit-Tests, öffentliche API-Parität, Pixel-Gate). Trigger: "Skeleton-Migration", "Komponente migrieren", "auf Skeleton umbauen", "migrate-to-skeleton", "BaseWebComponent", "Prop-Triangle", "propsConfig", "ApiFromConfig", "BemRootNodeFC", "Legacy-Komponente umbauen", "Controller auflösen", "Aspect-Klasse auflösen", "Dead-Schema-Abbau", "Skeleton-Blueprint", "migrate to skeleton".
---

# Migrate to Skeleton

Baut eine Legacy-Komponente auf die Skeleton-Blueprint-Architektur um. Zielbild ist das **2-Schichten-Modell**: **WC (Orchestrator) → optionale Behaviors + FC**. Zwischen Custom Element und FC liegt **keine** Controller-/Aspect-Klasse mehr — der WC erbt von `BaseWebComponent<Api>` und hält die Logik inline (`initRenderProps`, `setRenderProp`, `getRenderProp`, `setState`/`getState`). Hat die Legacy-Komponente noch einen Controller oder Aspect, wird dessen Logik in den WC gezogen. Nur echt komponentenübergreifende Logik wird zu einem `Behavior` (erbt von `BaseBehavior`).

**Argument:** der Komponentenname ohne `kol-`-Präfix, z. B. `card`, `tooltip`, `alert`. Im Folgenden `<komponente>`.

**Arbeitsweise:** analysieren → planen → umsetzen → prüfen. Klare Schichtentrennung, Single Responsibility, lesbare Namen, keine Sonderfälle ohne Begründung. Toter Code wird entfernt, nicht auskommentiert.

## 1. Quellenhierarchie

Bei Widersprüchen gilt diese Reihenfolge:

1. **Implementierungscode** — was Build und Tests tatsächlich prüfen:
   - `packages/components/src/internal/functional-components/base-web-component.ts`
   - `packages/components/src/internal/functional-components/base-behavior.ts`
   - `packages/components/src/internal/functional-components/generic-types.ts`
   - `packages/components/src/components/_skeleton/web-components/skeleton/component.tsx`
   - `packages/components/src/internal/functional-components/skeleton/api.tsx` und `.../skeleton/component.tsx`
2. **`packages/components/src/components/_skeleton/ARC42.md`** — die maßgebliche Spezifikation (Architekturnarrativ, Typverträge, 15 Design Decisions).
3. **Migrierte Vorbilder** (Produktionsform, jeweils pixelgeprüft gegen ihren Vorgänger):
   - `packages/components/src/components/button/component.tsx` + `internal/functional-components/button/` (inkl. transitionalem `button/wc.tsx`)
   - `packages/components/src/components/link/component.tsx` + `internal/functional-components/link/` (inkl. `link/wc.tsx`) — enthält das vollständige Behavior-Lebenszyklus-Muster
   - Weitere bereits migrierte Komponenten als Kurzvorbilder: `abbr`, `avatar`, `heading`, `icon`, `image`, `meter`, `progress`, `quote`, `spin`

Weicht ARC42 vom Code ab, ist das ein Fehler in einem von beiden: Doku korrigieren, wenn der Code richtig ist — sonst den Widerspruch melden, statt ihn stillschweigend zu übergehen.

> **Veraltet, nicht als Quelle verwenden:** `SKELETON_AUDIT_REPORT.md` (Repo-Root) und `docs/arc42/09-architecture-decisions.md` → ADR-017 beschreiben noch den abgeschafften Controller-Layer (siehe ARC42 Design Decision 1).

## 2. Arbeitsverzeichnisse

- `packages/components/src/components/_skeleton/` — **schreibgeschützte** Referenz.
- `packages/components/src/components/<komponente>/` und `packages/components/src/internal/functional-components/<komponente>/` — Arbeitsbereich.
- `packages/components/src/internal/props/` — gemeinsame Prop-Definitionen (54 vorhanden), wird erweitert.

## 3. Phase 1 — Gap-Analyse

1. **Alle** Dateien in `packages/components/src/components/<komponente>/` lesen.
2. Skeleton-Blueprint und die Basis-Internals aus Abschnitt 1 lesen.
3. Gap-Analyse-Tabelle erstellen — sie **ist** der Migrationsplan:

| Aspekt       | Legacy (Ist)                          | Skeleton (Soll)                                                 | Maßnahme |
| ------------ | ------------------------------------- | --------------------------------------------------------------- | -------- |
| Vererbung    | …                                     | `BaseWebComponent<Api>`                                         | …        |
| Logikschicht | Controller-/Aspect-Klasse oder inline | Im WC absorbiert; Behavior nur bei echter Wiederverwendung      | …        |
| Props        | …                                     | Definitionen in `internal/props/` + vollständiges Prop-Triangle | …        |
| Rendering    | …                                     | Zustandsloser FC + `BemRootNodeFC` + nacktes `<Host>`           | …        |

## 4. Phase 2 — Props First

Erst die Props, dann alles andere. Das Props-Inventar **ist** der öffentliche API-Vertrag.

1. Alle bestehenden `@Prop()`-Deklarationen sammeln — inklusive JSDoc, Schema-Alias-Typen, Defaults und `@deprecated`-Markierungen.
2. Vorhandene Definitionen aus `packages/components/src/internal/props/` wiederverwenden, wo möglich.
3. Für neue Props je eine Datei `internal/props/<prop-name>.ts` anlegen (`SimpleProp` bzw. `Prop`, Normalisierung und Validierung über `createPropDefinition`) — Muster: `internal/props/level.ts`, Snippet in `reference/patterns.md`.
4. Neue Props in `packages/components/src/internal/props/index.ts` exportieren.

Hintergrund: `packages/components/src/components/_skeleton/ARC42.md#schema-helper-layer`.

## 5. Phase 3 — Refactor nach Schichten

1. **API** — `internal/functional-components/<komponente>/api.tsx`
   `propsConfig` mit `required`/`optional` (`PropsConfigShape`), API-Typ über `ApiFromConfig`. Nur benötigte Abschnitte deklarieren (`Callbacks`, `Emitters`, `Listeners`, `Methods`, `Refs`, `States`) — ARC42 Design Decision 11.
2. **Functional Component** — `internal/functional-components/<komponente>/component.tsx`
   Zustandsloser Renderer mit `FunctionalComponentProps<Api>`, einziger Wurzelknoten in `BemRootNodeFC` (typisierte `block`/`modifiers`, gemergte `class`). Keine Seiteneffekte, keine Zustandsmutation.
3. **Behavior** — `internal/functional-components/<komponente>/behavior.ts`, **nur wenn nötig**
   Erst anlegen, wenn die Logik tatsächlich über mehrere Komponenten geteilt wird (Vorbild: `internal/functional-components/tooltip/behavior.ts`). Die meisten Komponenten brauchen **keins**. Controller-/Aspect-Logik wandert zuerst in den WC; ein Behavior wird nur für wiederverwendbare Anteile extrahiert.
4. **Web Component** — `components/<komponente>/component.tsx`, der Orchestrator
   `@Component({ tag: 'kol-<komponente>', shadow: true })`, erbt `BaseWebComponent<Api>`, implementiert `WebComponentInterface<Api>` **und** das Schema-`*Props`-Interface (z. B. `implements LinkProps`), damit API-Drift den Build bricht. Aufbau, Prop-Triangle, Behavior-Lebenszyklus und Zustandszugriff: `reference/patterns.md`.
5. **Öffentliche API-Parität sichern**
   Der migrierte WC muss **exakt** dieselbe `@Prop`/`@Method`-Oberfläche bieten wie der Vorgänger — gleiche Member, gleiche Schema-Alias-Typen, gleiche Defaults, gleiche JSDoc (`custom-elements.json`, `docs-vscode` und die Adapter-IntelliSense werden daraus erzeugt). Oberfläche in `packages/components/src/components/_skeleton/public-api.spec.ts` festnageln und gegen den Vorgänger diffen. Details: `ARC42.md#public-api-contract-migration-parity`.
6. **Tests** — ko-lokalisiert neben `component.tsx`
   `snapshot.spec.tsx` über `executeSnapshotTests`; `interaction.e2e.ts` nur, wenn Interaktionsverhalten es rechtfertigt.

## 6. Phase 4 — Legacy-Rückbau

- Verwaiste Dateien, obsolete Wrapper und alte Controller-/Aspect-Module löschen (ihre Logik liegt jetzt im WC oder im Behavior).
- Ungenutzte Imports, Typen und auskommentierten Code entfernen.

**Dead-Schema-Erkennung.** Alte Legacy-Schemas werden nach der Migration abgebaut:

```bash
# 1. Wird das alte Schema noch importiert?
grep -r "schema/components/<komponente>" packages/components/src --include="*.ts*"
```

- 0 Treffer → toter Code: Re-Export in `packages/components/src/schema/index.ts` entfernen, danach `packages/components/src/schema/components/<komponente>.ts` löschen.
- Treffer → noch in Nutzung (z. B. Samples, Tests) → stehen lassen.

**Ausnahme — veröffentlichte Typ-Oberfläche ist kein toter Code:** nicht referenzierte Schema-Typen (`ButtonStates`, `ButtonAPI`, `DetailsStates`, `DetailsAPI`, …) und Schema-Validatoren (z. B. `validateDetailsCallbacks`), die weiterhin aus `schema/index.ts` exportiert werden, bleiben bestehen. Sie gehören zur veröffentlichten API — sie zu entfernen ist ein eigener Breaking Change, kein Aufräumen (Vorbild: die Button-Migration behielt `ButtonStates`/`ButtonAPI`).

## 7. Phase 5 — Abnahme

Aus dem Repo-Root, laufende Kommandos nicht abbrechen:

```bash
pnpm format
pnpm lint
pnpm --filter @public-ui/components test:unit
```

Bei geänderter Build- oder Packaging-Konfiguration zusätzlich:

```bash
pnpm --filter @public-ui/components build
```

**Pixel-Gate.** Eine Skeleton-Migration baut das DOM um — grüne Unit-Tests sind dafür kein Nachweis. Die visuelle Abnahme läuft über den Companion-Skill **`zero-visual-delta-handoff`**: null geänderte Snapshot-Bilder gegen den Base-Branch, geprüft im Docker-Lauf (`node scripts/snapshots-docker.mjs <theme> --check`). Ohne Docker wird die visuelle Prüfung nicht durch lokale Playwright-Läufe ersetzt, sondern als offene Arbeit dokumentiert und übergeben.

Durchgeführte Beispiele mit Befunden und Stolperstellen: `.claude/plans/migrate-kol-button-skeleton.md`, `.claude/plans/migrate-kol-link-skeleton-2th.md`.

## 8. Konventionen

- `shadow: true` für Web Components.
- Kein `class`-Attribut am `<Host>`.
- Externe Props mit Unterstrich (`_name`, `_label`).
- Tests ko-lokalisiert bei den Komponentendateien; kein `data-testid` im Markup — stabile BEM-Selektoren verwenden (ARC42 DD13/DD14).
- Keine neuen Barrel-Dateien.
- ARIA-Referenz-IDs (`aria-controls`, `aria-labelledby`, `aria-describedby`, `aria-owns`) müssen pro Instanz eindeutig sein — `createUniqueId('prefix')` bzw. `createRelatedUniqueId(baseId, 'suffix')` aus `utils/dev.utils` (ARC42 DD12).
- Event-Handler als stabile Arrow-Properties, nie `.bind(this)` bei `addEventListener`/`removeEventListener` (`ARC42.md#event-handler-policy`).

## 9. Pre-Review-Checkliste

- [ ] Gap-Analyse erstellt und als Migrationsplan verwendet
- [ ] API nutzt `PropsConfigShape` + `ApiFromConfig`, nur benötigte Abschnitte deklariert
- [ ] WC ist Orchestrator: erbt `BaseWebComponent<Api>`, keine Controller-/Aspect-Klasse, `this.initRenderProps(propsConfig)` einmalig in `componentWillLoad()`
- [ ] Prop-Triangle für **jeden** `@Prop()` vollständig (Deklaration, `@Watch`, Anwendung beim Laden)
- [ ] Watcher wenden die Prop-Factory inline an: `xxxProp.apply(value, (v) => this.setRenderProp('xxx', v))`
- [ ] Behavior (falls vorhanden) erbt `BaseBehavior<Api>`, implementiert `BehaviorInterface<Api>`, wird über `this.stateAccess` oder begründet über `BaseWebComponent.stateLess` komponiert — inkl. `componentDidRender`-Sync und `disconnectedCallback`-Teardown
- [ ] FC ist zustandslos und kapselt seinen Wurzelknoten in `BemRootNodeFC`
- [ ] `<Host>` ohne redundantes `class`-Attribut
- [ ] Öffentliche `@Prop`/`@Method`-Oberfläche identisch zum Vorgänger, in `public-api.spec.ts` festgenagelt, Schema-`*Props`-Interface implementiert
- [ ] Kein toter Code, keine verwaisten Dateien; Dead-Schema-Abbau geprüft (inkl. Ausnahme für veröffentlichte Typen)
- [ ] Tests ko-lokalisiert und aktualisiert
- [ ] `pnpm format`, `pnpm lint`, `test:unit` erfolgreich
- [ ] Pixel-Gate erfüllt oder als offene Arbeit dokumentiert (`zero-visual-delta-handoff`)

## 10. Ergebnisbericht

Zum Abschluss liefern:

1. Gap-Analyse
2. Gelöschte Dateien mit Begründung
3. Neue/geänderte Dateien, nach Architekturschicht gruppiert
4. Ausgefüllte Pre-Review-Checkliste
5. Prüfergebnis (Befehle + Status, inklusive Pixel-Gate)

## 11. Weiterführend

**Im Skill:**

- `reference/patterns.md` — Prop-Triangle, WC-Orchestrator, `StateAccess`/`stateLess`, Behavior-Lebenszyklus, Prop-Definition, Ziel-Dateistruktur
- `reference/pitfalls.md` — 12 Fallstricke, jeder schon einmal als Regression aufgetreten

**Im Repo** (Anker in `packages/components/src/components/_skeleton/ARC42.md`):

| Thema                                | Anker                                                     |
| ------------------------------------ | --------------------------------------------------------- |
| Architektur & Schichten              | `#4-solution-strategy`                                    |
| Web-Component-Layer                  | `#web-component-layer`                                    |
| Öffentlicher API-Vertrag             | `#public-api-contract-migration-parity`                   |
| Behavior-Komposition                 | `#behavior-layer`                                         |
| `BemRootNodeFC`                      | `#functional-component-layer`                             |
| `PropsConfigShape` / `ApiFromConfig` | `#api-definition-with-propsconfigshape-and-apifromconfig` |
| Prop-Typen & Validierung             | `#schema-helper-layer`                                    |
| Event-Handler-Policy                 | `#event-handler-policy`                                   |
| Zustandsverwaltung                   | `#wc-state-management`                                    |
| Verzeichnislayout                    | `#blueprint-layout`                                       |
| Transitionales `shadow: false`       | `#transitional-pattern-shadowfalse`                       |
| Design Decisions                     | `#9-design-decisions`                                     |

Ergänzend: `packages/components/src/components/_skeleton/AGENTS.md` (Props-First-Begründung, API-Parität) und `packages/components/src/components/_skeleton/TODO_PROP_ENFORCEMENT.md` (offene Punkte der Prop-Durchsetzung).
