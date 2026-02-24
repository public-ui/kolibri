import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { getMsgType, isMsgDefinedAndInputTouched } from '../../../schema';
import clsx from '../../../utils/clsx';
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
		[`kol-input-radio--${getMsgType(inputProps?.msg)}`]: Boolean(isMsgDefinedAndInputTouched(inputProps?.msg, inputProps?.touched)),
	};

	return (
		<label class={clsx('kol-input-radio', cssVariants, classNames)} {...other}>
			<InputWrapperFc {...inputProps} />
		</label>
	);
};

export default RadioFc;
