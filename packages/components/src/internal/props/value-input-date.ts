import type { Iso8601 } from '../../schema';
import type { Prop } from './helpers/factory';
import { createDependentPropDefinition } from './helpers/factory';
import { type InputDateDeps, isValidInputDate, normalizeInputDate } from './helpers/iso-date';

/**
 * Value prop for the date input
 *
 * Description:
 * The current value of `kol-input-date`. A `Date` is formatted in local time as the ISO 8601 string of the type; a string must
 * start with that format. Both depend on the element's `_type` and `_step`.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)
 */
export type InputDateValueProp = Prop<'value', Iso8601 | Date | null, string>;
// The default is `undefined`: an empty field has no value.
export const inputDateValueProp = createDependentPropDefinition<InputDateValueProp, InputDateDeps>(
	'value',
	undefined as unknown as string,
	normalizeInputDate,
	isValidInputDate,
);
