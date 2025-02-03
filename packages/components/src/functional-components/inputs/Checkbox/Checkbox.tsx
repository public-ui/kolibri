import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import KolIconFc, { type IconProps } from '../../Icon';
import KolInputFc, { type InputProps } from '../Input';
import { checkHasError } from '../../../schema';

export type CheckboxProps = JSXBase.HTMLAttributes<HTMLLabelElement> & {
	icon: string;
	variant?: 'default' | 'button' | 'switch';
	inputProps: InputProps;
};

const IconWrapperFc: FC<IconProps> = ({ class: classNames, ...other }) => {
	return <KolIconFc class={clsx('kol-checkbox__icon', classNames)} {...other} />;
};

const InputWrapperFc: FC<InputProps> = ({ class: classNames, ...other }) => {
	return <KolInputFc class={clsx('kol-checkbox__input', classNames)} {...other} type="checkbox" />;
};

const CheckboxFc: FC<CheckboxProps> = ({ class: classNames, variant = 'default', icon, inputProps, ...other }) => {
	const showMsg = checkHasError(inputProps?.msg, inputProps?.touched);

	const cssVariants = {
		[`kol-checkbox--variant-${variant}`]: true,
		[`kol-checkbox--checked`]: inputProps?.checked,
		[`kol-checkbox--indeterminate`]: inputProps?.indeterminate,
		['kol-checkbox--disabled']: Boolean(inputProps?.disabled),
		['kol-checkbox--required']: Boolean(inputProps?.required),
		['kol-checkbox--touched']: Boolean(inputProps?.touched),
		[`kol-checkbox--${inputProps?.msg?.type || 'error'}`]: Boolean(showMsg),
	};

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label class={clsx('kol-checkbox', cssVariants, classNames)} {...other}>
			<IconWrapperFc label="" icons={icon} />
			<InputWrapperFc {...inputProps} />
		</label>
	);
};
export default CheckboxFc;
