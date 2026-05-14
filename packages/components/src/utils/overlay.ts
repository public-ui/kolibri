/**
 * This file contains the functions used to manage the visible overlays.
 */

/**
 * This set contains all the visible overlays.
 */
const VISIBLE_OVERLAYS: Set<HTMLElement> = new Set();

/**
 * This function is used to add an overlay to the visible overlay list.
 * All overlays in the list will have a z-index of 999, except the last
 * one, which will have a z-index of 1000.
 *
 * @param overlay Get the overlay element reference
 */
export function showOverlay(overlay: HTMLElement): void {
	// Only the current last overlay needs to be demoted — all others are already at 999.
	[...VISIBLE_OVERLAYS].at(-1)?.style.setProperty('z-index', '999');
	VISIBLE_OVERLAYS.add(overlay);
	overlay.style.setProperty('z-index', '1000');
}

/**
 * This function is used to remove an overlay from the visible overlay list.
 * All overlays in the list will have a z-index of 999, except the last
 * one, which will have a z-index of 1000.
 *
 * @param overlay Get the overlay element reference
 */
export function hideOverlay(overlay: HTMLElement): void {
	VISIBLE_OVERLAYS.delete(overlay);
	[...VISIBLE_OVERLAYS].at(-1)?.style.setProperty('z-index', '1000');
}
