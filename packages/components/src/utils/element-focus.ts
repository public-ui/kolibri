/**
 * Delegates focus to an element after component is ready and data-themed attribute is set.
 * Ensures element is fully initialized, visible/styled before focus is applied.
 * Uses MutationObserver to wait for theming attribute on host element.
 *
 * @param host - The Stencil host element (must have componentOnReady method)
 * @param focusElement - The input element to focus
 */
export async function delegateFocus(host: HTMLElement | undefined, focusElement?: HTMLElement): Promise<void> {
	if (!host) return;

	if (!host?.hasAttribute('data-themed')) {
		await new Promise<void>((resolve) => {
			let timeoutId: ReturnType<typeof setTimeout>;

			const handleReady = () => {
				clearTimeout(timeoutId);
				observer.disconnect();
				resolve();
			};

			const observer = new MutationObserver(handleReady);
			observer.observe(host, {
				attributes: true,
			});

			timeoutId = setTimeout(handleReady, 1000);
		});
	}

	let attempts = 0;
	do {
		if (focusElement) {
			focusElement.focus();
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (focusElement && document.activeElement !== focusElement && attempts < 10);
}
