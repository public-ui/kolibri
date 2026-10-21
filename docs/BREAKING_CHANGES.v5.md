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
Without it, copy the assets from each individual theme package you use.

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

## `kol-abbr`: the default slot is replaced by `_abbr`

Since version 4.5, `kol-abbr` takes the abbreviation through the property `_abbr` and its long form
through `_label`. The long form is shown as a tooltip on hover and keyboard focus and is announced as
the description of the abbreviation. The default slot is **deprecated** in version 4 and will be
**removed in version 5**. Markup in the slot is not rendered already in version 4: an abbreviation
is plain text, and `kol-abbr` is no tooltip for arbitrary content (use `kol-popover-button` for that).

**Before (v4):**

```html
<kol-abbr>z. B.</kol-abbr>
```

**After:**

```html
<kol-abbr _abbr="z. B." _label="zum Beispiel"></kol-abbr>
```

The migration CLI (`kolibri migrate`) moves plain text content into `_abbr`. Content with markup or
expressions stays unchanged and has to be migrated by hand.
