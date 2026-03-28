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

export { waitForThemed, MAX_TIMEOUT_DURATION };
