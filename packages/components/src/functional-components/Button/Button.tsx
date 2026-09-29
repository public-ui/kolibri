import { WcButtonFC, type WcButtonFCProps } from '../../internal/functional-components/form-field/icon-button';

export type ButtonProps = WcButtonFCProps;

/** Adapter of the legacy form fields to `WcButtonFC`, removed once no legacy field is left. */
const KolButtonFc = WcButtonFC;

export default KolButtonFc;
