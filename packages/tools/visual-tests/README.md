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

Sample views in the [React Sample App](https://github.com/public-ui/kolibri/tree/develop/packages/samples/react) mark their variant blocks with the `SampleBlock` component, which renders the `data-visual-block` attribute. `SampleBlock` is the **only** place that sets the attribute — samples must not set it directly on their own elements. When a route contains such blocks, the visual tests capture **one element screenshot per block** (`<route-slug>--<block-id>.png`) instead of one full-page screenshot. This isolates diffs: a change to one variant no longer invalidates the entire page screenshot through layout shifts.

`SampleBlock` renders an optional heading (`heading`/`level` props) above the captured block — headings are sample chrome and stay outside the `data-visual-block` container, so heading changes never invalidate snapshots. The default container layout (`grid gap-4`) can be overridden with the `className` prop.

Wrap each block around a **single case**, so a change to one case only invalidates that case's snapshot. Samples that render the same set of cases more than once per route (the input, select and textarea samples render them with and without `_hideLabel`) group each repetition with `SampleGroup`. `SampleGroup` renders the heading but **no** `data-visual-block` container, so the nested blocks stay individual screenshots instead of being captured together. The cases component takes a `blockIdPrefix` and prefixes every block id with it, which keeps the ids unique within the route:

```tsx
// partials/variants.tsx
<SampleColumns>
	<SampleGroup heading="Email">
		<InputEmailCases blockIdPrefix="label" {...props} />
	</SampleGroup>
	<SampleGroup heading="Email (hideLabel)">
		<InputEmailCases blockIdPrefix="hide-label" {...props} _hideLabel />
	</SampleGroup>
</SampleColumns>

// partials/cases.tsx
<SampleBlock id={`${blockIdPrefix}-disabled`}>
	<KolInputEmail {...props} _disabled _value="test@mail.de" _label="E-Mail (Disabled)" />
</SampleBlock>
```

By default the block container spans the full sample width, so narrow samples produce a snapshot that is mostly empty space. Set the `fitContent` prop to shrink the container to the width its content actually needs (`width: fit-content`):

```tsx
<SampleBlock id="basic" fitContent>
	<span>
		I am <KolAbbr>e.g.</KolAbbr> an abbreviation.
	</span>
</SampleBlock>
```

Use it for narrow, inline-ish samples (abbr, badge, link, …). Don't use it for components that depend on the available width (tables, form fields, cards) — shrinking the container would change how they render.

### Reflow (320 px) snapshots

Set the `narrow` prop on a block to capture it a **second time at 320 px viewport width**
(`<route-slug>--<block-id>-320.png`). 320 CSS pixels is the width WCAG 1.4.10 (Reflow) asks for, so this is where a layout that refuses to wrap, a grid that keeps two columns or a table that pushes the page into horizontal scrolling shows up:

```tsx
<SampleBlock id="basic" className="w-full grid grid-cols-2 gap-4" narrow>
	<KolCard _label="…" />
	<KolCard _label="…" />
</SampleBlock>
```

Opt in deliberately — every flagged block doubles its snapshot count, and blocks whose layout does not depend on the available width (badges, abbreviations, icons) gain nothing from it. There is no per-route switch: only the sample itself knows whether narrow width changes its layout, so the decision lives next to the block. Routes captured with `forceFullPage` have no blocks and therefore cannot opt in.

This replaces the former 400 % zoom pass (`snapshot.zoom`), which produced one whole-page screenshot per route, was switched off on 150 of 158 routes, and cascaded diffs across the entire page.

### Making the blocks visible while developing

The block containers are invisible by design. To see what an element screenshot actually captures, switch on the debug outline:

- `Ctrl+Alt+B` toggles it at runtime (no reload) and remembers the choice for the next visit,
- `?visualBlocks` enables it for a URL, `?visualBlocks=0` disables it again — combinable with `?hideMenus`.

The outline is drawn as a CSS `outline`, so it takes no space and doesn't shift the layout: the page looks exactly the same with and without it. It can't affect snapshots either, because Playwright starts every run with a fresh browser context (no stored preference) and the test URLs never carry `visualBlocks`.

Rules for block ids:

- kebab-case (`[a-z0-9]+(-[a-z0-9]+)*`), max. 30 characters — enforced by the test.
- Unique within a route — duplicates fail the test.
- Hard-code ids instead of deriving them from visible labels, so text changes don't rename snapshot files.
- Cases that are rendered more than once per route are prefixed via `blockIdPrefix` – the prefix counts towards the 30 character limit.
- Blocks must be visible in `?hideMenus` mode and must not have zero size.
- Overlay content (tooltips, toasts, popovers) that extends beyond the block's bounding box is clipped — such routes should use full-page screenshots instead.

Every route must either contain at least one `data-visual-block` container or set `snapshot.forceFullPage: true` in `tests/sample-app.routes.js` — a route with neither fails the test. `forceFullPage` is meant for deliberate whole-page captures: overlays that extend beyond any block (dialogs, drawers, toasts, open popovers), focus-dependent content (skip-nav) and composition tests (`scenarios/*`, `form/basic`).

Snapshot files are named after the route: `button/basic` → `button-basic--<block-id>.png` (element screenshots) or `button-basic.png` (full page).

For details on theming see the [default theme README](../../themes/default/README.md).
