import { type FunctionalComponent as FC, h, Fragment } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import clsx from 'clsx';
import { translate } from '../../i18n';

type FormFieldCounterProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	id: string;
	currentLength: number;
	currentLengthDebounced: number;
	maxLength: number;
};

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ id, currentLength, currentLengthDebounced, maxLength }) => {
	const remainingLive = maxLength - currentLength;
	const exceededLive = remainingLive < 0;
	const remainingDebounced = maxLength - currentLengthDebounced;
	const exceededDebounced = remainingDebounced < 0;

	return (
		<>
			<span
				class={clsx('kol-form-field__counter', {
					'kol-form-field__counter--exceeded': exceededLive,
				})}
				aria-hidden="true"
				data-testid="input-counter"
			>
				{exceededLive
					? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remainingLive)) } })
					: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remainingLive) } })}
			</span>
			<span aria-live="polite" class="visually-hidden" data-testid="input-counter-aria">
				{exceededDebounced
					? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remainingDebounced)) } })
					: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remainingDebounced) } })}
			</span>

			<span id={`${id}-character-limit-hint`} class="visually-hidden">
				{translate('kol-character-limit-hint', { placeholders: { limit: String(maxLength) } })}
			</span>
		</>
	);
};

export default KolFormFieldCounterFc;
