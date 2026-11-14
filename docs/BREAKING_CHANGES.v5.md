# Breaking Changes for version 5

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Removal of the `@public-ui/themes` meta package

The `@public-ui/themes` meta package only ever re-exported and bundled the individual theme packages.
It was never meant to be used directly and is the reason for a circular dependency between the themes,
the visual-tests runner and the sample app.

Starting with version 4 the package is **deprecated**; it will be **removed in version 5**. Migrate to
the individual `@public-ui/theme-*` packages instead. When an application uses several themes (as the
presentation app does), add every theme as its own dependency.

### Package dependency

Replace the meta package with the individual theme packages you actually use:

**Before (v4):**

```jsonc
{
	"dependencies": {
		"@public-ui/themes": "^4.0.0",
	},
}
```

**After:**

```jsonc
{
	"dependencies": {
		"@public-ui/theme-default": "^4.0.0",
		"@public-ui/theme-ecl": "^4.0.0",
	},
}
```

| Meta export | Individual package         |
| ----------- | -------------------------- |
| `DEFAULT`   | `@public-ui/theme-default` |
| `BWSt`      | `@public-ui/theme-bwst`    |
| `DesyV11`   | `@public-ui/theme-desy`    |
| `ECL_EC`    | `@public-ui/theme-ecl`     |
| `ECL_EU`    | `@public-ui/theme-ecl`     |
| `KERN_V2`   | `@public-ui/theme-kern`    |

### Imports

**Before (v4):**

```ts
import { BWSt, DEFAULT, DesyV11, ECL_EC, ECL_EU, KERN_V2 } from '@public-ui/themes';
```

**After:**

```ts
import { BWSt } from '@public-ui/theme-bwst';
import { DEFAULT } from '@public-ui/theme-default';
import { DesyV11 } from '@public-ui/theme-desy';
import { ECL_EC, ECL_EU } from '@public-ui/theme-ecl';
import { KERN_V2 } from '@public-ui/theme-kern';
```

### Assets

