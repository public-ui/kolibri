import { visibilityToggleProp } from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import { textInputBasePropsConfig } from '../text-input/api';

export const inputPasswordPropsConfig = {
	required: [...textInputBasePropsConfig.required],
	optional: [...textInputBasePropsConfig.optional, visibilityToggleProp],
} as const satisfies PropsConfigShape;

export type InputPasswordStates = FormFieldBaseStates & {
	/** Whether the visibility toggle shows the password as plain text. */
	passwordVisible: boolean;
};

export type InputPasswordApi = ApiFromConfig<typeof inputPasswordPropsConfig, { States: InputPasswordStates }>;
