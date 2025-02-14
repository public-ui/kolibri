import clsx from 'clsx';
import type { AlertPropType, HideMsgPropType, IdPropType, InternMsgPropType } from '../../schema';
import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';
import KolAlertFc from '../Alert';
import type { JSXBase } from '@stencil/core/internal';

type FormFieldMsgProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	alert?: AlertPropType;
	msg?: InternMsgPropType;
	hideMsg?: HideMsgPropType;
	id: IdPropType;
};

const FormFieldMsgFc: FunctionalComponent<FormFieldMsgProps> = ({ alert, msg, hideMsg, id, class: classNames, ...other }) => (
	<KolAlertFc
		id={`${id}-msg`}
		alert={alert}
		type="error"
		class={clsx('kol-form-field__msg', { 'visually-hidden': hideMsg === true }, classNames)}
		{...msg}
		{...other}
		aria-hidden="true"
	>
		{msg?.description || undefined}
	</KolAlertFc>
);

export default FormFieldMsgFc;
