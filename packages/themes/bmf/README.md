# KoliBri - Theme BMF

## Motivation

The theme provides styling according to the BMF Styleguide for KoliBri-components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/themes
pnpm i -g @public-ui/themes
yarn add -g @public-ui/themes
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/themes';

register(BMF, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
    /* Handle errors */
  }
```
