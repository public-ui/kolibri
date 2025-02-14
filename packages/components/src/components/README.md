# KoliBri - Components

## Installation

You can install the KoliBri components with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/components
pnpm i -g @public-ui/components
yarn add -g @public-ui/components
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) of your choice:

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
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

## Development hints

### Styling

1. Do not use `!important`!
2. Only alignment/position/layout!
3. No colors/spacing/font/transform/animation/overflow!
4. padding/margin 0 is allowed! If set, use comment.
