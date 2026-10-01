import type { SelectFCProps } from '../../../internal/functional-components/form-field/select';
import { SelectFC } from '../../../internal/functional-components/form-field/select';

/** Props of the legacy select field; `SelectFC` renders them. */
export type SelectProps = SelectFCProps;

/** Adapter of the legacy select field to `SelectFC`, removed once `kol-select` is migrated. */
const NativeSelectFc = SelectFC;

export default NativeSelectFc;
