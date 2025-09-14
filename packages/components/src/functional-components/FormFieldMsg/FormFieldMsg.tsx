import clsx from 'clsx';
import type { AlertPropType, IdPropType, MsgPropType } from '../../schema';
import type { FunctionalComponent } from '@stencil/core';
import { h } from '@stencil/core';
import KolAlertFc from '../Alert';
import type { JSXBase } from '@stencil/core/internal';
import { normalizeMsg } from '../../utils/normalize-msg';

type FormFieldMsgProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	alert?: AlertPropType;
	msg?: MsgPropType;
	id: IdPropType;
};

const FormFieldMsgFc: FunctionalComponent<FormFieldMsgProps> = ({ alert, msg, id, class: classNames, ...other }) => {
	const message = normalizeMsg(msg);

	return (
		<KolAlertFc
			id={`${id}-msg`}
			alert={message?._alert ?? alert}
			hasCloser={message?._hasCloser}
			level={message?._level}
			type={message?._type}
			variant="msg"
			class={clsx('kol-form-field__msg', classNames)}
			{...other}
		>
			{message?._description || undefined}
		</KolAlertFc>
	);
};

export default FormFieldMsgFc;
