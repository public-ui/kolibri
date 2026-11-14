import type { KoliBriTableHeaders, TableHeadersPropType } from '../schema/index';
import { parseJson } from '../schema/index';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Header cells of `kol-table-stateful`, as given. The stateful table derives the sort from them and
 * passes the cells on to the stateless table, which normalizes and checks them.
 */
export type TableStatefulHeadersProp = Prop<'headers', TableHeadersPropType, KoliBriTableHeaders>;

export const tableStatefulHeadersProp = createPropDefinition<TableStatefulHeadersProp>('headers', { horizontal: [], vertical: [] }, (value: unknown) => {
	const headers = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (typeof headers === 'object' && headers !== null) {
		return headers as KoliBriTableHeaders;
	}
	throw new Error('Invalid table headers: expected an object.');
});
