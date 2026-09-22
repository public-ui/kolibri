/**
 * Fallback duration of the open/close transition when the theme declares no
 * `collapsibleTransitionMs` feature flag. Mirrors the default of
 * `--collapsible-transition-duration` in `components/@shared/_collapsible.mixin.scss`.
 */
export const DEFAULT_COLLAPSIBLE_TRANSITION_MS = 300;

/** Runs `callback` on the next frame; falls back to a macrotask where `requestAnimationFrame` is unavailable (SSR). */
function onNextFrame(callback: () => void): () => void {
	if (typeof requestAnimationFrame === 'function') {
		const handle = requestAnimationFrame(callback);
		return () => cancelAnimationFrame(handle);
	}
	const handle = setTimeout(callback, 0);
	return () => clearTimeout(handle);
}

export type CollapsibleOpenAnimationContext = {
	/** Duration of the CSS transition; the `open` attribute is kept on `<details>` until it has elapsed. */
	getTransitionMs: () => number;
	/** Sets the `open` attribute on `<details>`. */
	setDetailsOpen: (value: boolean) => void;
	/** Sets the `--open` block modifier, which drives the transition. */
	setExpanded: (value: boolean) => void;
};

export type CollapsibleOpenAnimation = {
	/**
	 * Applies an open state to the two rendered flags.
	 *
	 * With `animate`, opening sets the `open` attribute first and the modifier one frame later — the
	 * content is `display:none` while `<details>` is closed, so without that gap the transition has
	 * no from-state and the panel snaps open. Collapsing does the reverse: the modifier goes first
	 * and the attribute is removed once the transition has run.
	 */
	syncOpen: (open: boolean, animate: boolean) => void;
	/** Cancels pending frames and timers. Call from `disconnectedCallback`. */
	dispose: () => void;
};

export function createCollapsibleOpenAnimation({ getTransitionMs, setDetailsOpen, setExpanded }: CollapsibleOpenAnimationContext): CollapsibleOpenAnimation {
	let cancelPendingFrame: (() => void) | undefined;
	let collapseTimeout: ReturnType<typeof setTimeout> | undefined;

	const clearPending = (): void => {
		cancelPendingFrame?.();
		cancelPendingFrame = undefined;
		clearTimeout(collapseTimeout);
		collapseTimeout = undefined;
	};

	return {
		syncOpen(open, animate) {
			clearPending();

			if (open) {
				setDetailsOpen(true);
				if (animate) {
					cancelPendingFrame = onNextFrame(() => setExpanded(true));
				} else {
					setExpanded(true);
				}
				return;
			}

			setExpanded(false);
			if (animate) {
				collapseTimeout = setTimeout(() => setDetailsOpen(false), getTransitionMs());
			} else {
				setDetailsOpen(false);
			}
		},
		dispose: clearPending,
	};
}
