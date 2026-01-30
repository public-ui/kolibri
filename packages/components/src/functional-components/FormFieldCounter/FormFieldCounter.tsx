import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { translate } from '../../i18n';
import type { MaxLengthBehaviorPropType } from '../../schema';
import clsx from '../../utils/clsx';

type FormFieldCounterProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	currentLength: number;
	currentLengthDebounced: number;
	maxLengthBehavior: MaxLengthBehaviorPropType;
	maxLength?: number;
	id?: string;
};

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ currentLength, currentLengthDebounced, maxLength, maxLengthBehavior, id }) => {
	let visualText: string | undefined;
	let ariaText: string | undefined;
	const counterClasses = ['kol-form-field__counter'];

	if (maxLengthBehavior === 'hard') {
		visualText =
			typeof maxLength === 'number'
				? translate('kol-character-counter-current-of-max', { placeholders: { current: String(currentLength), max: String(maxLength) } })
				: translate('kol-character-counter-current', { placeholders: { current: String(currentLength) } });

		ariaText =
			typeof maxLength === 'number'
				? translate('kol-character-counter-current-of-max-aria', { placeholders: { current: String(currentLengthDebounced), max: String(maxLength) } })
				: translate('kol-character-counter-current', { placeholders: { current: String(currentLengthDebounced) } });
	} else if (typeof maxLength === 'number') {
		const remainingLive = maxLength - currentLength;
		const exceededLive = remainingLive < 0;
		const remainingDebounced = maxLength - currentLengthDebounced;
		const exceededDebounced = remainingDebounced < 0;

		visualText = exceededLive
			? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remainingLive)) } })
			: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remainingLive) } });

		ariaText = exceededDebounced
			? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remainingDebounced)) } })
			: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remainingDebounced) } });

		if (exceededLive) {
			counterClasses.push('kol-form-field__counter--exceeded');
		}
	} else {
		return null;
	}

	return (
		<>
			<span class={clsx(counterClasses)} aria-hidden="true" data-testid="input-counter">
				{visualText}
			</span>
			<span id={`${id}-counter`} aria-live="polite" class="visually-hidden" data-testid="input-counter-aria">
				{ariaText}
			</span>
		</>
	);
};

export default KolFormFieldCounterFc;
