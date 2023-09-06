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

Use the `kolibri` command to start the CLI.

```bash
kolibri --help
```

### Migrate

With the `migrate` command you can migrate your project to the latest version of `KoliBri`.

Actually the following migrations are available:

- Component renaming ✓
- Component removal ⏰
- Property renaming ✓
- Property removal ✓
- Property type change ⏰
- Logic refactoring ⏰
- Expert-Slot refactoring ⏰
- `.vscode/settings.json` add IntelliSense for HTML ⏰
- `.gitignore` exclude `.kolibri.migrate.json` ⏰
- `.tsconfig` add `@public-ui/components` to `types` array ⏰

#### How does it work?

1. The migration command will check your project for clear `git history` and the `installed version` of `KoliBri`. Now it load all available migration tasks.
2. If the task in the correct version range, it will be executed them one by one. Otherwise it will be skipped.
3. After that the `package.json` will be updated with the new version of `KoliBri` and execute the `npm install` command.
4. Are there any pending tasks, the migration command will be executed again. Otherwise the migration is finished.
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

| Option                         | Description                                |          Type          |  Default   |
| ------------------------------ | ------------------------------------------ | :--------------------: | :--------: |
| `--ignore-uncommitted-changes` | Allows execution with uncommitted changes  |        boolean         |   false    |
| `--remove-mode`                | Remove properties by comment out or delete | `delete` \| `prefixed` | `prefixed` |

#### Configuration

You can configure the migration with the `.kolibri.config.json` file in your project root folder. This file will be created automatically after the first migration.

**Troubleshooting:** If you have problems with migration, you can exclude some tasks with the configuration by setting the `false` flag (see `kol-select`).

```json
{
	"migrate": {
		"tasks": {
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
			"kol-button-rename-property-_icon-only-to-_hide-label": true,
			"kol-card-rename-property-_heading-to-_label": true,
			"kol-card-rename-property-_headline-to-_label": true,
			"kol-details-rename-property-_summary-to-_label": true,
			"kol-icon-remove-property-_part": true,
			"kol-icon-rename-property-_aria-label-to-_label": true,
			"kol-checkbox-rename-property-_type-to-_variant": true,
			"kol-color-rename-property-_list-to-_suggestions": true,
			"kol-date-rename-property-_list-to-_suggestions": true,
			"kol-input-email-rename-property-_list-to-_suggestions": true,
			"kol-input-number-rename-property-_list-to-_suggestions": true,
			"kol-input-radio-rename-property-_list-to-_options": true,
			"kol-input-range-rename-property-_list-to-_suggestions": true,
			"kol-input-text-rename-property-_list-to-_suggestions": true,
			"kol-link-group-rename-property-_aria-label-to-_label": true,
			"kol-link-group-remove-property-_ordered": true,
			"kol-nav-rename-property-_aria-label-to-_label": true,
			"kol-nav-rename-property-_compact-to-_hide-label": true,
			"kol-nav-remove-property-_has-compact-button": true,
			"kol-pagination-rename-property-_count-to-_total": true,
			"kol-progress-rename-property-_type-to-_variant": true,
			"kol-quote-rename-property-_caption-to-_label": true,
			"kol-select-rename-property-_height-to-_rows": false,
			"kol-select-rename-property-_list-to-_options": false,
			"kol-skip-nav-rename-property-_aria-label-to-_label": true,
			"kol-span-rename-property-_icon-only-to-_hide-label": true,
			"kol-split-button-remove-property-_aria-label": true,
			"kol-table-rename-property-_caption-to-_label": true,
			"kol-tabs-rename-property-_aria-label-to-_label": true,
			"kol-tabs-rename-property-_tab-align-to-_align": true,
			"kol-toast-rename-property-_heading-to-_label": true,
			"kol-version-rename-property-_version-to-_label": true
		}
	}
}
```

## Troubleshooting

If the migration failed, you can reset the migration with `git reset --hard HEAD~1`.

Use the configuration (`.kolibri.config.json`) to exclude some tasks.

Maybe it can help to prepare your code in the tricky places for migration.

Please give us feedback, if you have problems with the migration: [GitHub Issues](https://github.com/public-ui/kolibri/issues/new?assignees=&labels=useful+hint&projects=&template=7_feedback.md&title=%F0%9F%92%A1+CLI%3A+)

## Dry run

You have always the possibility of a dry run. Because before the migration will be executed, you need a clean git history of you project.

After the migration you can check the result with `git status` and `git diff`.

Is anything wrong, you can reset the migration with `git reset --hard HEAD~1` or by discarding the affected files.
