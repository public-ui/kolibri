import { waitForThemed } from './element-themed';

const MAX_FOCUS_ATTEMPTS = 10;

/**
 * Delegates focus after the component is themed and ready.
 * Waits for the `data-themed` attribute on the host element before invoking the callback.
 *
 * @param host - The Stencil host element
 * @param callback - Async function that applies focus to the desired inner element
 * @throws {Error} If theming times out or the callback fails
 */
export async function delegateFocus(host: HTMLElement, callback: () => Promise<void>): Promise<void> {
	try {
		if (!host.hasAttribute('data-themed')) {
			await waitForThemed(host);
		}
		await callback();
	} catch {
		throw new Error(
			`The interactive element inside the KoliBri web component could not be focused. Try calling the focus method on the web component after a short delay again.`,
		);
	}
}

/**
 * Checks whether the given element is currently the active element.
 * Handles elements inside a Shadow DOM by querying the shadow root's `activeElement`
 * instead of `document.activeElement`, which only reflects the shadow host in that case.
 *
 * @param element - The element to check
 */
function isActiveElement(element: HTMLElement): boolean {
	const root = element.getRootNode();
	if (root instanceof ShadowRoot) {
		return root.activeElement === element;
	}
	return document.activeElement === element;
}

/**
 * Attempts to focus the given element on each animation frame until
 * it becomes the active element or the maximum number of attempts is reached.
 * Uses {@link isActiveElement} to correctly detect focus inside Shadow DOM.
 *
 * @param element - The element to focus
 * @see MAX_FOCUS_ATTEMPTS
 */
export async function setFocus(element: HTMLElement): Promise<void> {
	let attempts = 0;
	do {
		if (element) {
			element.focus();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isActiveElement(element) && attempts < MAX_FOCUS_ATTEMPTS);
}
