# KoliBri - CLI-Tools

Command line utilities to help maintain and migrate KoliBri projects.

[![npm](https://img.shields.io/npm/v/@public-ui/kolibri-cli)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/kolibri-cli)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/kolibri-cli)](https://www.npmjs.com/package/@public-ui/kolibri-cli)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/kolibri-cli)](https://bundlephobia.com/result?p=@public-ui/kolibri-cli)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

The `KoliBri` CLI-Tools are a collection of tools to support the development with `KoliBri` components.
They also help migrating projects when new components or design tokens are introduced.

## Installation

You can install the `KoliBri` CLI-Tools with `npm`, `pnpm` or `yarn`.

```bash
npm i -g @public-ui/kolibri-cli
pnpm i -g @public-ui/kolibri-cli
yarn add -g @public-ui/kolibri-cli
```

> **Important:** Install exactly the CLI version you want to upgrade to. The migration tool compares your locally installed `@public-ui/components` version with the CLI version to decide which migration tasks must run and in which order.

## Quickstart (Happy Path)

1. Install the CLI version that matches your target `@public-ui/components` release (see above).
2. Run the migration in your project root: `kolibri migrate .`.
3. Review the changes: `git status` and `git diff`.
4. Format updated files: `pnpm format`.
5. Commit the result and continue development.

## Usage

The `KoliBri` CLI is intended to be executed in your project root directory. Use the `kolibri` command to start the CLI.

```bash
kolibri --help
```

```bash
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | `--' |  |) /_  ,--.--. `--'
|  .   '  | .-. | |  | ,--. |  .-.  \ |  .--' ,--.
|  |\   \ | '-' | |  | |  | |  '--' / |  |    |  |
`--' `--'  `---'  `--' `--' `------'  `--'    `--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io

Usage: kolibri [options] [command]

CLI for executing some helpful commands for KoliBri projects.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  info						  Shows the system and KoliBri package information
  migrate [options] <string>  This command migrates KoliBri code to the current version.
  help [command]              display help for command
```

### Info

With the `info` command you can show the current system and KoliBri package information.

This command is mainly needed for our bug issue templates.
If errors occur in our packages, we would like to ask you to create an issue under the following link:
[Submit report](https://github.com/public-ui/kolibri/issues/new/choose)

### Migrate

With the `migrate` command you can migrate your project to the latest version of `KoliBri`.

> **Hint:** The migration tool currently supports React projects (JSX/TSX), Vue single-file components, and HTML/XHTML template-based projects such as Angular applications or vanilla custom elements. Support for additional project types is planned.

The migration runner registers tasks in the following order and executes only those whose semantic version ranges match your
project: common tasks (`*`), v1 tasks (`^1`), v2 tasks (`^2` / `>=2.1.7 <3`), v3 tasks (`>=2 <4`), v4 tasks (`^4`) and
asset-related tasks (`^1`). All tasks are enabled by default. If you need to disable a noisy task or explicitly re-enable a
previously deactivated one for better migratability, set the corresponding flag in `.kolibri.config.json` under
`migrate.tasks` to `false` or `true`.

#### Migration tasks and version ranges

- **Common tasks (`*`)**
  - Add `.kolibri.migrate.json` to `.gitignore`.
  - Add `save-exact=true` to `.npmrc`.
  - Configure `html.customData` in `.vscode/settings.json` to point to `@public-ui/components/vscode-custom-data.json`.
- **Version 1 tasks (`^1`, unless noted)**
  - `kol-abbr`: rename `_align` → `_tooltip-align`; rename `_title` → `_label`.
  - `kol-accordion`: rename `_heading` → `_label`; mark removed slot `header`; rename slot `content` to the default slot.
  - `kol-alert`: rename `_heading` → `_label`.
  - `kol-badge`: remove `_icon-only`; rename `_icon-only` → `_hide-label`; remove `_hide-label`; rename `_icon` → `_icons`.
  - `kol-breadcrumb`: rename `_aria-label` → `_label`.
  - `kol-button`: remove `_aria-current`; remove `_aria-label`; rename `_icon-only` → `_hide-label`; rename `_icon` → `_icons`;
    refactor `_icon-align` into `_icons` (**`^2`**).
  - `kol-button-link`: remove `_aria-current`; remove `_aria-label`; rename `_icon-only` → `_hide-label`; rename `_icon` →
    `_icons`.
  - `kol-card`: rename `_heading` → `_label`; rename `_headline` → `_label`; mark removed slots `footer` and `header`; rename
    slot `content` to the default slot.
  - `kol-details`: rename `_summary` → `_label`.
  - `kol-icon`: rename `_aria-label` → `_label`; remove `_part`; rename `_icon` → `_icons`.
  - `kol-input`: rename `_icon` → `_icons`.
  - `kol-input-checkbox`: rename `_type` → `_variant`; rename `_icon` → `_icons`.
  - `kol-input-color`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`.
  - `kol-input-date` / `kol-date`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`.
  - `kol-input-email`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`; remove `_size`.
  - `kol-input-file`: rename `_icon` → `_icons`.
  - `kol-input-number`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`; remove `_type`.
  - `kol-input-password`: rename `_icon` → `_icons`; remove `_size`.
  - `kol-input-radio`: rename `_list` → `_options`.
  - `kol-input-range`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`.
  - `kol-input-text`: rename `_list` → `_suggestions`; rename `_icon` → `_icons`; remove `_size`.
  - `kol-link`: remove `_aria-controls`, `_aria-expanded`, `_aria-label`, `_aria-selected`, `_disabled`, `_selector`, `_stealth`,
    `_use-case`; rename `_aria-current` → `_listen-aria-current`; rename `_icon-only` → `_hide-label`; rename `_icon` → `_icons`;
    refactor `_icon-align` (**`^2`**).
  - `kol-link-button`: remove `_aria-controls`, `_aria-expanded`, `_aria-label`, `_aria-selected`, `_disabled`; rename
    `_aria-current` → `_listen-aria-current`; rename `_icon-only` → `_hide-label`; rename `_icon` → `_icons`.
  - `kol-link-group`: rename `_aria-label` → `_label`; rename `_heading` → `_label`; remove `_heading`; remove `_ordered`.
  - `kol-logo`: rename `_abbr` → `_org`.
  - `kol-modal`: rename `_aria-label` → `_label`.
  - `kol-nav`: rename `_aria-label` → `_label`; rename `_compact` → `_hide-label`; remove `_variant`.
  - `kol-pagination`: rename `_count` → `_total`; rename `_total` → `_max`.
  - `kol-progress`: rename `_type` → `_variant`.
  - `kol-quote`: rename `_caption` → `_label`.
  - `kol-select`: rename `_height` → `_rows`; rename `_list` → `_options`; rename `_icon` → `_icons`; remove `_size`.
  - `kol-skip-nav`: rename `_aria-label` → `_label`.
  - `kol-span`: rename `_icon-only` → `_hide-label`; rename `_icon` → `_icons`.
  - `kol-split-button`: remove `_aria-label`, `_access-key`, `_show-dropdown`; remove `_show`.
  - `kol-symbol`: rename `_aria-label` → `_label`.
  - `kol-table`: rename `_caption` → `_label`.
  - `kol-tabs`: rename `_aria-label` → `_label`; rename `_tab-align` → `_align`; rename `_icon` → `_icons`; rename `_icon-only`
    → `_hide-label`.
  - `kol-toast`: remove `_show-duration`; rename `_heading` → `_label`.
  - `kol-version`: rename `_version` → `_label`.
  - Expert slot migrations: move `innerText` to `_label` for `kol-heading`, `kol-input-*`, `kol-link`, `kol-select`,
    `kol-textarea` (**`^1`**).
  - Slot removals: mark removed `kol-accordion` `header`, `kol-card` `footer`/`header` (**`^1`**).
  - Slot renames: `kol-accordion` / `kol-card` slot `content` → default slot (**`^1`**).
  - Refactor `_label={false}` to empty string (**`>=1.6 <=1.7`**).
- **Version 2 tasks**
  - `kol-card`: remove `_has-footer` (**`^2`**).
  - `kol-link-group`: remove `_level` (**`^2`**).
  - `kol-table`: rename tag `kol-table` → `kol-table-stateful` (**`>=2.1.7 <3`**).
- **Version 3 tasks (`>=2 <4`)**
  - `kol-abbr`: remove `_tooltip-align`.
  - `kol-input-file`: remove `_value`.
  - `kol-modal`: remove `_active-element`.
  - `kol-textarea`: `_resize="both"` → `_resize="vertical"`; `_resize="horizontal"` → `_resize="none"`.
  - `kol-toaster`: rename `alertVariant` → `variant`; rename `defaultAlertType` → `defaultVariant`.
  - All inputs (`kol-combobox`, `kol-input-*`, `kol-select`, `kol-single-select`, `kol-textarea`): remove `_alert`; rename
    `_hide-error` → `_hide-msg`; refactor `_error` → `_msg`.
- **Version 4 tasks (`^4`)**
  - Remove `_id` from `kol-button`, `kol-button-link`, `kol-combobox`, `kol-input-*`, `kol-popover-button`, `kol-select`,
    `kol-single-select`, `kol-split-button`, `kol-textarea`, `kol-tooltip`.
  - Remove `_label` and `_variant` keys from `_msg` objects.
  - `kol-toast`: remove `variant` from `enqueue()` calls.
  - `kol-toaster`: remove `defaultVariant` option from `getInstance()` calls.
- **Asset tasks (`^1`)**
  - Remove old `cpy-cli`/`rimraf` versions and reinstall pinned ones.
  - Add `scripts.prepare` to copy component assets into the project and remove `public/assets/codicons` before copying.
  - Inject the Codicon stylesheet link into `index.html` (or warn if the file is missing).

#### Theme Migration

The CLI also supports migrating KoliBri themes alongside component updates to ensure theme packages remain synchronized with breaking changes in the component library.

##### Goal

Synchronies breaking changes in components with the styling of each theme package so that upgrades require minimal manual work.

##### Requirements

- Components and themes follow the BEM naming convention via `typed-bem`.
- Each theme lives under `packages/themes` and keeps its SCSS sources in `src/`.
- The CLI migration tool can read and modify `.scss` files.

##### Concept

1. **Central BEM schemas**
   - Every component exports its BEM schema. These schemas are used by the CLI to generate SCSS files and by themes to reference selectors.
   - When a selector changes, the same schema information allows the migration to update all theme packages consistently.

2. **SCSS migration tasks**
   The CLI runner is extended with task types operating on SCSS. They behave like the existing property tasks and are idempotent.
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

##### Theme Migration Workflow Example

```bash
pnpm i -g @public-ui/kolibri-cli@2      # install the CLI matching the next version
kolibri migrate path/to/project         # run all tasks for the upgrade
pnpm format                             # format changed files
git diff                                # review results and commit
```

Using these tasks, theme packages remain aligned with component updates. Future breaking changes can be scripted and applied via the CLI so that projects can upgrade in a controlled and reproducible way.

#### How does it work?

1. The migration command will check your project for clear `git history` and the `installed version` of `KoliBri`. Now it loads all available migration tasks.
2. Tasks in the correct version range will be executed one by one. Otherwise they will be skipped.
3. After that the `package.json` will be updated with the new version of `KoliBri` and execute the `npm install` command.
4. If there are any pending tasks, the migration command will be executed again. Otherwise the migration is finished.
5. Now you can check the result and commit the changes.

> **Note:** You can reset the migration with `git reset --hard HEAD~1` or by discarding the affected files.

#### Help

```bash
kolibri migrate --help
```

#### Execute

```bash
kolibri migrate <path>
```

#### Options

| Option                         | Description                                                        |         Type         |          Default          |
| ------------------------------ | ------------------------------------------------------------------ | :------------------: | :-----------------------: |
| `--format`                     | Try to format the modified files with prettier                     |       boolean        |           true            |
| `--overwrite-current-version`  | Migrate from this current version instead of the installed version |       version        | current installed version |
| `--overwrite-target-version`   | Migrate to this target version instead of the version of the CLI   |       version        |    version of the CLI     |
| `--ignore-greater-version`     | Allows execution with greater versions                             |       boolean        |           false           |
| `--ignore-uncommitted-changes` | Allows execution with uncommitted changes                          |       boolean        |           false           |
| `--remove-mode`                | Prefix property name or delete property                            | `delete` \| `prefix` |         `prefix`          |

#### Configuration

You can configure the migration with the `.kolibri.config.json` file in your project root folder. This file will be created automatically after the first migration.

**Troubleshooting:** If you have problems with migration, you can exclude some tasks with the configuration by setting the `false` flag (see `kol-select`).

```json
{
	"migrate": {
		"tasks": {
			".gitignore-add-rule-.kolibri.migrate.json": true,
			".npmrc-add-rule-save-exact=true": true,
			"add--cpy-cli,rimraf": true,
			"exec-npx cpy \"node_modules/@public-ui/components/assets/**/*\" \"public/assets\" --dot": true,
			"kol-abbr-remove-property-_tooltip-align": true,
			"kol-abbr-rename-property-_align-to-_tooltip-align": true,
			"kol-abbr-rename-property-_title-to-_label": true,
			"kol-accordion-mark-removed-slot-header": true,
			"kol-accordion-rename-property-_heading-to-_label": true,
			"kol-accordion-rename-slot-content-to-": true,
			"kol-alert-rename-property-_heading-to-_label": true,
			"kol-badge-remove-property-_hide-label": true,
			"kol-badge-remove-property-_icon-only": true,
			"kol-badge-rename-property-_icon-only-to-_hide-label": true,
			"kol-badge-rename-property-_icon-to-_icons": true,
			"kol-breadcrumb-rename-property-_aria-label-to-_label": true,
			"kol-button-link-remove-property-_access-key": true,
			"kol-button-link-remove-property-_aria-current": true,
			"kol-button-link-remove-property-_aria-label": true,
			"kol-button-link-remove-property-_id": true,
			"kol-button-link-rename-property-_aria-current-to-_listen-aria-current": true,
			"kol-button-link-rename-property-_icon-only-to-_hide-label": true,
			"kol-button-link-rename-property-_icon-to-_icons": true,
			"kol-button-remove-property-_access-key": true,
			"kol-button-remove-property-_aria-current": true,
			"kol-button-remove-property-_aria-label": true,
			"kol-button-remove-property-_icon-align": true,
			"kol-button-remove-property-_id": true,
			"kol-button-rename-property-_icon-only-to-_hide-label": true,
			"refactor-property-icon-align": true,
			"kol-button-rename-property-_icon-to-_icons": true,
			"kol-card-mark-removed-slot-footer": true,
			"kol-card-mark-removed-slot-header": true,
			"kol-card-remove-property-_has-footer": true,
			"kol-card-rename-property-_heading-to-_label": true,
			"kol-card-rename-property-_headline-to-_label": true,
			"kol-card-rename-slot-content-to-": true,
			"kol-checkbox-rename-property-_type-to-_variant": true,
			"kol-color-rename-property-_icon-to-_icons": true,
			"kol-color-rename-property-_list-to-_suggestions": true,
			"kol-combobox-refactor-property-error-to-msg": true,
			"kol-combobox-remove-property-_alert": true,
			"kol-combobox-remove-property-_id": true,
			"kol-combobox-rename-property-_hide-error-to-_hide-msg": true,
			"kol-date-rename-property-_list-to-_suggestions": true,
			"kol-details-rename-property-_summary-to-_label": true,
			"kol-heading-move-innerText-to-property-_label": true,
			"kol-icon-remove-property-_part": true,
			"kol-icon-rename-property-_aria-label-to-_label": true,
			"kol-icon-rename-property-_icon-to-_icons": true,
			"kol-input-checkbox-move-innerText-to-property-_label": true,
			"kol-input-checkbox-refactor-property-error-to-msg": true,
			"kol-input-checkbox-remove-property-_alert": true,
			"kol-input-checkbox-remove-property-_id": true,
			"kol-input-checkbox-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-checkbox-rename-property-_icon-to-_icons": true,
			"kol-input-checkbox-rename-property-_type-to-_variant": true,
			"kol-input-color-move-innerText-to-property-_label": true,
			"kol-input-color-refactor-property-error-to-msg": true,
			"kol-input-color-remove-property-_alert": true,
			"kol-input-color-remove-property-_id": true,
			"kol-input-color-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-date-move-innerText-to-property-_label": true,
			"kol-input-date-refactor-property-error-to-msg": true,
			"kol-input-date-remove-property-_alert": true,
			"kol-input-date-remove-property-_id": true,
			"kol-input-date-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-date-rename-property-_icon-to-_icons": true,
			"kol-input-email-move-innerText-to-property-_label": true,
			"kol-input-email-refactor-property-error-to-msg": true,
			"kol-input-email-remove-property-_alert": true,
			"kol-input-email-remove-property-_id": true,
			"kol-input-email-remove-property-_size": true,
			"kol-input-email-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-email-rename-property-_icon-to-_icons": true,
			"kol-input-email-rename-property-_list-to-_suggestions": true,
			"kol-input-file-move-innerText-to-property-_label": true,
			"kol-input-file-refactor-property-error-to-msg": true,
			"kol-input-file-remove-property-_alert": true,
			"kol-input-file-remove-property-_id": true,
			"kol-input-file-remove-property-_value": true,
			"kol-input-file-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-file-rename-property-_icon-to-_icons": true,
			"kol-input-number-move-innerText-to-property-_label": true,
			"kol-input-number-refactor-property-error-to-msg": true,
			"kol-input-number-remove-property-_alert": true,
			"kol-input-number-remove-property-_id": true,
			"kol-input-number-remove-property-_type": true,
			"kol-input-number-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-number-rename-property-_icon-to-_icons": true,
			"kol-input-number-rename-property-_list-to-_suggestions": true,
			"kol-input-password-move-innerText-to-property-_label": true,
			"kol-input-password-refactor-property-error-to-msg": true,
			"kol-input-password-remove-property-_alert": true,
			"kol-input-password-remove-property-_id": true,
			"kol-input-password-remove-property-_size": true,
			"kol-input-password-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-password-rename-property-_icon-to-_icons": true,
			"kol-input-radio-move-innerText-to-property-_label": true,
			"kol-input-radio-refactor-property-error-to-msg": true,
			"kol-input-radio-remove-property-_alert": true,
			"kol-input-radio-remove-property-_id": true,
			"kol-input-radio-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-radio-rename-property-_list-to-_options": true,
			"kol-input-range-move-innerText-to-property-_label": true,
			"kol-input-range-refactor-property-error-to-msg": true,
			"kol-input-range-remove-property-_alert": true,
			"kol-input-range-remove-property-_id": true,
			"kol-input-range-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-range-rename-property-_icon-to-_icons": true,
			"kol-input-range-rename-property-_list-to-_suggestions": true,
			"kol-input-rename-property-_icon-to-_icons": true,
			"kol-input-text-move-innerText-to-property-_label": true,
			"kol-input-text-refactor-property-error-to-msg": true,
			"kol-input-text-remove-property-_alert": true,
			"kol-input-text-remove-property-_id": true,
			"kol-input-text-remove-property-_size": true,
			"kol-input-text-rename-property-_hide-error-to-_hide-msg": true,
			"kol-input-text-rename-property-_icon-to-_icons": true,
			"kol-input-text-rename-property-_list-to-_suggestions": true,
			"kol-link-button-remove-property-_aria-controls": true,
			"kol-link-button-remove-property-_aria-expanded": true,
			"kol-link-button-remove-property-_aria-label": true,
			"kol-link-button-remove-property-_aria-selected": true,
			"kol-link-button-remove-property-_disabled": true,
			"kol-link-button-rename-property-_aria-current-to-_listen-aria-current": true,
			"kol-link-button-rename-property-_icon-only-to-_hide-label": true,
			"kol-link-button-rename-property-_icon-to-_icons": true,
			"kol-link-group-remove-property-_heading": true,
			"kol-link-group-remove-property-_level": true,
			"kol-link-group-remove-property-_ordered": true,
			"kol-link-group-rename-property-_aria-label-to-_label": true,
			"kol-link-group-rename-property-_heading-to-_label": true,
			"kol-link-move-innerText-to-property-_label": true,
			"kol-link-remove-property-_aria-controls": true,
			"kol-link-remove-property-_aria-expanded": true,
			"kol-link-remove-property-_aria-label": true,
			"kol-link-remove-property-_aria-selected": true,
			"kol-link-remove-property-_disabled": true,
			"kol-link-remove-property-_selector": true,
			"kol-link-remove-property-_stealth": true,
			"kol-link-remove-property-_use-case": true,
			"kol-link-rename-property-_aria-current-to-_listen-aria-current": true,
			"kol-link-rename-property-_icon-only-to-_hide-label": true,
			"kol-link-rename-property-_icon-to-_icons": true,
			"kol-logo-rename-property-_abbr-to-_org": true,
			"kol-modal-remove-property-_active-element": true,
			"kol-modal-rename-property-_aria-label-to-_label": true,
			"kol-nav-remove-property-_has-compact-button": true,
			"kol-nav-remove-property-_variant": true,
			"kol-nav-rename-property-_aria-label-to-_label": true,
			"kol-nav-rename-property-_compact-to-_hide-label": true,
			"kol-pagination-rename-property-_count-to-_total": true,
			"kol-pagination-rename-property-_total-to-_max": true,
			"kol-popover-button-remove-property-_id": true,
			"kol-progress-rename-property-_type-to-_variant": true,
			"kol-quote-rename-property-_caption-to-_label": true,
			"kol-select-move-innerText-to-property-_label": true,
			"kol-select-refactor-property-error-to-msg": true,
			"kol-select-remove-property-_alert": true,
			"kol-select-remove-property-_id": true,
			"kol-select-remove-property-_size": true,
			"kol-select-rename-property-_height-to-_rows": true,
			"kol-select-rename-property-_hide-error-to-_hide-msg": true,
			"kol-select-rename-property-_icon-to-_icons": true,
			"kol-select-rename-property-_list-to-_options": true,
			"kol-single-select-refactor-property-error-to-msg": true,
			"kol-single-select-remove-property-_alert": true,
			"kol-single-select-remove-property-_id": true,
			"kol-single-select-rename-property-_hide-error-to-_hide-msg": true,
			"kol-skip-nav-rename-property-_aria-label-to-_label": true,
			"kol-span-rename-property-_icon-only-to-_hide-label": true,
			"kol-span-rename-property-_icon-to-_icons": true,
			"kol-split-button-remove-property-_access-key": true,
			"kol-split-button-remove-property-_aria-label": true,
			"kol-split-button-remove-property-_id": true,
			"kol-split-button-remove-property-_show": true,
			"kol-split-button-remove-property-_show-dropdown": true,
			"kol-symbol-rename-property-_aria-label-to-_label": true,
			"kol-table-rename-property-_caption-to-_label": true,
			"kol-tabs-rename-property-_aria-label-to-_label": true,
			"kol-tabs-rename-property-_icon-only-to-_hide-label": true,
			"kol-tabs-rename-property-_icon-to-_icons": true,
			"kol-tabs-rename-property-_tab-align-to-_align": true,
			"kol-textarea-move-innerText-to-property-_label": true,
			"kol-textarea-refactor-property-error-to-msg": true,
			"kol-textarea-remove-property-_alert": true,
			"kol-textarea-remove-property-_id": true,
			"kol-textarea-rename-property-_hide-error-to-_hide-msg": true,
			"kol-textarea-update-property-_resize-value-both-to-vertical": true,
			"kol-textarea-update-property-_resize-value-horizontal-to-none": true,
			"kol-toast-remove-property-_show-duration": true,
			"kol-toast-rename-property-_heading-to-_label": true,
			"kol-tooltip-remove-property-_id": true,
			"kol-version-rename-property-_version-to-_label": true,
			"merge-html-codicon-in-index.html": true,
			"package.json-reconfigure-scripts.prepare": true,
			"refactor-property-icon-align": true,
			"refactor-property-label-replace-false": true,
			"remove--cpy-cli,rimraf": true,
			"remove-msg-props": true,
			"remove-public/assets/codicons": true,
			"remove-toast-variant-^4": true,
			"remove-toaster-get-instance-options-^4": true,
			"rename-tag-name-kol-table-to-kol-table-stateful": true,
			"toaster-rename-properties": true,
			"vscode-settings-reconfigure-html.customData": true
		}
	}
}
```

> The `exec-npx cpy` task copies the packaged component assets into your project's `public/assets` folder; leave it enabled unless your build already handles asset copying in a different location.

## Troubleshooting

If the migration failed, you can reset the migration with `git reset --hard HEAD~1`.

Use the configuration (`.kolibri.config.json`) to exclude some tasks.

If your project is already on a newer version of KoliBri, but you want to repeat the migration from a previous version, you can use this `--overwrite-current-version` option. It overwrites the offset version from which the migration originally starts, instead of using the installed version.

If there are multiple obsolete properties that have been migrated to just one new property, the new property may appear multiple times in the tag. You can then decide which variant to use and remove all other variants accordingly.

Maybe it can help to prepare your code in the tricky places for migration.

Please give us feedback, if you have problems with the migration: [GitHub Issues](https://github.com/public-ui/kolibri/issues/new?assignees=&labels=useful+hint&projects=&template=7_feedback.md&title=%F0%9F%92%A1+CLI%3A+)

## Dry run

You have always the possibility of a dry run. Because before the migration will be executed, you need a clean git history of you project.

After the migration you can check the result with `git status` and `git diff`.

Is anything wrong, you can reset the migration with `git reset --hard HEAD~1` or by discarding the affected files.
