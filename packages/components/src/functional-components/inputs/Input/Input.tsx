import { InputFC, type InputFCProps } from '../../../internal/functional-components/form-field/input';

export type InputProps = InputFCProps;

/** Adapter of the legacy form fields to `InputFC`, removed once no legacy field is left. */
const InputFc = InputFC;

export default InputFc;
