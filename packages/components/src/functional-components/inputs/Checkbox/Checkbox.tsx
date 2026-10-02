import { CheckboxFC, type CheckboxFCProps } from '../../../internal/functional-components/form-field/checkbox';

export type CheckboxProps = CheckboxFCProps;

/** Adapter of the legacy checkbox to `CheckboxFC`, removed once `kol-input-checkbox` is migrated. */
const CheckboxFc = CheckboxFC;

export default CheckboxFc;
