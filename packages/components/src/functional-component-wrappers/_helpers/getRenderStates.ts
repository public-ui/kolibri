import { getFormFieldAria } from '../../internal/functional-components/form-field/aria';
import { type MsgPropType, type Stringified, type TouchedPropType } from '../../schema';

/**
 * Computes `aria-invalid` and `aria-describedby` of a legacy form field from its state. Delegates to
 * `getFormFieldAria`, which the migrated form fields use directly.
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
} => getFormFieldAria({ id: state._id, msg: state._msg, hint: state._hint, touched: state._touched, hideMsg: state._hideMsg });
