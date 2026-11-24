import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	inputDateMaxProp,
	inputDateMinProp,
	inputDateTypeProp,
	inputDateValueProp,
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

export const inputDatePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		inputDateMaxProp,
		inputDateMinProp,
		inputDateTypeProp,
		inputDateValueProp,
		readOnlyProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		stepProp,
		suggestionsProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputDateApi = ApiFromConfig<typeof inputDatePropsConfig, { States: FormFieldBaseStates }>;
