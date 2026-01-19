# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## KolIcons instead of Codicons

KoliBri now provides its own comprehensive icon set called **KolIcons**, replacing the previous dependency on Microsoft's Codicons. This change provides better control over iconography, improved consistency across the component library, and reduced external dependencies.

### Asset Loading

In HTML documents, load the KolIcons stylesheet instead of Codicons:

**Before (v3):**

```html
<link rel="stylesheet" href="/assets/codicons/codicon.css" />
```

**After (v4):**

```html
<link rel="stylesheet" href="/assets/kolicons/style.css" />
```

### Using Codicons Alongside KolIcons (Optional)

If your application still uses Codicons, you can include both stylesheets. However, this is **optional** and most projects can migrate fully to KolIcons:

```html
<link rel="stylesheet" href="/assets/kolicons/style.css" />
<!-- Only if you still use Codicons elsewhere in your app -->
<link rel="stylesheet" href="/assets/codicons/codicon.css" />
```

### CSS Import

In modern bundlers (webpack, Vite, etc.), import KolIcons in your main entry point:

**Before (v3):**

```ts
import '@public-ui/components/assets/codicons/codicon.css';
```

**After (v4):**

```ts
import '@public-ui/components/assets/kolicons/style.css';
```

### Icon Class Names

Update all icon references in your code from `codicon` to `kolicon`. For example:

**Before (v3):**

```tsx
<KolButton _label="Save" _icons="codicon codicon-save" />
<KolIcon _icon="codicon codicon-check" />
```

**After (v4):**

```tsx
<KolButton _label="Save" _icons="kolicon kolicon-save" />
<KolIcon _icon="kolicon kolicon-check" />
```

