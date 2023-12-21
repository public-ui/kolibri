# KoliBri - ECL-Themes

## Motivation

The ECL themes provide styling according to the Styleguides of the European Commission and European Union for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/theme-ecl
pnpm i -g @public-ui/theme-ecl
yarn add -g @public-ui/theme-ecl
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import {
	ECL_EC, // or ECL_EU
} from '@public-ui/theme-ecl';

register(
	ECL_EC, // or ECL_EU
	defineCustomElements,
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```
