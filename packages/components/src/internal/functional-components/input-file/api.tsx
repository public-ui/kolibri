import { acceptProp } from '../../props/accept';
import { accessKeyProp } from '../../props/access-key';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { multipleProp } from '../../props/multiple';
import { requiredProp } from '../../props/required';
import { shortKeyProp } from '../../props/short-key';
import { smartButtonProp } from '../../props/smart-button';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const inputFilePropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		acceptProp,
		accessKeyProp,
		horizontalIconsProp,
		multipleProp,
		requiredProp,
		shortKeyProp,
		smartButtonProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type InputFileApi = ApiFromConfig<typeof inputFilePropsConfig, { States: FormFieldBaseStates }>;
