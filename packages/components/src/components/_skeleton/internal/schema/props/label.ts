export type LabelPropType = string;

export type LabelProp = {
	label: LabelPropType;
};

/**
 * Validates if a value is a string.
 */
export function validateLabel(value: unknown): value is string {
	return typeof value === 'string';
}

/**
 * Processes a label value - returns trimmed string or converts numbers, defaults to empty string.
 */
export function normalizeLabel(value?: unknown): string {
	if (typeof value === 'string') {
		return value.trim();
	}
	if (typeof value === 'number') {
		return String(value).trim();
	}
	return ''; // Default value
}
