import { accessKeyProp } from '../../props/access-key';
import { checkboxValueProp } from '../../props/checkbox-value';
import { checkedProp } from '../../props/checked';
import { iconsInputCheckboxProp } from '../../props/icons-input-checkbox';
import { indeterminateProp } from '../../props/indeterminate';
import { labelAlignProp } from '../../props/label-align';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { variantInputCheckboxProp } from '../../props/variant-input-checkbox';
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
