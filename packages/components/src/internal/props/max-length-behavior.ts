import type { MaxLengthBehaviorPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

const MAX_LENGTH_BEHAVIOR_OPTIONS: readonly MaxLengthBehaviorPropType[] = ['hard', 'soft'];

/**
 * Max length behavior prop for text-based form fields
 *
 * Description:
 * `'hard'` prevents longer input through the native `maxlength` attribute, `'soft'` allows it and
 * lets the character counter announce the exceeded limit.
 */
export type MaxLengthBehaviorProp = SimpleProp<'maxLengthBehavior', MaxLengthBehaviorPropType>;

function normalizeMaxLengthBehavior(value: unknown): MaxLengthBehaviorPropType {
	const str = normalizeString(value);
	if (isEnumOption(str, MAX_LENGTH_BEHAVIOR_OPTIONS)) {
		return str;
	}
	throw new Error(`Invalid max length behavior: ${str}`);
}

export const maxLengthBehaviorProp = createPropDefinition<MaxLengthBehaviorProp>('maxLengthBehavior', 'hard', normalizeMaxLengthBehavior);
