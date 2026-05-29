// Alias the browser-native FocusOptions before we shadow the name with our extended type.
type BrowserFocusOptions = FocusOptions;

/**
 * Combined focus and scroll options for the {@link FocusableElement.focus} method.
 * Merges the browser's {@link FocusOptions} and {@link ScrollIntoViewOptions}.
 * All properties are optional to preserve backward compatibility.
 */
export type FocusOptions = BrowserFocusOptions &
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
	focus(options?: FocusOptions): Promise<void>;
}
