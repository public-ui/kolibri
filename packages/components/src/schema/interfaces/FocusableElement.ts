/**
 * Scroll options for the {@link FocusableElement.focus} method.
 * Merges scroll-into-view options ({@link Element.scrollIntoView}).
 *
 * Note: `preventScroll` and `focusVisible` are always enabled internally for consistent focus behavior.
 * They are intentionally typed as `true` only: callers may omit them or explicitly opt in with `true`,
 * but `false` is not supported by this API contract.
 */
export type KolFocusOptions = {
	/** Prevents the browser from scrolling when focus is set — scroll is then handled manually. */
	preventScroll?: true;
	/** Hints whether focus should be visible (e.g. focus ring). */
	focusVisible?: true;
} & ScrollIntoViewOptions & {
		/**
		 * Callback invoked after focus and (if smooth scroll is requested) after scrolling settles.
		 * Waits for smooth scroll completion only if `behavior: 'smooth'` is explicitly provided.
		 */
		afterFocus?: () => void;
	};

export interface FocusableElement {
	focus(options?: KolFocusOptions): Promise<void>;
}
