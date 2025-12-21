# Focus Method Refactoring: Native Character & Interoperability

## Overview

KoliBri components have been refactored to use a more native and interoperable approach for the `focus()` method. This document explains the rationale and benefits of this change.

**Related Documentation:**

- See [Breaking Changes for Version 4](../BREAKING_CHANGES.v4.md) for migration information from `kolFocus()` to `focus()`.

## Native Character

### What is "Native Character"?

The native character refers to how closely the component's `focus()` method aligns with the native HTML element behavior. Native HTML elements (like `<input>`, `<button>`, `<a>`) have a synchronous `focus()` method that doesn't return a Promise.

### The Refactoring

**Before (Async/Await):**

```typescript
@Method()
public async focus() {
    await this.buttonWcRef?.focus();
}
```

**After (Promise.resolve):**

```typescript
@Method()
public async focus(): Promise<void> {
    return Promise.resolve(this.buttonWcRef?.focus());
}
```

### Why This Matters

1. **Consistency with Native APIs**: The refactored approach is more consistent with how native HTML APIs work
2. **Predictability**: Callers know what to expect from the method signature
3. **Delegation**: Clearly delegates to the underlying native element's focus method

## Better Interoperability with Other Libraries

### Cross-Framework Compatibility

The Promise-based approach improves compatibility with various JavaScript frameworks:

#### React Integration

```typescript
// Both patterns work, but Promise.resolve is more efficient
componentRef.current?.focus(); // Immediate
await componentRef.current?.focus(); // Awaitable
```

#### Vue Integration

```typescript
// Can be used in both sync and async contexts
this.$refs.component?.focus();
await this.$refs.component?.focus();
```

#### Angular Integration

```typescript
// Works with ViewChild and template references
@ViewChild('component') componentRef: ElementRef;

// No performance penalty for synchronous usage
this.componentRef.nativeElement.focus();
```

### Performance Benefits

1. **No Unnecessary Async Overhead**: Using `return Promise.resolve()` avoids creating unnecessary Promise chains
2. **Immediate Availability**: The method resolves immediately without task scheduling
3. **Zero-Copy Delegation**: Direct pass-through to native focus() method

## Deprecated kolFocus() Method

### Migration Path

The `kolFocus()` method has been deprecated in favor of `focus()`:

**Before:**

```typescript
component.kolFocus(); // Custom KoliBri method
```

**After:**

```typescript
component.focus(); // Standard focus() method
```

### Deprecation Timeline

```typescript
/**
 * @deprecated Use {@link focus} instead.
 */
@Method()
public async kolFocus() {
    return this.focus();
}
```

The `kolFocus()` method will be removed in the next major version. Users should update their code to use `focus()` directly.

## Benefits Summary

| Aspect                 | Benefit                                                   |
| ---------------------- | --------------------------------------------------------- |
| **Native Alignment**   | Matches native HTML element API patterns                  |
| **Framework Agnostic** | Works seamlessly with React, Vue, Angular, Svelte, etc.   |
| **Performance**        | No unnecessary Promise chain overhead                     |
| **Simplicity**         | Single standard method instead of KoliBri-specific method |
| **Future Proof**       | Aligns with web standards and best practices              |
| **Type Safety**        | Clear Promise return type for TypeScript users            |

## Implementation Pattern

All KoliBri components now follow this pattern for the focus method:

```typescript
/**
 * Sets focus on the internal element.
 */
@Method()
public async focus(): Promise<void> {
    return Promise.resolve(this.internalElementRef?.focus());
}

/**
 * @deprecated Use {@link focus} instead.
 */
@Method()
public async kolFocus(): Promise<void> {
    return this.focus();
}
```

## Best Practices for Component Users

### Synchronous Usage

```typescript
// Simple and direct
element.focus();
```

### Asynchronous Usage

```typescript
// When you need to ensure focus has been called
await element.focus();
```

### Framework-Specific Examples

**React:**

```typescript
const ref = useRef<HTMLKolButtonElement>(null);

const handleFocus = () => {
	ref.current?.focus(); // Works naturally
};
```

**Vue:**

```typescript
const componentRef = ref<InstanceType<typeof KolButton>>();

const handleFocus = async () => {
	await componentRef.value?.$el.focus();
};
```

**Angular:**

```typescript
@ViewChild('kolButton') kolButton: ElementRef<HTMLKolButtonElement>;

handleFocus() {
    this.kolButton.nativeElement.focus();
}
```

## Conclusion

The refactoring to use `return Promise.resolve(this.ref?.focus())` provides:

- ✅ Better native alignment
- ✅ Improved interoperability across JavaScript ecosystems
- ✅ Enhanced performance characteristics
- ✅ Cleaner, more predictable API
- ✅ Future compatibility with web standards

This change demonstrates KoliBri's commitment to being a truly framework-agnostic component library that works seamlessly with any modern JavaScript framework or vanilla JavaScript.
