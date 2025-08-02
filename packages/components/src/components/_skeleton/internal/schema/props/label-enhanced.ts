import { OptionalStringValidator } from '../base-validator';

export type LabelPropType = string | undefined;

export type LabelProp = {
	label?: LabelPropType;
};

/**
 * Enhanced validator for optional label properties.
 * Labels can be undefined (not provided) or valid strings.
 * Empty strings are normalized to undefined.
 */
class LabelValidatorEnhanced extends OptionalStringValidator {
	constructor() {
		super(1); // minLength: labels should have at least 1 character if provided
	}
}

const labelValidatorEnhanced = new LabelValidatorEnhanced();

// Legacy API - backward compatibility
export const normalizeLabel = (value?: LabelPropType): string => {
	const result = labelValidatorEnhanced.normalize(value);
	return result ?? ''; // Convert undefined back to empty string for compatibility
};

export const validateLabel = (value?: LabelPropType): boolean => {
	// For legacy API, we need to handle the string-only expectation
	if (value === undefined || value === '') {
		return true; // Both undefined and empty string are valid for optional labels
	}
	return labelValidatorEnhanced.validate(value);
};

// New API - recommended for new implementations
export { labelValidatorEnhanced };

// Enhanced API - shows the correct way to handle optional properties
export const processLabel = (value?: unknown): string | undefined => {
	return labelValidatorEnhanced.process(value);
};

/**
 * Usage example in controller:
 *
 * public watchLabel(value?: LabelPropType): void {
 *   // New way: Properly handles undefined
 *   const processedValue = processLabel(value);
 *   this.setRenderPropsOrStates('label', processedValue);
 * }
 */
