import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Sibling count prop of `kol-pagination`
 *
 * Description:
 * The number of pages shown on each side of the current page. A negative value counts as 0.
 */
export type SiblingCountProp = SimpleProp<'siblingCount', number>;
export const siblingCountProp = createPropDefinition<SiblingCountProp>('siblingCount', 1, (value) => Math.max(0, value as number));
