import { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
type AriaSelectedPropType = boolean;

/**
 * Marks this element as selected.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
 */
export type PropAriaSelected = {
	ariaSelected: AriaSelectedPropType;
};

/* validator */
export const validateAriaSelected = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_ariaSelected', value);
};
