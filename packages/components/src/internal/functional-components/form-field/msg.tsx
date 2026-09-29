import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import type { AlertPropType, IdPropType, MsgPropType, Stringified } from '../../../schema';
import { normalizeMsg } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId, createUniqueId, nonce } from '../../../utils/dev.utils';
import { AlertFC } from '../alert/component';

export type FormFieldMsgFCProps = JSXBase.HTMLAttributes<HTMLElement> & {
	alert?: AlertPropType;
	msg?: Stringified<MsgPropType>;
	id: IdPropType;
};

/** Validation message of a form field, rendered as an inline alert. */
export const FormFieldMsgFC: FC<FormFieldMsgFCProps> = ({ alert, msg, id, class: classNames, ...other }) => {
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
