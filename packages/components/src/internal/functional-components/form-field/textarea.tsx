import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { getBlockBem } from '../bem-root-node/block-bem';
import type { DefaultInputProps } from './default-input-props';
import { getDefaultInputProps } from './default-input-props';

export type TextAreaFCProps = DefaultInputProps<JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement>> & {
	value?: string;
	touched?: boolean;
	msg?: Stringified<MsgPropType>;
} & {
	[key: `aria-${string}`]: unknown;
	[key: `data-${string}`]: unknown;
};

/**
 * Native `<textarea>` of a form field. The textarea itself is the root of the `kol-textarea` block,
 * so the block classes are set on it directly instead of through `BemRootNodeFC`.
 */
export const TextAreaFC: FC<TextAreaFCProps> = (props) => {
	const { class: classNames, msg, touched, readonly, disabled, required, ariaDescribedBy, hideLabel, label, ...other } = props;

	const textareaProps: JSXBase.TextareaHTMLAttributes<HTMLTextAreaElement> = {
		class: clsx(
			getBlockBem('kol-textarea')({
				disabled: Boolean(disabled),
				required: Boolean(required),
				touched: Boolean(touched),
				readonly: Boolean(readonly),
				...(isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg) as string]: true } : {}),
			}),
			classNames,
		),
		required: required,
		disabled: disabled,
		readonly: readonly,
		...getDefaultInputProps({ ariaDescribedBy, hideLabel, label }),
		...other,
	};

	return <textarea {...textareaProps} />;
};
