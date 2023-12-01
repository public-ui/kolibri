# KoliBri - Themes Zoll

## Motivation

The Zoll themes provide styling according to the different versions of Zoll-Styleguides for KoliBri-components.

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
import {
	ZOLLv3, // or ZOLLv2 or MAPZ
} from '@public-ui/themes';

register(
	ZOLLv3, // or ZOLLv2 or MAPZ
	defineCustomElements
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
    /* Handle errors */
  }
```
