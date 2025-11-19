# Breaking Changes for version 4

## Introduction

New major versions of KoliBri are developed with the goal of simplifying maintenance and support and promoting further development.

For more information, see the [KoliBri Maintenance and Support Strategy](https://github.com/public-ui/kolibri/blob/develop/MIGRATION.md).

## Changed Components

### All components

- The `_id` prop has been removed from components that use Shadow DOM. IDs within a shadow tree are not visible outside, so each component now generates its own stable ID internally and manages all references. For tests or external lookups, set an `id` on the host element instead.
- The `_msg` prop no longer supports the `_label` and `_variant` options. Messages always render with the `msg` variant and without a label.

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
