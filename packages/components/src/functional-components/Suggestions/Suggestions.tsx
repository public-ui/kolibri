import { SuggestionsFC, type SuggestionsFCProps } from '../../internal/functional-components/form-field/suggestions';

export type SuggestionsProps = SuggestionsFCProps;

/** Adapter of the legacy form fields to `SuggestionsFC`, removed once no legacy field is left. */
const SuggestionsFc = SuggestionsFC;

export default SuggestionsFc;
