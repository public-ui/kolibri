import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Klappt das Element auf sofern gesetzt (oder true) und klappt es zu sofern nicht gesetzt (oder false).
 */
/** en
 * If set (to true) opens/expands the element, closes if not set (or set to false).
 */
export type PropOpen = {
	open?: boolean;
};

/* validator */
export const validateOpen = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_open', value);
};
