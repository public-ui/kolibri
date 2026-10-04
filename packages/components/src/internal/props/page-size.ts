import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumberType } from './helpers/normalizers';

/**
 * Page size prop of `kol-pagination`
 *
 * Description:
 * The number of entries per page. With page size options, a value that is not an option falls back
 * to the first option.
 */
export type PageSizeProp = SimpleProp<'pageSize', number>;
export const pageSizeProp = createPropDefinition<PageSizeProp>('pageSize', 1, normalizeNumberType);
