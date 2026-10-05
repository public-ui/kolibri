import { inputTextTypeProp, spellCheckProp, suggestionsProp } from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import { textInputBasePropsConfig } from '../text-input/api';

export const inputTextPropsConfig = {
	required: [...textInputBasePropsConfig.required],
	optional: [...textInputBasePropsConfig.optional, inputTextTypeProp, spellCheckProp, suggestionsProp],
} as const satisfies PropsConfigShape;

export type InputTextApi = ApiFromConfig<typeof inputTextPropsConfig, { States: FormFieldBaseStates }>;
