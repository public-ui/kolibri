import { accessKeyProp } from '../../props/access-key';
import { hasClearButtonProp } from '../../props/has-clear-button';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { placeholderProp } from '../../props/placeholder';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { suggestionsProp } from '../../props/suggestions';
import { stringValueProp } from '../../props/value-string';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const comboboxPropsConfig = {
	required: [...formFieldBasePropsConfig.required, suggestionsProp],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		hasClearButtonProp,
		horizontalIconsProp,
		placeholderProp,
		requiredProp,
		shortKeyProp,
		stringValueProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type ComboboxApi = ApiFromConfig<typeof comboboxPropsConfig, { States: FormFieldBaseStates }>;
