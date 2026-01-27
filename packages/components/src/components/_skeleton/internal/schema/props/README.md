# Type Safety through Progressive Enhancement

## Architectural Principle

Web components receive dynamic values from HTML attributes, but internal rendering requires statically typed data. This schema bridges that gap through **graceful degradation**: attempt minimal type conversion, then validate, but never force invalid data into types.

## Design Philosophy

- **Fail gracefully**: Invalid data is ignored rather than causing errors
- **Minimal conversion**: Only obvious transformations (string numbers → numbers)
- **Type guarantees**: Once validated, types are guaranteed throughout the component lifecycle
- **No magic defaults**: Components provide their own meaningful defaults, not the schema

## Available Properties

- **count** - Numeric values
- **label** - Text content
- **name** - Identifiers
- **show** - Boolean states

## Usage Pattern

The two-phase approach separates concerns: normalization handles web platform quirks, validation enforces business rules.

```typescript
const normalized = normalizeValue(input);
if (validateValue(normalized)) {
	// Type-safe usage guaranteed
}
```

## Initialization Contract

Controllers expect the current values of render props during initialization to establish consistent state. Internal state fields are handled separately:

```typescript
this.controller.componentWillLoad({
	count: this._count, // Current render prop values
	name: this._name, // from component initialization
});
```
