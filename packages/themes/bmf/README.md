# KoliBri - BMF-Theme

## Motivation

The theme provides styling according to the BMF-Styleguides for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/theme-bmf
pnpm i -g @public-ui/theme-bmf
yarn add -g @public-ui/theme-bmf
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/theme-bmf';

register(BMF, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```
