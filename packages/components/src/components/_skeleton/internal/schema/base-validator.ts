/**
 * Abstract base class for schema validation with common default validators.
 * Provides a consistent interface for normalizing and validating component props.
 */
export abstract class SchemaValidator<T> {
	/**
	 * Normalizes the input value to the expected type.
	 * Should handle edge cases and provide sensible defaults.
	 * For optional properties, undefined should remain undefined.
	 */
	public abstract normalize(value?: unknown): T;

	/**
	 * Validates that the normalized value meets the schema requirements.
	 * Should return true if the value is valid, false otherwise.
	 * For optional properties, undefined should be considered valid.
	 */
	public abstract validate(value: T): boolean;

	/**
	 * Processes a value through normalization and validation.
	 * Returns the normalized value if valid, otherwise returns the fallback.
	 */
	public process(value?: unknown, fallback?: T): T {
		const normalized = this.normalize(value);
		if (this.validate(normalized)) {
			return normalized;
		}
		return fallback ?? this.getDefaultValue();
	}

	/**
	 * Provides a default value when validation fails and no fallback is provided.
	 * Subclasses should override this to provide appropriate defaults.
	 */
	protected abstract getDefaultValue(): T;
}

/**
 * Validator for required string properties.
 * Required strings cannot be undefined or empty.
 */
export class RequiredStringValidator extends SchemaValidator<string> {
	constructor(
		private readonly defaultValue: string = '',
		private readonly minLength?: number,
		private readonly maxLength?: number,
	) {
		super();
	}

	public normalize(value?: unknown): string {
		if (typeof value === 'string') {
			return value.trim();
		}
		if (typeof value === 'number') {
			return String(value).trim();
		}
		return this.defaultValue;
	}

	public validate(value: string): boolean {
		if (typeof value !== 'string') {
			return false;
		}
		if (value === '') {
			return false; // Required strings cannot be empty
		}
		if (this.minLength !== undefined && value.length < this.minLength) {
			return false;
		}
		if (this.maxLength !== undefined && value.length > this.maxLength) {
			return false;
		}
		return true;
	}

	protected getDefaultValue(): string {
		return this.defaultValue;
	}
}

/**
 * Validator for optional string properties.
 * Optional strings can be undefined, but if provided must be valid strings.
 */
export class OptionalStringValidator extends SchemaValidator<string | undefined> {
	constructor(
		private readonly minLength?: number,
		private readonly maxLength?: number,
	) {
		super();
	}

	public normalize(value?: unknown): string | undefined {
		// undefined and null stay undefined
		if (value === undefined || value === null) {
			return undefined;
		}

		if (typeof value === 'string') {
			const trimmed = value.trim();
			// Empty strings become undefined for optional properties
			return trimmed === '' ? undefined : trimmed;
		}

		if (typeof value === 'number') {
			return String(value).trim();
		}

		// Invalid types become undefined
		return undefined;
	}

	public validate(value: string | undefined): boolean {
		// undefined is always valid for optional properties
		if (value === undefined) {
			return true;
		}

		if (typeof value !== 'string') {
			return false;
		}

		// Length checks for actual strings
		if (this.minLength !== undefined && value.length < this.minLength) {
			return false;
		}
		if (this.maxLength !== undefined && value.length > this.maxLength) {
			return false;
		}

		return true;
	}

	protected getDefaultValue(): string | undefined {
		return undefined;
	}
}

/**
 * Legacy StringValidator for backward compatibility.
 * Uses composition to delegate to appropriate validator based on required flag.
 */
export class StringValidator extends SchemaValidator<string> {
	private readonly isRequired: boolean;
	private readonly requiredValidator?: RequiredStringValidator;
	private readonly optionalValidator?: OptionalStringValidator;

	constructor(
		private readonly defaultValue: string = '',
		required: boolean = false,
		minLength?: number,
		maxLength?: number,
	) {
		super();
		this.isRequired = required;

		if (required) {
			this.requiredValidator = new RequiredStringValidator(defaultValue, minLength, maxLength);
		} else {
			this.optionalValidator = new OptionalStringValidator(minLength, maxLength);
		}
	}

	public normalize(value?: unknown): string {
		if (this.isRequired && this.requiredValidator) {
			return this.requiredValidator.normalize(value);
		} else if (this.optionalValidator) {
			const result = this.optionalValidator.normalize(value);
			// For backward compatibility, return defaultValue instead of undefined
			return result ?? this.defaultValue;
		}
		return this.defaultValue;
	}

	public validate(value: string): boolean {
		if (this.isRequired && this.requiredValidator) {
			return this.requiredValidator.validate(value);
		} else if (this.optionalValidator) {
			// For optional, treat empty default as undefined
			const normalizedValue = value === this.defaultValue && this.defaultValue === '' ? undefined : value;
			return this.optionalValidator.validate(normalizedValue);
		}
		return false;
	}

	protected getDefaultValue(): string {
		return this.defaultValue;
	}
}

/**
 * Validator for required boolean properties.
 */
export class RequiredBooleanValidator extends SchemaValidator<boolean> {
	constructor(private readonly defaultValue: boolean = false) {
		super();
	}

	public normalize(value?: unknown): boolean {
		return !!value;
	}

	public validate(value: boolean): boolean {
		return typeof value === 'boolean';
	}

