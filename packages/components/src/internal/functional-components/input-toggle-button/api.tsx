import { accessKeyProp, checkboxValueProp, checkedProp, iconsInputCheckboxProp, labelAlignProp, requiredProp, shortKeyProp } from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputToggleButtonPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		checkboxValueProp,
		checkedProp,
		iconsInputCheckboxProp,
		labelAlignProp,
		requiredProp,
		shortKeyProp,
	],
} as const satisfies PropsConfigShape;

export type InputToggleButtonApi = ApiFromConfig<typeof inputToggleButtonPropsConfig, { States: FormFieldBaseStates }>;
