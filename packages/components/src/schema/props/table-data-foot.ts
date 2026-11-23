import type { KoliBriTableDataType, Stringified } from '../types';

/* types */
export type TableDataFootPropType = Stringified<KoliBriTableDataType[]>;

/**
 * Defines the data for the table footer.
 */
export type PropTableDataFoot = {
	dataFoot: TableDataFootPropType;
};
