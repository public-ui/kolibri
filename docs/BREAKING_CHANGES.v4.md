# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Changed Components

### All components

- The internal `_id` property has been removed. Components now generate a stable ID internally and no longer expose `_id` as a public prop. Remove any `_id` attributes from your markup.
