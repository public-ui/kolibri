# Breaking Changes for version 2

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Removed Modules

We have simplified the modularization of KoliBri in version 1 and for version 2. The module `@public-ui/core` has been removed and the functionalities moved to the module `@public-ui/components`.

```diff
  - import { register } from '@public-ui/core';
  + import { register } from '@public-ui/components';
  import { defineCustomElements } from '@public-ui/components/dist/loader';
  import { MyTheme } from '...';
  await register(MyTheme, defineCustomElements);
```

## Removed Components

The following components have been removed entirely:

- kol-icon-font-awesome
- kol-icon-icofont
- kol-input-adapter-leanup
- kol-input-radio-group

## Removed Slots

The following slots have been removed entirely:

- `header`-Slot
- `content`-Slot
- `footer`-Slot

We only support the `default`-Slot or the `expert`-Slot in the future. This decision was made to simplify the API and to reduce the complexity of the components.

For example, the `kol-card` component now only supports the `default`-Slot. The `header`-Slot and `footer`-Slot have been removed. The `content`-Slot has been renamed to `default`. If you want to use the `footer`-Slot, you can use the `kol-card` component and add your footer section in the `default`-Slot.

## Data Structures

1. `Link` objects now longer support the `_icon` property, only `_icons`. The object shape remains the same.

Affected components:

- kol-breadcrumb
- kol-button-link-text-switch
- kol-link-group
- kol-nav
- kol-skip-nav

2. `ColorPair` objects no longer support the `color` property, only the more explicit `foregroundColor`.

Affected components:

- kol-badge
- kol-kolibri

## Component Properties And Slots

kol-abbr:

- prop `_label` now required
- prop `_title` removed (use `_label` instead)

kol-accordion:

- prop `_heading` removed (use `_label` instead)
- prop `_label` now required
- slot `content` removed (use `default` instead)
- slot `header` removed

kol-alert:

- prop `_heading` removed (use `_label` instead)

kol-badge:

- prop `_hideLabel` removed
- prop `_icon` removed (use `_icons` instead)
- prop `_iconOnly` removed

kol-breadcrumb:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_label` now required

kol-button:

- prop `_accessKey` removed
- prop `_ariaCurrent` removed
- prop `_ariaLabel` removed (use `_label` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_iconAlign` removed (use `_icons` instead)
- prop `_iconOnly` removed (use `_hideLabel` instead)

kol-button-link:

- prop `_accessKey` removed
- prop `_ariaCurrent` removed
- prop `_ariaLabel` removed (use `_label` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_iconOnly` removed (use `_hideLabel` instead)

kol-card:

- prop `_hasFooter` removed
- prop `_heading` removed (use `_label` instead)
- prop `_headline` removed (use `_label` instead)
- prop `_label` now required
- slot `content` removed (use `default` instead)
- slot `footer` removed
- slot `header` removed

kol-details:

- prop `_label` now required
- prop `_summary` removed (use `_label` instead)

kol-icon:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_icons` now required
- prop `_label` now required
- prop `_part` removed

kol-input:

- prop `_icon` removed (use `_icons` instead)

kol-input-checkbox:

- prop `_icon` removed (use `_icons` instead)
- prop `_type` removed (use `_variant` instead)
- prop `_variant` option: `'checkbox'` removed, `'default'` is the default value
- slot `default` renamed to `expert`

kol-input-color:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- slot `default` renamed to `expert`

kol-input-date:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- slot `default` renamed to `expert`

kol-input-email:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- prop `_size` removed
- slot `default` renamed to `expert`

kol-input-file:

- prop `_icon` removed (use `_icons` instead)
- slot `default` renamed to `expert`

kol-input-number:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- prop `_type` removed (defaults to `'number'` now)
- slot `default` renamed to `expert`

kol-input-password:

- prop `_icon` removed (use `_icons` instead)
- prop `_size` removed
- slot `default` renamed to `expert`

kol-input-radio:

- prop `_list` removed (use `_options` instead)
- slot `default` renamed to `expert`

kol-input-range:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- slot `default` renamed to `expert`

kol-input-text:

- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_suggestions` instead)
- prop `_size` removed
- slot `default` renamed to `expert`

kol-link:

- prop `_ariaControls` removed
- prop `_ariaCurrent` removed (Use ariaCurrentService instead)
- prop `_ariaExpanded` removed
- prop `_ariaLabel` removed
- prop `_ariaSelected` removed
- prop `_disabled` removed
- prop `_icon` removed (use `_icons` instead)
- prop `_iconAlign` removed (use `_icons` instead)
- prop `_iconOnly` removed (use `_hideLabel` instead)
- prop `_selector` removed
- prop `_stealth` removed
- prop `_useCase` removed
- slot `default` removed (use `expert` instead)

kol-link-button:

- prop `_ariaControls` removed
- prop `_ariaCurrent` removed (use `_listenAriaCurrent` instead)
- prop `_ariaExpanded` removed
- prop `_ariaLabel` removed
- prop `_ariaSelected` removed
- prop `_disabled` removed
- prop `_icon` renamed to `_icons`
- prop `_iconOnly` removed

kol-link-group:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_heading` removed
- prop `_label` now required
- prop `_level` removed
- prop `_ordered` removed

kol-logo:

- prop `_abbr` removed (use `_org` instead)

kol-modal:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_label` now required

kol-nav:

- prop `_ariaCurrentValue` removed
- prop `_ariaLabel` removed (use `_label` instead)
- prop `_compact` removed (use `_hideLabel` instead)
- prop `_hasCompactButton` removed
- prop `_label` now required
- prop `_variant` removed

kol-pagination:

- prop `_max` now required
- prop `_total` removed (use `_max` instead)

kol-progress:

- prop `_type` removed (use `_variant` instead)

kol-quote:

- prop `_caption` removed (use `_label` instead)

kol-select:

- prop `_height` removed (use `_rows` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_list` removed (use `_options` instead)
- prop `_size` removed (use `_rows` instead)
- slot `default` renamed to `expert`

kol-skip-nav:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_label` now required

kol-span:

- prop `_icon` removed (use `_icons` instead)
- prop `_iconOnly` removed (use `_hideLabel` instead)

kol-split-button:

- prop `_accessKey` removed
- prop `_ariaLabel` removed (use `_label` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_show` removed
- prop `_showDropdown` removed

kol-symbol:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_label` now required

kol-table:

- prop `_caption` removed (use `_label` instead)
- prop `_label` now required

kol-tabs:

- prop `_ariaLabel` removed (use `_label` instead)
- prop `_icon` removed (use `_icons` instead)
- prop `_iconOnly` removed (use `_hideLabel` instead)
- prop `_label` now required
- prop `_tabsAlign` removed (use `_align` instead)

kol-textarea:

- slot `default` renamed to `expert`

version:

- prop `_label` now required
- prop `_version` removed (use `_label` instead)

kol-heading:

- slot `default` renamed to `expert`


