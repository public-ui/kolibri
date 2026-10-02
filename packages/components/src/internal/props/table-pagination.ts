import type { KoliBriTablePaginationProps, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * The pagination settings of `kol-table-stateful`. `true` and `''` switch the pagination on with its
 * defaults and are stored as an empty object; an object (or its JSON string) is stored as it is.
 */
export type TablePagination = Partial<KoliBriTablePaginationProps>;
export type TablePaginationProp = Prop<'pagination', boolean | Stringified<KoliBriTablePaginationProps>, TablePagination>;

/** Parses a JSON string; a string that is no JSON is kept as it is. */
const parseTablePagination = (value: unknown): unknown => {
	try {
		return parseJson<unknown>(value as string);
	} catch {
		return value;
	}
};

/**
 * Whether a `_pagination` value shows the pagination: `true`, `''` or an object. Any other value hides
 * the pagination and keeps the stored settings.
 */
export const isTablePaginationShown = (value: unknown): boolean => {
	const parsed = parseTablePagination(value);
	return parsed === true || parsed === '' || (typeof parsed === 'object' && parsed !== null);
};

export const tablePaginationProp = createPropDefinition<TablePaginationProp>('pagination', { _page: 1, _pageSize: 10, _max: 0 }, (value: unknown) => {
	const parsed = parseTablePagination(value);
	if (parsed === true || parsed === '') {
		return {};
	}
	if (typeof parsed === 'object' && parsed !== null) {
		return parsed as TablePagination;
	}
	throw new Error('Invalid table pagination: expected true, an empty string or a pagination object.');
});
