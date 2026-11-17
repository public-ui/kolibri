import type { HighPropType } from '../../schema/props/high';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type HighProp = SimpleProp<'high', HighPropType>;
export const highProp = createPropDefinition<HighProp>('high', 0, normalizeNumber);
