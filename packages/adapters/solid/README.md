# KoliBri - Solid-Adapter

[![npm](https://img.shields.io/npm/v/@public-ui/solid)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/solid)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/solid)](https://www.npmjs.com/package/@public-ui/solid)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/solid)](https://bundlephobia.com/result?p=@public-ui/solid)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

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

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/solid) and create a Solid root:

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/solid';

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
