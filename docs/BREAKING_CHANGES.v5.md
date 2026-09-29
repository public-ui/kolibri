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

## Disabled interactive elements stay focusable (`aria-disabled`)

KoliBri no longer renders the native `disabled` attribute on interactive elements. A component with
`_disabled` renders `aria-disabled="true"` on its interactive element instead. The element stays
focusable and in the tab order, screen readers announce it as unavailable, its tooltip is reachable by
keyboard, and the component blocks every activation: click, Enter, Space, typing, arrow keys, drag and
drop and the public `click()` method. Text-like inputs and textareas are additionally rendered
`readonly`.

What changes for applications:

- **Tab order.** Disabled buttons, links, form fields, accordion and details headings, tabs and
  toolbar items are tab stops now. Arrow key navigation in tabs, toolbars, radio groups and listboxes
  also reaches disabled entries without selecting them.
- **Focus.** `focus()` reaches a disabled element, and every theme draws the same focus indicator on it
  as on an enabled one. Themes no longer dim disabled elements with `opacity`; they use disabled color
  tokens instead.
- **Links.** A disabled `kol-link` renders no `href` (so middle click and "open in new tab" cannot
  navigate) and `role="link"` instead.
- **Auxiliary controls.** A disabled field does not render its password toggle or its clear buttons,
  so the field itself stays the only tab stop.
- **Selectors.** Custom themes style the disabled state through the BEM `--disabled` modifier of
  the block (e.g. `.kol-button--disabled`, `.kol-input--disabled`, `.kol-select--disabled`), not
  through `:disabled`, `:enabled`, `[disabled]` or `[aria-disabled]`. Only `<option>` and
  `<optgroup>` inside a native `<select>` keep the native attribute.
- **Tests** that check the `disabled` attribute or `:disabled` check `aria-disabled="true"` instead.
- **Form submission** is unchanged.

The model is enforced by the ESLint rule `kolibri/no-native-disabled` and the Stylelint rule
`kolibri/common-disabled-bem-modifier`. No API changes, so there is no migration task in the
KoliBri CLI.
