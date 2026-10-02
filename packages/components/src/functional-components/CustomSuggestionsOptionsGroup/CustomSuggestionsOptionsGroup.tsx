import type { CustomSuggestionsOptionsGroupFCProps } from '../../internal/functional-components/form-field/custom-suggestions';
import { CustomSuggestionsOptionsGroupFC } from '../../internal/functional-components/form-field/custom-suggestions';

export type CustomSuggestionsOptionsGroupProps = CustomSuggestionsOptionsGroupFCProps;

/** Adapter of `kol-single-select` to `CustomSuggestionsOptionsGroupFC`, removed once it is migrated. */
const CustomSuggestionsOptionsGroupFc = CustomSuggestionsOptionsGroupFC;
export default CustomSuggestionsOptionsGroupFc;
