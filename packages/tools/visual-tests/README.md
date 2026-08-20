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
		"test:update:e2e": "THEME_MODULE=src/index THEME_EXPORT=THEME_NAME kolibri-visual-test --update-snapshots=changed"
	}
}
```

### Environment variables

- `THEME_MODULE`: Define the relative path to the TypeScript module containing the theme definitions. Without file extension.
- `THEME_EXPERT`: Define the name of the export within the module. (e.g., `export const THEME_NAME = {/**/};`) Defaults to `default`.
- `KOLIBRI_VISUAL_TESTS_TIMEOUT`: Define the Playwright [test timeout](https://playwright.dev/docs/test-timeouts).
- `KOLIBRI_VISUAL_TESTS_EXPECT_TIMEOUT`: Define the Playwright [expect timeout](https://playwright.dev/docs/test-timeouts).
- `KOLIBRI_VISUAL_TESTS_COLOR_SCHEME`: Choose the [CSS color scheme](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme) for the browser context. Supported values are `light` (default) and `dark`.

Run the tests with `npm test`. The first time, this will create a new folder `snapshots` which is supposed to be committed to the repository.
In the following runs, new screenshots will be compared to this reference.

To update the reference screenshots call `npm run test:update`.

### Element screenshots (`data-visual-block`)

Sample views in the [React Sample App](https://github.com/public-ui/kolibri/tree/develop/packages/samples/react) mark their variant blocks with a `data-visual-block` attribute — either via the `SampleBlock` helper component or by setting the attribute directly on a container element (e.g. a `<fieldset>`). When a route contains such blocks, the visual tests capture **one element screenshot per block** (`<route-slug>--<block-id>.png`) instead of one full-page screenshot. This isolates diffs: a change to one variant no longer invalidates the entire page screenshot through layout shifts.

Rules for block ids:

- kebab-case (`[a-z0-9]+(-[a-z0-9]+)*`), max. 30 characters — enforced by the test.
- Unique within a route — duplicates fail the test.
- Hard-code ids instead of deriving them from visible labels, so text changes don't rename snapshot files.
- Blocks must be visible in `?hideMenus` mode and must not have zero size.
- Overlay content (tooltips, toasts, popovers) that extends beyond the block's bounding box is clipped — such routes should use full-page screenshots instead.

Every route must either contain at least one `data-visual-block` container or set `snapshot.forceFullPage: true` in `tests/sample-app.routes.js` — a route with neither fails the test. `forceFullPage` is meant for deliberate whole-page captures: overlays that extend beyond any block (dialogs, drawers, toasts, open popovers), focus-dependent content (skip-nav) and composition tests (`scenarios/*`, `form/basic`).

Snapshot files are named after the route: `button/basic` → `button-basic--<block-id>.png` (element screenshots) or `button-basic.png` (full page).

For details on theming see the [default theme README](../../themes/default/README.md).
