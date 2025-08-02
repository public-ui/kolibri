import type { SchemaValidator } from './base-validator';
import {
	ArrayValidator,
	BooleanValidator,
	EnumValidator,
	NumberValidator,
	RequiredStringValidator,
	OptionalStringValidator,
	RequiredBooleanValidator,
	OptionalBooleanValidator,
	StringValidator,
} from './base-validator';

/**
 * Collection of commonly used validators for KoliBri components.
 * These validators provide sensible defaults for typical use cases.
 *
 * NEW: Explicit distinction between required and optional validators.
 */

// === REQUIRED VALIDATORS ===
// These validators never allow undefined - always return a concrete value

export const requiredStringValidator = new RequiredStringValidator('', 1);
export const requiredLabelValidator = new RequiredStringValidator('Label', 1, 100);
export const requiredNameValidator = new RequiredStringValidator('Name', 1, 50);
export const requiredTitleValidator = new RequiredStringValidator('Title', 1, 100);

export const requiredBooleanValidator = new RequiredBooleanValidator(false);
export const requiredEnabledValidator = new RequiredBooleanValidator(true);

// === OPTIONAL VALIDATORS ===
// These validators allow undefined as a valid state

export const optionalStringValidator = new OptionalStringValidator();
export const optionalDescriptionValidator = new OptionalStringValidator(10, 500);
export const optionalTooltipValidator = new OptionalStringValidator(1, 200);
export const optionalUrlValidator = new OptionalStringValidator(5, 2000);

export const optionalBooleanValidator = new OptionalBooleanValidator();

// === LEGACY VALIDATORS (for backward compatibility) ===
// These maintain the old API but use the new implementation

export const trueBooleanValidator = new BooleanValidator(true, true);
export const falseBooleanValidator = new BooleanValidator(false, true);
export const optionalFalseBooleanValidator = new BooleanValidator(false, false);

export const shortStringValidator = new StringValidator('', false, undefined, 50);
export const longStringValidator = new StringValidator('', false, undefined, 500);

// === NUMBER VALIDATORS ===
export const positiveNumberValidator = new NumberValidator(0, 0);
export const negativeNumberValidator = new NumberValidator(0, undefined, 0);
export const percentageValidator = new NumberValidator(0, 0, 100);
export const integerValidator = new NumberValidator(0, undefined, undefined, true);
export const positiveIntegerValidator = new NumberValidator(1, 1, undefined, true);

// === ARRAY VALIDATORS ===
export const stringArrayValidator = new ArrayValidator(optionalStringValidator);
export const nonEmptyStringArrayValidator = new ArrayValidator(requiredStringValidator, [], 1);

// === ENUM VALIDATORS ===
export const sizeValidator = new EnumValidator(['xs', 'sm', 'md', 'lg', 'xl'] as const, 'md');
export const variantValidator = new EnumValidator(['primary', 'secondary', 'danger', 'success', 'warning', 'info'] as const, 'primary');
export const alignmentValidator = new EnumValidator(['left', 'center', 'right'] as const, 'left');
export const directionValidator = new EnumValidator(['horizontal', 'vertical'] as const, 'horizontal');

/**
 * Factory functions for creating custom validators with common patterns.
 */

export const createRequiredStringValidator = (defaultValue: string = '', minLength?: number, maxLength?: number) =>
	new RequiredStringValidator(defaultValue, minLength, maxLength);

export const createOptionalStringValidator = (minLength?: number, maxLength?: number) => new OptionalStringValidator(minLength, maxLength);

export const createStringValidator = (defaultValue: string = '', required: boolean = false, minLength?: number, maxLength?: number) =>
	new StringValidator(defaultValue, required, minLength, maxLength);

export const createNumberValidator = (defaultValue: number = 0, min?: number, max?: number, integer: boolean = false) =>
	new NumberValidator(defaultValue, min, max, integer);

export const createEnumValidator = <T extends string | number>(allowedValues: readonly T[], defaultValue: T) => new EnumValidator(allowedValues, defaultValue);

export const createArrayValidator = <T>(elementValidator: SchemaValidator<T>, defaultValue: T[] = [], minLength?: number, maxLength?: number) =>
	new ArrayValidator(elementValidator, defaultValue, minLength, maxLength);
