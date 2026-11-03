import type { HasClearButtonPropType } from '../../schema/props/has-clear-button';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Clear button prop of `kol-combobox` and `kol-single-select`
 *
 * Description:
 * Shows a button that clears the value while the field has one.
 */
export type HasClearButtonProp = SimpleProp<'hasClearButton', HasClearButtonPropType>;
export const hasClearButtonProp = createPropDefinition<HasClearButtonProp>('hasClearButton', true, normalizeBoolean);
