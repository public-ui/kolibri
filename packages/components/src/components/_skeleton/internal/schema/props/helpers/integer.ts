export function normalizeInteger(value?: unknown): unknown {
	if (typeof value === 'number') {
		return Number.isInteger(value) ? value : Math.round(value);
	}
	if (typeof value === 'string') {
		const parsed = parseInt(value, 10);
		return isNaN(parsed) ? value : parsed;
	}
	return value;
}

export function validateInteger(value: unknown): value is number {
	return typeof value === 'number' && Number.isInteger(value);
}
