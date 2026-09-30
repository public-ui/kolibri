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
 * `aria-describedby` only references the message once the field is touched, matching what
 * `FormField` renders. When `hideMsg` is set, the message is kept in the DOM as visually hidden,
 * so it remains referenced by `aria-describedby`.
 */
export const getFormFieldAria = ({ id, msg, hint, touched }: FormFieldAriaInput): FormFieldAria => {
	const description = typeof msg === 'string' ? msg : msg?._description;
	const hasMessage = Boolean(description && description.length > 0);
	const hasError = getMsgType(msg) === 'error' && hasMessage && touched === true;
	const hasHint = typeof hint === 'string' && hint.length > 0;

	const ariaDescribedBy: string[] = [];
	if (hasMessage && touched === true) {
		ariaDescribedBy.push(createRelatedUniqueId(id, 'msg'));
	}
	if (hasHint) {
		ariaDescribedBy.push(createRelatedUniqueId(id, 'hint'));
	}
	return { hasError, hasHint, ariaDescribedBy };
};
