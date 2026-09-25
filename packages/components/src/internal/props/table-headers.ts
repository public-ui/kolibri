import type { KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders, Stringified, TableHeaderCells } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Horizontal and vertical header cells of a table, normalized so that both directions are always
 * arrays — an omitted direction renders exactly like an empty one.
 */
export type TableHeaders = Required<KoliBriTableHeaders>;
export type TableHeadersProp = Prop<'headers', Stringified<TableHeaderCells>, TableHeaders>;

const isHeaderRows = (rows: unknown): rows is KoliBriTableHeaderCellWithLogic[][] => Array.isArray(rows) && rows.every((row) => Array.isArray(row));

function normalizeTableHeaders(value: unknown): TableHeaders {
	const headers = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (typeof headers !== 'object' || headers === null) {
		throw new Error('Invalid table headers: expected an object.');
	}
	const { horizontal = [], vertical = [] } = headers as KoliBriTableHeaders;
	if (!isHeaderRows(horizontal) || !isHeaderRows(vertical)) {
		throw new Error('Invalid table headers: horizontal and vertical must be arrays of header rows.');
	}
	return { horizontal, vertical };
}

/** A header width, when given, must be a number of pixels. */
function hasNumericWidths({ horizontal, vertical }: TableHeaders): boolean {
	return [...horizontal, ...vertical].every((row) => row.every((cell) => cell.width === undefined || typeof cell.width === 'number'));
}

export const tableHeadersProp = createPropDefinition<TableHeadersProp>('headers', { horizontal: [], vertical: [] }, normalizeTableHeaders, hasNumericWidths);
