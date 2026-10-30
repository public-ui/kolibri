import type { OptimumPropType } from '../../schema/props/optimum';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type OptimumProp = SimpleProp<'optimum', OptimumPropType>;
export const optimumProp = createPropDefinition<OptimumProp>('optimum', 0, normalizeNumber);
