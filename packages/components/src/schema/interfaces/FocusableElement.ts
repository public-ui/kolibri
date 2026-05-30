/**
 * Combined focus and scroll options for the {@link FocusableElement.focus} method.
 * Merges the browser's native focus options ({@link HTMLElement.focus}) and
 * scroll-into-view options ({@link Element.scrollIntoView}).
 * All properties are optional to preserve backward compatibility.
 */
export type FocusOptions = {
	/** Prevents the browser from scrolling when focus is set — scroll is then handled manually. */
	preventScroll?: boolean;
	/** Hints whether focus should be visible (e.g. focus ring). */
	focusVisible?: boolean;
} & ScrollIntoViewOptions & {
		/**
		 * Callback invoked after the element has received focus and has been scrolled into view.
		 * When `behavior` is set to `'smooth'`, the callback is delayed until the element is
		 * visible in the viewport (detected via {@link IntersectionObserver}).
		 * In all other cases the callback is invoked synchronously after focus has been set.
		 */
		afterFocus?: () => void;
	};

export interface FocusableElement {
	focus(options?: FocusOptions): Promise<void>;
}
