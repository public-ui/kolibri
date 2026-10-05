import type { InputDateTypePropType } from '../../schema';
import { inputDateTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

/**
 * Type prop of the date input
 *
 * Description:
 * The native input type: `'date'`, `'datetime-local'`, `'month'`, `'time'` or `'week'`. It also
 * decides which ISO 8601 format the value, the minimum and the maximum have.
 */
export type InputDateTypeProp = SimpleProp<'type', InputDateTypePropType>;

function normalizeInputDateType(value: unknown): InputDateTypePropType {
	const str = normalizeString(value);
	if (isEnumOption(str, inputDateTypeOptions)) {
		return str;
	}
	throw new Error(`Invalid input date type: ${str}`);
}

export const inputDateTypeProp = createPropDefinition<InputDateTypeProp>('type', 'date', normalizeInputDateType);
