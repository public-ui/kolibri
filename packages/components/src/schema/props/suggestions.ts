import type { W3CInputValue } from '../types';
import type { Stringified } from '../types/common';

/* types */
export type SuggestionsPropType = Stringified<W3CInputValue[]>;

/**
 * Suggestions to provide for an input.
 */
export type PropSuggestions = {
	suggestions: SuggestionsPropType;
};
