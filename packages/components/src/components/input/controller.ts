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
	const hasValidMsg = Boolean(state._msg && state._msg._description && state._msg._description?.length > 0);
	const msgType = state._msg?._type ?? 'default';
	const hasHint = typeof state._hint === 'string' && state._hint.length > 0;

	const ariaDescribedBy: string[] = [];

	// Wenn keine Message vorhanden ist, keine field-error ID hinzufügen
	if (!hasValidMsg) {
		if (hasHint === true) {
			ariaDescribedBy.push(`${state._id}-hint`);
		}

		if (state._hasCounter) {
			ariaDescribedBy.push(`${state._id}-counter`);
		}

		return { hasError: false, hasHint, ariaDescribedBy };
	}

	// Für error-Messages: nur anzeigen wenn touched === true
	// Für alle anderen Messages (info, warning, success, default): immer anzeigen
	const showMsg = msgType === 'error' ? state._touched === true : true;
	const hasError = showMsg && msgType === 'error';

	if (showMsg) {
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
