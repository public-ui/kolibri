import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Wenn true ignoriert das Element alle Events und lässt sich nicht fokussieren.
 */
/** en
 * If true the element ignores all events and is not focusable.
 */
export type PropDisabled = {
	disabled?: boolean;
};

/* validator */
export const validateDisabled = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_disabled', value);
};
