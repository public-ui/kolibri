export type ShowPropType = boolean;

export type ShowProp = {
	show?: ShowPropType;
};

/**
 * Validates if a value is a boolean.
 */
export function validateShow(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

/**
 * Processes a show value - converts truthy/falsy values to boolean, defaults to false.
 */
export function normalizeShow(value?: unknown): boolean {
	if (value === undefined || value === null) {
		return false; // Default value
	}
	return !!value; // Convert to boolean
}
