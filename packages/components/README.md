# KoliBri Components

[![npm](https://img.shields.io/npm/v/@public-ui/components)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/components)](https://github.com/public-ui/kolibri/blob/develop/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/components)](https://www.npmjs.com/package/@public-ui/components)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/components)](https://bundlephobia.com/result?p=@public-ui/components)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

KoliBri Components is a production-ready library of accessible Web Components built with Stencil. It powers the KoliBri design system and ships as the `@public-ui/components` package for use in any modern web stack.

> New here? Start with the [documentation](https://public-ui.github.io/en/docs) or the [architecture overview](https://public-ui.github.io/en/docs/concepts/architecture).

## Highlights

- **Accessible by design**: components are built with accessibility in mind.
- **Framework-agnostic**: standard Web Components that work everywhere.
- **Theming-ready**: consistent theming via KoliBri themes.
- **Enterprise-friendly**: stable APIs and clear upgrade guidance.

## Installation

```bash
pnpm add @public-ui/components @public-ui/theme-default
```

## Usage

Register the component set and a theme once during app bootstrap:

```ts
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements).catch(console.error);
```

Then use the components anywhere in your markup:

```html
<kol-button _label="Hello KoliBri"></kol-button>
```

## Framework adapters

For an improved developer experience, use the framework-specific adapters described in the [framework guides](https://public-ui.github.io/en/docs/get-started/frameworks).

## Stacking order (z-index)

KoliBri keeps its own `z-index` values in two reserved layers: `1` to `10` for the stacking inside a component (for example sticky table columns or an open collapsible) and `1001` to `1010` for elements above the application (toasts, tooltips and the skip navigation). Place the overlays of your application, such as sticky headers or panels, between `11` and `1000`: they then lie above the components and below their tooltips. See [ADR-019](https://github.com/public-ui/kolibri/blob/develop/docs/arc42/09-architecture-decisions.md#adr-019-reserved-z-index-layers).

## Theming

KoliBri themes provide the visual layer for the components. The default theme is maintained in this repository; see the [default theme guide](../themes/default/README.md) to customize styles and tokens.
