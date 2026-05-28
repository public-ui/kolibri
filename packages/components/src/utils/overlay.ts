/**
 * This file contains the functions used to manage the visible overlays.
 */

/**
 * This set contains all the visible overlays.
 */
const VISIBLE_OVERLAYS: Set<HTMLElement> = new Set();

/**
 * Cached reference to the top-most overlay (z-index 1000).
 * Maintained by showOverlay and hideOverlay to avoid repeated set iterations.
 */
let lastOverlay: HTMLElement | null = null;

/**
 * This function is used to add an overlay to the visible overlay list.
 * All overlays in the list will have a z-index of 999, except the last
 * one, which will have a z-index of 1000.
 *
 * @param overlay Get the overlay element reference
 */
export function showOverlay(overlay: HTMLElement): void {
	// Ensure the overlay is at the end of the set to maintain the invariant:
	// all overlays have z-index 999 except the last one (z-index 1000).
	if (lastOverlay !== overlay) {
		if (lastOverlay) {
			lastOverlay.style.setProperty('z-index', '999');
		}
		VISIBLE_OVERLAYS.delete(overlay);
		VISIBLE_OVERLAYS.add(overlay);
		overlay.style.setProperty('z-index', '1000');
		lastOverlay = overlay;
	}
}

/**
 * This function is used to remove an overlay from the visible overlay list.
 * All overlays in the list will have a z-index of 999, except the last
 * one, which will have a z-index of 1000.
 *
 * @param overlay Get the overlay element reference
 */
export function hideOverlay(overlay: HTMLElement): void {
	if (!VISIBLE_OVERLAYS.delete(overlay)) {
		return;
	}

	if (lastOverlay === overlay) {
		// Find the new last overlay
		lastOverlay = null;
		for (const el of VISIBLE_OVERLAYS) {
			lastOverlay = el;
		}
		if (lastOverlay) {
			lastOverlay.style.setProperty('z-index', '1000');
		}
	}
}
