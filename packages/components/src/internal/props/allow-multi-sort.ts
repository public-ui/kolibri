import type { AllowMultiSortPropType } from '../../schema/props/allow-multi-sort';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a table keeps the sort of several columns at once (`kol-table-stateful`). Without it, sorting
 * a column replaces the sort of the previous one.
 */
export type AllowMultiSortProp = SimpleProp<'allowMultiSort', AllowMultiSortPropType>;
export const allowMultiSortProp = createPropDefinition<AllowMultiSortProp>('allowMultiSort', false, normalizeBoolean);
