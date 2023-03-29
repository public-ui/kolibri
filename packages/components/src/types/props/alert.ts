import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Gibt an, ob die Fehlermeldung zu diesem Element von Screenreadern vorgelesen werden soll.
 */
/** en
 * Makes hints readable for screenreaders.
 */
export type PropAlert = {
	alert?: boolean;
};

/* validator */
export const validateAlert = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_alert', value);
};
