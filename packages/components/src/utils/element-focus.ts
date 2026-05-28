import type { FocusFunctionOptions } from '../schema';
import { waitForThemed } from './element-themed';

const MAX_FOCUS_ATTEMPTS = 10;

/**
 * Waits until the given element intersects the viewport.
 * Resolves immediately (asynchronously) if the element is already visible in the viewport.
 *
 * @param element - The element to observe
 */
function waitForElementInViewport(element: HTMLElement): Promise<void> {
	return new Promise<void>((resolve) => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect();
					resolve();
				}
			},
			{ threshold: 0 },
		);
		observer.observe(element);
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
 * When `options` are provided the element is scrolled into view using the supplied
 * {@link ScrollIntoViewOptions} (preventing the browser's default scroll triggered by
 * `focus()` to avoid a double-scroll). If `options.afterFocus` is set, the callback is
 * invoked after the element is focused and – for smooth-scroll transitions – after the
 * element has entered the viewport (detected via {@link IntersectionObserver}).
 *
 * @param element - The element to focus
 * @param options - Optional scroll behaviour and completion callback
 * @see MAX_FOCUS_ATTEMPTS
 */
export async function setFocus(element: HTMLElement, options?: FocusFunctionOptions): Promise<void> {
	const { afterFocus, preventScroll, ...scrollOptions } = options ?? {};
	const hasScrollOptions = Object.keys(scrollOptions).length > 0;
	const focusOptions: FocusOptions | undefined =
		preventScroll !== undefined || hasScrollOptions ? { preventScroll: preventScroll ?? (hasScrollOptions ? true : false) } : undefined;

	let attempts = 0;
	do {
		if (element) {
			element.focus(focusOptions);
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isActiveElement(element) && attempts < MAX_FOCUS_ATTEMPTS);

	if (hasScrollOptions) {
		element.scrollIntoView(scrollOptions);
	}

	if (afterFocus) {
		if (hasScrollOptions && scrollOptions.behavior === 'smooth') {
			await waitForElementInViewport(element);
		}
		afterFocus();
	}
}
