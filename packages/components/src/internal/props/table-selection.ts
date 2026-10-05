import type { KoliBriTableSelection, Stringified } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Row selection of a table.
 *
 * `false` is the normalized "no selection" and the default: the table then renders no selection
 * column. A selection is only valid with a `label` function, which is why a JSON string can never
 * validate — it is parsed for a meaningful warning, not for use.
 */
export type TableSelectionProp = Prop<'selection', Stringified<KoliBriTableSelection>, KoliBriTableSelection | false>;

function normalizeTableSelection(value: unknown): KoliBriTableSelection {
	const selection = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (typeof selection === 'object' && selection !== null) {
		return selection as KoliBriTableSelection;
	}
	throw new Error('Invalid table selection: expected an object.');
}

function isTableSelection(selection: KoliBriTableSelection | false): boolean {
	return selection === false || (typeof selection.label === 'function' && (!selection.selectedKeys || Array.isArray(selection.selectedKeys)));
}

export const tableSelectionProp = createPropDefinition<TableSelectionProp>('selection', false, normalizeTableSelection, isTableSelection);
