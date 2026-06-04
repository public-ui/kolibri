import type { KolFocusOptions } from '../schema';
import { waitForThemed } from './element-themed';

const MAX_FOCUS_ATTEMPTS = 10;

/**
 * Waits for scroll completion affecting the given element.
 * Uses the native `scrollend` event when available and falls back to viewport
 * intersection detection via {@link IntersectionObserver}.
 * A safety timeout guarantees the promise always resolves.
 *
 * @param element - The element to observe
 * @param timeoutMs - Maximum time to wait before resolving regardless of visibility (default 2000 ms)
 */
function waitForElementInViewport(element: HTMLElement, timeoutMs = 2000): Promise<void> {
	return new Promise<void>((resolve) => {
		let resolved = false;
		let observer: IntersectionObserver | undefined;
		let removeScrollEndListener: (() => void) | undefined;

		const done = () => {
			if (resolved) {
				return;
			}
			resolved = true;
			clearTimeout(timeoutId);
			removeScrollEndListener?.();
			removeScrollEndListener = undefined;
			observer?.disconnect();
			resolve();
		};

		const timeoutId = setTimeout(done, timeoutMs);

		if (typeof window !== 'undefined' && 'onscrollend' in window) {
			const handleScrollEnd = (event: Event): void => {
				const target = event.target;
				if (!(target instanceof Node) || !target.contains(element)) {
					return;
				}
				done();
			};

			document.addEventListener('scrollend', handleScrollEnd, { capture: true });
			removeScrollEndListener = () => {
				document.removeEventListener('scrollend', handleScrollEnd, { capture: true });
			};
			return;
		}

		if (typeof IntersectionObserver === 'undefined') {
			done();
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					done();
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

const FOCUS_OPTIONS = {
	preventScroll: true,
} satisfies FocusOptions;

/**
 * Attempts to focus the given element on each animation frame until
 * it becomes the active element or the maximum number of attempts is reached.
 * Uses {@link isActiveElement} to correctly detect focus inside Shadow DOM.
 *
 * When `options` are provided the element is scrolled into view using the supplied
 * {@link ScrollIntoViewOptions} (preventing the browser's default scroll triggered by
 * `focus()` to avoid a double-scroll). If `options.afterFocus` is set, the callback is
 * invoked after the element is focused and – for smooth-scroll transitions – after
 * scrolling settles (`scrollend`, with {@link IntersectionObserver} fallback).
 *
 * @param element - The element to focus
 * @param options - Optional scroll behaviour and completion callback
 * @see MAX_FOCUS_ATTEMPTS
 */
export async function setFocus(element: HTMLElement | undefined | null, options?: KolFocusOptions): Promise<void> {
	if (!element) {
		return;
	}
	const { afterFocus, ...scrollOptions } = options ?? {};
	const hasScrollOptions = options && ('behavior' in scrollOptions || 'block' in scrollOptions || 'inline' in scrollOptions);

	let attempts = 0;
	do {
		if (element) {
			element.focus(FOCUS_OPTIONS);
		}
		await new Promise((r) => requestAnimationFrame(r));
		attempts++;
	} while (!isActiveElement(element) && attempts < MAX_FOCUS_ATTEMPTS);

	const focused = isActiveElement(element);

	if (hasScrollOptions) {
		const scrollIntoViewOptions: ScrollIntoViewOptions = { ...scrollOptions, behavior: scrollOptions.behavior };
		element.scrollIntoView(scrollIntoViewOptions);
	}

	if (afterFocus && focused) {
		if (hasScrollOptions && scrollOptions.behavior === 'smooth') {
			await waitForElementInViewport(element);
		}
		afterFocus();
	}
}
