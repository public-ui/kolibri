import {
	accessKeyProp,
	horizontalIconsProp,
	multipleProp,
	optionsWithOptgroupProp,
	requiredProp,
	rowsProp,
	selectValueProp,
	shortKeyProp,
	tabIndexProp,
	variantProp,
} from '../../props';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const selectPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		horizontalIconsProp,
		multipleProp,
		optionsWithOptgroupProp,
		requiredProp,
		rowsProp,
		selectValueProp,
		shortKeyProp,
		tabIndexProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type SelectApi = ApiFromConfig<typeof selectPropsConfig, { States: FormFieldBaseStates }>;
