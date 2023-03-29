import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Setzt den Zugriff auf dieses Eingabeelement auf nur lesen.
 */
/** en
 * Makes the input element read only.
 */
export type PropReadOnly = {
	'read-only'?: boolean;
};

/* validator */
export const validateReadOnly = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_read-only', value);
};
