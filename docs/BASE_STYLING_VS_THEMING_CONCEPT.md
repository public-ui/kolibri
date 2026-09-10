# Basis-Styling vs. Theming Konzept

Beschreibt die Abgrenzung zwischen dem Basis-Styling der Komponenten (`@public-ui/components`) und dem Theming in den Theme-Paketen (`@public-ui/theme-*`) – mit dem klaren Grundsatz, dass Dark/Light-Color-Schemes ausschließlich im Theme verankert werden.

## Status

- Ist: Das Basis-Styling in `packages/components/src` ist faktisch scheme-frei. Weder dort noch in `packages/themes/*` gibt es `prefers-color-scheme`, `color-scheme` oder `light-dark()`. Ein Dark Mode ist in keinem Theme implementiert.
- Soll: Die Abgrenzung ist verbindlich festgeschrieben und in allen Konzepten, Agenten-Anweisungen und Skills verankert (siehe [Abschnitt 8](#8-verankerung-in-den-bestehenden-konzepten)). Zukünftige Dark/Light-Umsetzungen entstehen ausschließlich in den Theme-Paketen.

## 1. Leitsatz

> **Das Basis-Styling in `@public-ui/components` (Layer `kol-a11y`, `kol-global`, `kol-component`) ist ausschließlich für Layout und Struktur zuständig. Es kennt kein Dark/Light-Color-Scheme: kein `prefers-color-scheme`, kein `color-scheme`, kein `light-dark()`, keine Scheme-Tokens und keine Scheme-Modifier. Schwarz und Weiß in der Basis sind ein Kontrast-Fallback, keine Farbgestaltung. Dark/Light-Theming wird ausschließlich in den Theme-Paketen (Layer `kol-theme-global`, `kol-theme-component`) verankert und umgesetzt.**

Der Fokus der Basis liegt auf dem Layout. Der Fokus der Themes liegt auf der Optik – dazu gehören alle Farbkombinationen, also auch die Entscheidung für ein helles oder dunkles Erscheinungsbild.

## 2. Ziel

- Komponenten funktionieren strukturell in jedem Theme identisch. Ein Theme-Wechsel ändert nie das Layout.
- Themes tragen die vollständige visuelle Verantwortung. Ein Theme kann hell, dunkel oder beides anbieten, ohne dass das Komponenten-Paket angefasst werden muss.
- Die Basis bleibt scheme-neutral. Das `unstyled`-Theme (`packages/unstyled/theme.ts`) rendert nur den Basis-Layer und muss unter der Browser-Einstellung `light` und `dark` identisch aussehen.
- Es gibt genau eine Stelle, an der Farbentscheidungen getroffen werden. Das vermeidet Konflikte zwischen Basis-Farben und Theme-Farben und hält die Kontrastprüfung (WCAG) beim Theme.

## 3. Verantwortlichkeiten je Schicht

Die Layer-Reihenfolge ist in `packages/components/src/components/_layer-order.scss` definiert:

```scss
@layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;
```

| Layer                     | Paket                   | Zuständig für                                                                                    | Ausdrücklich nicht zuständig für                                                      |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `kol-a11y`                | `@public-ui/components` | Barrierefreiheits-Baseline: Mindestgrößen, Schriftvererbung, Schwarz/Weiß als Kontrast-Fallback  | Farbgestaltung, Color Schemes                                                         |
| `kol-global`              | `@public-ui/components` | Globale Layout-Defaults: `box-sizing`, Basis-`font-size`, Resets                                 | Farben, Abstände (`margin`, `padding`, `gap`), Color Schemes                          |
| `kol-component`           | `@public-ui/components` | Komponenten-Layout: Display, Flex/Grid, Position, Dimensionen, strukturelle Typografie           | Farben (außer Schwarz/Weiß-Fallback), Abstände, Schatten, Rahmen-Optik, Color Schemes |
| `kol-theme-global`        | `@public-ui/theme-*`    | Design-Tokens (Farben, Schriften, Abstände, Radien), **Color Schemes (Light/Dark)**, Fokus-Optik | Layout-Regeln, die bereits in der Basis stehen                                        |
| `kol-theme-component`     | `@public-ui/theme-*`    | Komponentenspezifische Optik: Farben, Rahmen, Schatten, Abstände über Tokens                     | Layout-Regeln der Basis, eigene Scheme-Media-Queries pro Komponente                   |
| `kol-forced-colors`       | `@public-ui/components` | Barrierefreiheit unter `forced-colors: active` mit System-Farbschlüsselwörtern                   | Dark Mode (siehe [Abschnitt 5](#5-abgrenzung-forced-colors-ist-kein-dark-mode))       |
| `kol-theme-forced-colors` | `@public-ui/theme-*`    | Theme-spezifische Ergänzungen für Forced Colors                                                  | Dark Mode                                                                             |

Die Verbotsliste für das Komponenten-Paket steht in [`CODE_STYLE_AND_CONVENTIONS.md`](./CODE_STYLE_AND_CONVENTIONS.md). Die fünf Styling-Schichten sind in [`AGENTS.md`](../AGENTS.md#theming) und in der arc42-Dokumentation ([ADR-008](./arc42/09-architecture-decisions.md#adr-008-five-layer-styling-architecture)) beschrieben.

## 4. Dark/Light: Regeln

### 4.1 Komponenten-Paket (`packages/components`)

In den Basis-Layern sind verboten:

- `@media (prefers-color-scheme: …)` in jeder Form
- die CSS-Eigenschaft `color-scheme`
- die CSS-Funktion `light-dark()`
- Custom Properties, deren Wert vom Scheme abhängt (z. B. `--kol-…-dark`)
- Scheme-Modifier im Markup oder in BEM-Klassen (z. B. `kol-button--dark`)
- Props oder States, die ein Color Scheme transportieren

Begründung:

1. Die Basis hat den Fokus auf Layout. Jede Farbentscheidung wäre eine Design-Entscheidung, die nur das Theme treffen darf.
2. Ein Scheme in der Basis würde mit den Farben jedes Themes kollidieren und die Kontrastprüfung vom Theme zurück in die Basis verlagern.
3. Das `unstyled`-Theme muss als scheme-neutrale Baseline unter `light` und `dark` identische Snapshots liefern. Nur so bleibt es ein verlässlicher Indikator für DOM-Umbauten (siehe `.claude/plans/zero-visual-delta-handoff-unstyled.md`).

Erlaubt bleibt der Kontrast-Fallback aus dem A11y-Preset: `background-color: white; color: black`. Diese Werte sind keine Farbgestaltung, sondern erzwingen ein geprüftes Kontrastverhältnis, bis ein Theme die Farben setzt. Bestehende `white`/`black`-Stellen in der Basis (z. B. `@shared/_table-stateless.mixin.scss`, `input-checkbox/style.scss`) sind Fallbacks in diesem Sinn und werden nicht in Scheme-Logik überführt.

### 4.2 Theme-Pakete (`packages/themes/*`)

Dark/Light wird vollständig im Theme umgesetzt. Empfohlenes Muster:

1. **Tokens im globalen Theme-Layer auf `:host`** – wie heute in `packages/themes/default/src/global.scss`. Alle Farben, die sich zwischen Light und Dark unterscheiden, sind Tokens (`--color-…`), niemals Literale in Komponenten-Styles.
2. **Scheme-Umschaltung an einer Stelle** – ebenfalls im Layer `kol-theme-global`:
   - automatisch per `color-scheme: light dark` und `light-dark()` in den Token-Werten, oder
   - per `@media (prefers-color-scheme: dark)` mit überschriebenen Tokens, oder
   - per Opt-in über ein Attribut oder eine Klasse am Host, wenn Anwendungen das Scheme selbst steuern sollen.
3. **Komponenten-Theme-Layer referenziert nur Tokens.** Keine Scheme-Media-Queries pro Komponente. Ändert sich das Scheme, ändern sich nur die Token-Werte.
4. **Alternative: eigener Theme-Export.** Ein Theme kann zusätzlich einen dunklen Export (z. B. `DEFAULT_DARK`) bereitstellen, der über `register([DEFAULT, DEFAULT_DARK], …)` registriert und zur Laufzeit über das Attribut `kol-theme` umgeschaltet wird (siehe [`HOWTO_REGISTER_COMPONENTS_AND_THEMES.md`](./HOWTO_REGISTER_COMPONENTS_AND_THEMES.md) und arc42 [§6.4 Theme Switching](./arc42/06-runtime-view.md#64-theme-switching)).

Beispiel für Variante 2a im globalen Theme-Layer:

```scss
@layer kol-theme-global {
	:host {
		color-scheme: light dark;
		--color-text: var(--kolibri-color-text, light-dark(#202020, #f2f3f4));
		--color-light: var(--kolibri-color-light, light-dark(#ffffff, #1a1a1a));
	}
}
```

Kontrastanforderungen (mindestens 4,5:1 für Text, 3:1 für UI-Komponenten, siehe arc42 [Kapitel 8](./arc42/08-cross-cutting-concepts.md)) gelten für jedes Scheme einzeln und werden vom Theme nachgewiesen.

## 5. Abgrenzung: Forced Colors ist kein Dark Mode

`packages/components/src/components/forced-colors.scss` (Layer `kol-forced-colors`) reagiert auf `@media (forced-colors: active)` und verwendet System-Farbschlüsselwörter wie `Canvas`, `CanvasText`, `ButtonText` oder `Highlight`. Das ist ein Barrierefreiheitsmechanismus für Hochkontrast-Modi des Betriebssystems, keine Gestaltung: Das System liefert die Farben, die Basis stellt nur sicher, dass Struktur und Zustände sichtbar bleiben.

Deshalb bleibt Forced Colors in der Basis erlaubt, während Dark/Light-Schemes ausgeschlossen sind. Die beiden Mechanismen dürfen nicht vermischt werden: `forced-colors` ist kein Ersatz für `prefers-color-scheme` und umgekehrt.

## 6. Entscheidungsregel für Regelverschiebungen

Der Skill `theme-redundancy-check` verschiebt redundante Regeln aus Themes in die Basis. Zusätzlich zur bestehenden Frage „Würde sich die Regel beim Wechsel eines Themes visuell ändern?“ gilt:

> **Würde sich der Wert beim Wechsel Light ↔ Dark ändern?** Ja → die Regel bleibt im Theme. Nein → Kandidat für die Basis.

Jede Farbe ist damit automatisch Theme-Sache. Layout-Regeln, die in beiden Schemes gleich sind, sind Basis-Kandidaten.

## 7. Nachweis und Tests

- `packages/unstyled` ist die scheme-neutrale Baseline. Der visuelle Test-Harness unterstützt `KOLIBRI_VISUAL_TESTS_COLOR_SCHEME=light|dark` (`packages/tools/visual-tests/playwright.config.js`). Ein Lauf des `unstyled`-Checks unter `dark` muss gegen die `light`-Baselines 0 Diffs liefern. Das ist der Beweis, dass die Basis kein Scheme kennt.
- Für Themes, die Dark/Light anbieten, werden Snapshots pro Scheme geführt. Das Layout muss zwischen beiden Snapshot-Sätzen pixelgleich bleiben; nur Farben dürfen sich unterscheiden.
- Stichprobe für das Komponenten-Paket: eine Suche nach `prefers-color-scheme`, `color-scheme` und `light-dark(` in `packages/components/src` muss leer bleiben.

## 8. Verankerung in den bestehenden Konzepten

Der Leitsatz aus [Abschnitt 1](#1-leitsatz) ist an folgenden Stellen eingearbeitet:

- [`AGENTS.md`](../AGENTS.md#theming): Styling-Schichten, Custom-Theming-Regeln und allgemeine Theme-Regeln.
- [`docs/CODE_STYLE_AND_CONVENTIONS.md`](./CODE_STYLE_AND_CONVENTIONS.md): Verbotsliste für das Komponenten-Paket, Zuständigkeit der Themes.
- [`packages/components/AGENTS.md`](../packages/components/AGENTS.md) und [`packages/components/src/components/README.md`](../packages/components/src/components/README.md): Styling-Grenze für Komponenten.
- [`packages/themes/AGENTS.md`](../packages/themes/AGENTS.md): Dark/Light als Theme-Verantwortung.
- arc42 (EN und DE): [Lösungsstrategie](./arc42/04-solution-strategy.md), [Bausteinsicht](./arc42/05-building-block-view.md), [Architekturentscheidungen](./arc42/09-architecture-decisions.md) (ADR-008, ADR-018), [Qualitätsanforderungen](./arc42/10-quality-requirements.md) (Szenario P3), [Glossar](./arc42/12-glossary.md).
- [`docs/HOWTO_REGISTER_COMPONENTS_AND_THEMES.md`](./HOWTO_REGISTER_COMPONENTS_AND_THEMES.md) und [`docs/tutorials/NEW_COMPONENT.md`](./tutorials/NEW_COMPONENT.md).
- Skeleton-Architektur: [`packages/components/src/components/_skeleton/ARC42.md`](../packages/components/src/components/_skeleton/ARC42.md), `.claude/commands/migrate-to-skeleton.md`, `.github/agents/migrate-to-skeleton.agent.md`.
- Skills und Companion-Pläne: `.claude/skills/theme-redundancy-check/SKILL.md`, `.claude/plans/theme-redundancy-check-plan.md`, `.claude/skills/zero-visual-delta-handoff/SKILL.md`, `.claude/plans/zero-visual-delta-handoff-unstyled.md`.

## 9. Nicht-Ziele und Folgearbeiten

- Dieses Konzept implementiert kein Dark Theme. Es legt nur fest, wo eine Umsetzung stattfindet.
- Die bestehenden Schwarz/Weiß-Fallbacks in der Basis bleiben unverändert.
- Folgearbeit: eine Stylelint-Regel `kolibri/component-no-color-scheme` im Paket `packages/tools/stylelint-rules`, die `prefers-color-scheme`, `color-scheme` und `light-dark()` in `packages/components` verbietet und damit die Regel aus [Abschnitt 4.1](#41-komponenten-paket-packagescomponents) maschinell absichert.
- Folgearbeit: ein `dark`-Lauf des `unstyled`-Snapshot-Checks in der CI als dauerhafter Nachweis der Scheme-Neutralität.
