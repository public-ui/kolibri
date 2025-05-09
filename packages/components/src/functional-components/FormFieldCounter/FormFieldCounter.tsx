import { type FunctionalComponent as FC, h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { translate } from '../../i18n';

type FormFieldCounterProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	currentLength: number;
	maxLength: number;
};

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ currentLength, maxLength, class: classNames, ...other }) => {
	const remaining = maxLength - currentLength;
	const exceeded = remaining < 0;

	return (
		<span
			class={clsx(
				'kol-form-field__counter',
				{
					'kol-form-field__counter--exceeded': exceeded,
				},
				classNames,
			)}
			{...other}
			aria-atomic="true"
			aria-live="polite"
			data-testid="input-counter"
		>
			{exceeded
				? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remaining)) } })
				: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remaining) } })}
		</span>
	);
};

export default KolFormFieldCounterFc;
