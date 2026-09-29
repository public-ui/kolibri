import { IconButtonFC, type IconButtonFCProps } from '../../internal/functional-components/form-field/icon-button';

export type IconButtonProps = IconButtonFCProps;

/** Adapter of the legacy form fields to `IconButtonFC`, removed once no legacy field is left. */
const KolIconButtonFc = IconButtonFC;

export default KolIconButtonFc;
