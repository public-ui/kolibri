import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Macht das Element nicht fokussierbar und lässt es alle Events ignorieren.
 */
/** en
 * Makes the element not focusable and ignore all events.
 */
export type PropDisabled = {
	disabled: boolean;
};

/* validator */
export const validateDisabled = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_disabled', value);
};
