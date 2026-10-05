import type { CtaRef } from '../../../utils/element-interaction';
import type { FormFieldBaseApi } from '../form-field/api';
import { BaseFormFieldWebComponent } from '../form-field/base-web-component';

/**
 * Shared orchestrator implementation of the fields with a custom listbox, `kol-combobox` and
 * `kol-single-select`: the open state, the focused option, the keyboard navigation and the clear
 * button state.
 *
 * The keyboard moves the real focus onto the options (`<li tabIndex=-1>`). Where the two fields
 * differ, the concrete element implements the hooks: how the focus moves, which options are first
 * and last, and what Enter, NumpadEnter and Space do. The concrete element keeps what Stencil has to
 * see in the component class itself (DD16), including the `@Listen` handlers, which delegate here.
 */
export abstract class BaseListboxWebComponent<Api extends FormFieldBaseApi> extends BaseFormFieldWebComponent<Api> {
	/** Declared with `@State()` by the concrete class. */
	public abstract isOpen: boolean;
	/** Hides the mouse cursor and ignores hovering while the keyboard moves through the options; declared with `@State()`. */
	public abstract blockSuggestionMouseOver: boolean;

	protected abstract readonly ctaRef: CtaRef<HTMLInputElement>;

	/** Index of the focused option, `-1` for none. */
	protected focusedIndex = -1;
	/** Whether the clear button has the focus, so Enter and Space clear the value. */
	protected clearButtonFocused = false;
	protected optionRefs: HTMLLIElement[] = [];

	/** Number of the options in the listbox. */
	protected abstract getOptionCount(): number;

	/** Moves the focus by `delta` options; `searchStep` is the direction to skip disabled options in. */
	protected abstract moveFocus(delta: number, searchStep?: number): void;
	protected abstract focusFirstOption(): void;
	protected abstract focusLastOption(): void;
	/** Enter, NumpadEnter and Space. */
	protected abstract handleConfirmKey(event: KeyboardEvent): void;

	protected focusOption(index: number): void {
		this.focusedIndex = index;
		this.optionRefs[index]?.focus();
	}

	/** Moves the focus and wraps around at both ends. */
	protected moveFocusWrapping(delta: number): void {
		let index = this.focusedIndex + delta;
		const count = this.getOptionCount();
		if (index >= count) {
			index = 0;
		}
		if (index < 0) {
			index = count - 1;
		}
		this.focusOption(index);
	}

	/**
	 * Moves the focus, wraps around at both ends and skips disabled options in the direction of
	 * `searchStep`. Without an enabled option the focus stays.
	 */
	protected moveFocusSkippingDisabled(delta: number, searchStep: number, isDisabled: (index: number) => boolean): void {
		const count = this.getOptionCount();
		let index = this.focusedIndex + delta;

		for (let iteration = 0; iteration < count; iteration++) {
			if (index >= count) {
				index = 0;
			}
			if (index < 0) {
				index = count - 1;
			}
			if (!isDisabled(index)) {
				this.focusOption(index);
				return;
			}
			index += searchStep;
		}
	}

	/** Prevents the default action, sets the open state (closing focuses the input) and runs `callback`. */
	protected handleListboxEvent(event: KeyboardEvent, isOpen?: boolean, callback?: () => void): void {
		event.preventDefault();
		if (isOpen !== undefined) {
			this.isOpen = isOpen;
			if (!isOpen) {
				this.ctaRef.el?.focus();
			}
		}
		callback?.();
	}

	/** Keyboard navigation of the listbox, registered by the concrete element with `@Listen('keydown')`. */
	protected handleListboxKeyDown(event: KeyboardEvent): void {
		switch (event.key) {
			case 'Down':
			case 'ArrowDown':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, true, () => this.moveFocus(1));
				break;
			case 'Up':
			case 'ArrowUp':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, true, () => this.moveFocus(-1, -1));
				break;
			case 'Tab':
				if (this.isOpen) {
					this.isOpen = false;
					this.ctaRef.el?.focus();
				}
				break;
			case 'Esc':
			case 'Escape':
				if (this.isOpen) {
					event.preventDefault();
					this.isOpen = false;
					this.ctaRef.el?.focus();
				}
				break;
			case ' ':
			case 'Enter':
			case 'NumpadEnter':
				this.handleConfirmKey(event);
				break;
			case 'Home':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, undefined, () => {
					if (this.isOpen) {
						this.focusFirstOption();
					}
				});
				break;
			case 'End':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, undefined, () => {
					if (this.isOpen) {
						this.focusLastOption();
					}
				});
				break;
			case 'PageUp':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, undefined, () => this.isOpen && this.moveFocus(-10));
				break;
			case 'PageDown':
				this.blockSuggestionMouseOver = true;
				this.handleListboxEvent(event, undefined, () => this.isOpen && this.moveFocus(10, -1));
				break;
		}
	}

	/** Mouse movement ends the keyboard mode of the listbox; registered with `@Listen('mousemove')`. */
	protected handleListboxMouseMove(): void {
		this.blockSuggestionMouseOver = false;
	}

	protected readonly handleClearButtonFocus = (): void => {
		this.clearButtonFocused = true;
	};

	protected readonly handleClearButtonBlur = (): void => {
		this.clearButtonFocused = false;
	};
}
