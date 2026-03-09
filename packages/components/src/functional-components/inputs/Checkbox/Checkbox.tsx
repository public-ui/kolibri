import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { IconFC } from '../../../internal/functional-components/icon/component';
import { getMsgType, isMsgDefinedAndInputTouched } from '../../../schema';
import clsx from '../../../utils/clsx';
import KolInputFc, { type InputProps } from '../Input';

export type CheckboxProps = JSXBase.HTMLAttributes<HTMLLabelElement> & {
	icon: string;
	variant?: 'default' | 'button' | 'switch';
	inputProps: InputProps;
};

const CheckboxFc: FC<CheckboxProps> = ({ class: classNames, variant = 'default', icon, inputProps, ...other }) => {
	const { class: inputClass, ...restInputProps } = inputProps;
	const cssVariants = {
		[`kol-checkbox--variant-${variant}`]: true,
		[`kol-checkbox--checked`]: inputProps?.checked,
		[`kol-checkbox--indeterminate`]: inputProps?.indeterminate,
		['kol-checkbox--disabled']: Boolean(inputProps?.disabled),
		['kol-checkbox--required']: Boolean(inputProps?.required),
		['kol-checkbox--touched']: Boolean(inputProps?.touched),
		[`kol-checkbox--${getMsgType(inputProps?.msg)}`]: Boolean(isMsgDefinedAndInputTouched(inputProps?.msg, inputProps?.touched)),
	};

	return (
		<label class={clsx('kol-checkbox', cssVariants, classNames)} {...other}>
			<IconFC label="" icons={icon} class={clsx('kol-checkbox__icon')} />
			<KolInputFc class={clsx('kol-checkbox__input', inputClass as string)} {...restInputProps} type="checkbox" />
		</label>
	);
};
export default CheckboxFc;
