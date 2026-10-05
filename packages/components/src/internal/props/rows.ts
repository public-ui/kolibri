import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Rows prop of the textarea
 *
 * Description:
 * The number of visible text lines.
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-rows
 */
export type RowsProp = SimpleProp<'rows', number>;
// The default is `undefined`: without a value the native attribute is not rendered. The validation
// also runs on the default, so it accepts `undefined`.
export const rowsProp = createPropDefinition<RowsProp>('rows', undefined as unknown as number, normalizeNumber, (value) => value === undefined || value >= 1);
