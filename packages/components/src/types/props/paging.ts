import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Versetzt die Navigation in den umblättermodus. Nur in vertikaler Orientation.
 */
/** en
 * Puts the navigation in paging mode. Vertical orientation only.
 */
export type PropPaging = {
	paging: boolean;
};

/* validator */
export const validatePaging = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_paging', value);
};
