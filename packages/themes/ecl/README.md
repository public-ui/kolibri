# KoliBri - ECL-Themes

[![npm](https://img.shields.io/npm/v/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/theme-ecl)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/theme-ecl)](https://www.npmjs.com/package/@public-ui/theme-ecl)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/theme-ecl)](https://bundlephobia.com/result?p=@public-ui/theme-ecl)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

The ECL themes provide styling according to the Styleguides of the European Commission and European Union for KoliBri-Components.

## Installation

You can install the KoliBri themes with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/theme-ecl
pnpm i -g @public-ui/theme-ecl
yarn add -g @public-ui/theme-ecl
```

## Usage

Register the theme like this:

```tsx
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import {
	ECL_EC, // or ECL_EU
} from '@public-ui/theme-ecl';

register(
	ECL_EC, // or ECL_EU
	defineCustomElements,
)
	.then(() => {
		/* KoliBri ready */
	})
	.catch((error) => {
		/* Handle errors */
	});
```
