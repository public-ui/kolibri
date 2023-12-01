# KoliBri - Schema

The **Schema** module contains the concrete specification of the component library. This includes the list of tag names and translation keys.

More information on **modularization** can be found in the [architecture concept](https://public-ui.github.io/docs/concepts/architecture).  
More about the **project** can be found in the [documentation](https://public-ui.github.io/docs).

## Installation

You can install the KoliBri schema with `npm`, `pnpm` or `yarn`:

```bash
npm i -g @public-ui/schema
pnpm i -g @public-ui/schema
yarn add -g @public-ui/schema
```

## Usage

The `KoliBri` object can be used to register themes and translations:

```typescript
import { KoliBri } from '@public-ui/schema';

KoliBri.createTranslation('de', {
	/* translations */
});
KoliBri.createTheme('default', {
	/* component definitions */
});
```
