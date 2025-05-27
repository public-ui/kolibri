# Breaking Changes for version 3

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Removed Components

The following components have been removed:

- kol-button-group
- kol-indented-text
- kol-link-group
- kol-logo
- kol-symbol
- kol-table

## Changed Components

### kol-abbr

- Visually, the tooltip has been replaced by a simple label shown in parentheses after the abbreviation.
- The property `_tooltipAlign` has been removed.

### kol-alert

- The default value for the property `_level` changed to `0` which results in rendering a `strong` tag instead of `h1` when no level is provided.

### kol-card

- The default value for the property `_level` changed to `0` which results in rendering a `strong` tag instead of `h1` when no level is provided.

### kol-heading

- The default value for the property `_level` changed to `0` which results in rendering a `strong` tag instead of `h1` when no level is provided.

### kol-input-file

- The property `_value` has been removed as it never served a purpose. Use the `getValue()` method instead to access the FileList.

### kol-modal

- The property `_activeElement` has been removed. Use the methods `openModal` and `closeModal` instead.

### kol-table-stateful

- The table header property `sort` has been removed. Use `compareFn` instead.
- The property `_minWidth` becomes required. This is to ensure that the inner width of the table and columns are wide enough to display the content. If the table gets too narrow, then the table becomes
  automatically horizontally scrollbar.
- The DOM event `kol-selection-change` has been renamed to `kolSelectionChange`.

### kol-table-stateless

- The DOM event `kol-selection-change` has been renamed to `kolSelectionChange`.

## `focus`-methods

The public `focus`-methods have been removed from all components. Use `kolFocus` instead.

## All Input Components

- Input value reflection ("associated form fields") is now toggled using the 'reflectInputValues' option set in the bootstrap function, no longer using the experimental mode.
- The property `_alert` has been removed. It's now being handled automatically based on `_msg` and the touched state. See #6138.
- The property `_error` has been removed. Use `_msg` instead.
- The property `_hideError` has bee renamed to `_hideMsg`.

## Toaster

- The toast default `alertVariant` and options property `defaultAlertVariant` have been removed. Use `variant` and `defaultVariant` instead.

## Themes

### BMF-Theme (Bundesministerium der Finanzen)

- The theme has been removed.
- It will be maintained as a separate repository.
- The maintenance is done by the [DESYBRI](https://www.itzbund.de/desybri)-Team.
- We moved our last code revision to the following repository: https://github.com/public-ui/kolibri-theme-bmf-starter
