import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type AriaExpandedProp = SimpleProp<'ariaExpanded', boolean>;
export const ariaExpandedProp = createPropDefinition<AriaExpandedProp>('ariaExpanded', false, normalizeBoolean);
