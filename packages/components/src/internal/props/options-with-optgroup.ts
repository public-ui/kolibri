import type { Optgroup, Option, OptionsWithOptgroupPropType, StencilUnknown } from '../../schema';
import { parseJson, validateInputSelectOptions } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type SelectOptionsList = (Option<StencilUnknown> | Optgroup<StencilUnknown>)[];

/**
 * Options prop for `kol-select`
 *
 * Description:
 * Options and optgroups, as an array or as a JSON string when it is passed through an HTML attribute.
 * Every option needs a non-empty string or a number as `label`; one invalid option rejects the whole
 * list. An empty string is rejected as well, because Stencil can pass it for an empty array.
 *
 * The validation is `validateInputSelectOptions` of the schema, which also normalizes each option in
 * place: `disabled` becomes a boolean and a string `label` is trimmed.
 */
export type OptionsWithOptgroupProp = Prop<'options', OptionsWithOptgroupPropType, SelectOptionsList>;

function normalizeOptionsWithOptgroup(value: unknown): SelectOptionsList | never {
	const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (Array.isArray(parsed) && parsed.every((option) => validateInputSelectOptions(option as Option<StencilUnknown>))) {
		return parsed as SelectOptionsList;
	}
	throw new Error('Invalid select options');
}

export const optionsWithOptgroupProp = createPropDefinition<OptionsWithOptgroupProp>('options', [], normalizeOptionsWithOptgroup);
