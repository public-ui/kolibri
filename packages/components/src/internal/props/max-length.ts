import type { MaxLengthPropType } from '../../schema/props/max-length';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeNumber } from './helpers/normalizers';

/**
 * Max length prop for text-based form fields
 *
 * Description:
 * The maximum number of characters. With the max length behavior `'hard'` it becomes the native
 * `maxlength` attribute, with `'soft'` it is only announced by the character counter.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-maxlength
 */
export type MaxLengthProp = SimpleProp<'maxLength', MaxLengthPropType>;
// The default is `undefined`: without a maximum there is no limit and no character limit hint. The
// validation also runs on the default, so it accepts `undefined`.
export const maxLengthProp = createPropDefinition<MaxLengthProp>('maxLength', undefined, normalizeNumber, (value) => value >= 0);
