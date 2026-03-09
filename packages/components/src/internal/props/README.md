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

### `Prop<K, TExternal, TInternal>`

Carries both types via a phantom key pattern:

```typescript
// Different external and internal types:
type ColorProp = Prop<'color', ColorPair | string, ColorPair>;
//                     └─ Key  └─ Web Component     └─ Controller/FC

// Same external and internal type (shorthand):
type MaxProp = SimpleProp<'max', number>;
//                        └─ Key └─ Both types
```

### `PropDefinition<TInternal>`

The normalization function receives `unknown` (since HTML attributes can be any type) and returns the internal type:

```typescript
// SimpleProp — same type in and out, with validation
const maxProp = createPropDefinition<MaxProp>(
	normalizeNumber, // (value: unknown) → number (throws on invalid)
	(v) => v > 0, // (value: number) → boolean
);

// Dual-Type Prop — external string is normalized to ColorPair
const colorProp = createPropDefinition<ColorProp>(
	normalizer, // (value: unknown) → ColorPair (throws on invalid)
	validator, // (value: ColorPair) → boolean
);
```

### `DependentPropDefinition<TInternal, TDeps>`

Some props require context from other props to normalize or validate correctly.
`createDependentPropDefinition` extends the pattern with a `TDeps` parameter
that is passed through to both `normalize` and `validate`:

```typescript
type ClampedNumberValueProp = SimpleProp<'value', number>;

type ClampedNumberValueDeps = {
	min: number;
	max: number;
};

const clampedNumberValueProp = createDependentPropDefinition<ClampedNumberValueProp, ClampedNumberValueDeps>(
	(value, deps) => {
		const normalized = normalizeNumber(value);
		if (normalized < deps.min) return deps.min;
		if (normalized > deps.max) return deps.max;
		return normalized;
	},
	(v) => v >= 0,
);
```

The `apply` method for dependent props takes the deps object as a third argument:

```typescript
clampedNumberValueProp.apply(
	value,
	(normalized) => {
		this.setProp('value', normalized);
	},
	{ min: 0, max: this.getProp('max') },
	this.getDefaultProp('value'),
);
```

## Available Properties

- **alt** – Alternative text (`string`)
- **color** – Color values (accepts `ColorPair | string` externally, normalized to `ColorPair`)
- **count** – Numeric counter values (accepts `number | string` externally, normalized to `number`)
- **href** – URL references (`string`)
- **icons** – Icon identifiers (`string`)
- **label** – Text content (`string`, validated: 2–80 characters)
- **loading** – Loading indicator type (`LoadingType`)
- **max** – Maximum value (`number`, validated: > 0)
- **name** – Identifiers (`string`)
- **quote** – Quotation text (`string`)
- **show** – Boolean visibility states (`boolean`)
- **sizes** – Responsive sizes attribute (`string`)
- **src** – Source URL (`string`)
- **srcset** – Responsive image sources (`string`)
- **unit** – Unit suffix (`string`)
- **value** – Numeric value (`number`, validated: ≥ 0)
- **value (clamped)** – Clamped numeric value with `DependentPropDefinition` (depends on `min`/`max`)
- **variant-progress** – Progress variant type (`ProgressVariantType`)
- **variant-quote** – Quote variant type (`QuoteVariantType`)

## Usage Pattern

The `apply()` method on `PropDefinition` combines normalization, validation and fallback handling in a single call.
If the value is `undefined` or `null`, the default value is used. Otherwise, the value is normalized and validated
before being passed to the callback:

```typescript
maxProp.apply(
	value,
	(normalized) => {
		// normalized is number, type-safe and validated (> 0)
		this.setProp('max', normalized);
	},
	this.getDefaultProp('max'),
);
```

## Type Extraction

The generic-types module provides `InternalOf<P>` and `ExternalOf<P>` to automatically
extract the correct type for each layer:

| Layer                 | Type Extractor | Example (`ColorProp`) |
| --------------------- | -------------- | --------------------- |
| Web Component `@Prop` | `ExternalOf`   | `ColorPair \| string` |
| `@Watch` handler      | `ExternalOf`   | `ColorPair \| string` |
| Controller `setProp`  | `InternalOf`   | `ColorPair`           |
| Controller `getProps` | `InternalOf`   | `ColorPair`           |
| Functional Component  | `InternalOf`   | `ColorPair`           |

## Initialization Contract

Controllers expect the current values of public `@Prop()` fields during initialization to establish consistent state. Only actual props are passed — internal `@State` fields are handled separately by the controller:

```typescript
// Web Component — passes only public @Prop() values
this.ctrl.componentWillLoad({
	name: this._name, // External type (string)
});
```