	protected getDefaultValue(): boolean {
		return this.defaultValue;
	}
}

/**
 * Validator for optional boolean properties.
 */
export class OptionalBooleanValidator extends SchemaValidator<boolean | undefined> {
	public normalize(value?: unknown): boolean | undefined {
		if (value === undefined || value === null) {
			return undefined;
		}
		return !!value;
	}

	public validate(value: boolean | undefined): boolean {
		if (value === undefined) {
			return true;
		}
		return typeof value === 'boolean';
	}

	protected getDefaultValue(): boolean | undefined {
		return undefined;
	}
}

/**
 * Default validator for boolean properties with truthy/falsy normalization.
 * Maintains backward compatibility while supporting both required and optional booleans.
 */
export class BooleanValidator extends SchemaValidator<boolean> {
	private readonly isRequired: boolean;
	private readonly requiredValidator?: RequiredBooleanValidator;
	private readonly optionalValidator?: OptionalBooleanValidator;

	constructor(
		private readonly defaultValue: boolean = false,
		required: boolean = true,
	) {
		super();
		this.isRequired = required;

		if (required) {
			this.requiredValidator = new RequiredBooleanValidator(defaultValue);
		} else {
			this.optionalValidator = new OptionalBooleanValidator();
		}
	}

	public normalize(value?: unknown): boolean {
		if (this.isRequired && this.requiredValidator) {
			return this.requiredValidator.normalize(value);
		} else if (this.optionalValidator) {
			const result = this.optionalValidator.normalize(value);
			return result ?? this.defaultValue;
		}
		return this.defaultValue;
	}

	public validate(value: boolean): boolean {
		if (this.isRequired && this.requiredValidator) {
			return this.requiredValidator.validate(value);
		} else if (this.optionalValidator) {
			const normalizedValue = value === this.defaultValue ? undefined : value;
			return this.optionalValidator.validate(normalizedValue);
		}
		return false;
	}

	protected getDefaultValue(): boolean {
		return this.defaultValue;
	}
}

/**
 * Default validator for number properties with parsing and range validation.
 */
export class NumberValidator extends SchemaValidator<number> {
	constructor(
		private readonly defaultValue: number = 0,
		private readonly min?: number,
		private readonly max?: number,
		private readonly integer: boolean = false,
	) {
		super();
	}

	public normalize(value?: unknown): number {
		if (typeof value === 'number' && !isNaN(value)) {
			const num = this.integer ? Math.round(value) : value;
			return this.clampToRange(num);
		}
		if (typeof value === 'string') {
			const parsed = this.integer ? parseInt(value, 10) : parseFloat(value);
			if (!isNaN(parsed)) {
				return this.clampToRange(parsed);
			}
		}
		return this.defaultValue;
	}

	public validate(value: number): boolean {
		if (typeof value !== 'number' || isNaN(value)) {
			return false;
		}
		if (this.integer && !Number.isInteger(value)) {
			return false;
		}
		if (this.min !== undefined && value < this.min) {
			return false;
		}
		if (this.max !== undefined && value > this.max) {
			return false;
		}
		return true;
	}

	protected getDefaultValue(): number {
		return this.defaultValue;
	}

	private clampToRange(value: number): number {
		if (this.min !== undefined && value < this.min) {
			return this.min;
		}
		if (this.max !== undefined && value > this.max) {
			return this.max;
		}
		return value;
	}
}

/**
 * Validator for array properties with element validation.
 */
export class ArrayValidator<T> extends SchemaValidator<T[]> {
	constructor(
		private readonly elementValidator: SchemaValidator<T>,
		private readonly defaultValue: T[] = [],
		private readonly minLength?: number,
		private readonly maxLength?: number,
	) {
		super();
	}

	public normalize(value?: unknown): T[] {
		if (Array.isArray(value)) {
			return value.map((item) => this.elementValidator.normalize(item));
		}
		if (value !== undefined && value !== null) {
			// Try to normalize single value as array with one element
			return [this.elementValidator.normalize(value)];
		}
		return this.defaultValue;
	}

	public validate(value: T[]): boolean {
		if (!Array.isArray(value)) {
			return false;
		}
		if (this.minLength !== undefined && value.length < this.minLength) {
			return false;
		}
		if (this.maxLength !== undefined && value.length > this.maxLength) {
			return false;
		}
		return value.every((item) => this.elementValidator.validate(item));
	}

	protected getDefaultValue(): T[] {
		return this.defaultValue;
	}
}

/**
 * Validator for enum/union types with predefined allowed values.
 */
export class EnumValidator<T extends string | number> extends SchemaValidator<T> {
	constructor(
		private readonly allowedValues: readonly T[],
		private readonly defaultValue: T,
	) {
		super();
	}

	public normalize(value?: unknown): T {
		if (this.allowedValues.includes(value as T)) {
			return value as T;
		}
		// Try string conversion for numbers
		if (typeof value === 'string' || typeof value === 'number') {
			const stringValue = String(value) as T;
			if (this.allowedValues.includes(stringValue)) {
				return stringValue;
			}
		}
		return this.defaultValue;
	}

	public validate(value: T): boolean {
		return this.allowedValues.includes(value);
	}

	protected getDefaultValue(): T {
		return this.defaultValue;
	}
}
