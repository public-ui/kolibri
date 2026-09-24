import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Active prop for navigation entries
 *
 * Description:
 * Marks the entry that represents the current position in a navigation structure (e.g. the
 * current page in a tree). Exactly one entry of a navigation should be active; it is the one that
 * is reachable with the Tab key (roving tabindex) and whose ancestors are expanded.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 */
export type ActiveProp = SimpleProp<'active', boolean>;
export const activeProp = createPropDefinition<ActiveProp>('active', false, normalizeBoolean);
