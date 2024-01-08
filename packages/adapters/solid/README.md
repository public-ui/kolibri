# KoliBri - Solid-Adapter

## Motivation

Provide an adapter for [SolidJS](https://www.solidjs.com/) to use the KoliBri components.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/solid
pnpm i -g @public-ui/solid
yarn add -g @public-ui/solid
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) and create a Solid root:

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/themes';

register(DEFAULT, defineCustomElements)
	.then(() => {
		const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
		if (htmlDivElement instanceof HTMLDivElement) {
			render(() => <AppComponent />, htmlDivElement);
		}
	})
	.catch(console.warn);
```

Then, you can import any component from `@public-ui/solid` and render it within components:

```tsx
import { Component } from 'solid-js';
import { KolButton } from '@public-ui/solid';

export const AppComponent: Component = () => <KolButton _label="Hello World" />;
```
