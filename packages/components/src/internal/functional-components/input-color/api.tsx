import { accessKeyProp } from '../../props/access-key';
import { autoCompleteProp } from '../../props/auto-complete';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { shortKeyProp } from '../../props/short-key';
import { smartButtonProp } from '../../props/smart-button';
import { suggestionsProp } from '../../props/suggestions';
import { stringValueProp } from '../../props/value-string';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputColorPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		shortKeyProp,
		smartButtonProp,
		stringValueProp,
		suggestionsProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputColorApi = ApiFromConfig<typeof inputColorPropsConfig, { States: FormFieldBaseStates }>;
