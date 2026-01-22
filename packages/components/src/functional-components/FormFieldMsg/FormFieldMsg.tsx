import { type FunctionalComponent, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../utils/clsx';

import { type AlertPropType, type IdPropType, type MsgPropType, normalizeMsg, type Stringified } from '../../schema';
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
			hasCloser={false}
			level={0}
			type={message?._type ?? 'error'}
			variant="msg"
			class={clsx('kol-form-field__msg', classNames)}
			{...other}
		>
			{message?._description || undefined}
		</KolAlertFc>
	);
};

export default FormFieldMsgFc;
