import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	inputMaxProp,
	inputMinProp,
	inputNumberValueProp,
	shortKeyProp,
	stepProp,
	suggestionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputRangePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		inputMaxProp,
		inputMinProp,
		inputNumberValueProp,
		shortKeyProp,
		stepProp,
		suggestionsProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputRangeApi = ApiFromConfig<typeof inputRangePropsConfig, { States: FormFieldBaseStates }>;
