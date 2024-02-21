# KoliBri - CLI-Tools

## Motivation

The `KoliBri` CLI-Tools are a collection of tools to support the development with `KoliBri` components.

## Installation

You can install the `KoliBri` CLI-Tools with `npm`, `pnpm` or `yarn`.

```bash
npm i -g @public-ui/kolibri-cli
pnpm i -g @public-ui/kolibri-cli
yarn add -g @public-ui/kolibri-cli
```

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
`--' `--´  `---´  `--' `--' `------´  `--'    `--'
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io

Usage: kolibri [options] [command]

CLI for executing some helpful commands for KoliBri projects.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  migrate [options] <string>  This command migrates KoliBri code to the current version.
  help [command]              display help for command
```

### Migrate

With the `migrate` command you can migrate your project to the latest version of `KoliBri`.

Actually the following migration tasks from version 1 to version 2 are available:

- Component renaming ✓
- Component removal (no one yet)
- Property renaming ✓
- Property removal ✓
- Slots renaming (`content`) ✓
- Slots removal (`footer`, `header`) ✓
- Logic refactoring (no one yet)
- Expert-Slot refactoring
  - Move `innerText` to property ✓
  - Property type change (remove `_label={false}`) ✓
  - Set `_label=""` to activate the expert slot ([#5396](https://github.com/public-ui/kolibri/issues/5396)) ✓
- `.vscode/settings.json` add IntelliSense for HTML ✓
- `.gitignore` exclude `.kolibri.migrate.json` ✓
- `.tsconfig` add `@public-ui/components` to `types` array ✓
- Format modified files (`prettier@^3`) ✓
- Copy and integrate new assets ✓
- Handles `_icon-align` with a refactoring tasks ([#5397](https://github.com/public-ui/kolibri/issues/5397)) ⏰
- Detection of `_iconOnly` in TSX is not stable ([#5404](https://github.com/public-ui/kolibri/issues/5404)) ⏰
- Handle the remove `@public-ui/core` package ([#???](https://github.com/public-ui/kolibri/issues/????)) ⏰

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

| Option                         | Description                                    |         Type         | Default  |
| ------------------------------ | ---------------------------------------------- | :------------------: | :------: |
| `--format`                     | Try to format the modified files with prettier |       boolean        |   true   |
| `--ignore-greater-version`     | Allows execution with greater versions         |       boolean        |  false   |
| `--ignore-uncommitted-changes` | Allows execution with uncommitted changes      |       boolean        |  false   |
| `--remove-mode`                | Prefix property name or delete property        | `delete` \| `prefix` | `prefix` |

#### Configuration

You can configure the migration with the `.kolibri.config.json` file in your project root folder. This file will be created automatically after the first migration.

**Troubleshooting:** If you have problems with migration, you can exclude some tasks with the configuration by setting the `false` flag (see `kol-select`).

```json
{
	"migrate": {
		"tasks": {
			".gitignore-add-rule-.kolibri.migrate.json": true,
			"vscode-settings-reconfigure-html.customData": true,
			"tsconfig-reconfigure-compilerOptions.types": true,
			"remove--cpy-cli,rimraf": true,
			"add--cpy-cli,rimraf": true,
			"package.json-reconfigure-scripts.prepare": true,
			"merge-html-codicon-in-index.html": true,
			"remove-public/assets/codicons": true,
			"exec-npx cpy \"node_modules/@public-ui/components/assets/**/*\" \"public/assets\" --dot": true,
			".npmrc-add-rule-save-exact=true": true,
			"kol-abbr-rename-property-_align-to-_tooltip-align": true,
			"kol-abbr-rename-property-_title-to-_label": true,
			"kol-accordion-rename-property-_heading-to-_label": true,
			"kol-badge-rename-property-_icon-only-to-_hide-label": true,
			"kol-badge-remove-property-_hide-label": true,
			"kol-badge-remove-property-_icon-only": true,
			"kol-breadcrumb-rename-property-_aria-label-to-_label": true,
			"kol-button-link-remove-property-_aria-current": true,
			"kol-button-link-remove-property-_aria-label": true,
			"kol-button-link-rename-property-_icon-only-to-_hide-label": true,
			"kol-button-remove-property-_aria-current": true,
			"kol-button-remove-property-_aria-label": true,
			"kol-button-remove-property-_icon-align": true,
			"kol-button-rename-property-_icon-only-to-_hide-label": true,
			"kol-button-rename-property-_icon-to-_icons": true,
			"kol-card-rename-property-_heading-to-_label": true,
			"kol-card-rename-property-_headline-to-_label": true,
			"kol-details-rename-property-_summary-to-_label": true,
			"kol-icon-remove-property-_part": true,
			"kol-icon-rename-property-_aria-label-to-_label": true,
			"kol-icon-rename-property-_icon-to-_icons": true,
			"kol-input-checkbox-rename-property-_icon-to-_icons": true,
			"kol-checkbox-rename-property-_type-to-_variant": true,
			"kol-color-rename-property-_icon-to-_icons": true,
			"kol-color-rename-property-_list-to-_suggestions": true,
			"kol-input-date-rename-property-_icon-to-_icons": true,
			"kol-date-rename-property-_list-to-_suggestions": true,
			"kol-input-email-rename-property-_icon-to-_icons": true,
			"kol-input-email-rename-property-_list-to-_suggestions": true,
			"kol-input-file-rename-property-_icon-to-_icons": true,
			"kol-input-number-rename-property-_icon-to-_icons": true,
			"kol-input-number-rename-property-_list-to-_suggestions": true,
			"kol-input-password-rename-property-_icon-to-_icons": true,
			"kol-input-radio-rename-property-_list-to-_options": true,
			"kol-input-range-rename-property-_icon-to-_icons": true,
			"kol-input-range-rename-property-_list-to-_suggestions": true,
			"kol-input-rename-property-_icon-to-_icons": true,
			"kol-input-text-rename-property-_icon-to-_icons": true,
			"kol-input-text-rename-property-_list-to-_suggestions": true,
			"kol-link-button-remove-property-_aria-control": true,
			"kol-link-button-remove-property-_aria-expanded": true,
			"kol-link-button-remove-property-_aria-label": true,
			"kol-link-button-remove-property-_aria-selected": true,
			"kol-link-button-remove-property-_disabled": true,
			"kol-link-button-rename-property-_aria-current-to-_listen-aria-current": true,
			"kol-link-button-rename-property-_icon-only-to-_hide-label": true,
			"kol-link-group-rename-property-_heading-to-_label": true,
			"kol-link-group-remove-property-_heading": true,
			"kol-link-group-remove-property-_ordered": true,
			"kol-link-group-rename-property-_aria-label-to-_label": true,
			"kol-link-remove-property-_aria-control": true,
			"kol-link-remove-property-_aria-expanded": true,
			"kol-link-remove-property-_aria-label": true,
			"kol-link-remove-property-_aria-selected": true,
			"kol-link-remove-property-_disabled": true,
			"kol-link-remove-property-_icon-align": true,
			"kol-link-remove-property-_selector": true,
			"kol-link-remove-property-_stealth": true,
			"kol-link-remove-property-_use-case": true,
			"kol-link-rename-property-_aria-current-to-_listen-aria-current": true,
			"kol-link-rename-property-_icon-only-to-_hide-label": true,
			"kol-logo-rename-property-_abbr-to-_org": true,
			"kol-modal-rename-property-_aria-label-to-_label": true,
			"kol-nav-remove-property-_variant": true,
			"kol-nav-rename-property-_aria-label-to-_label": true,
			"kol-nav-rename-property-_compact-to-_hide-label": true,
			"kol-pagination-rename-property-_count-to-_total": true,
			"kol-pagination-rename-property-_total-to-_max": true,
			"kol-progress-rename-property-_type-to-_variant": true,
			"kol-quote-rename-property-_caption-to-_label": true,
			"kol-select-rename-property-_height-to-_rows": true,
			"kol-select-rename-property-_icon-to-_icons": true,
			"kol-select-rename-property-_list-to-_options": true,
			"kol-skip-nav-rename-property-_aria-label-to-_label": true,
			"kol-span-rename-property-_icon-only-to-_hide-label": true,
			"kol-span-rename-property-_icon-to-_icons": true,
			"kol-split-button-remove-property-_aria-label": true,
			"kol-split-button-rename-property-_show-dropdown-to-_show": true,
			"kol-table-rename-property-_caption-to-_label": true,
			"kol-tabs-rename-property-_aria-label-to-_label": true,
			"kol-tabs-rename-property-_icon-to-_icons": true,
			"kol-tabs-rename-property-_tab-align-to-_align": true,
			"kol-toast-remove-property-_show-duration": true,
			"kol-toast-rename-property-_heading-to-_label": true,
			"kol-version-rename-property-_version-to-_label": true,
			"kol-heading-move-innerText-to-property-_label": true,
			"kol-input-checkbox-move-innerText-to-property-_label": true,
			"kol-input-color-move-innerText-to-property-_label": true,
			"kol-input-date-move-innerText-to-property-_label": true,
			"kol-input-email-move-innerText-to-property-_label": true,
			"kol-input-file-move-innerText-to-property-_label": true,
			"kol-input-number-move-innerText-to-property-_label": true,
			"kol-input-password-move-innerText-to-property-_label": true,
			"kol-input-radio-move-innerText-to-property-_label": true,
			"kol-input-range-move-innerText-to-property-_label": true,
			"kol-input-text-move-innerText-to-property-_label": true,
			"kol-link-move-innerText-to-property-_label": true,
			"kol-select-move-innerText-to-property-_label": true,
			"kol-textarea-move-innerText-to-property-_label": true,
			"kol-accordion-mark-removed-slot-header": true,
			"kol-card-mark-removed-slot-footer": true,
			"kol-card-mark-removed-slot-header": true,
			"kol-accordion-rename-slot-content-to-": true,
			"kol-card-rename-slot-content-to-": true,
			"refactor-property-label-replace-false": true
		}
	}
}
```

## Troubleshooting

If the migration failed, you can reset the migration with `git reset --hard HEAD~1`.

Use the configuration (`.kolibri.config.json`) to exclude some tasks.

If there are multiple obsolete properties that have been migrated to just one new property, the new property may appear multiple times in the tag. You can then decide which variant to use and remove all other variants accordingly.

Maybe it can help to prepare your code in the tricky places for migration.

Please give us feedback, if you have problems with the migration: [GitHub Issues](https://github.com/public-ui/kolibri/issues/new?assignees=&labels=useful+hint&projects=&template=7_feedback.md&title=%F0%9F%92%A1+CLI%3A+)

## Dry run

You have always the possibility of a dry run. Because before the migration will be executed, you need a clean git history of you project.

After the migration you can check the result with `git status` and `git diff`.

Is anything wrong, you can reset the migration with `git reset --hard HEAD~1` or by discarding the affected files.

## Changelog

### 1.7.1

- Fix version handling by adding the absolut min version 1.4.2
- Add post message feature for more details
- Add `${` support by `_label` migration
- Activate Expert-Slot refactoring for `_label` migration
- Prevents `@public-ui/kolibri-cli` from being changed by the update process
