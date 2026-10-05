import type { KoliBriTableDataType, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isTableRows, normalizeTableRows } from './table-data';

/**
 * Rows of the table footer. Same shape and normalization as the body rows (`tableDataProp`).
 */
export type TableDataFootProp = Prop<'dataFoot', Stringified<KoliBriTableDataType[]>, KoliBriTableDataType[]>;

export const tableDataFootProp = createPropDefinition<TableDataFootProp>('dataFoot', [], normalizeTableRows, isTableRows);
