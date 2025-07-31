export type LabelPropType = string;

export type LabelProp = {
	label: LabelPropType;
};

export const normalizeLabel = (value?: LabelPropType): LabelPropType => {
	if (typeof value === 'string') {
		return value.trim();
	}
	return '';
};

export const validateLabel = (value?: LabelPropType): boolean => typeof value === 'string';
