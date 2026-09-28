import type { SuggestionsPropType, W3CInputValue } from '../../schema';
import { a11yHint, parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Suggestions prop for form fields
 *
 * Description:
 * Values the browser offers for the field through a `<datalist>`, as an array or as a JSON string
 * when it is passed through an HTML attribute. Items are strings or numbers.
 *
 * Accessibility:
 * - Browsers implement datalist suggestions with accessibility issues, so a hint is logged when
 *   suggestions are set.
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element
 */
export type SuggestionsProp = Prop<'suggestions', SuggestionsPropType, W3CInputValue[]>;

function normalizeSuggestions(value: unknown): W3CInputValue[] | never {
	const parsed = typeof value === 'string' ? parseJson<W3CInputValue[]>(value) : value;
	if (Array.isArray(parsed)) {
		return parsed as W3CInputValue[];
	}
	throw new Error(`Invalid suggestions: ${typeof value}`);
}

export const suggestionsProp = createPropDefinition<SuggestionsProp>(
	'suggestions',
	[],
	normalizeSuggestions,
	(value) => value.every((item) => typeof item === 'string' || typeof item === 'number'),
	{
		hints: (_, value) => {
			if (value.length > 0) {
				a11yHint('Property suggestions: Options have accessibility issues in how browsers implemented them and should not be used for now.');
			}
		},
	},
);
