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
	hasError: boolean;
	hasHint: boolean;
	ariaDescribedBy: string[];
} => {
	const internMsg = convertMsgToInternMsg(state._msg);
	const hasMessage = Boolean(internMsg?.description && internMsg.description.length > 0);
	const isMessageValidError = internMsg?.type === 'error' && hasMessage;
	const hasError = isMessageValidError && state._touched === true;
	const hasHint = typeof state._hint === 'string' && state._hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasMessage) {
		ariaDescribedBy.push(`${state._id}-msg`);
	}
	if (hasHint) {
		ariaDescribedBy.push(`${state._id}-hint`);
	}
	return { hasError, hasHint, ariaDescribedBy };
};