The meta package aggregated the assets (fonts, icons) of all themes into a single `assets` folder.
Without it, copy the assets from each individual theme package you use. Note that the foreign icon
fonts and fonts are peer dependencies now and are no longer part of these assets — see
[Foreign icon fonts and fonts are peer dependencies now](#foreign-icon-fonts-and-fonts-are-peer-dependencies-now).

**Before (v4):**

```jsonc
{
	"scripts": {
		"prebuild:themes": "cpy \"node_modules/@public-ui/themes/assets/**/*\" public/assets --dot",
	},
}
```

**After:**

```jsonc
{
	"scripts": {
		"prebuild:theme-default": "cpy \"node_modules/@public-ui/theme-default/assets/**/*\" public/assets --dot",
		"prebuild:theme-ecl": "cpy \"node_modules/@public-ui/theme-ecl/assets/**/*\" public/assets --dot",
	},
}
```

## Foreign icon fonts and fonts are peer dependencies now

The theme packages no longer bundle third-party icon fonts and fonts in their `assets` folder. They
are **peer dependencies** instead: installing `@public-ui/theme-*` pulls the font packages into your
application automatically, and one CSS import per font at document level is the whole integration.
No copying of font folders into a public assets directory is needed anymore — the bundler resolves
the font files of the imported CSS on its own.

KoliBri's own fonts keep shipping with their packages: the **KolIcons** font ships with
`@public-ui/components`, and theme-specific icon fonts (`desy-icons` with `@public-ui/theme-desy`,
`ecl-icons` with `@public-ui/theme-ecl`, `material-symbols-subset` with `@public-ui/theme-kern`)
stay part of their theme. KoliBri publishes no icon font packages of its own on npm.

| Theme package              | New peer dependency                     | Replaces the bundled        |
| -------------------------- | --------------------------------------- | --------------------------- |
| `@public-ui/theme-default` | `@fortawesome/fontawesome-free` `6.7.2` | Font Awesome Free 6.1.1     |
| `@public-ui/theme-default` | `@vscode/codicons` `0.0.46-24`          | Codicons                    |
| `@public-ui/theme-bwst`    | `@fortawesome/fontawesome-free` `6.7.2` | (referenced, never shipped) |
| `@public-ui/theme-bwst`    | `@fontsource/noto-sans` `5.3.0`         | Noto Sans                   |
| `@public-ui/theme-desy`    | `@vscode/codicons` `0.0.46-24`          | Codicons                    |
| `@public-ui/theme-kern`    | `@fontsource/fira-sans` `5.3.0`         | Fira Sans                   |

### Package dependency

Install the font packages your application actually uses (the peer dependency of the theme pulls
them in automatically; an explicit dependency documents the intent and works with installers that do
not auto-install peers):

**Before (v4):** nothing to install — the fonts were checked into the theme package and had to be
copied out of `node_modules/@public-ui/theme-default/assets/…` manually.

**After (v5):**

```jsonc
{
	"dependencies": {
		"@public-ui/theme-default": "^5.0.0",
		"@fortawesome/fontawesome-free": "6.7.2",
		"@vscode/codicons": "0.0.46-24",
	},
}
```

### Integration

Import the font CSS once in the application entry point. It declares the `@font-face` rules at
document level, from where the shadow DOM of the components picks the fonts up. The glyph classes
stay in the theme, so `_icons="fas fa-house"` and `_icons="codicon codicon-plus"` keep working
unchanged:

**Before (v4):**

```jsonc
{
	"scripts": {
		"prebuild": "cpy \"node_modules/@public-ui/theme-default/assets/fontawesome-free/**/*\" public/assets --dot && cpy \"node_modules/@public-ui/theme-default/assets/codicons/**/*\" public/assets --dot",
	},
}
```

```html
<link rel="stylesheet" href="/assets/fontawesome-free/css/all.min.css" /> <link rel="stylesheet" href="/assets/codicons/codicon.css" />
```

**After (v5):**

```ts
// main.ts / index.tsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@vscode/codicons/dist/codicon.css';
```

The sample host app demonstrates the new integration in `packages/samples/presentation`.

### Why peer dependencies

- **Smaller packages and clean licensing.** Third-party font binaries (Font Awesome, Codicons,
  Noto Sans, Fira Sans) no longer sit in KoliBri's git repository and npm packages; their licenses
  are fulfilled by the upstream packages themselves.
- **Upstream updates without binary commits.** Bumping a font is a package.json change instead of
  re-committing font files by hand.
- **The application owns the version.** Like the framework adapters, the fonts are the consuming
  application's choice; a peer dependency states that contract instead of hiding it in an assets
  folder.
- **Simpler integration.** A CSS import replaces the manual copying of asset folders, and relative
  or absolute font URLs (`../webfonts/…`, `/assets/codicons/…`) that depended on the deployment
  layout disappear.

### Notes

- The glyph classes of the themes follow **Font Awesome 6**; the peer dependency is pinned to the
  latest 6.x release. Font Awesome 7 renamed classes and is not covered by the theme glyph sets.
- `@public-ui/theme-bwst` already referenced Font Awesome glyphs without shipping them — those icons
  rendered with a fallback font. With the peer dependency the theme's Font Awesome icons resolve
  for the first time.
- The default font family of `@public-ui/theme-bwst` is now `Noto Sans` (as provided by
  `@fontsource/noto-sans`); the previously bundled files registered themselves as `Noto Sans
Regular`.
- The `@font-face` rules must be declared at document level. Adopted style sheets inside a shadow
  root do not register fonts, which is why the themes never carried a working declaration for these
  fonts — the bundled `@font-face` blocks were dead weight that this change removes.

## Removal of legacy schema types of skeleton-migrated components

Components migrated to the skeleton architecture no longer carry a mutable `state` bag, so the
`*States` and `*API` types of the legacy `Generic.Element.ComponentApi` shape describe nothing
anymore. They were still re-exported from `@public-ui/components` (via `schema/components`) and are
**removed**:

| Component          | Removed types                                                               |
| ------------------ | --------------------------------------------------------------------------- |
| `kol-abbr`         | `AbbrProps`, `AbbrStates`, `AbbrAPI`                                        |
| `kol-avatar`       | `AvatarProps`, `AvatarStates`, `AvatarAPI`                                  |
| `kol-button`       | `ButtonStates`, `ButtonAPI`, `RequiredButtonStates`, `OptionalButtonStates` |
| `kol-button-link`  | `ButtonLinkStates`                                                          |
| `kol-icon`         | `IconProps`, `IconStates`, `IconWatches`, `IconAPI`, `InternalIconProps`    |
| `kol-link`         | `LinkStates`, `LinkAPI`, `InternalLinkAPI`                                  |
| `kol-progress`     | `ProgressProps`, `ProgressStates`, `ProgressAPI`                            |
| `kol-quote`        | `QuoteProps`, `QuoteStates`, `QuoteAPI`                                     |
| `kol-span`         | `SpanProps`, `SpanStates`, `SpanAPI`                                        |
| `kol-spin`         | `SpinProps`, `SpinStates`, `SpinAPI`                                        |
| `kol-split-button` | `SplitButtonStates`, `SplitButtonAPI`                                       |
| `kol-tooltip`      | `TooltipProps`, `TooltipStates`, `TooltipAPI`                               |

The `*Props` types of components that still have consumers (`ButtonProps`, `InternalButtonProps`,
`LinkProps`, `ButtonLinkProps`, `LinkButtonProps`, `SplitButtonProps`, …) stay. Type the public
props of a migrated element through the element itself, e.g. `Pick<HTMLKolAbbrElement, '_label'>`,
or through the internal prop definitions in `src/internal/props`.

## Removal of the deprecated `kol-tooltip-wc` element

The `kol-tooltip-wc` element was the last remaining web component without Shadow DOM. It rendered the
internal tooltip of KoliBri components into the light DOM and was kept deprecated for a single
integrator only. It is removed together with the `KolTooltipWc` export, the `KolTooltipWcTag`
constant and the generated `HTMLKolTooltipWcElement` types.

Tooltips that KoliBri components render themselves (for example hints next to labels or buttons) keep
working unchanged. They are rendered by the components internally and never required the standalone
element.

There is no standalone replacement. If your application rendered `<kol-tooltip-wc>` on its own,
migrate to an application-provided tooltip, such as the native `title` attribute or a self-built
popover. The `@public-ui/kolibri-cli` migration tool removes remaining usages and imports
automatically (`npx @public-ui/kolibri-cli migrate src`).

**Before (v4):**

```tsx
import { KolTooltipWc } from '@public-ui/components';

<KolTooltipWc _align="top" _id="my-tooltip" _label="Tooltip text" />;
```

**After (v5):**

```tsx
// The element and its exports no longer exist. Remove the usage; tooltips of
// KoliBri components keep working without it.
```

## Unified header types of `kol-table-stateless` and `kol-table-stateful`

`kol-table-stateless` and `kol-table-stateful` describe their headers with the same type,
`KoliBriTableHeaders`. The parallel header types of `kol-table-stateless` are **removed**:

| Removed                    | Replacement            |
| -------------------------- | ---------------------- |
| `TableHeaderCells`         | `KoliBriTableHeaders`  |
| `TableHeaderCellsPropType` | `TableHeadersPropType` |

The internal `PropTableHeaderCells` type and the `validateTableHeaders` validator are removed as well;
`kol-table-stateless` validates `_headers` itself.

The `_headers` property of `kol-table-stateless` is typed as `TableHeadersPropType`
(`Stringified<KoliBriTableHeaders>`), like the one of `kol-table-stateful`. Its header cells are
`KoliBriTableHeaderCellWithLogic`, so action columns (`type: 'action'`) and state columns
(`type: 'state'`) type-check for the stateless table, too. The payloads of the `onChangeHeaderCells`
and `onSortChange` callbacks (`ChangeHeaderCellsEventPayload`, `SortChangeEventPayload['headers']`)
are `KoliBriTableHeaders` as well.

**Before (v4):**

```ts
import type { TableHeaderCells } from '@public-ui/components';

const headers: TableHeaderCells = { horizontal: [[{ key: 'name', label: 'Name' }]] };
```

**After (v5):**

```ts
import type { KoliBriTableHeaders } from '@public-ui/components';

const headers: KoliBriTableHeaders = { horizontal: [[{ key: 'name', label: 'Name' }]] };
```
