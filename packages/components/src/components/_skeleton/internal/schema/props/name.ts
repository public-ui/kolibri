export type NamePropType = string;

export type NameProp = {
	name: NamePropType;
};

export const normalizeName = (value?: NamePropType): NamePropType => {
	if (typeof value === 'string') {
		return value.trim();
	}
	return '';
};

export const validateName = (value?: NamePropType): boolean => typeof value === 'string';
