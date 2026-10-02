import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Indeterminate prop of `kol-input-checkbox`
 *
 * Description:
 * Shows the mixed state, e.g. for a "select all" checkbox of a partial selection. It does not change
 * `checked`; the field clears it when the user toggles the checkbox.
 */
export type IndeterminateProp = SimpleProp<'indeterminate', boolean>;
export const indeterminateProp = createPropDefinition<IndeterminateProp>('indeterminate', false, normalizeBoolean);
