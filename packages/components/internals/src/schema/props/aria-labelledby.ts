import type { Generic } from 'adopted-style-sheets';

import { resolveTargets } from '../../utils/aria-labelledby';
import { watchValidator } from '../utils';

/* types */
/**
 * An IDREF (space-separated) identifying external element(s) that label this component.
 *
 * The component resolves the IDREFs and sets them as element references (`ariaLabelledByElements`)
 * on its native inner element, because IDREF attributes cannot cross the shadow boundary.
 * Desktop screen readers (NVDA + Chrome, JAWS + Chrome) follow this chain; mobile screen readers
 * (TalkBack, VoiceOver) do not yet support element references across shadow boundaries —
 * use `_label` when their support is required.
 */
export type AriaLabelledbyPropType = string;

export type PropAriaLabelledby = {
	ariaLabelledby: AriaLabelledbyPropType;
};

/* validator */
export const validateAriaLabelledby = (component: unknown, host: HTMLElement | undefined, value?: AriaLabelledbyPropType): HTMLElement[] => {
	const isValid = (value?: unknown): boolean => typeof value === 'string' || typeof value === 'undefined';
	watchValidator(component as Generic.Element.Component, '_ariaLabelledby', isValid, new Set(['string']), value);
	if (!isValid(value)) {
		// An invalid value is only logged: it resolves to no element.
		return [];
	}

	return resolveTargets(host, value);
};
