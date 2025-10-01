/**
 * Track globally whether any tooltip is currently visible.
 * This uses attributes on <html> so disparate components can coordinate
 * without tight coupling or cross-imports.
 */

export const TOOLTIP_COUNTER_ATTR = 'data-kol-tooltips-open';
export const TOOLTIP_OPEN_ATTR = 'data-kol-tooltip-open';

/** Increment the global "open tooltips" counter and set the boolean flag. */
export function incOpenTooltips(doc: Document): void {
	const el = doc.documentElement;
	const n = Number(el.getAttribute(TOOLTIP_COUNTER_ATTR) || '0') + 1;
	el.setAttribute(TOOLTIP_COUNTER_ATTR, String(n));
	el.setAttribute(TOOLTIP_OPEN_ATTR, ''); // boolean presence attribute
}

/** Decrement the global "open tooltips" counter and clear the flag at zero. */
export function decOpenTooltips(doc: Document): void {
	const el = doc.documentElement;
	const current = Math.max(0, Number(el.getAttribute(TOOLTIP_COUNTER_ATTR) || '0') - 1);
	if (current === 0) {
		el.removeAttribute(TOOLTIP_COUNTER_ATTR);
		el.removeAttribute(TOOLTIP_OPEN_ATTR);
	} else {
		el.setAttribute(TOOLTIP_COUNTER_ATTR, String(current));
	}
}

/** Returns true if at least one tooltip is open. */
export function isAnyTooltipOpen(doc: Document): boolean {
	return doc.documentElement.hasAttribute(TOOLTIP_OPEN_ATTR);
}
