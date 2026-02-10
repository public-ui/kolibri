# Type Safety through Progressive Enhancement

## Architectural Principle

Web components receive dynamic values from HTML attributes, but internal rendering requires statically typed data. This schema bridges that gap through **graceful degradation**: attempt minimal type conversion, then validate, but never force invalid data into types.

## Design Philosophy

- **Fail gracefully**: Invalid data is ignored rather than causing errors
- **Minimal conversion**: Only obvious transformations (string numbers → numbers)
- **Type guarantees**: Once validated, types are guaranteed throughout the component lifecycle
- **No magic defaults**: Components provide their own meaningful defaults, not the schema

## Dual-Type Props

Each prop can define an **external** (Web Component API) and an **internal** (Controller/FC) type.
The external type may be more permissive to support shorthand values from HTML attributes,
while the internal type is always the normalized form.

### `Prop<TExternal, TInternal, K>`

Carries both types via a phantom key pattern:

```typescript
// Different external and internal types:
type CountProp = Prop<number | string, number, 'count'>;
//                     └─ Web Component   └─ Controller/FC  └─ Key

// Same external and internal type (shorthand):
type NameProp = SimpleProp<string, 'name'>;
//                          └─ Both types    └─ Key
```

### `PropDefinition<TExternal, TInternal>`

The normalization function receives the external type and returns the internal type:

```typescript
const countProp = createPropDefinition<number | string, number>(
	normalizeInteger, // (value: number | string | undefined) → number
	(v) => v >= 0, // (value: number) → boolean
);
```

## Available Properties

- **count** – Numeric values (accepts `number | string` externally, normalized to `number`)
- **label** – Text content
- **name** – Identifiers
- **show** – Boolean states

## Usage Pattern

The two-phase approach separates concerns: normalization converts from external to internal type, validation enforces business rules on the internal type.

```typescript
withValidPropValue(countProp, '42', (normalized) => {
	// normalized is number (42), type-safe
	this.setProp('count', normalized);
	this.setState('count', normalized);
});
```

## Type Extraction

The generic-types module provides `InternalOf<P>` and `ExternalOf<P>` to automatically
extract the correct type for each layer:

| Layer                 | Type Extractor | Example (`CountProp`) |
| --------------------- | -------------- | --------------------- |
| Web Component `@Prop` | `ExternalOf`   | `number \| string`    |
| `@Watch` handler      | `ExternalOf`   | `number \| string`    |
| Controller `setProp`  | `InternalOf`   | `number`              |
| Controller `getProps` | `InternalOf`   | `number`              |
| Functional Component  | `InternalOf`   | `number`              |

## Initialization Contract

Controllers expect the current values of render props during initialization to establish consistent state. Internal state fields are handled separately:

```typescript
this.controller.componentWillLoad({
	count: this._count, // External type (number | string)
	name: this._name, // External type (string)
});
```
