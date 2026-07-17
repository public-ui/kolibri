import { translate } from '../../i18n';
import type { MaxLengthBehaviorPropType } from '../../schema';

export const getCounterVisualText = (maxLengthBehavior: MaxLengthBehaviorPropType, maxLength: number | undefined, currentLength: number): string => {
	if (typeof maxLength !== 'number') {
		return translate('kol-character-counter-current', { placeholders: { current: String(currentLength) } });
	}
	if (maxLengthBehavior === 'soft') {
		const remaining = maxLength - currentLength;
		return remaining < 0
			? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remaining)) } })
			: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remaining) } });
	}
	return translate('kol-character-counter-current-of-max', { placeholders: { current: String(currentLength), max: String(maxLength) } });
};

export const getCounterAriaText = (maxLengthBehavior: MaxLengthBehaviorPropType, maxLength: number | undefined, currentLength: number): string => {
	if (typeof maxLength !== 'number') {
		return translate('kol-character-counter-current', { placeholders: { current: String(currentLength) } });
	}
	if (maxLengthBehavior === 'soft') {
		const remaining = maxLength - currentLength;
		return remaining < 0
			? translate('kol-character-limit-exceeded', { placeholders: { over: String(Math.abs(remaining)) } })
			: translate('kol-character-limit-remaining', { placeholders: { remaining: String(remaining) } });
	}
	return translate('kol-character-counter-current-of-max-aria', { placeholders: { current: String(currentLength), max: String(maxLength) } });
};

export const getCounterMaxText = (maxLengthBehavior: MaxLengthBehaviorPropType, maxLength: number | undefined, currentLength: number): string => {
	if (maxLengthBehavior === 'hard' && typeof maxLength === 'number' && currentLength >= maxLength) {
		return translate('kol-character-counter-max-aria');
	}
	return '';
};
