import type { Generic } from 'adopted-style-sheets';

import type { HostInternals } from '../../utils/aria-labelledby';
import { resolveTargets } from '../../utils/aria-labelledby';
import { Log, watchValidator } from '../utils';

/* types */
/**
 * An IDREF (space-separated) identifying external element(s) that provide accessible details for this component.
 *
 * For components with wrapper pattern: Resolves the IDREF to element references and sets them via
 * ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
 * For components without wrapper pattern: Sets aria-details as a string IDREF on the native element.
 * Desktop screen readers (NVDA + Chrome, JAWS + Chrome) follow the reference;
 * mobile screen readers (TalkBack, VoiceOver iOS) may have limited support.
 */
export type AriaDetailsPropType = string;

export type PropAriaDetails = {
	ariaDetails: AriaDetailsPropType;
};

/* validator */
export const validateAriaDetails = (
	component: unknown,
	host: HTMLElement | undefined,
	internals: HostInternals | undefined,
	value?: AriaDetailsPropType,
): HTMLElement[] => {
	watchValidator(
		component as Generic.Element.Component,
		'_ariaDetails',
		(value): boolean => typeof value === 'string' || typeof value === 'undefined',
		new Set(['string']),
		value,
	);

	const elements = resolveTargets(host, value);
	if (internals) {
		try {
			(internals as unknown as { ariaDetailsElements?: HTMLElement[] }).ariaDetailsElements = elements;
		} catch {
			// ariaDetailsElements is not supported in this environment — silently skip.
		}
		Log.debug(['WebComponent internals', internals]);
	}
	return elements;
};
