import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	patternProp,
	placeholderProp,
	readOnlyProp,
	requiredProp,
	shortKeyProp,
	smartButtonProp,
	stringValueProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props email, password and text have in common. The counter props (`hasCounter`, `maxLength`,
 * `maxLengthBehavior`) belong to the `CounterBehavior` and are not part of this config.
 */
export const textInputBasePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		patternProp,
		placeholderProp,
		readOnlyProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		stringValueProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type TextInputBaseApi = ApiFromConfig<typeof textInputBasePropsConfig, { States: FormFieldBaseStates }>;
