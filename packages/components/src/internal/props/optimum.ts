import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type OptimumProp = SimpleProp<'optimum', number>;
export const optimumProp = createPropDefinition<OptimumProp>('optimum', 0, normalizeNumber);
