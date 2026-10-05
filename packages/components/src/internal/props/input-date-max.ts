import type { Iso8601 } from '../../schema';
import type { Prop } from './helpers/factory';
import { createDependentPropDefinition } from './helpers/factory';
import { type InputDateDeps, isValidInputDate, normalizeInputDate } from './helpers/iso-date';

/**
 * Max prop for the date input
 *
 * Description:
 * The latest date or time of `kol-input-date`, rendered as the native `max` attribute. A `Date` is formatted in local time as the ISO 8601 string of the type; a string must
 * start with that format. Both depend on the element's `_type` and `_step`.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-max
 */
export type InputDateMaxProp = Prop<'max', Iso8601 | Date, string>;
// The default is `undefined`: without a bound the attribute is not rendered.
export const inputDateMaxProp = createDependentPropDefinition<InputDateMaxProp, InputDateDeps>(
	'max',
	undefined as unknown as string,
	normalizeInputDate,
	isValidInputDate,
);
