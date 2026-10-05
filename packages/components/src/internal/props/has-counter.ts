import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Has counter prop for text-based form fields
 *
 * Description:
 * Shows the character counter below the control.
 */
export type HasCounterProp = SimpleProp<'hasCounter', boolean>;
export const hasCounterProp = createPropDefinition<HasCounterProp>('hasCounter', false, normalizeBoolean);
