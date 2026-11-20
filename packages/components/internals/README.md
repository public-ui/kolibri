# @public-ui/internals

Das framework-freie Kernpaket der KoliBri-Komponenten: Schema-Typen, Prop-Definitionen, Validatoren und die Komponenten-Orchestrierung (Controller-Schicht) — geteilt von jeder Runtime-Implementierung.

> **Dieses Paket wird nicht veröffentlicht.** Es ist als `private: true` markiert und existiert nur innerhalb des pnpm-Workspaces. Die Runtime-Pakete konsumieren die Quellen direkt (relative Importe bzw. Workspace-Paketspezifizierer), siehe [ARCHITECTURE.md](./ARCHITECTURE.md).

## Inhalt

| Verzeichnis                                 | Inhalt                                                                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `src/schema/`                               | Öffentliche Schema-Typen: Prop-Typen, Komponenten-API-Typen, Interfaces, Legacy-Validatoren                                       |
| `src/props/`                                | Prop-Definitionen (normalize/validate/default/apply) als Single Source of Truth der Prop-Verarbeitung                             |
| `src/controller/`                           | Controller-Schicht: Render-Prop-Store (`base-web-component`), Behaviors, Items, Props-Configs und API-Typen je Komponentenfamilie |
| `src/components/`                           | Komponentennaher Support, der von Shells und Controller gemeinsam genutzt wird (Form-Controller, ariaCurrentService)              |
| `src/core/`                                 | Tag-Namen-Registry, i18n-Kern, Register-Options-Registry                                                                          |
| `src/utils/`                                | Agnostische Helfer (Events, Fokus, Klick-Delegation, Farben, clsx, …)                                                             |
| `src/enums/`, `src/i18n.ts`, `src/locales/` | Bund-Enums und Übersetzungen                                                                                                      |

Was hier **nicht** hineingehört (Render-Funktionalkomponenten, Stencil-Shells, Styles) und warum, ist in [ARCHITECTURE.md](./ARCHITECTURE.md) festgehalten — inklusive der Prüfbefehle, mit denen das Review (auch KI-gestützt) die Grenzen maschinell nachhalten kann.

## Nutzung im Workspace

Die Runtime-Pakete binden die Quellen als TypeScript ein:

- `packages/components` (Stencil): relative Importe `../internals/src/…`
- `packages/components/lit` (experimentell): Paketspezifizierer `@public-ui/internals/…`

Ein Build ist nur für den externen Typkonsum nötig (`pnpm --filter @public-ui/internals build`); die `dist/` wird vom React-Hook-Form-Adapter und dem Typ-Emit referenziert.

```bash
pnpm install          # Workspace-Setup
pnpm build            # tsc → dist/
pnpm lint             # ESLint inkl. Framework-Freiheits-Guard
```

## Lizenz

EUPL-1.2 — siehe [LICENSE](./LICENSE).
