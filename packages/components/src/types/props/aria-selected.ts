import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
/**
 * Marks this element as selected.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
 */
export type PropAriaSelected = {
	ariaSelected: boolean;
};

/* validator */
export const validateAriaSelected = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_ariaSelected', value);
};
