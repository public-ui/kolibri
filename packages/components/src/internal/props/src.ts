import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type SrcProp = SimpleProp<'src', string>;
export const srcProp = createPropDefinition<SrcProp>(normalizeString, () => true);
