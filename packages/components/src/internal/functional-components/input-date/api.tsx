import { accessKeyProp } from '../../props/access-key';
import { autoCompleteProp } from '../../props/auto-complete';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { inputDateMaxProp } from '../../props/input-date-max';
import { inputDateMinProp } from '../../props/input-date-min';
import { inputDateTypeProp } from '../../props/input-date-type';
import { readOnlyProp } from '../../props/read-only';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { smartButtonProp } from '../../props/smart-button';
import { stepProp } from '../../props/step';
import { suggestionsProp } from '../../props/suggestions';
import { inputDateValueProp } from '../../props/value-input-date';
import { variantProp } from '../../props/variant';
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
