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
