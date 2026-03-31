import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type MinProp = SimpleProp<'min', number>;
export const minProp = createPropDefinition<MinProp>('min', 0, normalizeNumber);
