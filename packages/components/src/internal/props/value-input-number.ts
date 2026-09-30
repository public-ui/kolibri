import type { NumberString } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInputNumber } from './helpers/normalizers';

/**
 * Value prop for the number fields
 *
 * Description:
 * The current value of `kol-input-number` and `kol-input-range`.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
 */
export type InputNumberValueProp = Prop<'value', number | NumberString | null, number>;
// The default is `undefined`: an empty field has no value, which must stay distinguishable from `0`.
export const inputNumberValueProp = createPropDefinition<InputNumberValueProp>('value', undefined as unknown as number, normalizeInputNumber);
