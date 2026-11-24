import type { KoliBriTableSelection, Stringified } from '../types';

/* types */
export type TableSelectionPropType = Stringified<KoliBriTableSelection>;

/**
 * Defines how rows can be selected and the current selection.
 */
export type PropTableSelection = {
	selection: TableSelectionPropType;
};
