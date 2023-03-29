import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
 */
/** en
 * Shows if the input was touched by a user.
 */
export type PropTouched = {
	touched: boolean;
};

/* validator */
export const validateTouched = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_touched', value);
};
