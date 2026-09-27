import type { MsgPropType, Stringified } from '../../schema';
import { isObject, isString, parseJson } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Message prop for form fields
 *
 * Description:
 * The validation message of a form field, as an object or as a JSON string when it is passed
 * through an HTML attribute. A plain string that is no JSON is kept as it is and rendered as an
 * error message. The message is only rendered once the field is touched.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html
 */
export type MsgProp = SimpleProp<'msg', Stringified<MsgPropType>>;

function normalizeMsg(value: unknown): Stringified<MsgPropType> {
	if (typeof value === 'string') {
		try {
			return parseJson<MsgPropType>(value);
		} catch {
			return value;
		}
	}
	return value as Stringified<MsgPropType>;
}

function validateMsg(value: Stringified<MsgPropType>): boolean {
	if (value === undefined) {
		return true;
	}
	if (typeof value === 'string') {
		return value.length > 0;
	}
	return isObject(value) && isString((value as { _description?: unknown })._description, 1);
}

// The default is `undefined`: a field without a message renders neither the message nor its
// `aria-describedby` reference, and every reader checks the message for truthiness.
export const msgProp = createPropDefinition<MsgProp>('msg', undefined as unknown as Stringified<MsgPropType>, normalizeMsg, validateMsg);
