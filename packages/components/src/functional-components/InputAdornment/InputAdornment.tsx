import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

export type InputAdornmentProps = JSXBase.HTMLAttributes<HTMLDivElement> & {
	position?: 'start' | 'end';
};

const InputAdornment: FC<InputAdornmentProps> = ({ position = 'start', class: className, ...other }, children) => {
	const rootClassName = `kol-input-container__adornment`;
	const positionClassName = `${rootClassName}--${position}`;

	return (
		<div class={clsx(rootClassName, positionClassName, className)} {...other}>
			{children}
		</div>
	);
};

export default InputAdornment;
