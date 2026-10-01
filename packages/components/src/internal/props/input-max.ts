import type { NumberString } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInputNumber } from './helpers/normalizers';

/**
 * Max prop for the number fields
 *
 * Description:
 * The upper bound of `kol-input-number` and `kol-input-range`, rendered as the native `max` attribute. Unlike
 * `maxProp` of meter and progress it has no default bound.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-max
 */
export type InputMaxProp = Prop<'max', number | NumberString, number>;
// The default is `undefined`: without a bound the attribute is not rendered.
export const inputMaxProp = createPropDefinition<InputMaxProp>('max', undefined as unknown as number, normalizeInputNumber);
