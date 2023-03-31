import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Versteckt den Link und lässt ihn bei Fokussierung erscheinen.
 */
/** en
 * Hides the link und makes it appear on focus.
 */
export type PropStealth = {
	stealth?: boolean;
};

/* validator */
export const validateStealth = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_stealth', value);
};
