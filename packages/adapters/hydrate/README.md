# KoliBri - Hydrate-Adapter

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
