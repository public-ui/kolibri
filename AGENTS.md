# Agent Instructions

This repository is a monorepo managed with **pnpm** and **Nx**. It contains multiple packages under `packages/` such as web components, themes, adapters and tooling.

## Project Structure

- `packages/components` – Stencil based web components
  - `packages/components/src/component` – components
  - `packages/components/src/schema` – schema definitions for all components
- `packages/samples` – sample applications demonstrating usage
  - `packages/samples/angular` – Angular sample app; do not edit
  - `packages/samples/react` – React sample app; all samples; write component samples here
- `packages/adapters/*` – generated framework integration packages; do not edit
- `packages/themes` – style themes and assets
  - `packages/themes/default` – primary maintained standard theme
  - All other themes are not actively maintained
- `packages/tools/kolibri-cli` – helper CLI for migration
- Documentation lives in `docs/`.

## Samples

The sampels are located in `packages/samples/react` and demonstrate how to use the components in react. Each component has its own folder and the basic sample are in `basic.tsx`. Other stories can be added in the same folder. All samples of a component are registed in the `routes.ts` file.

## Coding Conventions

- Formatting is enforced via **Prettier** with settings defined in `prettier.config.js` (print width 160, single quotes, tabs).
- `.editorconfig` sets `indent_style = tab` and `max_line_length = 160` for code files. Markdown and YAML files use spaces.
- ESLint and Stylelint are run using `pnpm lint`. Pre‑commit hooks run `lint-staged` which formats and lints changed files.
- Lists and enumerations in code should be kept in alphabetical order (see `docs/tutorials/NEW_COMPONENT.md`).
- Commit messages follow the **Conventional Commits** specification. The `prepare-commit-msg` hook appends the ticket ID from the branch name (`<ticketID>-description`).

## Testing

- Run `pnpm test` from the repository root to execute all unit and integration tests.
- Visual and snapshot tests can be updated with `pnpm test-update` or via the `update-snapshots.yml` GitHub workflow (see `CONTRIBUTING.md`).
- Individual packages provide their own test scripts (e.g. `pnpm --filter @public-ui/components test:unit`).

## Pull Request Guidelines

- PR titles should be meaningful as they appear in the release notes.
- Every PR must link to its issue and contain only changes related to that issue.
- Ensure automated tests pass and manual testing is completed when required.
- Update documentation or migration guides if your changes affect them.
