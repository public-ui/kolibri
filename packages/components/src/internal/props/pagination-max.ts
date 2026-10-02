import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumberType } from './helpers/normalizers';

/**
 * Max prop of `kol-pagination`
 *
 * Description:
 * The total number of entries; 0 means no entries. `maxProp` does not fit, because it requires a
 * value above 0.
 */
export type PaginationMaxProp = SimpleProp<'max', number>;
export const paginationMaxProp = createPropDefinition<PaginationMaxProp>('max', 0, normalizeNumberType);
