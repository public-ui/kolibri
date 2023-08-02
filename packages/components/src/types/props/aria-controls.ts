import { Generic } from '@a11y-ui/core';

import { watchString } from '../../utils/prop.validators';

/* types */
/**
 * Defines which elements are being controlled. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
 * @deprecated
 */
export type AriaControlsPropType = string;

/**
 * @deprecated
 */
export type PropAriaControls = {
	ariaControls: AriaControlsPropType;
};

/* validator */
export const validateAriaControls = (component: Generic.Element.Component, value?: AriaControlsPropType): void => {
	watchString(component, '_ariaControls', value);
};
