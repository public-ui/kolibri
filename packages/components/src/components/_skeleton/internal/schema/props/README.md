# Property Definitions

This directory contains the property definitions for skeleton components. Each prop file contains:

1. **Type definitions** - TypeScript types for the property
2. **Validation functions** - Functions to validate if a value matches the expected type
3. **Normalization functions** - Functions to process and normalize input values

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

// Normalization function
export function normalizePropName(value?: unknown): PropNameType {
	// Normalization and default value logic
}
```

## Available Props

- **label.ts** - String labels for components
- **name.ts** - Name identifiers (required non-empty strings)
- **show.ts** - Boolean visibility flags

## Usage

Controllers import and use these functions to validate and process props:

```typescript
import { normalizeLabel, validateLabel } from '../../schema/props/label';

// In controller
public watchLabel(value?: LabelPropType): void {
  const normalized = normalizeLabel(value);
  if (validateLabel(normalized)) {
    this.setRenderPropsOrStates('label', normalized);
  }
}
```
