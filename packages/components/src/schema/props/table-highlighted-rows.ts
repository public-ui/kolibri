import type { Generic } from 'adopted-style-sheets';

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
	if (Array.isArray(value) && value.every((v) => typeof v === 'number')) {
		setState(component, '_highlightedRows', value);
	} else if (value === undefined) {
		setState(component, '_highlightedRows', undefined);
	}
};
