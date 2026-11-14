import {
	accessKeyProp,
	hasClearButtonProp,
	horizontalIconsProp,
	placeholderProp,
	requiredProp,
	shortKeyProp,
	stringValueProp,
	suggestionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const comboboxPropsConfig = {
	required: [...formFieldBasePropsConfig.required, suggestionsProp],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		hasClearButtonProp,
		horizontalIconsProp,
		placeholderProp,
		requiredProp,
		shortKeyProp,
		stringValueProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type ComboboxApi = ApiFromConfig<typeof comboboxPropsConfig, { States: FormFieldBaseStates }>;
