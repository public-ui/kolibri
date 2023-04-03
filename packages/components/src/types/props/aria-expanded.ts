import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Markiert dieses Element als geöffnet, oder dass das verknüpfte Element (aria-controls/aria-owns) geöffnet ist.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 */
/** en
 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 */
export type PropAriaExpanded = {
	ariaExpanded: boolean;
};

/* validator */
export const validateAriaExpanded = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_ariaExpanded', value);
};
