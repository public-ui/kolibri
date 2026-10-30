import { accessKeyProp } from '../../props/access-key';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { multipleProp } from '../../props/multiple';
import { optionsWithOptgroupProp } from '../../props/options-with-optgroup';
import { requiredProp } from '../../props/required';
import { rowsProp } from '../../props/rows';
import { selectValueProp } from '../../props/select-value';
import { shortKeyProp } from '../../props/short-key';
import { tabIndexProp } from '../../props/tab-index';
import { variantProp } from '../../props/variant';
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
