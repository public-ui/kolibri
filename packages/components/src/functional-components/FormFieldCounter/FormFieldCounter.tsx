import { Fragment, h, type FunctionalComponent as FC } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';
import { translate } from '../../i18n';
import type { MaxLengthBehaviorPropType } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId } from '../../utils/dev.utils';

let timeout: NodeJS.Timeout | undefined;
let maxTextElem: HTMLSpanElement | undefined;

type FormFieldCounterProps = JSXBase.HTMLAttributes<HTMLSpanElement> & {
	currentLength: number;
	currentLengthDebounced: number;
	maxLengthBehavior: MaxLengthBehaviorPropType;
	maxLength?: number;
	id?: string;
};

function maxMessageRef(elem: HTMLSpanElement | undefined) {
	maxTextElem = elem;
}

function maxTextLogic(currentLength: number, maxLength: number | undefined) {
	let ariaMaxReachedText: string | undefined = 'MAX!';

	clearTimeout(timeout);
	if (!maxTextElem) {
		return;
	}
	maxTextElem.textContent = '';

	if (currentLength === maxLength) {
		timeout = setTimeout(() => {
			if (!maxTextElem) {
				return;
			}
			maxTextElem.textContent = ariaMaxReachedText;
		}, 200);
	}
}

const KolFormFieldCounterFc: FC<FormFieldCounterProps> = ({ currentLength, currentLengthDebounced, maxLength, maxLengthBehavior, id }) => {
	let visualText: string | undefined;
	let ariaText: string | undefined;
	const counterClasses = ['kol-form-field__counter'];

	console.log('rerender');

	maxTextLogic(currentLength, maxLength);

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
			<span id={createRelatedUniqueId(id || '', 'counter')} aria-live="polite" class="visually-hidden" data-testid="input-counter-aria">
				{ariaText}
			</span>
			<span aria-live="polite" ref={(elem) => maxMessageRef(elem)} class="visually-hidden"></span>
		</>
	);
};

export default KolFormFieldCounterFc;
