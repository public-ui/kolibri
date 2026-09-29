import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	shortKeyProp,
	smartButtonProp,
	stringValueProp,
	suggestionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputColorPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		shortKeyProp,
		smartButtonProp,
		stringValueProp,
		suggestionsProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputColorApi = ApiFromConfig<typeof inputColorPropsConfig, { States: FormFieldBaseStates }>;
