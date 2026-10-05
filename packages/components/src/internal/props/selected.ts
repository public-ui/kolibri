import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Index of the selected entry of a list-like component (e.g. the active tab).
 *
 * Only the type is checked here. Clamping into the list and skipping disabled entries depends on
 * the list itself, so the component resolves that after both values are known.
 */
export type SelectedProp = SimpleProp<'selected', number>;
export const selectedProp = createPropDefinition<SelectedProp>('selected', 0, normalizeNumber);
