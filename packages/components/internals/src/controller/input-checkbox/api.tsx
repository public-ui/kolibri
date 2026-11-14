import {
	accessKeyProp,
	checkboxValueProp,
	checkedProp,
	iconsInputCheckboxProp,
	indeterminateProp,
	labelAlignProp,
	requiredProp,
	shortKeyProp,
	variantInputCheckboxProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputCheckboxPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		checkboxValueProp,
		checkedProp,
		iconsInputCheckboxProp,
		indeterminateProp,
		labelAlignProp,
		requiredProp,
		shortKeyProp,
		variantInputCheckboxProp,
	],
} as const satisfies PropsConfigShape;

export type InputCheckboxApi = ApiFromConfig<typeof inputCheckboxPropsConfig, { States: FormFieldBaseStates }>;
