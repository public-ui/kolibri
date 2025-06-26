import type { MsgPropType, TouchedPropType } from '../../schema';
import { convertMsgToInternMsg } from '../../schema/props/msg';

/**
 * Berechnet in Abhängigkeit des Component-State, wie die
 * aria-describedby-Attributs gesetzt werden sollen.
 *
 * @param state State der Component
 * @returns Render-States
 */
export const getRenderStates = (state: {
	_msg?: MsgPropType;
	_hint?: string;
	_id: string;
	_touched?: TouchedPropType;
}): {
	hasMsg: boolean;
	hasHint: boolean;
	ariaDescribedBy: string[];
} => {
	const internMsg = convertMsgToInternMsg(state._msg);
	const isMessageValid = internMsg?.type === 'error';
	const hasMsg = isMessageValid && state._touched === true;
	const hasHint = typeof state._hint === 'string' && state._hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasMsg === true) {
		ariaDescribedBy.push(`${state._id}-error`);
	}
	if (hasHint === true) {
		ariaDescribedBy.push(`${state._id}-hint`);
	}
	return { hasMsg, hasHint, ariaDescribedBy };
};
