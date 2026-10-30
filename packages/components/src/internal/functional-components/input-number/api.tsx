import { accessKeyProp } from '../../props/access-key';
import { autoCompleteProp } from '../../props/auto-complete';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { inputMaxProp } from '../../props/input-max';
import { inputMinProp } from '../../props/input-min';
import { placeholderProp } from '../../props/placeholder';
import { readOnlyProp } from '../../props/read-only';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { smartButtonProp } from '../../props/smart-button';
import { stepProp } from '../../props/step';
import { suggestionsProp } from '../../props/suggestions';
import { inputNumberValueProp } from '../../props/value-input-number';
import { variantProp } from '../../props/variant';
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
