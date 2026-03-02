import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type UnitProp = SimpleProp<'unit', string>;
export const unitProp = createPropDefinition<UnitProp>(normalizeString, (v) => v.length > 0);
