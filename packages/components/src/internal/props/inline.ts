import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Inline prop
 *
 * Defines whether the component is displayed inline (within text flow) or as a
 * standalone block element with minimum size enforcement.
 *
 * - true (default): renders inline, aligns with surrounding text
 * - false: renders as a standalone block, enforces minimum touch-target size (44px)
 */
export type InlineProp = SimpleProp<'inline', boolean>;

export const inlineProp = createPropDefinition<InlineProp>('inline', true, normalizeBoolean);
