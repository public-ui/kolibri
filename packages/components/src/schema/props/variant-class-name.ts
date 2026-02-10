import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export type VariantClassNamePropType = string;

export type PropVariantClassName = {
	variant: VariantClassNamePropType;
};

const isSafeClassName = (value: unknown) => {
	var re = new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{3,60}$');
	return typeof value === 'string' && re.test(value);
};

export const validateVariantClassName = (component: Generic.Element.Component, value?: VariantClassNamePropType): void => {
	watchValidator(component, '_variant', isSafeClassName, new Set(['^[a-zA-Z][a-zA-Z0-9_-]{3,60}$']), value);
};
