import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Boundary count prop of `kol-pagination`
 *
 * Description:
 * The number of pages shown next to the first and the last page. A negative value counts as 0.
 */
export type BoundaryCountProp = SimpleProp<'boundaryCount', number>;
export const boundaryCountProp = createPropDefinition<BoundaryCountProp>('boundaryCount', 1, (value) => Math.max(0, value as number));
