# KoliBri - ESLint Config

Shared ESLint flat config presets and custom rules of the KoliBri monorepo, ready to use in your own KoliBri themes, component extensions and applications.

[![npm](https://img.shields.io/npm/v/@public-ui/eslint-config)](https://www.npmjs.com/package/@public-ui/eslint-config)
[![license](https://img.shields.io/npm/l/@public-ui/eslint-config)](https://github.com/public-ui/kolibri/blob/develop/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/eslint-config)](https://www.npmjs.com/package/@public-ui/eslint-config)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

Every package of the KoliBri monorepo lints with exactly this configuration. The package bundles all ESLint plugins and parsers in fixed versions, so a project needs only two devDependencies, `eslint` and `@public-ui/eslint-config`, and gets:

- **Presets** for plain JavaScript, type-aware TypeScript, KoliBri themes and React applications, each a function that returns a flat config array and takes your project-specific files, ignores and rules as options.
- **The `kolibri` plugin** with the custom rules that guard the KoliBri conventions for Stencil components: decorator placement, documented `@Prop` defaults, requiredness, static translation keys and barrel imports.
- **Re-exports** of all bundled plugins and parsers, so a config with special needs uses the same versions as the presets.

## Installation

```bash
npm i -D eslint @public-ui/eslint-config
pnpm i -D eslint @public-ui/eslint-config  # recommended
```

| Requirement | Version                                                                      |
| ----------- | ---------------------------------------------------------------------------- |
| ESLint      | 9 or newer, flat config (`eslint.config.mjs`)                                |
| Node.js     | with ES module support (the package is ESM only)                             |
| TypeScript  | for `typescriptConfig`, `themeConfig` and `reactConfig`: `>=4.8.4 <6.1.0`    |
| `tsconfig`  | for the TypeScript presets: a `tsconfig.json` that includes the linted files |

## Quick start

Create an `eslint.config.mjs` in the root of your package and pick the preset that matches it.

### KoliBri theme

```js
import { themeConfig } from '@public-ui/eslint-config';

export default themeConfig({ tsconfigRootDir: import.meta.dirname });
```

### TypeScript package

```js
import { globals, typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	globals: globals.node,
	typeChecked: true,
	rules: {
		// project-specific overrides
	},
});
```

### React application

```js
import { reactConfig } from '@public-ui/eslint-config';

export default reactConfig({ tsconfigRootDir: import.meta.dirname });
```

### Plain JavaScript (Node.js)

```js
import { nodeConfig } from '@public-ui/eslint-config';

export default nodeConfig({ files: ['scripts/**/*.{js,mjs}'] });
```

Then run ESLint as usual:

```bash
npx eslint src
```

## Which preset and rules each package uses

| Kind of package                                                                      | Preset                                                                                                                       | `kolibri` rules                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components package (`packages/components`)                                           | none: its own config, built from the exports (`tsParser`, `tsPlugin`, `stencilPlugin`, `tsRecommendedRules`, `baseRules`, …) | all six: `decorator-on-own-line` and `no-translate-cast-or-concat` for `src/**/*.{ts,tsx}`; `require-barrel-import` with `directories: ['internal/props', 'schema/props']` for the web components and functional components; `apply-passes-required`, `prop-optional-requires-initializer` and `prop-required-no-initializer` for the web components |
| Theme in the monorepo (`packages/themes/*`)                                          | `themeConfig`                                                                                                                | none                                                                                                                                                                                                                                                                                                                                                 |
| Theme in its own repository                                                          | `themeConfig`                                                                                                                | none                                                                                                                                                                                                                                                                                                                                                 |
| React samples (`packages/samples/*`)                                                 | `reactConfig`                                                                                                                | none                                                                                                                                                                                                                                                                                                                                                 |
| Tools and adapters (`packages/tools/*`, `packages/adapters/react-hook-form-adapter`) | `nodeConfig` or `typescriptConfig`                                                                                           | none                                                                                                                                                                                                                                                                                                                                                 |
| Stencil components of your own                                                       | `typescriptConfig` with `jsx: true`                                                                                          | `decorator-on-own-line`, `prop-optional-requires-initializer`, `prop-required-no-initializer`; `require-barrel-import` for directories with a barrel file                                                                                                                                                                                            |

`kolibri/apply-passes-required` and `kolibri/no-translate-cast-or-concat` check APIs internal to `@public-ui/components` (`BaseWebComponent.isRequired`, `PropDefinition.apply` and `translate()`) and only make sense in that package. The other four rules check plain Stencil and TypeScript code.

## Presets

Every preset returns an array of flat config objects. Spread it to combine it with your own config objects:

```js
import { typescriptConfig } from '@public-ui/eslint-config';

export default [
	...typescriptConfig({ tsconfigRootDir: import.meta.dirname }),
	{
		files: ['test/**/*.ts'],
		rules: { '@typescript-eslint/no-explicit-any': 'off' },
	},
];
```

All presets ignore `dist/**`, `node_modules/**` and `**/assets/**` and enforce `eqeqeq`.

### `nodeConfig(options?)`

Plain JavaScript with Node.js globals and `@eslint/js` recommended rules.

| Option    | Type                      | Default                 | Description                            |
| --------- | ------------------------- | ----------------------- | -------------------------------------- |
| `files`   | `string[]`                | `['src/**/*.{js,mjs}']` | Glob patterns of the files to lint.    |
| `ignores` | `string[]`                | `[]`                    | Ignore patterns added to the defaults. |
| `rules`   | `Record<string, unknown>` | `{}`                    | Additional or overriding rules.        |

### `typescriptConfig(options)`

Type-aware TypeScript with `@typescript-eslint/parser`, the `@eslint/js` and `@typescript-eslint` recommended rules, `no-undef` turned off (TypeScript reports unresolved identifiers itself) and `@typescript-eslint/no-unused-vars` as a warning that ignores `_`-prefixed arguments, caught errors and rest siblings.

| Option            | Type                      | Default                 | Description                                                                              |
| ----------------- | ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `tsconfigRootDir` | `string`                  | –                       | **Required.** Pass `import.meta.dirname`; the preset throws without it.                  |
| `project`         | `string[] \| true`        | `['./tsconfig.json']`   | tsconfig file(s) for type information; `true` uses the nearest `tsconfig.json` per file. |
| `files`           | `string[]`                | `['src/**/*.{ts,tsx}']` | Glob patterns of the files to lint.                                                      |
| `ignores`         | `string[]`                | `[]`                    | Ignore patterns added to the defaults.                                                   |
| `globals`         | `Record<string, unknown>` | –                       | Globals of the runtime, e.g. `globals.node` or `globals.browser`.                        |
| `jsx`             | `boolean`                 | `false`                 | Enables JSX parsing.                                                                     |
| `typeChecked`     | `boolean`                 | `false`                 | Adds the stricter `recommended-type-checked` rule set of `@typescript-eslint`.           |
| `rules`           | `Record<string, unknown>` | `{}`                    | Additional or overriding rules.                                                          |

### `themeConfig(options)`

`typescriptConfig` for KoliBri theme packages. A theme consumes the component types, which can be untyped at lint time, so `no-unsafe-assignment`, `no-unsafe-call` and `no-unsafe-member-access` are warnings, and `no-namespace` is off.

| Option            | Type                      | Default | Description                               |
| ----------------- | ------------------------- | ------- | ----------------------------------------- |
| `tsconfigRootDir` | `string`                  | –       | **Required.** Pass `import.meta.dirname`. |
| `rules`           | `Record<string, unknown>` | `{}`    | Additional or overriding rules.           |

### `reactConfig(options)`

`typescriptConfig` for React applications with JSX, browser and Node.js globals and the nearest `tsconfig.json` per file. On top: `consistent-type-imports` and `no-unsafe-member-access` as errors, `no-explicit-any` off, `react/no-unused-state`, all recommended rules of `react-hooks`, and the React version detected automatically. It lints `src/**/*.{js,jsx,ts,tsx}`.

The `jsx-a11y` plugin is registered but none of its rules is enabled, so you choose the accessibility rules yourself:

```js
import { jsxA11yPlugin, reactConfig } from '@public-ui/eslint-config';

export default reactConfig({
	tsconfigRootDir: import.meta.dirname,
	rules: {
		...jsxA11yPlugin.flatConfigs.recommended.rules,
	},
});
```

| Option            | Type                      | Default | Description                               |
| ----------------- | ------------------------- | ------- | ----------------------------------------- |
| `tsconfigRootDir` | `string`                  | –       | **Required.** Pass `import.meta.dirname`. |
| `ignores`         | `string[]`                | `[]`    | Ignore patterns added to the defaults.    |
| `rules`           | `Record<string, unknown>` | `{}`    | Additional or overriding rules.           |

## Custom rules

The custom rules live in `kolibriPlugin`. No preset enables them: register the plugin as `kolibri` and switch on the rules you want, scoped to the files they are meant for.

```js
import { kolibriPlugin, typescriptConfig } from '@public-ui/eslint-config';

export default [
	...typescriptConfig({ tsconfigRootDir: import.meta.dirname, jsx: true }),
	{
		files: ['src/components/**/*.{ts,tsx}'],
		plugins: { kolibri: kolibriPlugin },
		rules: {
			'kolibri/decorator-on-own-line': 'error',
			'kolibri/prop-optional-requires-initializer': 'error',
			'kolibri/prop-required-no-initializer': 'error',
		},
	},
];
```

| Rule                                         | Fixable | Purpose                                                                   |
| -------------------------------------------- | :-----: | ------------------------------------------------------------------------- |
| `kolibri/apply-passes-required`              |         | Prop appliers in web components pass the requiredness to `apply`.         |
| `kolibri/decorator-on-own-line`              |    ✓    | Every decorator stands on a line of its own.                              |
| `kolibri/no-translate-cast-or-concat`        |         | `translate()` takes a plain string literal; no `as TranslationKey` casts. |
| `kolibri/prop-optional-requires-initializer` |         | An optional `@Prop` carries its documented default as initializer.        |
| `kolibri/prop-required-no-initializer`       |         | A required `@Prop` carries no initializer.                                |
| `kolibri/require-barrel-import`              |    ✓    | Configured directories are imported through their barrel file.            |

### `kolibri/apply-passes-required`

In a KoliBri web component, the requiredness of a prop comes from the component's props config and is answered by `this.isRequired(key)`. An `apply` call of a prop definition without that third argument silently turns off the "required" warning of the component.

```ts
// ❌
labelProp.apply(value, (v) => this.setRenderProp('label', v));
// ✅
labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
```

Option `definitions` (`string[]`, default `['labelProp', 'labelWithExpertSlotProp', 'hrefProp']`) names the prop definitions the rule watches. Enable the rule only for the web component layer: appliers outside a component config (items, behaviors) apply without the argument on purpose.

### `kolibri/decorator-on-own-line`

Prettier keeps a decorator either on the line of its member or above it; this rule makes the placement uniform. `eslint --fix` breaks the line.

```ts
// ❌
@Prop() public _label!: LabelPropType;
// ✅
@Prop()
public _label!: LabelPropType;
```

### `kolibri/no-translate-cast-or-concat`

Translation keys must be statically resolvable, so a tool can verify that every used key exists in the locale files. The first argument of `translate()` must be a plain string literal: casts, template literals, concatenations, variables, ternaries and calls are reported. Every `as TranslationKey` cast in the file is reported as well.

```ts
// ❌
translate(`kol-${name}`);
translate('kol-close' as TranslationKey);
// ✅
translate('kol-close');
translate('kol-page-of', { placeholders: { page: '1' } });
```

### `kolibri/prop-optional-requires-initializer` and `kolibri/prop-required-no-initializer`

The initializer of a `@Prop` field is its documented default: it appears in `custom-elements.json` and in the IntelliSense of the framework adapters. An optional prop (`?`) therefore carries its default, and a required prop (`!`) carries none, so the documentation says that a value must be provided. Both rules check `@Prop` fields whose name starts with `_`.

```ts
// ❌
@Prop()
public _unit?: UnitPropType;
@Prop()
public _label!: LabelPropType = 'Label';
// ✅
@Prop()
public _unit?: UnitPropType = '%';
@Prop()
public _label!: LabelPropType;
```

An optional prop without a default carries an explicit `= undefined`.

### `kolibri/require-barrel-import`

Directories with a barrel file (`index.ts`) are imported through the barrel, not through a module inside them. Only relative imports are checked; files inside a protected directory may import their siblings directly. `eslint --fix` rewrites the import.

```js
'kolibri/require-barrel-import': ['error', { directories: ['schema/props'] }]
```

```ts
// ❌
import { countProp } from '../../schema/props/count';
// ✅
import { countProp } from '../../schema/props';
```

Option `directories` (`string[]`) lists the directory path patterns, with forward slashes. Without directories, the rule does nothing.

## Exports

| Export                                                                                                                                         | Description                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `nodeConfig`, `typescriptConfig`, `themeConfig`, `reactConfig`                                                                                 | The presets described above.                                                                   |
| `kolibriPlugin`                                                                                                                                | The custom rules, to be registered as `kolibri`.                                               |
| `defaultIgnores`                                                                                                                               | The shared ignore patterns: `dist/**`, `node_modules/**`, `**/assets/**`.                      |
| `baseRules`                                                                                                                                    | The rules every preset applies (`eqeqeq`).                                                     |
| `tsRecommendedRules`, `tsTypeCheckedRules`                                                                                                     | The rule sets `recommended` and `recommended-type-checked` of `@typescript-eslint`, to spread. |
| `boundariesPlugin`, `globals`, `js`, `jsonPlugin`, `jsxA11yPlugin`, `reactHooksPlugin`, `reactPlugin`, `stencilPlugin`, `tsParser`, `tsPlugin` | The bundled plugins, parsers and globals, in the versions the presets use.                     |

## Versioning

The package is released together with all KoliBri packages and carries the same version. Its rules follow the conventions of that KoliBri version, so use the version that matches your `@public-ui/components`.

## Related

- [`@public-ui/stylelint-rules`](https://www.npmjs.com/package/@public-ui/stylelint-rules): the matching Stylelint rules for KoliBri components and themes.
- [Contributing guide](https://github.com/public-ui/kolibri/blob/develop/CONTRIBUTING.md) of the monorepo.

## License

[EUPL-1.2](https://github.com/public-ui/kolibri/blob/develop/LICENSE)
