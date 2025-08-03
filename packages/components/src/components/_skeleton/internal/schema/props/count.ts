export type CountPropType = number;

export type CountProp = {
	count: CountPropType;
};

export function normalizeCount(value?: unknown): unknown {
	if (typeof value === 'number') {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = Number(value);
		return isNaN(parsed) ? value : parsed; // Return original if parsing fails
	}
	return value;
}

export function validateCount(value: unknown): value is number {
	return typeof value === 'number';
}
