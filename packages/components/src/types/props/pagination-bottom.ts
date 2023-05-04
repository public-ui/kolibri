import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Setzt die Pagination unter die Tabelle.
 */
/** en
 * Puts the Pagination below the table.
 */
export type PropPaginationBottom = {
	paginationBottom: boolean;
};

/* validator */
export const validatePaginationBottom = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_paginationBottom', value);
};
