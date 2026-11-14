import { acceptProp, accessKeyProp, horizontalIconsProp, multipleProp, requiredProp, shortKeyProp, smartButtonProp, variantProp } from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputFilePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		acceptProp,
		accessKeyProp,
		horizontalIconsProp,
		multipleProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputFileApi = ApiFromConfig<typeof inputFilePropsConfig, { States: FormFieldBaseStates }>;
