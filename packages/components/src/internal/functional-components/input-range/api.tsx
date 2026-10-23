import { accessKeyProp } from '../../props/access-key';
import { autoCompleteProp } from '../../props/auto-complete';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { inputMaxProp } from '../../props/input-max';
import { inputMinProp } from '../../props/input-min';
import { shortKeyProp } from '../../props/short-key';
import { stepProp } from '../../props/step';
import { suggestionsProp } from '../../props/suggestions';
import { inputNumberValueProp } from '../../props/value-input-number';
import { variantProp } from '../../props/variant';
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
