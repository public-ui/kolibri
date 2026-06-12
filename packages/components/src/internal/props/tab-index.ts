import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

export type TabIndexProp = SimpleProp<'tabIndex', number>;
export const tabIndexProp = createPropDefinition<TabIndexProp>('tabIndex', 0, normalizeInteger);
