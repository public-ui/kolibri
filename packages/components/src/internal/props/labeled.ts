import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Whether the KoliBri logo shows its label (kol-kolibri).
 */
export type LabeledProp = SimpleProp<'labeled', boolean>;
export const labeledProp = createPropDefinition<LabeledProp>('labeled', true, normalizeBoolean);
