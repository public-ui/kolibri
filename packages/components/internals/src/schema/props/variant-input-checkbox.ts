import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const inputCheckboxVariantOptions = ['button', 'default', 'switch'] as const;
export type InputCheckboxVariantPropType = (typeof inputCheckboxVariantOptions)[number];

/**
 * Defines the variant for presenting the input-checkbox component.
 */
export type PropVariantInputCheckbox = {
	variant: InputCheckboxVariantPropType;
};

const isInputCheckboxVariantPropType = (value: unknown): value is InputCheckboxVariantPropType => {
	return typeof value === 'string' && inputCheckboxVariantOptions.includes(value as InputCheckboxVariantPropType);
};

export const validateVariantInputCheckbox = (component: Generic.Element.Component, value?: InputCheckboxVariantPropType): void => {
	watchValidator(component, '_variant', isInputCheckboxVariantPropType, new Set(inputCheckboxVariantOptions), value);
};
