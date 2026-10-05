import {
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
} from '../../props';
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
