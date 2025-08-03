export type NamePropType = string;

export type NameProp = {
	name: NamePropType;
};

export function normalizeName(value?: unknown): unknown {
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number') {
		return String(value);
	}
	return value;
}

export function validateName(value: unknown): value is string {
	return typeof value === 'string';
}