See the [KolIcons documentation](https://develop--kolibri-public-ui.netlify.app/#/icon/all-kolicons) for the complete list of available icon names.

### Font Files

The font file is now located at:

```
node_modules/@public-ui/components/assets/kolicons/kolicons.ttf
```

If you're manually copying assets to a public folder for custom builds:

```bash
cp node_modules/@public-ui/components/assets/kolicons/style.css dist/assets/kolicons/
cp node_modules/@public-ui/components/assets/kolicons/kolicons.ttf dist/assets/kolicons/
```

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
- The `kolFocus()` and `kolFocusLink()` methods have been removed in v4. Use the native `focus()` method instead.
  - **Migration note:** Runtime backward compatibility for `kolFocus()` and `kolFocusLink()` is not provided. If your code still calls these helper methods, you must update it (for example, by running the KoliBri migration CLI) to use the native `focus()` method on the relevant element.
- DOM events emitted by components now use native event names without the `kol` prefix. Listen for `change`, `submit`, `click`, and similar names. All `kol*` event aliases have been removed.

**Complete list of event name changes:**

| Old Event Name         | New Event Name      |
| ---------------------- | ------------------- |
| `kolBlur`              | `blur`              |
| `kolChange`            | `change`            |
| `kolChangeHeaderCells` | `changeheadercells` |
| `kolChangePage`        | `changepage`        |
| `kolChangePageSize`    | `changepagesize`    |
| `kolClick`             | `click`             |
| `kolClose`             | `close`             |
| `kolCreate`            | `create`            |
| `kolFocus`             | `focus`             |
| `kolInput`             | `input`             |
| `kolKeydown`           | `keydown`           |
| `kolMousedown`         | `mousedown`         |
| `kolReset`             | `reset`             |
| `kolSelect`            | `select`            |
| `kolSelectionChange`   | `selectionchange`   |
| `kolSort`              | `sort`              |
| `kolSubmit`            | `submit`            |
| `kolToggle`            | `toggle`            |

**Before:**

```ts
element.addEventListener('kolSubmit', handler);
element.dispatchEvent(new CustomEvent('kolChange', { detail: value }));
```

**After:**

```ts
element.addEventListener('submit', handler);
element.dispatchEvent(new CustomEvent('change', { detail: value }));
```

> **W3C Standard Compliance:** All custom event names now follow the W3C naming convention and use lowercase letters only (see [W3C Event Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/selectionchange_event)). This includes custom events like `changeheadercells`, `changepage`, `changepagesize`, and `selectionchange`. While standard DOM events (like `blur`, `change`, `click`) were already lowercase, our custom composite event names have been updated from camelCase to lowercase for consistency with web standards.

> **TypeScript note:** If you use TypeScript event maps or typed listeners, update any type declarations that still reference the old `kol*` event names. This includes global `HTMLElementEventMap` / `DocumentEventMap` augmentations, custom event map interfaces, and `CustomEvent` type aliases keyed by names like `'kolSubmit'` or `'kolChange'`. Replace those keys with the new native event names (for example, `'submit'`, `'change'`, `'changeheadercells'`, etc.) so your type checks stay in sync with the runtime events.

**Migration examples for custom events:**

```ts
// Before (v3)
element.addEventListener('kolChangeHeaderCells', handler);
element.addEventListener('kolChangePage', handler);
element.addEventListener('kolSelectionChange', handler);

// After (v4)
element.addEventListener('changeheadercells', handler);
element.addEventListener('changepage', handler);
element.addEventListener('selectionchange', handler);
```

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

```typescript
onSelectionChange: (_event: Event, selection: KoliBriTableDataType[] | null) => {
	// Direct usage - always an array or null
	setSelectedData(selection || []);
};
```

#### Header Cell Width and Label Requirements, \_minWidth Removal

The `_minWidth` property has been removed from kol-table components. The table now uses `table-layout: fixed` in CSS. When `width` values are provided on header cells, the sum of all widths determines the table's minimum width.

**Breaking Type Changes:**

- `KoliBriTableCell.width` remains optional, but is now `number | undefined` (pixels only, no string units)
  - When provided, must be a number (e.g., `200` for 200 pixels)
  - When omitted, the column width is determined by CSS (auto-sized by content)

**CSS Behavior Change:**

The table now uses `table-layout: fixed`, which provides:

- Predictable column widths: Columns with explicit `width` are exactly as wide as specified
- Better performance: Browser doesn't need to calculate widths based on content
- Flexible layout: Columns without `width` are auto-sized; the table's minimum width is only the sum of explicitly defined column widths

**Before (v3):**

```typescript
// _minWidth property on component, table-layout: auto (content-dependent widths)
<kol-table-stateful _minWidth="400px" _headerCells={headerCells}></kol-table-stateful>

const headerCells = {
	horizontal: [
		[
			{ key: 'name', label: 'Name' },                    // width optional
			{ key: 'age', label: 'Age', width: '150px' },      // width as string with unit
		],
	],
	vertical: [],
};
```

**After (v4):**

```typescript
// _minWidth removed - table uses table-layout: fixed
<kol-table-stateful _headerCells={headerCells}></kol-table-stateful>

const headerCells = {
	horizontal: [
		[
			{ key: 'name', label: 'Name' },                   // width optional - column auto-sizes
			{ key: 'age', label: 'Age', width: 150 },         // width as number (pixels)
		],
	],
	vertical: [],
};
// Table minimum width is 150px (only columns with explicit width are counted)
```

**Migration:**

- Remove all `_minWidth` properties from table components
- Convert any `width` string values (e.g., `'150px'`) to numbers (e.g., `150`)
- The `width` property is optional – omit it if you want the column to auto-size
- The `label` property is already required
- With `table-layout: fixed`, columns with explicit widths are exact – plan your widths to accommodate content

#### Multiple Header Rows and Width Calculation

When using multiple header rows (e.g., a parent row with merged columns and a child row with individual columns), the table's minimum width is calculated by summing **all** width values from **all** header rows.

**Important:** With multiple header rows, you should specify width on **either** the merged (parent) column **or** the individual (child) columns—not both. If you specify widths on both levels, all widths are summed together, which may result in a wider table than intended.

**Guidelines:**

- **Equal distribution:** Specify only the width of the merged (parent) column. Child columns will distribute the space equally based on their content.
- **More control:** Specify widths on individual (child) columns instead of the merged column. This gives precise control over each column's width.

**Example 1: Width on merged column only (equal distribution)**

```typescript
const headerCells = {
	horizontal: [
		[
			{ label: 'Personal Info', colSpan: 2, width: 300 }, // Merged column with total width
		],
		[
			{ key: 'firstName', label: 'First Name' }, // Child column - auto-sizes within parent
			{ key: 'lastName', label: 'Last Name' }, // Child column - auto-sizes within parent
		],
	],
};
// Table minimum width: 300px
```

**Example 2: Width on individual columns only (more control)**

```typescript
const headerCells = {
	horizontal: [
		[
			{ label: 'Personal Info', colSpan: 2 }, // Merged column - no width specified
		],
		[
			{ key: 'firstName', label: 'First Name', width: 150 }, // Explicit width
			{ key: 'lastName', label: 'Last Name', width: 200 }, // Explicit width
		],
	],
};
// Table minimum width: 350px (150 + 200)
```

**Example 3: Avoid specifying widths on both levels**

```typescript
// ⚠️ NOT RECOMMENDED - widths are summed from all rows
const headerCells = {
	horizontal: [
		[
			{ label: 'Personal Info', colSpan: 2, width: 300 }, // Parent width: 300
		],
		[
			{ key: 'firstName', label: 'First Name', width: 150 }, // Child width: 150
			{ key: 'lastName', label: 'Last Name', width: 200 }, // Child width: 200
		],
	],
};
// Table minimum width: 650px (300 + 150 + 200) - probably not intended!
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

#### Settings Menu

The settings menu is now part of the `_horizontalHeaderCells` prop. The settings for visibility (`visible`), hidability (`hidable`), sortability (`sortable`), and resizability (`resizable`) are now managed directly through the header cell configuration.

**Header Cell Properties:**

- **`label: string`** - Required. The display text for the column header.
- **`width?: number`** - Optional. Column width in pixels. The sum of all defined widths determines the table's minimum width. Columns without `width` auto-size.
- **`visible: boolean`** - Controls whether the column is currently displayed in the table. Users can toggle this in the settings menu if `hidable` is true.
- **`hidable: boolean`** - Determines if the column can be hidden/shown by the user through the settings menu. If false, the visibility cannot be changed by the user (but may still be changed programmatically).
- **`sortable: boolean`** - Controls whether a sort button appears in the column header. If true, users can click to sort. The current sort direction is indicated by `sortDirection` ('ASC', 'DESC', or 'NOS').
- **`resizable: boolean`** - Determines if the column width can be adjusted by the user through the settings menu.

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
				width: 200, // Optional: width in pixels
				visible: true, // Column is displayed
				hidable: true, // User can hide this column
				sortable: true, // User can sort by this column
				resizable: true, // User can resize this column
				sortDirection: 'ASC', // Current sort state
			},
			{
				key: 'age',
				label: 'Age',
				width: 100, // Optional: width in pixels
				visible: true,
				hidable: false, // This column cannot be hidden by user
				sortable: true,
				resizable: false, // Fixed width
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
