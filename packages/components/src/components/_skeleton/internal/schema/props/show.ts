export type ShowPropType = boolean;

export type ShowProp = {
	show?: ShowPropType;
};

export function validateShow(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function normalizeShow(value?: unknown): unknown {
	if (value === true) {
		return true;
	}
	if (value === false) {
		return false;
	}
	return value; // Return unchanged
}
