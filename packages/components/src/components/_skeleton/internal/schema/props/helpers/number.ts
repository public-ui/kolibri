export function normalizeNumber(value?: unknown): unknown {
	if (typeof value === 'number') {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = Number(value);
		return isNaN(parsed) ? value : parsed;
	}
	return value;
}

export function validateNumber(value: unknown): value is number {
	return typeof value === 'number';
}
