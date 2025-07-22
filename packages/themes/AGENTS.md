# Agent Instructions

This folder collects all official KoliBri themes. Each theme package under this directory (`default`, `ecl`, …) uses the same tool chain and follows the same coding rules.

## Structure

- `src/` – shared entry points and utilities used by all themes.
- `<theme>/src` – theme specific sources containing `global.scss`, component styles and mixins.
- Every theme exposes one or more theme objects via `KoliBri.createTheme` and exports them from `src/index.ts`.

## Building

- Use **pnpm** for all commands. Run `pnpm build` in the repository root or `pnpm --filter <package> build` to build a single theme.
- The build stack is based on **Rollup**, **TypeScript** and **PostCSS**. Keep `rollup.config.js`, `tsconfig.json` and dependency versions identical across all theme packages.
- Do not edit the generated `assets` folders. Modify the source files instead and rebuild.

## Coding Guidelines

- Organise SCSS using `@layer kol-theme-global` and `@layer kol-theme-component`.
- Follow BEM style class naming (`block__element--modifier`).
- Reuse mixins from the `mixins/` folder and use the `to-rem()` helper for sizing.
- Place theme tokens (colors, fonts, spacing, etc.) in the global layer and reference them in component styles.
- Avoid `!important` and only override properties that the theme actually customises.

## Consistency

All theme packages must share the same stack configuration, scripts and dependency versions. When updating one theme, ensure the others are kept in sync.
