# KoliBri - Stylelint Rules

Custom Stylelint rules that keep the SCSS of KoliBri components and themes inside the KoliBri layer architecture, ready to use in your own KoliBri theme.

[![npm](https://img.shields.io/npm/v/@public-ui/stylelint-rules)](https://www.npmjs.com/package/@public-ui/stylelint-rules)
[![license](https://img.shields.io/npm/l/@public-ui/stylelint-rules)](https://github.com/public-ui/kolibri/blob/develop/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/stylelint-rules)](https://www.npmjs.com/package/@public-ui/stylelint-rules)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

KoliBri styles its web components with adopted style sheets in five cascade layers. Each layer has one owner, and the order of the layers decides which rule wins:

| Order | Layer                 | Owner                             | Content                                                  |
| :---: | --------------------- | --------------------------------- | -------------------------------------------------------- |
|   1   | `kol-a11y`            | `@public-ui/components`           | Accessibility preset for all components                  |
|   2   | `kol-global`          | `@public-ui/components`           | Basis layout shared by all components                    |
|   3   | `kol-component`       | `@public-ui/components`           | Basis layout of one component                            |
|   4   | `kol-theme-global`    | your theme (`global.scss`)        | Design tokens, fonts and colors shared by all components |
|   5   | `kol-theme-component` | your theme (one file a component) | The look of one component                                |

CSS outside a layer beats every layered rule, whatever its specificity. A single unlayered selector in a theme can therefore override the accessibility preset by accident, and a layer with a wrong name ends up in the wrong place of the cascade. These rules catch both while you write the SCSS:

- All CSS of a theme stands inside `@layer kol-theme-global` or `@layer kol-theme-component`.
- Mixins, helpers and partials stay layer-agnostic, so the file that includes them decides the layer.
- A theme styles the component through `:host`, never through the page-wide `:root`.
- Selectors are flat BEM classes, without `@at-root` or `$root: &` gymnastics.

The KoliBri monorepo lints its own components and themes with exactly these rules.

## Installation

```bash
npm i -D stylelint postcss-scss @public-ui/stylelint-rules
pnpm i -D stylelint postcss-scss @public-ui/stylelint-rules  # recommended
```

| Requirement | Version                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Stylelint   | 17 or newer                                                                                        |
| SCSS syntax | `postcss-scss` as `customSyntax`, or a config that sets it (e.g. `stylelint-config-standard-scss`) |
| Node.js     | with ES module support (the package is ESM only)                                                   |

## Quick start for a theme

A KoliBri theme keeps its sources in `src/`: `global.scss` for the theme global layer and one file for each component in `src/components/`. Add a `.stylelintrc.json` to the theme package:

```json
{
	"customSyntax": "postcss-scss",
	"plugins": ["@public-ui/stylelint-rules"],
	"rules": {
		"kolibri/common-layer-name-convention": true,
		"kolibri/common-no-at-root": true,
		"kolibri/common-no-layer-in-reuse-files": true,
		"kolibri/common-no-root-selector": true,
		"kolibri/common-require-component-layer": [true, { "layerName": "kol-theme-component", "pathPattern": "/src/components/" }],
		"kolibri/theme-require-global-layer": true
	}
}
```

Then lint the sources:

```bash
npx stylelint "src/**/*.scss"
```

A component file that passes all rules looks like this:

```scss
// src/components/button.scss
@use '../mixins/focus' as *;

@layer kol-theme-component {
	.kol-button {
		border-radius: var(--border-radius);
	}

	.kol-button--variant-primary {
		background-color: var(--color-primary);
	}

	.kol-button:focus-visible {
		@include focus-outline;
	}
}
```

## Where a rule applies

Most rules decide by the path of the linted file whether they apply. A file outside the path of a rule passes it silently, so check that your folder layout matches:

| Rule                                            | Applies to                                                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `kolibri/common-component-css-must-be-in-layer` | `style.scss` files below `/packages/components/src/components/`                                                                   |
| `kolibri/common-layer-name-convention`          | `.scss` files below a `/src/` folder                                                                                              |
| `kolibri/common-no-at-root`                     | every file                                                                                                                        |
| `kolibri/common-no-layer-in-reuse-files`        | files below a `/src/` folder that are in a `helpers` or `mixins` folder or start with `_`                                         |
| `kolibri/common-no-root-selector`               | `.scss` files below a `/src/` folder                                                                                              |
| `kolibri/common-require-component-layer`        | `.scss` files whose path contains `pathPattern`, except partials (`_*.scss`), `a11y.scss`, `preset.scss` and `forced-colors.scss` |
| `kolibri/component-allowed-layer-names`         | files below `/packages/components/`, except `a11y.scss` and `_layer-order.scss`                                                   |
| `kolibri/theme-allowed-layer-names`             | files below `/packages/themes/`                                                                                                   |
| `kolibri/theme-require-global-layer`            | files named `global.scss`                                                                                                         |

The rules with `/packages/components/` or `/packages/themes/` in their path serve the KoliBri monorepo itself. For a theme in your own repository, `kolibri/common-layer-name-convention` checks the layer names instead of `kolibri/theme-allowed-layer-names`.

## Rules for themes

### `kolibri/common-require-component-layer`

Every CSS rule, root-level declaration and `@include` of a component file stands inside the configured layer, and the file uses no other layer. Rules inside `@keyframes` and SCSS variables at root level are allowed outside the layer.

| Option        | Type      | Required | Description                                                                                                  |
| ------------- | --------- | :------: | ------------------------------------------------------------------------------------------------------------ |
| `layerName`   | `string`  |    ✓     | The expected layer, `kol-theme-component` for a theme.                                                       |
| `pathPattern` | `string`  |    ✓     | A substring of the file path that marks the component files, e.g. `/src/components/`.                        |
| `strict`      | `boolean` |          | `true` (default) checks every rule and include. `false` only checks that the file declares the layer at all. |

Without `layerName` or `pathPattern`, the rule does nothing.

```scss
// ❌ the selector is outside the layer
.kol-button {
	color: var(--color-text);
}

// ✅
@layer kol-theme-component {
	.kol-button {
		color: var(--color-text);
	}
}
```

### `kolibri/theme-require-global-layer`

All CSS of `global.scss` stands inside `@layer kol-theme-global`, and the file uses no other layer. An `@include` outside the layer is reported when its mixin generates CSS (such as `focus-outline`, `button` or `kol-alert`); includes of pure helper mixins pass.

```scss
// ❌
:host {
	--color-primary: #004b76;
}

// ✅
@layer kol-theme-global {
	:host {
		--color-primary: #004b76;
	}
}
```

### `kolibri/common-layer-name-convention`

Every `@layer` in the theme sources is named `kol-theme-global` or `kol-theme-component`. A different name, such as a typo, would create a new layer at an unexpected place in the cascade. The rule always reports a **warning**, whatever severity you configure.

```scss
// ❌
@layer kol-theme-components { … }
// ✅
@layer kol-theme-component { … }
```

### `kolibri/common-no-layer-in-reuse-files`

Files in `helpers/` or `mixins/` folders and partials (`_*.scss`) declare no `@layer`. They are included into component files, and the including file decides the layer. `_global.scss` and `_layer-order.scss` are exempt.

```scss
// src/mixins/focus.scss
// ❌
@layer kol-theme-component {
	@mixin focus-outline { … }
}
// ✅
@mixin focus-outline {
	outline: 3px solid var(--color-focus);
}
```

### `kolibri/common-no-root-selector`

`:root` styles the whole page and does not reach into the shadow DOM of a component. A theme sets its tokens on `:host`.

```scss
// ❌
:root {
	--color-primary: #004b76;
}
// ✅
:host {
	--color-primary: #004b76;
}
```

### `kolibri/common-no-at-root`

Selectors are flat BEM classes. `@at-root` and capturing the parent selector in a variable (`$root: &`) are reported; nest a selector only where a modifier changes a child element.

```scss
// ❌
.kol-alert {
	$root: &;

	&__closer {
		@at-root #{$root}--variant-msg & { … }
	}
}

// ✅
.kol-alert__closer {
	.kol-alert--variant-msg & { … }
}
```

## Rules for the KoliBri monorepo

These rules check the paths of the monorepo and do nothing in other repositories.

| Rule                                            | Purpose                                                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `kolibri/common-component-css-must-be-in-layer` | The `style.scss` of every component in `packages/components` wraps all CSS in a layer.               |
| `kolibri/component-allowed-layer-names`         | `packages/components` uses only `kol-a11y`, `kol-global`, `kol-component` and `kol-forced-colors`.   |
| `kolibri/theme-allowed-layer-names`             | `packages/themes` uses only `kol-theme-global`, `kol-theme-component` and `kol-theme-forced-colors`. |

The components package enables `kolibri/common-require-component-layer` with `{ "layerName": "kol-component", "pathPattern": "/packages/components/src/components/", "strict": false }`.

## Versioning

The package is released together with all KoliBri packages and carries the same version. Its rules follow the layer architecture of that KoliBri version, so use the version that matches your `@public-ui/components`.

## Development

```bash
pnpm --filter @public-ui/stylelint-rules test
```

For the full monorepo contribution guide see [CONTRIBUTING.md](https://github.com/public-ui/kolibri/blob/develop/CONTRIBUTING.md).

## Related

- [`@public-ui/eslint-config`](https://www.npmjs.com/package/@public-ui/eslint-config): the matching ESLint presets and rules.
- [Theming concept](https://github.com/public-ui/kolibri/blob/develop/docs/BASE_STYLING_VS_THEMING_CONCEPT.md): base styling versus theming.

## License

[EUPL-1.2](https://github.com/public-ui/kolibri/blob/develop/LICENSE)
