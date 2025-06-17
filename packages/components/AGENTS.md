# Agent Instructions

This package contains the Stencil based web component library for KoliBri.

## Structure

- `src/components` – Each component lives in its own folder. The usual files are:
  - `component.tsx` – component logic (optional, some components implement everything directly in `shadow.tsx`).
  - `shadow.tsx` – entry point registered with the `@Component` decorator.
  - `controller.ts` – helper functions used by the component (optional).
  - `style.scss` – SCSS styles for the component.
  - `*.e2e.ts` – Playwright end-to-end tests.
  - `test/` – Jest snapshot tests.
- `src/schema` – TypeScript schema describing the API of every component. For each component there is a file in `src/schema/components`. Shared enums, props and types are in the neighbouring folders.
- other folders like `src/assets`, `src/locales` and `src/utils` contain shared assets, translations and helpers.

Use `pnpm --filter @public-ui/components build` to build the library or `pnpm start` for development.
