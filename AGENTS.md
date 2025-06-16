# Agent Instructions

This repository is a monorepo managed with **pnpm** and **Nx**. It contains multiple packages under `packages/` such as web components, themes, adapters and tooling.

## Project Structure
- `packages/components` – Stencil based web components
- `packages/adapters/*` – framework integration packages
- `packages/themes` – style themes and assets
- `packages/tools` – helper CLI and tests
- `packages/samples` – sample applications demonstrating usage
- Documentation lives in `docs/`.

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

