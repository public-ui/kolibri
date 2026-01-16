# KoliBri - Svelte-Adapter

[![npm](https://img.shields.io/npm/v/@public-ui/svelte)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/svelte)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/svelte)](https://www.npmjs.com/package/@public-ui/svelte)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/svelte)](https://bundlephobia.com/result?p=@public-ui/svelte)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

Provide an adapter for [Svelte](https://svelte.dev/) to use the KoliBri components.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i @public-ui/svelte
pnpm i @public-ui/svelte
yarn add @public-ui/svelte
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes/default) and register the components:

```ts
import { DEFAULT } from '@public-ui/theme-default';
import { defineCustomElements } from '@public-ui/components/loader';
import { register } from '@public-ui/components';

await register(DEFAULT, defineCustomElements);
```

Then, you can import any component from `@public-ui/svelte` and render it inside a Svelte component:

```svelte
<script lang="ts">
        import { KolButton } from '@public-ui/svelte';
</script>

<KolButton _label="Hello World" />
```

Find available design tokens in the [default theme README](../../themes/default/README.md).
