import { radioOptionsProp } from '../../props/radio-options';
import { radioOrientationProp } from '../../props/radio-orientation';
import { radioValueProp } from '../../props/radio-value';
import { requiredProp } from '../../props/required';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputRadioPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [...formFieldBasePropsConfig.optional, radioOptionsProp, radioOrientationProp, radioValueProp, requiredProp, variantProp],
} as const satisfies PropsConfigShape;

export type InputRadioApi = ApiFromConfig<typeof inputRadioPropsConfig, { States: FormFieldBaseStates }>;
