# Agent Instructions

This repository is a monorepo managed with **pnpm** and **Nx**. It contains multiple packages under `packages/` such as web components, themes, adapters, samples and tooling.

## Handling hints

We have a monorepo structure with multiple packages, each with its own `package.json`. The root `package.json` contains shared dependencies and scripts. Use `pnpm` commands to manage dependencies and run scripts across packages.

- To install dependencies, use `pnpm i` at the root level. This will install all dependencies for all packages.
- If you change a dependency in a package:
  - Use only exact version numbers in `package.json`. Other peers will not be able to use the package if you can use a range version.
  - You need to run `pnpm i` at the root level. This updates the lockfile and ensures all packages are using the correct versions.
- Avoid that branch name may contain hidden characters.

## Semantic Versioning

This repository follows **Semantic Versioning** (SemVer) for all packages. Each package version is defined in its own `package.json` file. The versioning scheme is as follows:

- **Major version**: Incremented for incompatible API changes.
- **Minor version**: Incremented for adding functionality in a backwards-compatible manner.
- **Patch version**: Incremented for backwards-compatible bug fixes.

If we deprecate a feature, we will mark it as deprecated in the code and documentation, but we will not remove it immediately. Instead, we will provide a migration guide (migration\*.md) for users to transition to the new feature. Also we provide a migration tool in the `packages/tools/kolibri-cli` package to help with the migration process. You have to add a migration task from the previous version to the new version in the `packages/tools/kolibri-cli/src/migrations` folder. In the migration package, are a lot of migration tasks already implemented, so you can use them as a reference.

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
- Commit messages follow the **Conventional Commits** specification.

## Linting and Formatting

- Run `pnpm lint` to check for linting errors across all packages. This script runs ESLint, Stylelint and TypeScript checks. You can try to automatically fix linting issues with `pnpm lint:eslint --fix`, but this may not resolve all issues.
- Run `pnpm format` to format all code files using Prettier. You can try to automatically fix linting issues with `pnpm format -w`, but this may not resolve all issues.

## Testing

- Run `pnpm test` from the repository root to execute all unit and integration tests.
- Visual and snapshot tests can be updated with `pnpm test-update` or via the `update-snapshots.yml` GitHub workflow (see `CONTRIBUTING.md`).
- Individual packages provide their own test scripts (e.g. `pnpm --filter @public-ui/components test:unit`).

## Pull Request Guidelines

- PR titles should be meaningful as they appear in the release notes.
- Every PR must link to its issue and contain only changes related to that issue.
- Ensure automated tests pass and manual testing is completed when required.
- Update documentation or migration guides if your changes affect them.
