# @public-ui/eslint-config

Shared ESLint flat config presets and custom rules for all packages of the KoliBri monorepo. All ESLint plugins and parsers are managed centrally in this package, so every package only needs `eslint` and `@public-ui/eslint-config` as devDependencies.

## Usage

Each package defines an `eslint.config.mjs` that composes the presets exported by this package:

```js
// Theme packages
import { themeConfig } from '@public-ui/eslint-config';

export default themeConfig({ tsconfigRootDir: import.meta.dirname });
```

```js
// Plain Node.js packages
import { nodeConfig } from '@public-ui/eslint-config';

export default nodeConfig();
```

```js
// Type-aware TypeScript packages
import { typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	rules: {
		// package-specific overrides
	},
});
```

## Exports

| Export                                     | Description                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| `nodeConfig(options)`                      | Preset for plain JavaScript (Node.js) packages.                                        |
| `typescriptConfig(options)`                | Preset for type-aware TypeScript linting (optionally with the type-checked rule sets). |
| `themeConfig(options)`                     | Preset for the theme packages.                                                         |
| `reactConfig(options)`                     | Preset for the React sample applications.                                              |
| `kolibriPlugin`                            | Custom KoliBri rules (currently `kolibri/require-barrel-import`).                      |
| `defaultIgnores`, `baseRules`              | Shared ignore patterns and the common rule set.                                        |
| `tsRecommendedRules`, `tsTypeCheckedRules` | Recommended rule sets of `@typescript-eslint` for spreading into flat config objects.  |
| `js`, `tsPlugin`, `tsParser`, `globals`, … | Re-exports of the centrally managed plugins for package configs with special needs.    |

## Custom rules

### `kolibri/require-barrel-import`

Enforces that configured directories are imported through their barrel file (`index.ts`) instead of deep imports into individual modules. See `rules/require-barrel-import.js` for details.
