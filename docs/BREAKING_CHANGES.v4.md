# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Changed Components

### All components

- The `_id` prop has been removed from components that use Shadow DOM. IDs within a shadow tree are not visible outside, so each component now generates its own stable ID internally and manages all references. For tests or external lookups, set an `id` on the host element instead.
- The `_msg` prop no longer supports the `_label` and `_variant` options. Messages always render with the `msg` variant and without a label.
- Input messages only render once the field is marked as `_touched`, regardless of the message type. Ensure `_touched` is set when a message should be displayed.
- The `kolFocus()` and `kolFocusLink()` methods have been deprecated and will be removed in a future major version. Use the native `focus()` method instead (the deprecated methods currently delegate to `focus()` for backward compatibility).
  - **Migration note:** The new `focus()` method has been refactored for better native alignment and interoperability across frameworks while preserving backward compatibility with the deprecated helper methods.

### kol-combobox & kol-single-select

- `_hideClearButton` has been replaced with `_hasClearButton` (default: `true`). Set `_hasClearButton="false"` to hide the clear button while keeping existing values intact. The migration CLI rewrites `_hide-clear-button` attributes and `_hideClearButton` props automatically, flipping boolean values so behaviour stays the same.

### kol-nav

- The `orientation` property has been removed from kol-nav. It is now always in vertical mode by default.

**Before:**

```html
<kol-nav _orientation="vertical" _label="" _links="[]"></kol-nav>
```

**After (v4):**

```html
<kol-nav _label="" _links="[]"></kol-nav>
```

### ToasterService and toast component

- The `variant` property has been removed from Toast objects. All toasts now use the `card` variant by default.
- The `defaultVariant` option has been removed from `ToasterService.getInstance()`. The service no longer accepts variant configuration.

**Before:**

```typescript
// ToasterService configuration
const toaster = ToasterService.getInstance(document, {
	defaultVariant: 'card', // ← removed
});

// Toast with variant
toaster.enqueue({
	description: 'Message',
	label: 'Label',
	type: 'info',
	variant: 'card', // ← removed
});
```

**After:**

```typescript
// ToasterService configuration
const toaster = ToasterService.getInstance(document);

// Toast without variant (uses card variant automatically)
toaster.enqueue({
	description: 'Message',
	label: 'Label',
	type: 'info',
});
```

### Pagination

- The pagination text (e.g., "Page 1 of 10") is now integrated into the Pagination component itself. Previously, this text had to be provided by the application code or was handled by the Stateful Table component.
- The `_page` property now automatically generates and displays the pagination information text within the component.

**Before (Version 3):**

```typescript
// Application code had to provide pagination text
<kol-pagination _page={currentPage} _total={totalPages}></kol-pagination>
<div>Page {currentPage} of {totalPages}</div>

// Or it was handled by Stateful Table
<kol-table-stateful></kol-table-stateful>
```

**After (Version 4):**

```typescript
// Pagination component handles text internally
<kol-pagination _page={currentPage} _total={totalPages}></kol-pagination>
// Text is automatically displayed within the component
```
