import type { Generic } from 'adopted-style-sheets';

import { watchNumber } from '../utils';

/* types */
export type RowsPropType = number;

/**
 * Number of rows of the input element that should be visible at the same time.
 */
export type PropRows = {
	rows: RowsPropType;
};

/* validator */
export const validateRows = (component: Generic.Element.Component, value?: RowsPropType): void => {
	watchNumber(component, `_rows`, value, { min: 1 });
};
