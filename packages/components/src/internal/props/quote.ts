import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type QuoteProp = SimpleProp<'quote', string>;
export const quoteProp = createPropDefinition<QuoteProp>(normalizeString, () => true, '');
