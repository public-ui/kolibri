import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type SrcsetProp = SimpleProp<'srcset', string>;
export const srcsetProp = createPropDefinition<SrcsetProp>(normalizeString, () => true);
