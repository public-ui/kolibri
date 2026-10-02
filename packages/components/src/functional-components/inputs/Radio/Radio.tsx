import { RadioFC, type RadioFCProps } from '../../../internal/functional-components/form-field/radio';

export type RadioProps = RadioFCProps;

/** Adapter of the legacy radio to `RadioFC`, removed once `kol-input-radio` is migrated. */
const RadioFc = RadioFC;

export default RadioFc;
