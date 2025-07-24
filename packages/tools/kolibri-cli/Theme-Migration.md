# Theme-Migration

This document outlines how KoliBri themes can be migrated together with the component library.

## Goal

Synchronise breaking changes in components with the styling of each theme package so that upgrades require minimal manual work.

## Requirements

- Components and themes follow the BEM naming convention via `typed-bem`.
- Each theme lives under `packages/themes` and keeps its SCSS sources in `src/`.
- The CLI migration tool can read and modify `.scss` files.

## Concept

1. **Central BEM schemas**

   - Every component exports its BEM schema. These schemas are used by the CLI to generate SCSS files and by themes to reference selectors.
   - When a selector changes, the same schema information allows the migration to update all theme packages consistently.

2. **SCSS migration tasks**
   The CLI runner will be extended with task types operating on SCSS. They behave like the existing property tasks and are idempotent.

   - `RenameBlockTask` – rename a block selector everywhere in a theme.
   - `RenameElementTask` – rename an element within a block.
   - `RenameModifierTask` – rename or replace a modifier.
   - `AddSelectorTask` and `RemoveSelectorTask` – insert or remove entire rule sets.
   - `UpdateTokenTask` – adjust variable names or values when tokens change.
   - `MoveRulesTask` – move declarations from one selector to another if the DOM structure changes.

   Tasks scan the SCSS with regular expressions or an AST parser. If a pattern is missing the task logs a warning instead of failing.

3. **Safe execution**
   - Migrations abort when uncommitted changes are detected unless `--ignore-uncommitted-changes` is specified.
   - Each task logs the files it touched. After completion Prettier can format them automatically.
   - Because tasks are idempotent, rerunning the migration produces no new changes. To undo a run, reset the Git state.

## Workflow Example

```bash
pnpm i -g @public-ui/kolibri-cli@2      # install the CLI matching the next version
kolibri migrate path/to/project         # run all tasks for the upgrade
pnpm format                             # format changed files
git diff                                # review results and commit
```

## Outlook

Using these tasks, theme packages remain aligned with component updates. Future breaking changes can be scripted and applied via the CLI so that projects can upgrade in a controlled and reproducible way.
