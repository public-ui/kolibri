import type { Generic } from 'adopted-style-sheets';

import type { HostInternals } from '../../utils/aria-labelledby';
import { resolveTargets } from '../../utils/aria-labelledby';
import { Log, watchValidator } from '../utils';

/* types */
/**
 * An IDREF list (space-separated) identifying external element(s) that provide accessible details for this component.
 * Resolves the IDREFs to element references and pushes them to the native control's ariaDetailsElements
 * to cross the Shadow DOM boundary.
 * Screen reader support is heavily fragmented (see KNOWN_ISSUES.md): only Orca announces presence,
 * content and end of the details region completely; VoiceOver, TalkBack and Narrator ignore the
 * relation entirely.
 */
export type AriaDetailsPropType = string;

export type PropAriaDetails = {
	ariaDetails: AriaDetailsPropType;
};

/* validator */
export const validateAriaDetails = (
	component: unknown,
	host: HTMLElement | Element | undefined,
	internals: HostInternals | undefined,
	value?: AriaDetailsPropType,
): HTMLElement[] => {
	const isValid = (value?: unknown): boolean => typeof value === 'string' || typeof value === 'undefined';
	watchValidator(component as Generic.Element.Component, '_ariaDetails', isValid, new Set(['string']), value);
	if (!isValid(value)) {
		// An invalid value is only logged: it resolves to no element and leaves the internals untouched.
		return [];
	}

	const elements = resolveTargets(host, value);
	if (internals) {
		try {
			internals.ariaDetailsElements = elements;
		} catch {
			// ariaDetailsElements is not supported in this environment — silently skip.
		}
		Log.debug(['WebComponent internals', internals]);
	}
	return elements;
};
