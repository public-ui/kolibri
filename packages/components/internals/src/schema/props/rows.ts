import type { Generic } from 'adopted-style-sheets';

import { watchNumber } from '../utils';

/* types */
export type RowsPropType = number;

/**
 * Maximum number of visible rows of the element.
 */
export type PropRows = {
	rows: RowsPropType;
};

/* validator */
export const validateRows = (component: Generic.Element.Component, value?: RowsPropType): void => {
	watchNumber(component, `_rows`, value, { min: 1 });
};
