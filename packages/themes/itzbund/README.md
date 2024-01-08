# KoliBri - ITZBund-Theme

## Motivation

The theme provides styling according to the ITZBund-Styleguides for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/theme-itzbund
pnpm i -g @public-ui/theme-itzbund
yarn add -g @public-ui/theme-itzbund
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund } from '@public-ui/theme-itzbund';

register(ITZBund, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```
