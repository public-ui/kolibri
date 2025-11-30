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
	_hasCounter?: boolean;
}): {
	hasError: boolean;
	hasHint: boolean;
	ariaDescribedBy: string[];
} => {
	const isMessageValidError = Boolean(state._msg?._type === 'error' && state._msg._description && state._msg._description?.length > 0);
	const hasError = isMessageValidError && state._touched === true;
	const hasHint = typeof state._hint === 'string' && state._hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasError === true) {
		ariaDescribedBy.push(`${state._id}-error`);
	}

	if (hasHint === true) {
		ariaDescribedBy.push(`${state._id}-hint`);
	}

	if (state._hasCounter) {
		ariaDescribedBy.push(`${state._id}-counter`);
	}
	return { hasError, hasHint, ariaDescribedBy };
};
