import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Markiert dieses Element als ausgewählt.
 */
/** en
 * Marks this element as selected.
 */
export type PropAriaSelected = {
	'aria-selected'?: boolean;
};

/* validator */
export const validateAriaSelected = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_aria-selected', value);
};
