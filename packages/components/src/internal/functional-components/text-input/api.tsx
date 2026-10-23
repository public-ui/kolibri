import { accessKeyProp } from '../../props/access-key';
import { autoCompleteProp } from '../../props/auto-complete';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { patternProp } from '../../props/pattern';
import { placeholderProp } from '../../props/placeholder';
import { readOnlyProp } from '../../props/read-only';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { smartButtonProp } from '../../props/smart-button';
import { stringValueProp } from '../../props/value-string';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props email, password and text have in common. The counter props (`hasCounter`, `maxLength`,
 * `maxLengthBehavior`) belong to the `CounterBehavior` and are not part of this config.
 */
export const textInputBasePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		autoCompleteProp,
		horizontalIconsProp,
		patternProp,
		placeholderProp,
		readOnlyProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		stringValueProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type TextInputBaseApi = ApiFromConfig<typeof textInputBasePropsConfig, { States: FormFieldBaseStates }>;
