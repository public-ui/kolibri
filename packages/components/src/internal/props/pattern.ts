import type { PatternPropType } from '../../schema/props/pattern';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Pattern prop for text-based inputs
 *
 * Description:
 * A regular expression the value has to match for the native constraint validation.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-pattern
 */
export type PatternProp = SimpleProp<'pattern', PatternPropType>;
// The default is `undefined`: the native attribute is only rendered when a pattern is set.
export const patternProp = createPropDefinition<PatternProp>('pattern', undefined as unknown as string, normalizeString);
