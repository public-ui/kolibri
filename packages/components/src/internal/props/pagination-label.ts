import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Label prop of `kol-pagination`
 *
 * Description:
 * The accessible name of the navigation. Unlike `labelProp`, any string is accepted. Without a value
 * the pagination uses the translation `kol-pagination`.
 */
export type PaginationLabelProp = SimpleProp<'label', string>;
export const paginationLabelProp = createPropDefinition<PaginationLabelProp>('label', '', normalizeString);
