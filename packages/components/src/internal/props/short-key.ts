import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type ShortKeyProp = SimpleProp<'shortKey', string>;
export const shortKeyProp = createPropDefinition<ShortKeyProp>('shortKey', '', normalizeString);
