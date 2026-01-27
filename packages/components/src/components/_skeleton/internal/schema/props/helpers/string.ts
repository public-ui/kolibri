export function normalizeString(value?: unknown): unknown {
	if (typeof value === 'string') {
		return value;
	}
	if (value !== null && value !== undefined) {
		return String(value);
	}
	return value;
}

export function validateString(value: unknown): value is string {
	return typeof value === 'string';
}
