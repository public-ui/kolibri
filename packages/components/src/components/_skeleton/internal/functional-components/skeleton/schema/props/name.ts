export type NamePropType = string;

export type NameProp = {
	name?: NamePropType;
};

export const normalizeName = (name?: NamePropType): string | undefined => {
	if (name === undefined || name === null) {
		return undefined;
	}
	return name.trim() || undefined;
};

export const validateName = (name?: NamePropType): boolean => {
	if (name === undefined || name === null) {
		return true;
	}
	if (typeof name !== 'string') {
		return false;
	}
	const trimmedName = name.trim();
	return trimmedName.length > 0 && trimmedName.length <= 100;
};
