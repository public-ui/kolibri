export type NamePropType = string;

export type NameProp = {
	name: NamePropType;
};

/**
 * Validates if a value is a valid name (non-empty string).
 */
export function validateName(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Processes a name value - returns the trimmed string if valid, otherwise empty string.
 */
export function normalizeName(value?: unknown): string {
	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (trimmed.length > 0) {
			return trimmed;
		}
	}
	if (typeof value === 'number') {
		const stringValue = String(value).trim();
		if (stringValue.length > 0) {
			return stringValue;
		}
	}
	return ''; // Default value for required field
}
