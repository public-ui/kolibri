import type { NumberString } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInputNumber } from './helpers/normalizers';

/**
 * Step prop for the number fields
 *
 * Description:
 * The granularity of the value of `kol-input-number` and `kol-input-range`, rendered as the native `step`
 * attribute.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-step
 */
export type StepProp = Prop<'step', number | NumberString, number>;
// The default is `undefined`: without a step the attribute is not rendered and the browser uses 1.
export const stepProp = createPropDefinition<StepProp>('step', undefined as unknown as number, normalizeInputNumber);
