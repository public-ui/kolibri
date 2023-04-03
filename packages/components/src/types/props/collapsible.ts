import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Wenn auf false gesetzt können Knoten in der Navigation nicht zugeklappt werden.
 */
/** en
 * If set to false navigation nodes cannot be collapsed.
 */
export type PropCollapsible = {
	collapsible?: boolean;
};

/* validator */
export const validateCollapsible = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_collapsible', value);
};
