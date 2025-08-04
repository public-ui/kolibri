export type LabelPropType = string;

export type LabelProp = {
	label: LabelPropType;
};

export function normalizeLabel(value?: unknown): unknown {
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number') {
		return String(value);
	}
	return value;
}

export function validateLabel(value: unknown): value is string {
	return typeof value === 'string';
}
