# SchemaValidator - Enhanced Validation System

Die neue `SchemaValidator` abstrakte Klasse bietet eine einheitliche und erweiterbare Lösung für die Validierung und Normalisierung von Component-Properties in KoliBri.

## Vorteile der neuen Architektur

### 1. **Konsistenz**

- Einheitliche API für alle Validator-Typen
- Standardisierte Normalisierung und Validierung
- Reduzierte Code-Duplikation

### 2. **Typsicherheit**

- Vollständige TypeScript-Unterstützung
- Generische Implementierung für alle Datentypen
- Compile-time Validierung

### 3. **Erweiterbarkeit**

- Abstrakte Basisklasse für custom Validators
- Vorgefertigte Default-Validators für häufige Use Cases
- Komposierbare Validator-Chains

### 4. **Fehlerbehandlung**

- Graceful Fallback zu Default-Werten
- Robuste Edge-Case-Behandlung
- Optionale Strict-Mode Validierung

## Verwendung

### Standard Validators

```typescript
import { StringValidator, BooleanValidator, NumberValidator } from './base-validator';

// String mit Default-Werten
const nameValidator = new StringValidator('', true, 1); // required, min 1 char
const labelValidator = new StringValidator('Label', false); // optional with default

// Boolean mit Default
const showValidator = new BooleanValidator(false);

// Number mit Range
const ageValidator = new NumberValidator(0, 0, 120); // 0-120 Jahre
const percentValidator = new NumberValidator(50, 0, 100); // 0-100%
```

### Enum Validators

```typescript
import { EnumValidator } from './base-validator';

const sizeValidator = new EnumValidator(['xs', 'sm', 'md', 'lg', 'xl'], 'md');
const themeValidator = new EnumValidator(['light', 'dark'], 'light');
```

### Array Validators

```typescript
import { ArrayValidator, StringValidator } from './base-validator';

const stringElementValidator = new StringValidator('', true);
const tagsValidator = new ArrayValidator(stringElementValidator, [], 1, 10); // 1-10 tags
```

### Custom Validators

```typescript
class EmailValidator extends StringValidator {
	constructor() {
		super('', false); // optional email
	}

	public validate(value: string): boolean {
		if (!super.validate(value)) return false;
		if (value === '') return true; // optional

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	}
}

class UrlValidator extends StringValidator {
	constructor(required = false) {
		super('', required);
	}

	public normalize(value?: unknown): string {
		const normalized = super.normalize(value);
		if (normalized && !normalized.startsWith('http')) {
			return `https://${normalized}`;
		}
		return normalized;
	}

	public validate(value: string): boolean {
		if (!super.validate(value)) return false;
		if (value === '' && !this.required) return true;

		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	}
}
```

## Migration von Legacy API

### Vorher (Legacy)

```typescript
export const normalizeName = (value?: string): string => {
  if (typeof value === 'string') {
    return value.trim();
  }
  return '';
};

export const validateName = (value?: string): boolean =>
  typeof value === 'string';

// In Controller
public watchName(value?: string): void {
  const normalized = normalizeName(value);
  if (validateName(normalized)) {
    this.setRenderPropsOrStates('name', normalized);
  }
}
```

### Nachher (New API)

```typescript
const nameValidator = new StringValidator('', true, 1);

// Legacy compatibility
export const normalizeName = (value?: string) => nameValidator.normalize(value);
export const validateName = (value?: string) => nameValidator.validate(nameValidator.normalize(value));

// New API
export { nameValidator };

// In Controller
public watchName(value?: string): void {
  const processedValue = nameValidator.process(value);
  this.setRenderPropsOrStates('name', processedValue);
}
```

## Common Validators Library

Für häufig verwendete Patterns gibt es vorgefertigte Validators:

```typescript
import {
	requiredStringValidator,
	optionalStringValidator,
	positiveNumberValidator,
	percentageValidator,
	sizeValidator,
	variantValidator,
} from './common-validators';

// Direkt verwendbar
const titleValidator = requiredStringValidator;
const descriptionValidator = optionalStringValidator;
const progressValidator = percentageValidator; // 0-100%
const buttonSizeValidator = sizeValidator; // xs, sm, md, lg, xl
```

## Best Practices

### 1. **Validator-Instanzen wiederverwenden**

```typescript
// ✅ Good - einmal erstellen, überall verwenden
const nameValidator = new StringValidator('', true, 1);

// ❌ Bad - bei jeder Verwendung neu erstellen
const normalizeName = (value) => new StringValidator('', true, 1).normalize(value);
```

### 2. **Aussagekräftige Defaults**

```typescript
// ✅ Good - sinnvolle Defaults
const ageValidator = new NumberValidator(18, 0, 120); // Default: volljährig

// ❌ Bad - unklare Defaults
const ageValidator = new NumberValidator(0, 0, 120);
```

### 3. **Komposition für komplexe Validierung**

```typescript
class PersonValidator extends SchemaValidator<Person> {
	private nameValidator = new StringValidator('', true, 1);
	private ageValidator = new NumberValidator(18, 0, 120);
	private emailValidator = new EmailValidator();

	public normalize(value?: unknown): Person {
		if (typeof value === 'object' && value) {
			return {
				name: this.nameValidator.normalize((value as any).name),
				age: this.ageValidator.normalize((value as any).age),
				email: this.emailValidator.normalize((value as any).email),
			};
		}
		return this.getDefaultValue();
	}

	protected getDefaultValue(): Person {
		return {
			name: '',
			age: 18,
			email: '',
		};
	}
}
```

## Testing

Die neue Architektur macht Testing einfacher:

```typescript
describe('NameValidator', () => {
	const validator = new StringValidator('', true, 1);

	it('should normalize strings correctly', () => {
		expect(validator.normalize('  John  ')).toBe('John');
		expect(validator.normalize(123)).toBe('123');
		expect(validator.normalize(null)).toBe('');
	});

	it('should validate required strings', () => {
		expect(validator.validate('John')).toBe(true);
		expect(validator.validate('')).toBe(false); // required
	});

	it('should process with fallback', () => {
		expect(validator.process('  John  ')).toBe('John');
		expect(validator.process(null, 'Fallback')).toBe('Fallback');
	});
});
```
