/**
 * Options for the {@link FocusableElement.focus} method.
 * Extends the browser's {@link ScrollIntoViewOptions} to support custom scroll behaviour.
 * All properties are optional to preserve backward compatibility.
 */
export type FocusFunctionOptions = FocusOptions &
	ScrollIntoViewOptions & {
		/**
		 * Callback invoked after the element has received focus and has been scrolled into view.
		 * When `behavior` is set to `'smooth'`, the callback is delayed until the element is
		 * visible in the viewport (detected via {@link IntersectionObserver}).
		 * In all other cases the callback is invoked synchronously after focus has been set.
		 */
		afterFocus?: () => void;
	};

export interface FocusableElement {
	focus(options?: FocusFunctionOptions): Promise<void>;
}
