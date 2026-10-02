import type { SelectOptionFCProps } from '../../../internal/functional-components/form-field/select';
import { SelectOptionFC } from '../../../internal/functional-components/form-field/select';

export type NativeOptionProps = SelectOptionFCProps;

/** Adapter of the legacy option to `SelectOptionFC`, removed once `kol-select` is migrated. */
const NativeOptionFc = SelectOptionFC;

export default NativeOptionFc;
