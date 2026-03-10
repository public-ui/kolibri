import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type MaxProp = SimpleProp<'max', number>;
export const maxProp = createPropDefinition<MaxProp>(normalizeNumber, (v) => v > 0, 100);
