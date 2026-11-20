import { multipleProp, suggestionsProp } from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import { textInputBasePropsConfig } from '../text-input/api';

export const inputEmailPropsConfig = {
	required: [...textInputBasePropsConfig.required],
	optional: [...textInputBasePropsConfig.optional, multipleProp, suggestionsProp],
} as const satisfies PropsConfigShape;

export type InputEmailApi = ApiFromConfig<typeof inputEmailPropsConfig, { States: FormFieldBaseStates }>;
