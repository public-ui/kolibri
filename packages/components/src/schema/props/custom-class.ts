import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

/* types */
export type CustomClassPropType = string;

/**
 * Defines the custom class attribute.
 */
export type PropCustomClass = {
	customClass: CustomClassPropType;
};

/* validator */
export const validateCustomClass = (component: Generic.Element.Component, value?: CustomClassPropType): void => {
	watchString(component, '_customClass', value, {
		defaultValue: undefined,
	});
};
