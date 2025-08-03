# Property Definitions

This directory contains the property definitions for skeleton components. Each prop file contains:

1. **Type definitions** - TypeScript types for the property
2. **Validation functions** - Functions to validate if a value matches the expected type
3. **Normalization functions** - Functions for minimal type conversion

## Structure

Each prop file follows this pattern:

```typescript
// Type definitions
export type PropNameType = SomeType;
export type PropNameProp = {
	propName: PropNameType;
};

// Validation function
export function validatePropName(value: unknown): value is PropNameType {
	// Validation logic
}

// Minimal normalization function
export function normalizePropName(value?: unknown): unknown {
	// Minimal conversion logic - returns value unchanged if not convertible
}
```

## Normalization Rules

- **String**: Numbers convert to strings, strings remain unchanged, others unchanged
- **Number**: String numbers convert to numbers, numbers remain unchanged, others unchanged
- **Boolean**: true/false remain unchanged, others unchanged

**Important**: Normalization returns the original value unchanged if no conversion is possible, instead of default values.

## Available Props

- **count.ts** - Number values (string→number conversion)
- **label.ts** - String labels for components
- **name.ts** - Name identifiers (string validation + number→string conversion)
- **show.ts** - Boolean visibility flags (strict boolean handling)

## Usage

Controllers normalize first, then validate:

```typescript
import { normalizeLabel, validateLabel } from '../../schema/props/label';

// In controller
public watchLabel(value?: LabelPropType): void {
  const normalized = normalizeLabel(value);
  if (validateLabel(normalized)) {
    this.setRenderPropsOrStates('label', normalized);
  }
  // If validation fails, value is ignored (not set)
}
```

:

```typescript
import { normalizeLabel, validateLabel } from '../../schema/props/label';

// In controller
public watchLabel(value?: LabelPropType): void {
  if (validateLabel(value)) {
    // Already correct type
    this.setRenderPropsOrStates('label', value);
  } else {
    // Minimal normalization
    const normalized = normalizeLabel(value);
    this.setRenderPropsOrStates('label', normalized);
  }
}
```
