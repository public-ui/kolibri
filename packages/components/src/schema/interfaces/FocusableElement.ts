export interface FocusableElement {
	focus(): Promise<void>;

	/**
	 * @deprecated Use {@link focus} instead.
	 */
	kolFocus?(): Promise<void>;
}
