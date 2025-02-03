import { h, Fragment, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import clsx from 'clsx';
import { checkHasError, type InternMsgPropType } from '../../../schema';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';

export type InputProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	value?: string | number | string[];
	touched?: boolean;
	suggestions?: VNode;
	spellcheck?: boolean;
	msg?: InternMsgPropType;
} & {
	[key: `data-${string}`]: unknown;
	[key: `aria-${string}`]: unknown;
};

const InputFc: FC<InputProps> = (props) => {
	const { class: classNames, msg, required, disabled, touched, readonly, ariaDescribedBy, hideLabel, label, suggestions, value, ...other } = props;

	const showMsg = checkHasError(msg, touched);

	const stateCssClasses = {
		['kol-input--disabled']: Boolean(disabled),
		['kol-input--required']: Boolean(required),
		['kol-input--touched']: Boolean(touched),
		['kol-input--readonly']: Boolean(readonly),
		[`kol-input--${msg?.type || 'error'}`]: showMsg,
	};

	const inputProps: JSXBase.InputHTMLAttributes<HTMLInputElement> = {
		class: clsx('kol-input', stateCssClasses, classNames),
		required: required,
		disabled: disabled,
		readonly: readonly,
		type: 'text',
		list: suggestions ? `${other.id}-list` : undefined,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
		...other,
	};

	return (
		<>
			<input {...inputProps} value={value} />
			{suggestions}
		</>
	);
};

export default InputFc;
