import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	inputMaxProp,
	inputMinProp,
	inputNumberValueProp,
	placeholderProp,
	readOnlyProp,
	requiredProp,
	shortKeyProp,
	smartButtonProp,
	stepProp,
	suggestionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputNumberPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		inputMaxProp,
		inputMinProp,
		inputNumberValueProp,
		placeholderProp,
		readOnlyProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		stepProp,
		suggestionsProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputNumberApi = ApiFromConfig<typeof inputNumberPropsConfig, { States: FormFieldBaseStates }>;
