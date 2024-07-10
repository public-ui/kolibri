/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/**
 * Defines the contextual relationship between a parent and its child elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns
 */
export type AriaOwnsPropType = string;

export type PropAriaOwns = {
	ariaOwns: AriaOwnsPropType;
};

/* validator */
export const validateAriaOwns = (component: Generic.Element.Component, value?: AriaOwnsPropType): void => {
	watchString(component, '_ariaOwns', value, {
		defaultValue: undefined,
	});
};
