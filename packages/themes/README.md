# KoliBri - Themes

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
import { BAMF, BMF, BZStv1, DEFAULT, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2, ZOLLv3 } from '@public-ui/themes';

register(
  DEFAULT
  // or provide an array to register multiple themes:
  // [BAMF, BMF, DEFAULT, BZStv1, DESYv1, DESYv2, ECL_EC, ECL_EU, ITZBund, MAPZ, ZOLLv2, ZOLLv3, TH]
, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
    /* Handle errors */
  }
```

## Important settings

### Usage of pnpm

We use **pnpm** as package manager and there is a tiny typing issue with the default typescript setup.

**What happens?**

We got a type annotation error in TypeScript.

```bash
The inferred type of 'THEME' cannot be named without a reference to '.pnpm/@a11y-ui+core@***/node_modules/@a11y-ui/core/types/theming'. This is likely not portable. A type annotation is necessary.ts(2742)
```

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
