import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Schlatet das Eingabefeld um, sodass es mehrere Eingaben akzeptiert.
 */
/** en
 * Makes the input accept multiple inputs.
 */
export type PropMultiple = {
	multiple: boolean;
};

/* validator */
export const validateMultiple = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_multiple', value);
};
