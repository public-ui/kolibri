import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

export type NumberValueProp = SimpleProp<'value', number>;
export const numberValueProp = createPropDefinition<NumberValueProp>(normalizeNumber, (v) => v >= 0);
