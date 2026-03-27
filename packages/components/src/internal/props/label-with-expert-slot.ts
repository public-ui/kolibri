import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelWithExpertSlotProp = SimpleProp<'label', string>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>(normalizeString, () => true);
