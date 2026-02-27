import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type ValueProp = SimpleProp<'value', number>;
export const valueProp = createPropDefinition<ValueProp>(normalizeNumber, (v) => v >= 0);
