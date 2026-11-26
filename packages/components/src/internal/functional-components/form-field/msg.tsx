import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import { translate } from '../../../i18n';
import type { AlertPropType, IdPropType, LabelLangSegmentsPropType, MsgPropType, Stringified } from '../../../schema';
import { normalizeMsg, trimLabel } from '../../../schema';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { AlertFC } from '../alert/component';

export type FormFieldMsgFCProps = JSXBase.HTMLAttributes<HTMLElement> & {
	alert?: AlertPropType;
	hideMsg?: boolean;
	label?: LabelLangSegmentsPropType;
	msg?: Stringified<MsgPropType>;
	id: IdPropType;
};

/** Validation message of a form field, rendered as an inline alert. */
export const FormFieldMsgFC: FC<FormFieldMsgFCProps> = ({ alert, hideMsg, label, msg, id, class: classNames, ...other }) => {
	const message = normalizeMsg(msg);
	const msgAddon = translate('kol-form-field-error-addon', { placeholders: { label: trimLabel(label) } });

	return (
		<AlertFC
			alert={hideMsg ? false : (message?._alert ?? alert === true)}
			class={clsx('kol-form-field__msg', hideMsg && 'visually-hidden', classNames)}
			closerAriaDescriptionId={createRelatedUniqueId(id, 'msg-closer-description')}
			handleCloserClick={() => undefined}
			hasCloser={false}
			headingId={createRelatedUniqueId(id, 'msg-heading')}
			id={createRelatedUniqueId(id, 'msg')}
			label=""
			level={0}
			refCloserButton={() => undefined}
			refCloserTooltip={() => undefined}
			type={message?._type ?? 'error'}
			variant="msg"
			{...other}
		>
			{(message?._alert ?? alert === true) ? <span class="visually-hidden">{msgAddon}</span> : ''}
			{message?._description || undefined}
		</AlertFC>
	);
};
