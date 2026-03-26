const MAX_FOCUS_ATTEMPTS = 10;
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
			`The interactive element inside the KoliBri web compontent could not be focused. Try calling the focus method on the web component after a short delay again.`,
		);
	}
}

/**
 * Attempts to focus the given element on each animation frame until
 * `document.activeElement` matches it or the maximum number of attempts is reached.
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
	} while (document.activeElement !== element && attempts < MAX_FOCUS_ATTEMPTS);
}
