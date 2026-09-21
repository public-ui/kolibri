import { type FunctionalComponent, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId, createUniqueId, nonce } from '../../utils/dev.utils';

import { AlertFC } from '../../internal/functional-components/alert/component';
import { type AlertPropType, type IdPropType, type MsgPropType, normalizeMsg, type Stringified } from '../../schema';

type FormFieldMsgProps = JSXBase.HTMLAttributes<HTMLElement> & {
	alert?: AlertPropType;
	msg?: Stringified<MsgPropType>;
	id: IdPropType;
};

const FormFieldMsgFc: FunctionalComponent<FormFieldMsgProps> = ({ alert, msg, id, class: classNames, ...other }) => {
	const message = normalizeMsg(msg);

	return (
		<AlertFC
			alert={message?._alert ?? alert === true}
			class={clsx('kol-form-field__msg', classNames)}
			closerAriaDescriptionId={nonce()}
			handleCloserClick={() => undefined}
			hasCloser={false}
			headingId={createUniqueId('alert-heading')}
			id={createRelatedUniqueId(id, 'msg')}
			label=""
			level={0}
			refCloserButton={() => undefined}
			refCloserTooltip={() => undefined}
			type={message?._type ?? 'error'}
			variant="msg"
			{...other}
		>
			{message?._description || undefined}
		</AlertFC>
	);
};

export default FormFieldMsgFc;
