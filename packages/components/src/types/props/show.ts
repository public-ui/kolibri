import { Generic } from '@a11y-ui/core';
import { watchBoolean, WatchBooleanOptions } from '../../utils/prop.validators';

/* exported types */
/** de
 * Macht das Element sichtbar.
 */
/** en
 * Makes the element show up.
 */
export type PropShow = {
	show?: boolean;
};

/* validator */
export const validateShow = (component: Generic.Element.Component, value?: boolean, hooks?: WatchBooleanOptions): void => {
	watchBoolean(component, '_show', value, hooks);
};
