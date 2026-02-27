import type { Generic } from 'adopted-style-sheets';

import { devHint } from '../utils/a11y.tipps';
import { setState } from '../utils';

/* types */
export type TableHighlightedRowsPropType = number[];

/**
 * Defines the indices of the rows that should be highlighted.
 */
export type PropTableHighlightedRows = {
	highlightedRows: TableHighlightedRowsPropType;
};

/* validator */
export const validateTableHighlightedRows = (component: Generic.Element.Component, value?: TableHighlightedRowsPropType): void => {
	if (value === undefined) {
		setState(component, '_highlightedRows', undefined);
	} else if (Array.isArray(value) && value.every((v) => typeof v === 'number')) {
		setState(component, '_highlightedRows', value);
	} else {
		devHint(`[KolTable] The highlightedRows property must be an array of numbers.`);
	}
};
