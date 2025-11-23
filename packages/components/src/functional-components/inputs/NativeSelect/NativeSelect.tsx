import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { checkHasMsg, type MsgPropType, type Stringified } from '../../../schema';
import { getDefaultProps } from '../_helpers/getDefaultProps';
import type { DefaultInputProps } from '../_types';
import NativeOptionListFc, { type NativeOptionListProps } from '../NativeOptionList';

type SelectAttributes = JSXBase.SelectHTMLAttributes<HTMLSelectElement>;

export type SelectProps = DefaultInputProps<SelectAttributes> &
	NativeOptionListProps & {
		touched?: boolean;
		msg?: Stringified<MsgPropType>;
	} & {
		[key: `aria-${string}`]: unknown;
		[key: `data-${string}`]: unknown;
	};

const NativeSelectFc: FC<SelectProps> = (props) => {
	const {
		class: classNames,
		msg,
		touched,
		disabled,
		required,
		options,
		value,
		OptionProps,
		OptionGroupProps,
		ariaDescribedBy,
		hideLabel,
		label,
		...other
	} = props;

	const showMsg = checkHasMsg(msg, touched);
	const msgType = typeof msg === 'string' ? 'error' : msg?._type;

	const stateCssClasses = {
		['kol-select--disabled']: Boolean(disabled),
		['kol-select--required']: Boolean(required),
		['kol-select--touched']: Boolean(touched),
		[`kol-select--${msgType || 'error'}`]: showMsg,
	};

	const inputProps: SelectAttributes = {
		class: clsx('kol-select', stateCssClasses, classNames),
		required: required,
		disabled: disabled,
		...getDefaultProps({ ariaDescribedBy, hideLabel, label }),
		...other,
	};

	return (
		<select {...inputProps}>
			<NativeOptionListFc baseClassName="kol-select" options={options} value={value} OptionGroupProps={OptionGroupProps} OptionProps={OptionProps} />
		</select>
	);
};

export default NativeSelectFc;
