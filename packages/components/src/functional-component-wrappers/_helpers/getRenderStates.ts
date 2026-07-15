import { getMsgType, type MsgPropType, type Stringified, type TouchedPropType } from '../../schema';
import { createRelatedUniqueId } from '../../utils/dev.utils';

/**
 * Berechnet in Abhängigkeit des Component-State, wie die
 * aria-describedby-Attributs gesetzt werden sollen.
 *
 * @param state State der Component
 * @returns Render-States
 */
export const getRenderStates = (state: {
	_msg?: Stringified<MsgPropType>;
	_hint?: string;
	_id: string;
	_touched?: TouchedPropType;
	_hideMsg?: boolean;
	_hasCounter?: boolean;
}): {
	hasError: boolean;
	hasHint: boolean;
	ariaDescribedBy: string[];
} => {
	const msg = state._msg;
	const description = typeof msg === 'string' ? msg : msg?._description;
	const type = getMsgType(msg);
	const hasMessage = Boolean(description && description.length > 0);
	const isMessageValidError = type === 'error' && hasMessage;
	const hasError = isMessageValidError && state._touched === true;
	const hasHint = typeof state._hint === 'string' && state._hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasMessage && !state._hideMsg) {
		ariaDescribedBy.push(createRelatedUniqueId(state._id, 'msg'));
	}
	if (hasHint === true) {
		ariaDescribedBy.push(createRelatedUniqueId(state._id, 'hint'));
	}

	if (hasError === true) {
		ariaDescribedBy.push(createRelatedUniqueId(state._id, 'error'));
	}
	return { hasError, hasHint, ariaDescribedBy };
};
