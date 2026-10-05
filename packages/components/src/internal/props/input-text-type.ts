import type { InputTextTypePropType } from '../../schema';
import { inputTextTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

/**
 * Type prop of the text input
 *
 * Description:
 * The native input type: `'text'`, `'search'`, `'url'` or `'tel'`. The search type also shows a
 * clear button.
 */
export type InputTextTypeProp = SimpleProp<'type', InputTextTypePropType>;

function normalizeInputTextType(value: unknown): InputTextTypePropType {
	const str = normalizeString(value);
	if (isEnumOption(str, inputTextTypeOptions)) {
		return str;
	}
	throw new Error(`Invalid input text type: ${str}`);
}

export const inputTextTypeProp = createPropDefinition<InputTextTypeProp>('type', 'text', normalizeInputTextType);
