# Agent Instructions

This package contains the React based sample application showcasing the KoliBri components. It acts as a simple Storybook: every sample is a "story" that illustrates a single feature, behaviour or accessibility aspect of a component. The entire app must remain fully accessible.

## Structure

- `src/react.main.tsx` – bootstraps the application and sets up theming and translations.
- `src/App.tsx` – main React component rendering the router.
- `src/components` – component specific samples. Each KoliBri component has its own folder here.
  - `basic.tsx` – minimal sample for the component.
  - Additional files act as individual "stories" highlighting a single feature or behaviour.
  - `routes.ts` – exports all stories for that component so the app router can register them.
- `src/scenarios` – cross component scenarios demonstrating interactions between several components. A `routes.ts` file registers them.
- `src/shares` – shared helpers such as the global `routes.ts` aggregator and various utilities.
- `public` – static assets served by webpack.
- `e2e` – end to end tests for the sample app.

Run `pnpm start` in this directory to launch the development server.

> 🧹 **Formatting**: Follow the repo-wide “Format-first rule” in `/AGENTS.md`. Use `pnpm format` or `pnpm --filter @public-ui/sample-react format` before committing—no additional `--write` flags are required.
