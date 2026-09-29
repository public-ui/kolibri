import type { MsgPropType, Stringified } from '../../../schema';
import { getMsgType } from '../../../schema';
import { createRelatedUniqueId } from '../../../utils/dev.utils';

type FormFieldAriaInput = {
	id: string;
	msg?: Stringified<MsgPropType>;
	hint?: string;
	touched?: boolean;
	hideMsg?: boolean;
};

type FormFieldAria = {
	/** Whether the field is invalid: an error message is set and the field is touched. */
	hasError: boolean;
	hasHint: boolean;
	/** IDs of the message and the hint, referenced by the input's `aria-describedby`. */
	ariaDescribedBy: string[];
};

/**
 * Derives `aria-invalid` and `aria-describedby` of a form field input.
 *
 * Known quirks, pinned by the snapshots (#11035): the message is referenced as soon as it is set,
 * although it is only rendered once the field is touched, and `hasError` ignores `hideMsg`.
 */
export const getFormFieldAria = ({ id, msg, hint, touched, hideMsg }: FormFieldAriaInput): FormFieldAria => {
	const description = typeof msg === 'string' ? msg : msg?._description;
	const hasMessage = Boolean(description && description.length > 0);
	const hasError = getMsgType(msg) === 'error' && hasMessage && touched === true;
	const hasHint = typeof hint === 'string' && hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasMessage && !hideMsg) {
		ariaDescribedBy.push(createRelatedUniqueId(id, 'msg'));
	}
	if (hasHint) {
		ariaDescribedBy.push(createRelatedUniqueId(id, 'hint'));
	}
	return { hasError, hasHint, ariaDescribedBy };
};
