import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Touched prop for form fields
 *
 * Description:
 * Whether the user has already visited the field. Validation messages are only rendered for a
 * touched field; the field sets the prop itself once the focus leaves it.
 */
export type TouchedProp = SimpleProp<'touched', boolean>;
export const touchedProp = createPropDefinition<TouchedProp>('touched', false, normalizeBoolean);
