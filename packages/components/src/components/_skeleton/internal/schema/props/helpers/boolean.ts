export function normalizeBoolean(value?: unknown): unknown {
	if (typeof value === 'boolean') {
		return value;
	}
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	return value;
}

export function validateBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}
