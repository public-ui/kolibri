import {
	accessKeyProp,
	hasClearButtonProp,
	horizontalIconsProp,
	placeholderProp,
	requiredProp,
	shortKeyProp,
	singleSelectOptionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `_value` and `_rows` are no render props: the field reads them as they are, any value of `_value`
 * (`undefined` too) is the selection and `_rows` is the CSS value `--visible-options`.
 */
export const singleSelectPropsConfig = {
	required: [...formFieldBasePropsConfig.required, singleSelectOptionsProp],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		hasClearButtonProp,
		horizontalIconsProp,
		placeholderProp,
		requiredProp,
		shortKeyProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type SingleSelectApi = ApiFromConfig<typeof singleSelectPropsConfig, { States: FormFieldBaseStates }>;
