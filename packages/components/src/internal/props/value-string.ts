import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Value prop for text-based form fields
 *
 * Description:
 * The current value of a form field whose native control holds a string, e.g. a color or text
 * input.
 */
export type StringValueProp = SimpleProp<'value', string>;
// The default is `undefined` (not `''` like other string props): a field without a preset value
// takes its initial value from the native control (e.g. `#000000` for a color input), which
// requires "not set" to stay distinguishable from an empty value.
export const stringValueProp = createPropDefinition<StringValueProp>('value', undefined as unknown as string, normalizeString);
