import { h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../../utils/clsx';
import { createRelatedUniqueId } from '../../../utils/dev.utils';

export type FormFieldHintFCProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	hint?: string;
	/** Block of the surrounding field, `kol-form-field` or `kol-field-control`. */
	baseClassName?: string;
};

/** Hint below a form field; renders nothing for an empty hint. */
export const FormFieldHintFC: FC<FormFieldHintFCProps> = ({ id, class: classNames, hint, baseClassName = 'kol-form-field', ...other }) => {
	if (!hint) {
		return null;
	}

	return (
		<span class={clsx(`${baseClassName}__hint`, classNames)} id={createRelatedUniqueId(id || '', 'hint')} {...other}>
			{hint}
		</span>
	);
};
