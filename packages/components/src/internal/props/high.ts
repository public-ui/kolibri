import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type HighProp = SimpleProp<'high', number>;
export const highProp = createPropDefinition<HighProp>('high', 0, normalizeNumber);
