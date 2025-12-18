# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Loader entry point

Import the component loader from `@public-ui/components/loader`. The previous `@public-ui/components/dist/loader` path is no longer part of the public API surface.

**Before:**

```ts
import { defineCustomElements } from '@public-ui/components/dist/loader';
```

**After:**

```ts
import { defineCustomElements } from '@public-ui/components/loader';
```

## Changed Components

### All components

- The `_id` prop has been removed from components that use Shadow DOM. IDs within a shadow tree are not visible outside, so each component now generates its own stable ID internally and manages all references. For tests or external lookups, set an `id` on the host element instead.
- The `_msg` prop no longer supports the `_label` and `_variant` options. Messages always render with the `msg` variant and without a label.
- Input messages only render once the field is marked as `_touched`, regardless of the message type. Ensure `_touched` is set when a message should be displayed.

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

### Toast System

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

#### kol-table-stateless

The `onSelectionChange` callback now always returns `KoliBriTableSelectionKeys` (array of keys):

**Before (v3):**

```typescript
onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys | KoliBriTableSelectionKey) => {
	// Type guard required
	const keys = Array.isArray(selection) ? selection : [selection];
	setSelectedKeys(keys);
};
```

**After (v4):**

```typescript
onSelectionChange: (_event: Event, selection: KoliBriTableSelectionKeys) => {
	// Direct usage - always an array
	setSelectedKeys(selection);
};
```

#### kol-table-stateful

The `onSelectionChange` callback now always returns `KoliBriTableDataType[] | null` (array of objects or null):

**Before (v3):**

```typescript
onSelectionChange: (_event: Event, selection: KoliBriTableDataType[] | KoliBriTableDataType | null) => {
	// Type guard required for single selection
	if (Array.isArray(selection)) {
		setSelectedData(selection);
	} else if (selection !== null) {
		setSelectedData([selection]);
	}
};
```

**After (v4):**

````typescript
onSelectionChange: (_event: Event, selection: KoliBriTableDataType[] | null) => {
	// Direct usage - always an array or null
	setSelectedData(selection || []);
};
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
````

**After (Version 4):**

```typescript
// Pagination component handles text internally
<kol-pagination _page={currentPage} _total={totalPages}></kol-pagination>
// Text is automatically displayed within the component
```
