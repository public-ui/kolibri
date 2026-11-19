import {
	accessKeyProp,
	hasClearButtonProp,
	horizontalIconsProp,
	placeholderProp,
	requiredProp,
	rowsProp,
	shortKeyProp,
	singleSelectOptionsProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `_value` is no render prop: the field reads it as it is, any value (`undefined` too) is the
 * selection.
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
		rowsProp,
		shortKeyProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type SingleSelectApi = ApiFromConfig<typeof singleSelectPropsConfig, { States: FormFieldBaseStates }>;
