import type { AlertPropType, HideErrorPropType, IdPropType, MsgPropType } from '@public-ui/schema';
import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';

type FormFieldMsgProps = {
	_alert?: AlertPropType;
	_msg?: MsgPropType;
	_hideError?: HideErrorPropType;
	_id: IdPropType;
};

export const FormFieldMsg: FunctionalComponent<FormFieldMsgProps> = ({ _alert, _msg, _hideError, _id }) => (
	<kol-alert-wc
		/**
		 * This message is read out by screen readers if the input field
		 * refers to the message using the <code>aria-describedby</code>
		 * attribute. It also does this if <code>aria-hidden=true</code>
		 * is set.
		 */
		aria-hidden="true"
		id={`${_id}-error`}
		_alert={_alert}
		_type="error"
		class={{
			error: true,
			'visually-hidden': _hideError === true,
		}}
		{..._msg}
	></kol-alert-wc>
);
