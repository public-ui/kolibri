import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import KolInputFc, { type InputProps } from '../Input';
import { checkHasMsg } from '../../../schema';

export type RadioProps = JSXBase.HTMLAttributes<HTMLLabelElement> & {
	inputProps: InputProps;
};

const InputWrapperFc: FC<InputProps> = ({ class: classNames, ...other }) => {
	return <KolInputFc class={clsx('kol-input-radio__input', classNames)} {...other} type="radio" />;
};

const RadioFc: FC<RadioProps> = ({ class: classNames, inputProps, ...other }) => {
	const showMsg = checkHasMsg(inputProps?.msg, inputProps?.touched);

	const cssVariants = {
		['kol-input-radio--checked']: inputProps?.checked,
		['kol-input-radio--disabled']: Boolean(inputProps?.disabled),
		['kol-input-radio--required']: Boolean(inputProps?.required),
		['kol-input-radio--touched']: Boolean(inputProps?.touched),
		[`kol-input-radio--${inputProps?.msg?.type || 'error'}`]: Boolean(showMsg),
	};

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label class={clsx('kol-input-radio', cssVariants, classNames)} {...other}>
			<InputWrapperFc {...inputProps} />
		</label>
	);
};

export default RadioFc;
