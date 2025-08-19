# KoliBri - React-Adapter for React 19.x

[![npm](https://img.shields.io/npm/v/@public-ui/react-v19)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/react-v19)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/react-v19)](https://www.npmjs.com/package/@public-ui/react-v19)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/react-v19)](https://bundlephobia.com/result?p=@public-ui/react-v19)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

Provide an adapter for [React](https://reactjs.org) to use the KoliBri components.

## Installation

Install the adapter with `npm`, `pnpm` or `yarn`:

```bash
npm i @public-ui/react-v19
pnpm i @public-ui/react-v19
yarn add @public-ui/react-v19
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes) and create a React root:

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { register } from '@public-ui/components';
import { DEFAULT } from '@public-ui/theme-default';

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

Then, you can import any component from `@public-ui/react-v19` and render it within React components:

```tsx
import React from 'react';
import type { FC } from 'react';
import { KolButton } from '@public-ui/react-v19';

export default (): FC => <KolButton _label="Hello World" />;
```

For available design tokens see the [default theme README](../../themes/default/README.md).
