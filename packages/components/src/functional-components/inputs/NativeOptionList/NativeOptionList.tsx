import type { SelectOptionListFCProps } from '../../../internal/functional-components/form-field/select';
import { SelectOptionListFC } from '../../../internal/functional-components/form-field/select';

export type NativeOptionListProps = SelectOptionListFCProps;

/** Adapter of the legacy option list to `SelectOptionListFC`, removed once `kol-select` is migrated. */
const NativeOptionListFc = SelectOptionListFC;

export default NativeOptionListFc;
