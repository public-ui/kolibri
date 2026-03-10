import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelProp = SimpleProp<'label', string>;
export const labelProp = createPropDefinition<LabelProp>(normalizeString, (v) => v.length >= 2 && v.length <= 80, '');
