# KoliBri - Components

## Installation

You can install the KoliBri components with `npm`, `pnpm` or `yarn`:

```bash
npm i @public-ui/components
pnpm i @public-ui/components
yarn add @public-ui/components
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) of your choice:

```ts
import { defineCustomElements } from '@public-ui/components/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```

Then, you can use the components in your HTML:

```html
<kol-button _label="Hello World"></kol-button>
```

Consider using one of the [framework integrations](https://public-ui.github.io/en/docs/get-started/frameworks) for a better developer experience.

## Development notes

### Styling

1. Do not use `!important`!
2. Only alignment/position/layout!
3. No colors/spacing/font/transform/animation/overflow!
4. padding/margin 0 is allowed! If set, use comment.
5. No color schemes (dark/light)! No `prefers-color-scheme`, `color-scheme` or `light-dark()` — that is theme work (see [`docs/BASE_STYLING_VS_THEMING_CONCEPT.md`](../../../../docs/BASE_STYLING_VS_THEMING_CONCEPT.md)).
