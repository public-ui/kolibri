/**
 * Propagates focus to an element after component is ready and data-themed attribute is set.
 * Ensures element is fully initialized, visible/styled before focus is applied.
 * Uses MutationObserver to wait for theming attribute on host element.
 *
 * @param host - The Stencil host element (must have componentOnReady method)
 * @param focusElement - The input element to focus
 */
export async function propagateFocus(host: HTMLElement | undefined, focusElement?: HTMLElement): Promise<void> {
	if (!host?.hasAttribute('data-themed')) {
		await new Promise<void>((resolve) => {
			const observer = new MutationObserver(() => {
				if (host?.hasAttribute('data-themed')) {
					observer.disconnect();
					resolve();
				}
			});
			observer.observe(host!, {
				attributes: true,
			});

			setTimeout(() => {
				observer.disconnect();
				resolve();
			}, 1000);
		});
	}

	focusElement?.focus();
}
