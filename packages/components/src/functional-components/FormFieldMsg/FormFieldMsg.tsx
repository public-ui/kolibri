import { type FunctionalComponent, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

import { type AlertPropType, type IdPropType, type MsgPropType, type Stringified } from '../../schema';
import { normalizeMsg } from '../../utils/normalize-msg';
import KolAlertFc from '../Alert';

type FormFieldMsgProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	alert?: AlertPropType;
	msg?: Stringified<MsgPropType>;
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
