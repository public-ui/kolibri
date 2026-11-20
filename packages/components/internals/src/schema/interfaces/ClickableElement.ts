/**
 * Interface for elements that support async click behavior.
 */
export interface ClickableElement {
	click(): Promise<void>;
}
