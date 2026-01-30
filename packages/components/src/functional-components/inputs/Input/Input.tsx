/* eslint-disable no-console */
import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase, VNode } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched, type MsgPropType, type Stringified } from '../../../schema';
import clsx from '../../../utils/clsx';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';

export type InputProps = DefaultInputProps<JSXBase.InputHTMLAttributes<HTMLInputElement>> & {
	msg?: Stringified<MsgPropType>;
	touched?: boolean;
	spellcheck?: boolean;
	suggestions?: VNode;
	value?: string | number | string[];
} & {
	[key: `aria-${string}`]: unknown;
	[key: `data-${string}`]: unknown;
};

const InputFc: FC<InputProps> = (props) => {
	const { class: classNames, msg, required, disabled, touched, readonly, ariaDescribedBy, hideLabel, label, suggestions, value, ...other } = props;

	const stateCssClasses = {
		['kol-input--disabled']: Boolean(disabled),
		['kol-input--required']: Boolean(required),
		['kol-input--touched']: Boolean(touched),
		['kol-input--readonly']: Boolean(readonly),
		[`kol-input--${getMsgType(msg)}`]: isMsgDefinedAndInputTouched(msg, touched),
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
