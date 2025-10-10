# KoliBri - Visual Tests

Utilities for screenshot based regression testing of KoliBri themes.

[![npm](https://img.shields.io/npm/v/@public-ui/visual-tests)](https://www.npmjs.com/package/@public-ui/components)
[![license](https://img.shields.io/npm/l/@public-ui/visual-tests)](https://github.com/public-ui/kolibri/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@public-ui/visual-tests)](https://www.npmjs.com/package/@public-ui/visual-tests)
[![issues](https://img.shields.io/github/issues/public-ui/kolibri)](https://github.com/public-ui/kolibri/issues)
[![pull requests](https://img.shields.io/github/issues-pr/public-ui/kolibri)](https://github.com/public-ui/kolibri/pulls)
[![size](https://img.shields.io/bundlephobia/min/@public-ui/visual-tests)](https://bundlephobia.com/result?p=@public-ui/visual-tests)
![contributors](https://img.shields.io/github/contributors/public-ui/kolibri)

## Motivation

The `KoliBri` Visual Tests provide a way to add visual regression testing to **theme** modules.  
It takes screenshots of every component defined in the [React Sample App](https://github.com/public-ui/kolibri/tree/develop/packages/samples/react) with the theme applied and compares them to their references.

## Installation

It is recommended to configure NPM via `.npmrc`:

```bash
# - npm
engine-strict=true
save-exact=true

# - pnpm
shamefully-hoist=true # this is required for the visual tests to work
workspace-concurrency=1
```

You can install the `KoliBri` Visual Tests with `npm`, `pnpm` or `yarn`:

```bash
npm i -D @public-ui/visual-tests
pnpm i -D @public-ui/visual-tests # recommended
yarn add -D @public-ui/visual-tests
```

## Usage

Add the following npm scripts to the theme's `package.json`:

```json
{
	"scripts": {
		"test": "THEME_MODULE=src/index THEME_EXPORT=THEME_NAME kolibri-visual-test",
		"test-update": "THEME_MODULE=src/index THEME_EXPORT=THEME_NAME kolibri-visual-test --update-snapshots=changed"
	}
}
```

### Environment variables

- `THEME_MODULE`: Define the relative path to the TypeScript module containing the theme definitions. Without file extension.
- `THEME_EXPERT`: Define the name of the export within the module. (e.g., `export const THEME_NAME = {/**/};`) Defaults to `default`.
- `KOLIBRI_VISUAL_TESTS_TIMEOUT`: Define the Playwright [test timeout](https://playwright.dev/docs/test-timeouts).
- `KOLIBRI_VISUAL_TESTS_EXPECT_TIMEOUT`: Define the Playwright [expect timeout](https://playwright.dev/docs/test-timeouts).
- `KOLIBRI_SCREEN_READER`: Set to `1` (or `true`) to enable NVDA based screen reader automation. Requires a Windows host with NVDA configured via [`@guidepup/setup`](https://github.com/guidepup/setup).

### Screen reader automation

The visual tests can run additional NVDA scenarios powered by [`@guidepup/playwright`](https://www.npmjs.com/package/@guidepup/playwright).
When `KOLIBRI_SCREEN_READER` is enabled the Playwright configuration automatically switches to serial, headed execution so that the screen reader can control the browser.

Run the screen reader tests alongside the visual ones or filter them explicitly:

```bash
KOLIBRI_SCREEN_READER=1 kolibri-visual-test --grep "@screen-reader"
```

NVDA must be installed and configured for automation on the host machine.
Refer to the [Guidepup setup documentation](https://www.guidepup.dev/docs/getting-started) for environment preparation instructions.

Run the tests with `npm test`. The first time, this will create a new folder `snapshots` which is supposed to be committed to the repository.
In the following runs, new screenshots will be compared to this reference.

To update the reference screenshots call `npm run test-update`.

For details on theming see the [default theme README](../../themes/default/README.md).
