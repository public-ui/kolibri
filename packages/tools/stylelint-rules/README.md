# KoliBri - Stylelint Rules

Custom Stylelint rules for enforcing SCSS architecture and accessibility standards in the KoliBri component library.

[![license](https://img.shields.io/npm/l/@public-ui/stylelint-rules)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

These Stylelint Rules enforce SCSS architecture conventions for web component libraries. They ensure that:

- All CSS is properly scoped inside `@layer` declarations.
- Only the correct layer names are used per package (`kol-component`, `kol-theme-component`, etc.).
- Utility files (mixins, helpers, partials) stay layer-agnostic.
- Theme files never use the global `:root` selector — only `:host` for proper web component encapsulation.
- The deprecated `$root: &` and `@at-root` SCSS patterns are banned in favor of flat BEM selectors.

## Installation

```bash
npm i -D @public-ui/stylelint-rules
pnpm i -D @public-ui/stylelint-rules  # recommended
```

## Configuration

Add the plugin and enable the rules you need in your `.stylelintrc.json`. Rules are organized in three categories:

### General Rules (for all packages)

```json
{
	"plugins": ["@public-ui/stylelint-rules"],
	"rules": {
		"kolibri/common-component-css-must-be-in-layer": true,
		"kolibri/common-layer-name-convention": "warn",
		"kolibri/common-no-at-root": true,
		"kolibri/common-no-layer-in-reuse-files": true,
		"kolibri/common-no-root-selector": true
	}
}
```

### Component Package Rules (`packages/components/`)

```json
{
	"plugins": ["@public-ui/stylelint-rules"],
	"rules": {
		"kolibri/component-allowed-layer-names": true,
		"kolibri/common-require-component-layer": [
			true,
			{
				"layerName": "kol-component",
				"pathPattern": "/packages/components/src/components/",
				"strict": false
			}
		]
	}
}
```

### Theme Package Rules (`packages/themes/`)

```json
{
	"plugins": ["@public-ui/stylelint-rules"],
	"rules": {
		"kolibri/theme-allowed-layer-names": true,
		"kolibri/theme-require-global-layer": true,
		"kolibri/common-require-component-layer": [
			true,
			{
				"layerName": "kol-theme-component",
				"pathPattern": "/src/components/"
			}
		]
	}
}
```

### `require-component-layer` options

The `kolibri/common-require-component-layer` rule is configurable and accepts a secondary options object:

| Option        | Type      | Required | Description                                                                                                                            |
| ------------- | --------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `layerName`   | `string`  |    ✓     | The expected `@layer` name, e.g. `"kol-component"` or `"kol-theme-component"`                                                          |
| `pathPattern` | `string`  |    ✓     | A path substring that must be present in the file path for the rule to apply                                                           |
| `strict`      | `boolean` |          | When `true` (default), every CSS rule and `@include` is checked individually. When `false`, only the presence of the layer is verified |

**Example for `packages/components`:**

```json
"kolibri/common-require-component-layer": [true, {
	"layerName": "kol-component",
	"pathPattern": "/packages/components/src/components/",
	"strict": false
}]
```

**Example for theme packages:**

```json
"kolibri/common-require-component-layer": [true, {
	"layerName": "kol-theme-component",
	"pathPattern": "/src/components/"
}]
```

## Rules

### General Rules (applicable to all packages)

| Rule                                            | Description                                                                                                          | Default  |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | :------: |
| `kolibri/common-component-css-must-be-in-layer` | All CSS in `style.scss` files inside `packages/components/src/components/` must be wrapped in a `@layer` declaration |  `true`  |
| `kolibri/common-layer-name-convention`          | Warns when a `@layer` name in `src/` does not follow the convention `kol-theme-global` or `kol-theme-component`      | `"warn"` |
| `kolibri/common-no-at-root`                     | Forbids `@at-root` and the `$variable: &` selector-capture pattern. Use flat BEM selectors instead                   |  `true`  |
| `kolibri/common-no-layer-in-reuse-files`        | `@layer` declarations are forbidden inside `helpers/`, `mixins/`, and `_`-prefixed partial files                     |  `true`  |
| `kolibri/common-no-root-selector`               | The `:root` selector is forbidden in `src/` SCSS files. Use `:host` instead for web component scoping                |  `true`  |

### Component Package Rules (`packages/components/`)

| Rule                                     | Description                                                                                                                  |      Default      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | :---------------: |
| `kolibri/component-allowed-layer-names`  | Only `kol-a11y`, `kol-global`, and `kol-component` layers are allowed inside `packages/components/`                          |      `true`       |
| `kolibri/common-require-component-layer` | Configurable rule that ensures SCSS component files use the correct `@layer`. Requires `layerName` and `pathPattern` options | See options below |

### Theme Package Rules (`packages/themes/`)

| Rule                                     | Description                                                                                                                  |      Default      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | :---------------: |
| `kolibri/theme-allowed-layer-names`      | Only `kol-theme-global` and `kol-theme-component` layers are allowed inside `packages/themes/`                               |      `true`       |
| `kolibri/theme-require-global-layer`     | All CSS in `global.scss` must be inside `@layer kol-theme-global`                                                            |      `true`       |
| `kolibri/common-require-component-layer` | Configurable rule that ensures SCSS component files use the correct `@layer`. Requires `layerName` and `pathPattern` options | See options below |

## Development

```bash
# Run all rule tests
pnpm test
```

For the full monorepo contribution guide see [CONTRIBUTING.md](https://github.com/public-ui/kolibri/blob/main/CONTRIBUTING.md).
