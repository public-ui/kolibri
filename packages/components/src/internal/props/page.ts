import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumberType } from './helpers/normalizers';

/**
 * Page prop of `kol-pagination`
 *
 * Description:
 * The current page, starting at 1. The pagination clamps it to the available pages.
 */
export type PageProp = SimpleProp<'page', number>;
export const pageProp = createPropDefinition<PageProp>('page', 0, normalizeNumberType);
