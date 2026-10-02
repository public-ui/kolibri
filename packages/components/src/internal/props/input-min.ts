import type { NumberString } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInputNumber } from './helpers/normalizers';

/**
 * Min prop for the number fields
 *
 * Description:
 * The lower bound of `kol-input-number` and `kol-input-range`, rendered as the native `min` attribute. Unlike
 * `minProp` of meter and progress it has no default bound.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-min
 */
export type InputMinProp = Prop<'min', number | NumberString, number>;
// The default is `undefined`: without a bound the attribute is not rendered.
export const inputMinProp = createPropDefinition<InputMinProp>('min', undefined as unknown as number, normalizeInputNumber);
