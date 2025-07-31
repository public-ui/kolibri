export type ShowPropType = boolean;

export type ShowProp = {
	show?: ShowPropType;
};

export const normalizeShow = (value?: ShowPropType): ShowPropType => !!value;

export const validateShow = (value?: ShowPropType): boolean => typeof value === 'boolean';
