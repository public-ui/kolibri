import type { CustomSuggestionsOptionFCProps } from '../../internal/functional-components/form-field/custom-suggestions';
import { CustomSuggestionsOptionFC } from '../../internal/functional-components/form-field/custom-suggestions';

export type CustomSuggestionsProps = CustomSuggestionsOptionFCProps;

/** Adapter of `kol-single-select` to `CustomSuggestionsOptionFC`, removed once it is migrated. */
const CustomSuggestionsOptionFc = CustomSuggestionsOptionFC;
export default CustomSuggestionsOptionFc;
