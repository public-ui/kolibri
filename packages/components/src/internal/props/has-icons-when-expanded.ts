import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a navigation shows the entry icons next to the labels, also when it is not compact (kol-nav).
 */
export type HasIconsWhenExpandedProp = SimpleProp<'hasIconsWhenExpanded', boolean>;
export const hasIconsWhenExpandedProp = createPropDefinition<HasIconsWhenExpandedProp>('hasIconsWhenExpanded', false, normalizeBoolean);
