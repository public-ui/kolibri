import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaControlsProp = SimpleProp<'ariaControls', string>;
export const ariaControlsProp = createPropDefinition<AriaControlsProp>('ariaControls', '', normalizeString);
