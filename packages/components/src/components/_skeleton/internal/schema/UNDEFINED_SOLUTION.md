# Lösung für das undefined-Problem in SchemaValidators

## Das Problem

**Original-Problem:** Wenn ein Property optional ist (`prop?: string`), sollte `undefined` ein gültiger Zustand sein. Die ursprüngliche Normalisierung wandelte jedoch `undefined` immer in den Default-Wert um, was die Optionalität aufhob.

```typescript
// Problematisch:
const validator = new StringValidator('', false); // optional
validator.normalize(undefined); // → '' (Default-Wert)
validator.validate(''); // → true
// Problem: undefined wird verloren, optional wird zu required
```

## Die Lösung

### 1. **Explizite Required vs Optional Validators**

Anstatt einen boolean Parameter für "required", haben wir separate Klassen:

```typescript
// Für required Properties
class RequiredStringValidator extends SchemaValidator<string> {
	normalize(value?: unknown): string {
		// undefined → defaultValue
		return typeof value === 'string' ? value.trim() : this.defaultValue;
	}

	validate(value: string): boolean {
		// Empty strings sind invalid für required
		return typeof value === 'string' && value !== '';
	}
}

// Für optional Properties
class OptionalStringValidator extends SchemaValidator<string | undefined> {
	normalize(value?: unknown): string | undefined {
		// undefined bleibt undefined
		if (value === undefined || value === null) return undefined;

		const trimmed = typeof value === 'string' ? value.trim() : String(value);
		// Empty strings werden zu undefined
		return trimmed === '' ? undefined : trimmed;
	}

	validate(value: string | undefined): boolean {
		// undefined ist immer gültig für optional
		return value === undefined || typeof value === 'string';
	}
}
```

### 2. **Type-Safety auf Schema-Ebene**

```typescript
interface ComponentProps {
	name: string; // Required → RequiredStringValidator
	description?: string; // Optional → OptionalStringValidator
	enabled: boolean; // Required → RequiredBooleanValidator
	visible?: boolean; // Optional → OptionalBooleanValidator
}
```

### 3. **Korrekte Normalisierung**

```typescript
// Required Property:
const nameValidator = new RequiredStringValidator('DefaultName');
nameValidator.normalize(undefined); // → 'DefaultName'
nameValidator.normalize(''); // → 'DefaultName'
nameValidator.validate(''); // → false (required!)

// Optional Property:
const descriptionValidator = new OptionalStringValidator();
descriptionValidator.normalize(undefined); // → undefined
descriptionValidator.normalize(''); // → undefined
descriptionValidator.validate(undefined); // → true (optional!)
```

### 4. **Controller Integration**

```typescript
class ComponentController {
	public watchName(value?: string): void {
		// Required: undefined wird zu Default
		const processedName = nameValidator.process(value);
		this.setRenderPropsOrStates('name', processedName);
	}

	public watchDescription(value?: string): void {
		// Optional: undefined bleibt undefined
		const processedDescription = descriptionValidator.process(value);
		this.setRenderPropsOrStates('description', processedDescription);
	}
}
```

## Vorteile der Lösung

### ✅ **Explizite Intentionen**

- Required Properties sind explizit required
- Optional Properties können tatsächlich undefined sein
- Keine versteckten Konvertierungen

### ✅ **Type Safety**

- `RequiredStringValidator` → `string`
- `OptionalStringValidator` → `string | undefined`
- TypeScript kann korrekt inferieren

### ✅ **Backward Compatibility**

- Legacy `StringValidator` bleibt verfügbar
- Delegiert intern an Required/Optional Validators
- Existierender Code funktioniert weiter

### ✅ **Klarere Semantik**

```typescript
// Klar: Name ist required
const nameValidator = new RequiredStringValidator('');

// Klar: Description ist optional
const descriptionValidator = new OptionalStringValidator();

// Unklar: Was bedeutet required=false?
const oldValidator = new StringValidator('', false);
```

## Migration Path

### Phase 1: Neue Validators verfügbar machen

- `RequiredStringValidator`, `OptionalStringValidator` etc. sind verfügbar
- Legacy API bleibt unverändert

### Phase 2: Neue Validators in neuen Components

- Neue Components verwenden explizite Required/Optional Validators
- Bessere Type Safety und klarere Intentionen

### Phase 3: Schrittweise Migration

- Bestehende Components können optional migrieren
- Legacy API bleibt supported für Backward Compatibility

## Beispiel-Anwendung

```typescript
import { RequiredStringValidator, OptionalStringValidator } from './base-validator';

// Button Component
interface ButtonProps {
	label: string; // Required
	tooltip?: string; // Optional
	ariaLabel?: string; // Optional
}

const buttonLabelValidator = new RequiredStringValidator('Button', 1, 50);
const buttonTooltipValidator = new OptionalStringValidator(1, 200);
const buttonAriaLabelValidator = new OptionalStringValidator(1, 100);

class ButtonController {
	public watchLabel(value?: string): void {
		// Required: garantiert never undefined
		const label = buttonLabelValidator.process(value);
		this.setRenderPropsOrStates('label', label);
	}

	public watchTooltip(value?: string): void {
		// Optional: kann undefined sein
		const tooltip = buttonTooltipValidator.process(value);
		this.setRenderPropsOrStates('tooltip', tooltip);
	}
}
```

Die Lösung respektiert die ursprüngliche Intention von optional Properties und macht das Verhalten explizit und vorhersagbar!
