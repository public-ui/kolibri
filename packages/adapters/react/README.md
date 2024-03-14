# KoliBri - React-Adapter

## Motivation

Provide an adapter for [React](https://reactjs.org) to use the KoliBri components.

## Installation

You can install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/react
pnpm i -g @public-ui/react
yarn add -g @public-ui/react
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) and create a React root:

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/themes';

register(DEFAULT, defineCustomElements)
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    /* Handle errors */
  });
```

Then, you can import any component from `@public-ui/react` and render it within React components:

```tsx
import React from 'react';
import type { FC } from 'react';
import { KolButton } from '@public-ui/react';

export default (): FC => <KolButton _label="Hello World" />;
```
