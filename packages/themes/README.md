# KoliBri - Themes

[![npm](https://img.shields.io/npm/v/@public-ui/themes)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/themes)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/themes)](https://www.npmjs.com/package/@public-ui/themes)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/themes)](https://bundlephobia.com/result?p=@public-ui/themes)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

The **Themes** module contains numerous themes (style guides) for the component library. They can be loaded in combination with the Components module.

You can read more about **modularization** in the [architecture concept](https://public-ui.github.io/docs/concepts/architecture).

More about the **project** can be found in the [documentation](https://public-ui.github.io/docs).

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/themes
pnpm i -g @public-ui/themes
yarn add -g @public-ui/themes
```

## Usage

Register the themes like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT, ECL_EC, ECL_EU } from '@public-ui/themes';

register(
	DEFAULT,
	// or provide an array to register multiple themes:
	// [DEFAULT, ECL_EC, ECL_EU]
	defineCustomElements,
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```

## Important settings

### Usage of pnpm

We use **pnpm** as package manager and there is a tiny typing issue with the default typescript setup.

**What does we know?**

This seems to be a general issue:

- <https://github.com/microsoft/TypeScript/issues/29221>
- <https://github.com/microsoft/TypeScript/issues/48212>

**Solution:**

We must activate the specific option `preserveSymlinks` in the `tsconfig.json` file.

```json
  ...
  "preserveSymlinks": true,
  ...
```
