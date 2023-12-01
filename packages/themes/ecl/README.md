# KoliBri - Themes ECL

## Motivation

The ECL themes provide styling according to the Styleguides of the European Commission and European Union for KoliBri-components.

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
	ECL_EC, // or ECL_EU
} from '@public-ui/themes';

register(
	ECL_EC, // or ECL_EU
	defineCustomElements
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
    /* Handle errors */
  }
```
