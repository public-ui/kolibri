import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Hide message prop for form fields
 *
 * Description:
 * Hides the validation message of a form field visually. The field still marks itself invalid.
 */
export type HideMsgProp = SimpleProp<'hideMsg', boolean>;
export const hideMsgProp = createPropDefinition<HideMsgProp>('hideMsg', false, normalizeBoolean);
