import type { MsgPropType, TouchedPropType } from '../../schema';

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
	const msg = state._msg;
	const description = typeof msg === 'string' ? msg : msg?._description;
	const type = typeof msg === 'string' ? 'error' : msg?._type;
	const hasMessage = Boolean(description && description.length > 0);
	const isMessageValidError = type === 'error' && hasMessage;
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
