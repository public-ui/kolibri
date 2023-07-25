import { Stringified } from '../common';
import { watchJsonArrayString } from '../../utils/prop.validators';
import { Generic } from '@a11y-ui/core';
import { W3CInputValue } from '../w3c';

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
