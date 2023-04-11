import { Generic } from '@a11y-ui/core';
import { watchString } from '../../utils/prop.validators';

/* types */
/** de
 * Setzt die ID des Elements.
 */
/** en
 * Sets the ID of the element.
 */
export type PropId = {
	id: string;
};

/* validator */
export const validateId = (component: Generic.Element.Component, value?: string): void => {
	watchString(component, '_id', value);
};
