import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether the entries with children of a navigation show their expand and collapse icons and their
 * `aria-expanded`/`aria-controls` state (kol-nav). The children toggle on click either way.
 */
export type CollapsibleProp = SimpleProp<'collapsible', boolean>;
export const collapsibleProp = createPropDefinition<CollapsibleProp>('collapsible', true, normalizeBoolean);
