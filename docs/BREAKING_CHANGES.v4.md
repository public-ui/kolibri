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
- The `kolFocus()` and `kolFocusLink()` methods have been removed. Use the native `focus()` method instead.
  - **Migration note:** The new `focus()` method has been refactored for better native alignment and interoperability across frameworks. See [Focus Method Refactoring: Native Character & Interoperability](./FOCUS_METHOD_REFACTORING.md) for detailed information about the rationale and benefits of this change.

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

### kol-modal → kol-dialog

- The Modal component was renamed to Dialog. Use the new tag `<kol-dialog>` (or the `KolDialog` React wrapper) instead of `<kol-modal>` / `KolModal`.
- No functional API changes are intended; this is a naming alignment. The migration CLI for v4 rewrites the tag name automatically.
```

### kol-table-stateless & kol-table-stateful

#### Selection Callbacks

The `onSelectionChange` callback signatures have been simplified to always return arrays:

**kol-table-stateless** - Always returns `KoliBriTableSelectionKeys` (array of keys):

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

**kol-table-stateful** - Always returns `KoliBriTableDataType[] | null` (array of objects or null):

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

#### Settings Menu

The settings menu is now part of the `_horizontalHeaderCells` prop. The settings for visibility (`visible`), hidability (`hidable`), sortability (`sortable`), and resizability (`resizable`) are now managed directly through the header cell configuration.

**Header Cell Properties:**

- **`visible: boolean`** - Controls whether the column is currently displayed in the table. Users can toggle this in the settings menu if `hidable` is true.
- **`hidable: boolean`** - Determines if the column can be hidden/shown by the user through the settings menu. If false, the visibility cannot be changed by the user (but may still be changed programmatically).
- **`sortable: boolean`** - Controls whether a sort button appears in the column header. If true, users can click to sort. The current sort direction is indicated by `sortDirection` ('ASC', 'DESC', or undefined).
- **`resizable: boolean`** - Determines if the column width can be adjusted by the user through the settings menu.
- **`width: string`** - CSS width value (e.g., '20ch', '150px') that can be modified by users if `resizable` is true.

**Before:**

```tsx
// Settings were applied immediately
<kol-table-stateless
	_hasSettingsMenu
	_headerCells={headerCells}
	_tableSettings={tableSettings}
	_on={{
		onSettingsChange: (event, tableSettings) => {
			// Settings applied immediately
			setTableSettings(tableSettings);
		},
	}}
/>
```

**After:**

```tsx
// Settings are only applied after clicking "Apply"
const headerCells = {
	horizontal: [
		[
			{
				key: 'firstName',
				label: 'First Name',
				visible: true, // Column is displayed
				hidable: true, // User can hide this column
				sortable: true, // User can sort by this column
				resizable: true, // User can resize this column
				width: '20ch', // Current width
				sortDirection: 'ASC', // Current sort state
			},
			{
				key: 'age',
				label: 'Age',
				visible: true,
				hidable: false, // This column cannot be hidden by user
				sortable: true,
				resizable: false, // Fixed width
				width: '8ch',
			},
		],
	],
	vertical: [],
};

<kol-table-stateless
	_hasSettingsMenu
	_headerCells={headerCells}
	_on={{
		onChangeHeaderCells: (event, headerCells) => {
			// Settings only updated after user confirms in the menu
			// The callback receives the complete header cell structure with both
			// horizontal and vertical cells. Only the horizontal cells may have
			// been modified by the settings menu; vertical cells are preserved unchanged.
			setHeaderCells(headerCells);
		},
	}}
/>;
```

**Behavior:**

- When `_hasSettingsMenu={true}`, a settings button appears in the table header
- Users can modify column visibility, width, and other properties through the settings dialog
- Changes are only applied to the table when the user clicks "Apply" or "OK"
- The `onChangeHeaderCells` callback receives the updated header cells after confirmation
- Columns with `hidable={false}` cannot be toggled in the settings menu
- Columns with `resizable={false}` cannot be resized by the user
