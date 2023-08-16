import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
/**
 * @deprecated
 */
export type AriaExpandedPropType = boolean;

/**
 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 * @deprecated
 */
export type PropAriaExpanded = {
	ariaExpanded: AriaExpandedPropType;
};

/* validator */
export const validateAriaExpanded = (component: Generic.Element.Component, value?: AriaExpandedPropType): void => {
	watchBoolean(component, '_ariaExpanded', value);
};
