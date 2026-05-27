import type { Generic } from 'adopted-style-sheets';

import type { HostInternals } from '../../utils/aria-labelledby';
import { resolveTargets } from '../../utils/aria-labelledby';
import { Log, watchValidator } from '../utils';

/* types */
/**
 * An IDREF (space-separated) identifying external element(s) that label this component.
 *
 * Internally the component resolves the IDREF to an element reference and sets it via
 * ElementInternals.ariaLabelledByElements so the accessible name crosses the Shadow DOM
 * boundary. Desktop screen readers (NVDA + Chrome, JAWS + Chrome) follow this chain;
 * mobile screen readers (TalkBack, VoiceOver iOS) do not yet support element references
 * across shadow boundaries — use `_label` when TalkBack support is required.
 */
export type AriaLabelledbyPropType = string;

export type PropAriaLabelledby = {
	ariaLabelledby: AriaLabelledbyPropType;
};

/* validator */
export const validateAriaLabelledby = (
	component: unknown,
	host: HTMLElement | undefined,
	internals: HostInternals | undefined,
	value?: AriaLabelledbyPropType,
): HTMLElement[] => {
	watchValidator(
		component as Generic.Element.Component,
		'_ariaLabelledby',
		(value): boolean => typeof value === 'string' || typeof value === 'undefined',
		new Set(['string']),
		value,
	);

	const elements = resolveTargets(host, value);
	if (internals) {
		try {
			internals.ariaLabelledByElements = elements;
		} catch {
			// ariaLabelledByElements is not supported in this environment — silently skip.
		}
		Log.debug(['WebComponent internals', internals]);
	}
	return elements;
};
