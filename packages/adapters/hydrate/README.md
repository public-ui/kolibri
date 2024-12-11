# KoliBri - Hydrate-Adapter

[![npm](https://img.shields.io/npm/v/@public-ui/hydrate)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/hydrate)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/hydrate)](https://www.npmjs.com/package/@public-ui/hydrate)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/hydrate)](https://bundlephobia.com/result?p=@public-ui/hydrate)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

Provide an adapter for Server Side Rendering of KoliBri components.

⚠️ Hydrate support is currently considered experimental.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/hydrate
pnpm i -g @public-ui/hydrate
yarn add -g @public-ui/hydrate
```

## Usage

Call the `renderToString` method and pass it an HTML string containing KoliBri component tags. The method will return a
Promise that resolves with an object containing the hydrated HTML.

```ts
import { renderToString } from '@public-ui/hydrate';

const inputHtml = `<kol-button _label="Hello World"_></kol-button>`;
const { html } = await renderToString(inputHtml);
```
