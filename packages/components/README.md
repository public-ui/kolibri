# Components (Library)

[![npm](https://img.shields.io/npm/v/@public-ui/components)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/components)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/components)](https://www.npmjs.com/package/@public-ui/components)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/components)](https://bundlephobia.com/result?p=@public-ui/components)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

This package contains the Stencil-based web components that power KoliBri.
Each component ships in the `@public-ui/components` npm package.

Learn more about the architecture in the
[architecture concept](https://public-ui.github.io/docs/concepts/architecture)
and find additional guides on the
[documentation site](https://public-ui.github.io/docs).

## Installation

Add the library to your project with [pnpm](https://pnpm.io):

```bash
pnpm add @public-ui/components
```

## Usage

Register the components with a theme before using them:

```ts
import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/theme-default';

register(DEFAULT, defineCustomElements).catch(console.error);
```

After registration you can use the elements in your markup:

```html
<kol-button _label="Hello World"></kol-button>
```

Framework-specific adapters are available for improved developer experience.
See the [framework guides](https://public-ui.github.io/en/docs/get-started/frameworks).

## Development notes

- Temporarily remove elements in `src/index.html` while working on components.
  - Search for the component name with an uppercase letter.
  - Input components are located under "Form".
- Restore `src/index.html` or `src/index.bak.html` once your work is done.

Run `pnpm --filter @public-ui/components build` to build the library.
During development you can start the live preview with `pnpm start`.

### Development commands

- `pnpm start` – run the local dev server with live reload
- `pnpm test` – execute unit and snapshot tests
- `pnpm lint` – check the code base with ESLint and Stylelint

The [component source README](./src/components/README.md) describes additional styling rules.

## Repository structure

- `src/components` – web components grouped by category:
  - `form` – form-related elements such as `form`, `combobox`, `input-*`, `select`, `single-select` and `textarea`
  - `feedback` – feedback elements like `alert`
  - `navigation` – navigation elements like `pagination`
  - other components remain at the top level
- `src/schema` – TypeScript schema describing the API of every component.
- `src/assets`, `src/locales` and `src/utils` – shared assets, translations and utilities.

You can customize KoliBri by creating your own theme. See the [default theme guide](../themes/default/README.md) for details.
