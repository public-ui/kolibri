import type { RowsPropType } from '../../schema/props/rows';
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
export type RowsProp = SimpleProp<'rows', RowsPropType>;
// Without a value ('not set', no default) the native attribute is not rendered.
export const rowsProp = createPropDefinition<RowsProp>('rows', undefined, normalizeNumber, (value) => value >= 1);
