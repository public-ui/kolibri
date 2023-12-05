# KoliBri - Vue-Adapter

## Motivation

Provide an adapter for [Vue](https://vuejs.org/) to use the KoliBri components.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/vue
pnpm i -g @public-ui/vue
yarn add -g @public-ui/vue
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) and create a Vue app:

```ts
import { createApp } from 'vue';
import { DEFAULT } from '@public-ui/themes';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';

register(DEFAULT, defineCustomElements)
	.then(() => {
		createApp(App).mount(htmlDivElement);
	})
	.catch((error) => {
		/* Handle errors */
	});
```

Then, you can import any component from `@public-ui/vue` and render it within your Vue application:

```vue
<script setup>
import { KolButton } from '@public-ui/vue';
</script>
<template>
	<KolButton _label="Hello World" />
</template>
```
