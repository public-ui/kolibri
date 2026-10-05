import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Adjust height prop of the textarea
 *
 * Description:
 * Grows the textarea with its content.
 */
export type AdjustHeightProp = SimpleProp<'adjustHeight', boolean>;
export const adjustHeightProp = createPropDefinition<AdjustHeightProp>('adjustHeight', false, normalizeBoolean);
