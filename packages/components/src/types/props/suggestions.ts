import { Stringified } from '../common';
import { watchJsonArrayString } from '../../utils/prop.validators';
import { Generic } from '@a11y-ui/core';

export type SuggestionsPropType = Stringified<string[]>;

/**
 * Suggestions to provide for an input.
 */
export type PropSuggestions = {
	suggestions: SuggestionsPropType;
};

/* validator */
export const validateSuggestions = (component: Generic.Element.Component, value?: SuggestionsPropType): void => {
	watchJsonArrayString(component, '_suggestions', (item: string) => typeof item === 'string', value);
};
