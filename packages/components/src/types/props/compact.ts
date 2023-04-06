import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Macht die Navigation kompakt.
 */
/** en
 * Makes the navigation compact.
 */
export type PropCompact = {
	compact: boolean;
};

/* validator */
export const validateCompact = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_compact', value);
};
