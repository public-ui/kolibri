import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Setzt den unbestimmten Zustand auf der Checkbox, hat keine Auswirkung auf _checked.
 */
/** en
 * Puts the checkbox in the indeterminate state, does not change the value of _checked.
 */
export type PropIndeterminate = {
	indeterminate?: boolean;
};

/* validator */
export const validateIndeterminate = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_indeterminate', value);
};
