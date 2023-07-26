import { Generic } from '@a11y-ui/core';

import { watchString } from '../../utils/prop.validators';

/**
 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
 */
export type PropAriaControls = {
	ariaControls: string;
};

/* validator */
export const validateAriaControls = (component: Generic.Element.Component, value?: string): void => {
	watchString(component, '_ariaControls', value);
};
