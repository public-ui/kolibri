import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type HrefProp = SimpleProp<'href', string>;
export const hrefProp = createPropDefinition<HrefProp>(normalizeString, (v) => v.length > 0, '');
