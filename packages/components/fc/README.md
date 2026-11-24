# @public-ui/functional-components

Die Stencil-Funktionskomponenten der KoliBri-Komponenten: der Render-Layer (`h()`-basierte Funktionskomponenten), den die Web-Component-Shells in `packages/components` rendern — getrennt von Shells, Styles und Build-Outputs, damit künftige Runtime-Implementierungen denselben Render-Layer übernehmen können.

> **Dieses Paket wird nicht veröffentlicht.** Es ist als `private: true` markiert und existiert nur innerhalb des pnpm-Workspaces. Die Shells konsumieren die Quellen direkt (relative Importe), siehe [README](../internals/README.md) und [ARCHITECTURE.md](../internals/ARCHITECTURE.md) des internals-Pakets.

## Schichten unter `packages/components`

| Verzeichnis  | Paket                              | Inhalt                                                     |
| ------------ | ---------------------------------- | ---------------------------------------------------------- |
| `internals/` | `@public-ui/internals`             | Framework-freie Schichten: Schema, Props, Controller, Core |
| `fc/`        | `@public-ui/functional-components` | Stencil-abhängige Funktionskomponenten (dieses Paket)      |
| `src/`       | `@public-ui/components`            | Web-Component-Shells, Styles, Entry, Build-Outputs         |
| `lit/`       | `@public-ui/components-lit`        | Experimentelle Lit-Runtime                                 |

## Inhalt

`src/` führt je Komponente einen Ordner (`button/`, `form-field/`, `table-stateless/`, …) mit der Render-Funktionskomponente (`component.tsx`), ihren Items/Behaviors und Specs. Dazu die FC-gekoppelte Orchestrierung, die bewusst nicht ins internals-Paket gehört (`link/item.ts`, `pagination/item.ts`, `popover-button/item.ts`, `counter/behavior.ts`, die `base-web-component.tsx`-Basisklassen), sowie die öffentlichen Funktionskomponenten unter `app/` (`app/Heading/`, `app/ToastItem/`, Export über `app/index.ts`).

## Grenzen

- **Keine Gegenrichtung:** Importe aus den Shell-Layern (`src/components`, `src/core`, `src/global` des components-Pakets) sind verboten — die Shells rendern die Funktionskomponenten, nie umgekehrt. Der `eslint.config.mjs`-Guard setzt das durch.
- **Framework:** `@stencil/core` ist die Grundlage dieses Pakets (`h()`, JSX, FC-Typen). Framework-freie Logik gehört nach internals; andere Frameworks (Lit, React, Vue) gehören in ihre Pakete.
- **Keine Shells, keine Styles:** `@Component`-Klassen und SCSS gehören in `packages/components/src`.
- **Skeleton-Blueprints:** `src/click-button/` und `src/skeleton/` dürfen nur ihre eigene Schicht, die gemeinsame FC-Schicht und internals importieren (boundaries-Regel).

## Konsum

Die Shells binden die Quellen relativ ein (`../../fc/src/…`), damit der Stencil-Transpiler das JSX im eigenen Programm transformiert und die `base-web-component`-Basisklassen als Quellen der `extends`-Kette sieht. Der `dist/`-Emit (`tsc`) dient der Typ-Emit-Kette des components-Pakets (`scripts/rewrite-emit-internals-paths.mjs` bettet ihn in `dist/types` ein) — Konsumenten lösen das Paket dafür nicht auf.

## Lizenz

EUPL-1.2 — siehe [LICENSE](./LICENSE).
