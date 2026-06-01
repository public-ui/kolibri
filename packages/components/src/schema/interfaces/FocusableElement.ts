/**
 * Combined focus and scroll options for the {@link FocusableElement.focus} method.
 * Merges the browser's native focus options ({@link HTMLElement.focus}) and
 * scroll-into-view options ({@link Element.scrollIntoView}).
 * All properties are optional to preserve backward compatibility.
 */
export type KolFocusOptions = {
	/** Prevents the browser from scrolling when focus is set — scroll is then handled manually. */
	preventScroll?: boolean;
	/** Hints whether focus should be visible (e.g. focus ring). */
	focusVisible?: boolean;
} & ScrollIntoViewOptions & {
		/**
		 * Callback invoked after the element has received focus and (if requested) has been scrolled into view.
		 * If scroll options are provided with `behavior: 'smooth'`, the callback is delayed until the element is
		 * considered settled (`scrollend`, with {@link IntersectionObserver} fallback).
		 * Otherwise the callback is invoked immediately after focus has been set.
		 */
		afterFocus?: () => void;
	};

export interface FocusableElement {
	focus(options?: KolFocusOptions): Promise<void>;
}
