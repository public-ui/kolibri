import { InputContainerFC, type InputContainerFCProps } from '../../internal/functional-components/form-field/input-container';

export type InputContainerProps = InputContainerFCProps;

/** Adapter of the legacy form fields to `InputContainerFC`, removed once no legacy field is left. */
const KolInputContainerFc = InputContainerFC;

export default KolInputContainerFc;
