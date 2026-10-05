import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Checked prop of `kol-input-checkbox`
 *
 * Description:
 * Whether the checkbox is checked. The field writes it back when the user toggles the checkbox.
 */
export type CheckedProp = SimpleProp<'checked', boolean>;
export const checkedProp = createPropDefinition<CheckedProp>('checked', false, normalizeBoolean);
