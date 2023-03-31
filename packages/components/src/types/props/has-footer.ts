import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Zeigt den slot="footer" an.
 */
/** en
 * Shows the slot="footer".
 */
export type PropHasFooter = {
	hasFooter?: boolean;
};

/* validator */
export const validateHasFooter = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_has-footer', value);
};
