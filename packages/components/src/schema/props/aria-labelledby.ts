import type { Generic } from 'adopted-style-sheets';

import type { HostInternals } from '../../utils/aria-labelledby';
import { resolveTargets } from '../../utils/aria-labelledby';
import { watchValidator } from '../utils';

/* types */
/**
 * Defines an external label element for a component.
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
		internals.ariaLabelledByElements = elements;
	}
	return elements;
};
