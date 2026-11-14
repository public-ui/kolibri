/**
 * This file contains the functions used to lock the background scroll while
 * a modal overlay (dialog, modal, drawer) is open. The native `showModal()`
 * makes the background inert, but does not prevent the document from scrolling.
 */

/**
 * This set contains all owners (component instances) currently holding the lock.
 * The scroll lock is released once the last owner unlocks.
 */
const SCROLL_LOCK_OWNERS: Set<unknown> = new Set();

let previousOverflow: string | null = null;
let previousPaddingRight: string | null = null;

/**
 * Locks the document scroll for the given owner. The first lock stores the
 * current inline styles and hides the viewport scrollbar; the removed
 * scrollbar width is compensated with padding to avoid a layout shift.
 *
 * @param owner The component instance requesting the lock
 */
export function lockScroll(owner: unknown): void {
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return;
	}
	if (SCROLL_LOCK_OWNERS.has(owner)) {
		return;
	}

	if (SCROLL_LOCK_OWNERS.size === 0) {
		const docEl = document.documentElement;
		previousOverflow = docEl.style.getPropertyValue('overflow');
		previousPaddingRight = docEl.style.getPropertyValue('padding-right');

		// Measure before hiding the scrollbar; overlay scrollbars yield 0.
		const scrollbarWidth = window.innerWidth - docEl.clientWidth;
		if (scrollbarWidth > 0) {
			const currentPaddingRight = Number.parseFloat(window.getComputedStyle(docEl).paddingRight) || 0;
			docEl.style.setProperty('padding-right', `${currentPaddingRight + scrollbarWidth}px`);
		}
		docEl.style.setProperty('overflow', 'hidden');
	}

	SCROLL_LOCK_OWNERS.add(owner);
}

/**
 * Releases the scroll lock for the given owner. Calling it for an owner that
 * does not hold a lock is a no-op, so unlocking is idempotent per owner. The
 * previous inline styles are restored once the last owner unlocks.
 *
 * @param owner The component instance releasing the lock
 */
export function unlockScroll(owner: unknown): void {
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return;
	}
	if (!SCROLL_LOCK_OWNERS.delete(owner)) {
		return;
	}

	if (SCROLL_LOCK_OWNERS.size === 0) {
		const docEl = document.documentElement;
		if (previousOverflow) {
			docEl.style.setProperty('overflow', previousOverflow);
		} else {
			docEl.style.removeProperty('overflow');
		}
		if (previousPaddingRight) {
			docEl.style.setProperty('padding-right', previousPaddingRight);
		} else {
			docEl.style.removeProperty('padding-right');
		}
		previousOverflow = null;
		previousPaddingRight = null;
	}
}
