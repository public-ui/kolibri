import { waitForThemed } from './element-themed';

const MAX_CLICK_ATTEMPTS = 3;

/**
 * Delegates click after the component is themed and ready.
 * Waits for the `data-themed` attribute on the host element before invoking the callback.
 *
 * @param host - The Stencil host element
 * @param callback - Async function that triggers click on the desired inner element
 * @throws {Error} If theming times out or the callback fails
 */
export async function delegateClick(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			`The interactive element inside the KoliBri web component could not be clicked. Try calling the click method on the web component after a short delay again.`,
		);
	}
}

/**
 * Checks whether the given element is currently visible.
 * Uses getBoundingClientRect to reliably detect visibility for all positioning types,
 * including position: fixed, which returns null for offsetParent despite being visible.
 *
 * @param element - The element to check
 */
function isElementVisible(element: HTMLElement): boolean {
	if (!element) return false;
	const rect = element.getBoundingClientRect();
	return rect.width > 0 && rect.height > 0;
}

/**
 * Attempts to click the given element immediately and then again on each animation frame until
 * it becomes visible or the maximum number of attempts is reached.
 * Uses {@link isElementVisible} in the loop condition to decide whether another retry is needed.
 *
 * @param element - The element to click
 * @see MAX_CLICK_ATTEMPTS
 */
export async function setClick(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.click();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isElementVisible(element) && attempts < MAX_CLICK_ATTEMPTS);
}

/**
 * Interface for elements that support async click behavior.
 */
export interface ClickableElement {
	click(): Promise<void>;
}
