import { Generic } from '@a11y-ui/core';

import { watchJsonArrayString } from '../../utils/prop.validators';
import { Stringified } from '../common';
import { W3CInputValue } from '../w3c';

/* types */
export type SuggestionsPropType = Stringified<W3CInputValue[]>;

/**
 * Suggestions to provide for an input.
 */
export type PropSuggestions = {
	suggestions: SuggestionsPropType;
};

/* validator */
export const validateSuggestions = (component: Generic.Element.Component, value?: SuggestionsPropType): void => {
	watchJsonArrayString(component, '_suggestions', (item: W3CInputValue) => typeof item === 'string' || typeof item === 'number', value);
};
