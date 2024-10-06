import type { MsgPropType } from '@public-ui/components';

export function useFieldMsgBuilder(): { buildFieldMsg: (msg: string) => MsgPropType } {
	return {
		buildFieldMsg: (msg: string): MsgPropType => ({
			_type: 'error',
			_description: msg,
		}),
	};
}
