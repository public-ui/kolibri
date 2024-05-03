# KoliBri - Visual Tests

## Motivation

The `KoliBri` Visual Tests provide a way to add visual regression testing to **theme** modules.  
It takes screenshots of every component defined in the [React Sample App](https://github.com/public-ui/kolibri/tree/develop/packages/samples/react) with the theme applied and compares them to their references.

## Installation

You can install the `KoliBri` Visual Tests with `npm`, `pnpm` or `yarn`:

```bash
npm i -D @public-ui/visual-tests
pnpm i -D @public-ui/visual-tests
yarn add -D @public-ui/visual-tests
```

## Usage

Add the following npm scripts to the theme's `package.json`:

```json
{
    "scripts": {
        "test": "THEME_MODULE=src/index THEME_EXPORT=THEME_NAME kolibri-visual-test",
        "test-update": "THEME_MODULE=src/index THEME_EXPORT=THEME_NAME kolibri-visual-test --update-snapshots",
    }
}
```

* `THEME_MODULE` defines the relative path to the TypeScript module containing the the theme definitions. Without file extension. 
* `THEME_EXPERT` defines the name of the export within the the module. (e.g., `export const THEME_NAME = {/**/};`) Defaults to `default`.  

Run the tests with `npm test`. The first time, this will create a new folder `snapshots` which is supposed to be committed to the repository.
In the following runs, new screenshots will be compared to this reference.

To update the reference screenshots call `npm run test-update`.