import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AltProp = SimpleProp<'alt', string>;
export const altProp = createPropDefinition<AltProp>(normalizeString, (v) => v.length > 0, '');
