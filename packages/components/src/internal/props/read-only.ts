import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Read-only prop for form fields
 *
 * Description:
 * Makes the value of a form field unchangeable while it stays focusable and is still submitted.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly
 */
export type ReadOnlyProp = SimpleProp<'readOnly', boolean>;
export const readOnlyProp = createPropDefinition<ReadOnlyProp>('readOnly', false, normalizeBoolean);
