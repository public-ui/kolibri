import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../../utils/prop.validators';

/* types */
/** de
 * Markiert das Element als ausgewähltes/aktiviertes. Kann folgende Werte annehmen: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
/** en
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
export type AriaCurrent = 'date' | 'location' | 'page' | 'step' | 'time' | boolean;
export type PropAriaCurrent = {
	ariaCurrent: AriaCurrent;
};

/* validator */
export const validateAriaCurrent = (component: Generic.Element.Component, value?: AriaCurrent): void => {
	watchValidator(
		component,
		'_ariaCurrent',
		(value) => value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time' || value === true,
		new Set(['String {data, location, page, step, time}', 'boolean']),
		value
	);
};
