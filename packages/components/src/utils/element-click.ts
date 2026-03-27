const MAX_CLICK_ATTEMPTS = 3;
const MAX_TIMEOUT_DURATION = 5000;

/**
 * Waits until the `data-themed` attribute is set on the host element.
 * Uses a MutationObserver to detect the attribute change and rejects with a
 * timeout error if the attribute is not set within the configured duration.
 *
 * @param host - The Stencil host element to observe
 * @see MAX_TIMEOUT_DURATION
 */
function waitForThemed(host: HTMLElement): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const observer = new MutationObserver(() => {
			if (host.hasAttribute('data-themed')) {
				clearTimeout(timeoutId);
				observer.disconnect();
				resolve();
			}
		});

		const timeoutId = setTimeout(() => {
			observer.disconnect();
			reject(new Error('Timeout waiting for data-themed attribute'));
		}, MAX_TIMEOUT_DURATION);

		observer.observe(host, {
			attributes: true,
			attributeFilter: ['data-themed'],
		});
	});
}

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
 * Checks whether the given element is currently visible and activated.
 * Basic implementation that checks element existence.
 *
 * @param element - The element to check
 */
function isClickActivationObserved(element: HTMLElement): boolean {
	return element && element.offsetParent !== null;
}

/**
 * Attempts to click the given element on each animation frame until
 * it is activated or the maximum number of attempts is reached.
 * Uses {@link isClickActivationObserved} to verify the click activation.
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
	} while (!isClickActivationObserved(element) && attempts < MAX_CLICK_ATTEMPTS);
}

/**
 * Interface for elements that support async click behavior.
 */
export interface ClickableElement {
	click(): Promise<void>;
}
