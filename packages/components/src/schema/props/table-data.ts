import type { KoliBriTableDataType, Stringified } from '../types';

/* types */
export type TableDataPropType = Stringified<KoliBriTableDataType[]>;

/**
 * Defines the primary table data.
 */
export type PropTableData = {
	data: TableDataPropType;
};
