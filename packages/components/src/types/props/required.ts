import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Macht das Eingabeelement zu einem Pflichtfeld.
 */
/** en
 * Makes the input element required.
 */
export type PropRequired = {
	required?: boolean;
};

/* validator */
export const validateRequired = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_required', value);
};
