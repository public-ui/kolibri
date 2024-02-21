# KoliBri - Core

The **Core** module contains the core features of the component library. This includes the list of tag names and translation keys.

More information on **modularization** can be found in the [architecture concept](https://public-ui.github.io/docs/concepts/architecture).  
More about the **project** can be found in the [documentation](https://public-ui.github.io/docs).

## Installation

You can install the KoliBri schema with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/core
pnpm i -g @public-ui/core
yarn add -g @public-ui/core
```

## Usage

The `KoliBri` object can be used to register themes and translations:

```typescript
import { register } from '@public-ui/core';

await register([THEME], []);
```
