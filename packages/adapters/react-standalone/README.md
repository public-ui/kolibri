# KoliBri - Standalone React-Adapter

[![npm](https://img.shields.io/npm/v/@public-ui/react-standalone)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/react-standalone)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/react-standalone)](https://www.npmjs.com/package/@public-ui/react-standalone)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/react-standalone)](https://bundlephobia.com/result?p=@public-ui/react-standalone)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

Provide an adapter for [React](https://reactjs.org) to use the KoliBri components, without the need for a build/bundle process.

## Installation

Load the necessary scripts in your HTML file, either from a CDN or from your local installation:

```html
<!-- React -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- KoliBri -->
<script crossorigin src="https://unpkg.com/@public-ui/components@2.0.3/dist/kolibri/kolibri.esm.js" type="module"></script>
<script crossorigin src="https://unpkg.com/@public-ui/react-standalone@2.0.3/dist/index.mjs" type="module"></script>
```

## Usage

First, initialize KoliBri with a [theme](https://github.com/public-ui/kolibri/tree/develop/packages/themes):

```ts
import { register } from 'https://unpkg.com/@public-ui/components@2.0.3/dist/esm/index.js';
import { DEFAULT } from 'https://unpkg.com/@public-ui/theme-default/dist/index.mjs';
register(DEFAULT, []).catch(console.warn);
```

KoliBri components, such as `KolButton`, are globally accessible and can be utilized directly from the global namespace:

```js
const node = document.querySelector('#app');
const root = ReactDOM.createRoot(node);
root.render(React.createElement(KolButton, { _label: 'Hello World' }));
```
