# KoliBri - ITZBund-Theme

[![npm](https://img.shields.io/npm/v/@public-ui/theme-itzbund)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/theme-itzbund)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-itzbund)](https://www.npmjs.com/package/@public-ui/theme-itzbund)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-itzbund)](https://bundlephobia.com/result?p=@public-ui/theme-itzbund)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

The theme provides styling according to the ITZBund-Styleguides for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/theme-itzbund
pnpm i -g @public-ui/theme-itzbund
yarn add -g @public-ui/theme-itzbund
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund } from '@public-ui/theme-itzbund';

register(ITZBund, defineCustomElements)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```
