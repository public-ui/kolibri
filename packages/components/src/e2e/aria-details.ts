import type { Locator } from '@playwright/test';

/**
 * Reads the ARIA element references a form field pushed onto its native control via IDL
 * reflection (`ariaDetailsElements`) and maps them to the targets' `id`s — `null` for
 * non-element entries, `null` overall when the control carries no reference list.
 */
export const getAriaDetailsRefIds = (host: Locator) =>
	host.evaluate((el: HTMLElement) => {
		const control = el.shadowRoot?.querySelector('input');
		const refs = (control as unknown as { ariaDetailsElements?: (Element | null)[] | null } | null)?.ariaDetailsElements;
		return refs?.map((ref) => (ref instanceof HTMLElement ? ref.id : null)) ?? null;
	});
