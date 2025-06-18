# KoliBri Table V3 Breaking Changes & Migration Guide

## Overview

Version 3 of KoliBri introduces significant changes to the table components to improve usability and maintainability. The main goal is to automatically calculate table width based on column definitions and eliminate the need for manual `_minWidth` management.

## Breaking Changes

### 1. Removed `_minWidth` Property

**What changed:**
- The `_minWidth` property has been completely removed from both `kol-table-stateless` and `kol-table-stateful` components
- Tables now automatically calculate their minimum width based on column `minWidth` values

**Before (V2):**
```html
<kol-table-stateful 
  _minWidth="600px"
  _headers='{"horizontal": [...]}'
  _data='[...]'
>
</kol-table-stateful>
```

**After (V3):**
```html
<kol-table-stateful 
  _headers='{"horizontal": [...]}'
  _data='[...]'
>
</kol-table-stateful>
```

### 2. Required `minWidth` on Header Cells

**What changed:**
- The `minWidth` property is now **required** on all `KoliBriTableHeaderCell` objects
- Replaces the previous optional `width` property
- Supports both string (CSS values) and number (pixels) formats

**Before (V2):**
```typescript
const headers = {
  horizontal: [[
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age', width: '80px' },
    { label: 'Email', key: 'email' }
  ]]
};
```

**After (V3):**
```typescript
const headers = {
  horizontal: [[
    { label: 'Name', key: 'name', minWidth: '150px' },
    { label: 'Age', key: 'age', minWidth: '80px' },
    { label: 'Email', key: 'email', minWidth: '200px' }
  ]]
};
```

### 3. Removed `asID` Property

**What changed:**
- The `asID` property has been completely removed
- No replacement needed as this property was rarely used

## Migration Steps

### Step 1: Remove `_minWidth` References

1. Find all usages of `_minWidth` in your codebase
2. Remove the `_minWidth` property from table components
3. The table will now automatically calculate its width

### Step 2: Add `minWidth` to Header Cells

1. Add `minWidth` property to every header cell in your table definitions
2. Use appropriate values based on your content:
   - Text columns: `'150px'` or `150`
   - Number columns: `'80px'` or `80`
   - Email/URL columns: `'200px'` or `200`
   - ID columns: `'60px'` or `60`

### Step 3: Remove `asID` References (if any)

1. Search for `asID` in your codebase
2. Remove any references to this property

## Examples

### Simple Table Migration

**Before:**
```tsx
<KolTableStateful
  _label="Users Table"
  _minWidth="500px"
  _headers={{
    horizontal: [[
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' }
    ]]
  }}
  _data={users}
/>
```

**After:**
```tsx
<KolTableStateful
  _label="Users Table"
  _headers={{
    horizontal: [[
      { label: 'ID', key: 'id', minWidth: '60px' },
      { label: 'Name', key: 'name', minWidth: '150px' },
      { label: 'Email', key: 'email', minWidth: '200px' }
    ]]
  }}
  _data={users}
/>
```

### Complex Table with Vertical Headers

**Before:**
```tsx
<KolTableStateful
  _label="Business Hours"
  _minWidth="auto"
  _headers={{
    horizontal: [[
      { label: 'District', key: 'district', rowSpan: 2 },
      { label: 'Workdays', colSpan: 5 }
    ], [
      { label: 'Monday', key: 'monday' },
      { label: 'Tuesday', key: 'tuesday' }
    ]],
    vertical: [[
      { label: 'Berlin', rowSpan: 2 },
      { label: 'Munich' }
    ]]
  }}
  _data={businessHours}
/>
```

**After:**
```tsx
<KolTableStateful
  _label="Business Hours"
  _headers={{
    horizontal: [[
      { label: 'District', key: 'district', rowSpan: 2, minWidth: '120px' },
      { label: 'Workdays', colSpan: 5, minWidth: '80px' }
    ], [
      { label: 'Monday', key: 'monday', minWidth: '80px' },
      { label: 'Tuesday', key: 'tuesday', minWidth: '80px' }
    ]],
    vertical: [[
      { label: 'Berlin', rowSpan: 2, minWidth: '100px' },
      { label: 'Munich', minWidth: '100px' }
    ]]
  }}
  _data={businessHours}
/>
```

## Benefits of V3 Changes

1. **Automatic Width Calculation**: No need to manually calculate and maintain `_minWidth`
2. **Better Responsive Behavior**: Tables automatically adapt to content
3. **Consistent Column Sizing**: Each column has explicit minimum width requirements
4. **Reduced Maintenance**: Less manual width management in code
5. **Improved Developer Experience**: TypeScript will enforce `minWidth` requirements

## Default Values

If you're migrating from tables without explicit widths, consider these default values:

- **ID columns**: `'60px'` - Usually short numeric or string IDs
- **Name columns**: `'150px'` - Accommodate most names
- **Email columns**: `'200px'` - Handle most email addresses
- **Date columns**: `'120px'` - Standard date format
- **Status columns**: `'100px'` - Short status text
- **Action columns**: `'120px'` - Button groups

## Automatic Horizontal Scrolling

Tables in V3 automatically show horizontal scrollbars when:
- Sum of column `minWidth` values > container width
- User zooms in/out
- Viewport becomes smaller

This provides better usability without manual intervention.

## Testing Your Migration

1. **Visual Testing**: Verify tables display correctly across different screen sizes
2. **Responsive Testing**: Test on mobile devices and with browser zoom
3. **Content Testing**: Ensure all content fits properly in defined column widths
4. **Accessibility Testing**: Verify screen reader compatibility remains intact

## Troubleshooting

### Table is too wide
- Reduce `minWidth` values on some columns
- Consider which columns are most important for narrow screens

### Content is cut off
- Increase `minWidth` for affected columns
- Consider the longest expected content for each column

### Build errors after migration
- Ensure all header cells have `minWidth` property
- Remove all `_minWidth` references
- Check TypeScript types are correctly updated

