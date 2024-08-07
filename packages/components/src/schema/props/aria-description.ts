import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/* types */
export type AriaDescriptionPropType = string;

/**
 *
 */
export type PropAriaDescription = {
	ariaDescription: AriaDescriptionPropType;
};

/* validator */
export const validateAriaDescription = (component: Generic.Element.Component, value?: AriaDescriptionPropType): void => {
	watchString(component, '_ariaDescription', value);
};
