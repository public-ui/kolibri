import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { isMsgDefinedAndInputTouched } from '../../../schema';
import KolInputFc, { type InputProps } from '../Input';

export type RadioProps = JSXBase.HTMLAttributes<HTMLLabelElement> & {
	inputProps: InputProps;
};

const InputWrapperFc: FC<InputProps> = ({ class: classNames, ...other }) => {
	return <KolInputFc class={clsx('kol-input-radio__input', classNames)} {...other} type="radio" />;
};

const RadioFc: FC<RadioProps> = ({ class: classNames, inputProps, ...other }) => {
	const cssVariants = {
		['kol-input-radio--checked']: inputProps?.checked,
		['kol-input-radio--disabled']: Boolean(inputProps?.disabled),
		['kol-input-radio--required']: Boolean(inputProps?.required),
		['kol-input-radio--touched']: Boolean(inputProps?.touched),
		[`kol-input-radio--${(typeof inputProps?.msg === 'string' ? 'error' : inputProps?.msg?._type) || 'error'}`]: Boolean(
			isMsgDefinedAndInputTouched(inputProps?.msg, inputProps?.touched),
		),
	};

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label class={clsx('kol-input-radio', cssVariants, classNames)} {...other}>
			<InputWrapperFc {...inputProps} />
		</label>
	);
};

export default RadioFc;
