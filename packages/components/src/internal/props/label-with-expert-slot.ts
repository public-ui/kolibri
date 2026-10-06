import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Label prop of a component with an expert slot (`@slot expert`): every string is accepted, and the
 * empty string switches the expert slot on. Every other component uses `labelProp`.
 */
export type LabelWithExpertSlotProp = SimpleProp<'label', string>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', normalizeString);
