import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Lässt das Element das Label ausblenden.
 */
/** en
 * Tells the element to hide the label.
 */
export type PropHideLabel = {
	hideLabel?: boolean;
};

/* validator */
export const validateHideLabel = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_hide-label', value);
};
