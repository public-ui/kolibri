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

	return (
		<span class={clsx('kol-form-field__counter', classNames)} {...other} aria-atomic="true" aria-live="polite" data-testid="input-counter">
			{remaining >= 0
				? translate('kol-character-limit-remaining', { placeholders: { remaining: String(remaining) } })
				: translate('kol-character-limit-over', { placeholders: { over: String(Math.abs(remaining)) } })}
		</span>
	);
};

export default KolFormFieldCounterFc;
