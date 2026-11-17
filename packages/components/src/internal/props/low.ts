import type { LowPropType } from '../../schema/props/low';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type LowProp = SimpleProp<'low', LowPropType>;
export const lowProp = createPropDefinition<LowProp>('low', 0, normalizeNumber);
