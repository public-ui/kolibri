import type { HasIconsWhenExpandedPropType } from '../../schema/props/has-icons-when-expanded';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether a navigation shows the entry icons next to the labels, also when it is not compact (kol-nav).
 */
export type HasIconsWhenExpandedProp = SimpleProp<'hasIconsWhenExpanded', HasIconsWhenExpandedPropType>;
export const hasIconsWhenExpandedProp = createPropDefinition<HasIconsWhenExpandedProp>('hasIconsWhenExpanded', false, normalizeBoolean);
