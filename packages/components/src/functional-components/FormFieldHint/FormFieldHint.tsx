import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';

type FormFieldHintProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	hint?: string;
	baseClassName?: string;
};

const KolFormFieldHintFc: FC<FormFieldHintProps> = ({ id, class: classNames, hint, baseClassName = 'kol-form-field', ...other }) => {
	if (!hint) {
		return null;
	}

	return (
		<span class={clsx(`${baseClassName}__hint`, classNames)} id={`${id}-hint`} {...other}>
			{hint}
		</span>
	);
};

export default KolFormFieldHintFc;
