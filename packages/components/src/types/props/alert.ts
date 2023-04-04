import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Macht die Fehlermeldung dieses Elements von Screenreadern lesbar.
 */
/** en
 * Makes hints readable for screenreaders.
 */
export type PropAlert = {
	alert: boolean;
};

/* validator */
export const validateAlert = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_alert', value);
};
