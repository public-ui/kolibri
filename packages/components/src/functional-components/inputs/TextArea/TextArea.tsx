import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';

export type TextAreaProps = DefaultInputProps<JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement>> & {
	value: string;
	touched?: boolean;
	msg?: Stringified<MsgPropType>;
	ariaDetails?: string;
} & {
	[key: `aria-${string}`]: unknown;
	[key: `data-${string}`]: unknown;
};

const TextAreaFc: FC<TextAreaProps> = (props) => {
	const { class: classNames, msg, touched, readonly, disabled, required, ariaDescribedBy, ariaDetails, hideLabel, label, ...other } = props;

	const stateCssClasses = {
		['kol-textarea--disabled']: Boolean(disabled),
		['kol-textarea--required']: Boolean(required),
		['kol-textarea--touched']: Boolean(touched),
		['kol-textarea--readonly']: Boolean(readonly),
		[`kol-textarea--${getMsgType(msg)}`]: isMsgDefinedAndInputTouched(msg, touched),
	};

	const inputProps: JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement> = {
		class: clsx('kol-textarea', stateCssClasses, classNames),
		required: required,
		disabled: disabled,
		readonly: readonly,
		...getDefaultProps({ ariaDescribedBy, ariaDetails, hideLabel, label }),
		...other,
	};

	return <textarea {...inputProps} />;
};

export default TextAreaFc;
