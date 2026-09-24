import type { KoliBriTableDataType, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Rows of a table body or footer.
 *
 * Declared `Stringified<…>`, so the rows also arrive as a JSON string whenever they are set through
 * an HTML attribute. `parseJson` also accepts single-quoted JSON.
 */
export type TableDataProp = Prop<'data', Stringified<KoliBriTableDataType[]>, KoliBriTableDataType[]>;

/** Parses and verifies a list of table rows; shared by the body and the footer data. */
export function normalizeTableRows(value: unknown): KoliBriTableDataType[] {
	const rows = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (Array.isArray(rows)) {
		return rows as KoliBriTableDataType[];
	}
	throw new Error('Invalid table data: expected an array of row objects.');
}

/** Every row must be an object; a list with a non-object entry is rejected as a whole. */
export function isTableRows(rows: KoliBriTableDataType[]): boolean {
	return rows.every((row) => typeof row === 'object' && row !== null);
}

export const tableDataProp = createPropDefinition<TableDataProp>('data', [], normalizeTableRows, isTableRows);
