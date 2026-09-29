import { InputAdornmentFC, type InputAdornmentFCProps } from '../../internal/functional-components/form-field/input-container';

export type InputAdornmentProps = InputAdornmentFCProps;

/** Adapter of the legacy form fields to `InputAdornmentFC`, removed once no legacy field is left. */
const InputAdornment = InputAdornmentFC;

export default InputAdornment;
