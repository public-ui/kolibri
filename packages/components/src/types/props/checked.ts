import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Hakt die Checkbox an.
 */
/** en
 * Checks the checkbox.
 */
export type PropChecked = {
	checked: boolean;
};

/* validator */
export const validateChecked = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_checked', value);
};
