import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Multiple prop for form fields
 *
 * Description:
 * Allows more than one value, e.g. a comma separated list of email addresses.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-multiple
 */
export type MultipleProp = SimpleProp<'multiple', boolean>;
export const multipleProp = createPropDefinition<MultipleProp>('multiple', false, normalizeBoolean);
