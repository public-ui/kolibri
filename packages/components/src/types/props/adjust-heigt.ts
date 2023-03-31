import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Passt die Höhe des Eingabefeldes automatisch an den Füllstand an.
 */
/** en
 * Adjusts the height of the element to its content.
 */
export type PropAdjustHeight = {
	adjustHeight?: boolean;
};

/* validator */
export const validateAdjustHeight = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_adjustHeight', value);
};
