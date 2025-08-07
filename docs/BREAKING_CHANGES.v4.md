# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Removed Components

The following components have been removed:

- No components have been removed in this version.

## Changed Components

### Table Components

This means kol-table-stateless and kol-table-stateful have undergone significant changes:

- **Removed `_minWidth` property**: The table-level `_minWidth` property has been removed. The table width is now automatically calculated from the visible column `minWidth` values.
- **Header cell `width` property**: The `width` property is now used as a fallback for `minWidth` when `minWidth` is not specified. This provides better backwards compatibility while encouraging the use of `minWidth`.
- **Automatic table width calculation**: The table's minimum width is now automatically calculated from the visible column `minWidth` values using CSS `calc()` function, enabling precise control over table dimensions.
- **Enhanced horizontal scrolling**: Horizontal scrolling is automatically enabled when the calculated minimum width exceeds the available container width.
- **Deprecated `_minWidth` property**: The table-level `_minWidth` property was removed. It currently serves as a fallback when no column-specific widths are defined.
- **Improved column width handling**: Column min-widths now support mixing different CSS units (px, em, rem, %, etc.) through CSS `calc()` summation, providing more flexible layout options.
