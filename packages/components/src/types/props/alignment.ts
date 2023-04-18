import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

/* types */
/** de
 * Markiert das Element als ausgewähltes/aktiviertes. Kann folgende Werte annehmen: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */

/** en
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'bottom';
export type Alignment = HorizontalAlignment | VerticalAlignment;
export type PropAlignment = {
	alignment: Alignment;
};

/* validator */
export const validateAlignment = (component: Generic.Element.Component, value?: Alignment): void => {
	watchString(component, '_alignment', value);
};
