import { accessKeyProp } from '../../props/access-key';
import { adjustHeightProp } from '../../props/adjust-height';
import { horizontalIconsProp } from '../../props/horizontal-icons';
import { placeholderProp } from '../../props/placeholder';
import { readOnlyProp } from '../../props/read-only';
import { requiredProp } from '../../props/required';
import { resizeProp } from '../../props/resize';
import { rowsProp } from '../../props/rows';
import { shortKeyProp } from '../../props/short-key';
import { spellCheckProp } from '../../props/spell-check';
import { stringValueProp } from '../../props/value-string';
import { variantProp } from '../../props/variant';
import type { FormFieldBaseStates } from '../form-field/api';
import { formFieldBasePropsConfig } from '../form-field/api';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props of `kol-textarea`. The counter props (`hasCounter`, `maxLength`, `maxLengthBehavior`) belong
 * to the `CounterBehavior` and are not part of this config.
 */
export const textareaPropsConfig = {
	required: [...formFieldBasePropsConfig.required],
	optional: [
		...formFieldBasePropsConfig.optional,
		accessKeyProp,
		adjustHeightProp,
		horizontalIconsProp,
		placeholderProp,
		readOnlyProp,
		requiredProp,
		resizeProp,
		rowsProp,
		shortKeyProp,
		spellCheckProp,
		stringValueProp,
		variantProp,
	],
} as const satisfies PropsConfigShape;

export type TextareaApi = ApiFromConfig<typeof textareaPropsConfig, { States: FormFieldBaseStates }>;
