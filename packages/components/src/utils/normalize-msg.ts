import type { MsgPropType, Stringified } from '../schema';
import { parseJson } from '../schema';

export function normalizeMsg(msg?: Stringified<MsgPropType>): MsgPropType | undefined {
	if (typeof msg === 'string') {
		try {
			return parseJson<MsgPropType>(msg);
		} catch (e) {
			return { _description: msg, _type: 'error' };
		}
	}
	return msg;
}
