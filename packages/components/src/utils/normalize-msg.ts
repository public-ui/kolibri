import type { MsgPropType, NormalizedMsg } from '../schema';

export function normalizeMsg(msg?: MsgPropType): NormalizedMsg | undefined {
	return typeof msg === 'string' ? { _description: msg, _type: 'error' } : msg;
}
