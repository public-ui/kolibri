import { TextAreaFC, type TextAreaFCProps } from '../../../internal/functional-components/form-field/textarea';

export type TextAreaProps = TextAreaFCProps & {
	value: string;
};

/** Adapter of the legacy textarea to `TextAreaFC`, removed once `kol-textarea` is migrated. */
const TextAreaFc = TextAreaFC;

export default TextAreaFc;
