import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from '../../utils/clsx';

import type {
	AdjustHeightPropType,
	DisabledPropType,
	FocusableElement,
	HasCounterPropType,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MaxLengthBehaviorPropType,
	MsgPropType,
	NamePropType,
	PlaceholderPropType,
	ReadOnlyPropType,
	RequiredPropType,
	RowsPropType,
	ShortKeyPropType,
	SpellCheckPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TextareaAPI,
	TextareaResizePropType,
	TextareaStates,
	TooltipAlignPropType,
} from '../../schema';

import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerStateWrapperFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import KolTextAreaStateWrapperFc, { type TextAreaStateWrapperProps } from '../../functional-component-wrappers/TextAreaStateWrapper/TextAreaStateWrapper';
import { nonce } from '../../utils/dev.utils';
import { delegateFocus, setFocus } from '../../utils/element-focus';
import { TextareaController } from './controller';

/**
 * https://stackoverflow.com/questions/17772260/textarea-auto-height
 */
const increaseTextareaHeight = (el: HTMLTextAreaElement): number => {
	el.style.overflow = 'hidden'; // verhindert, dass ein Scrollbalken kurz angezeigt wird
	const currentRows = el.rows;
	const rowHeight = el.clientHeight / currentRows;
	el.rows = 1;
	const nextRows = Math.round(el.scrollHeight / rowHeight);
	el.rows = currentRows;
	return nextRows;
};

/**
 * The **Textarea** component provides a larger input field for content. Unlike InputText, it also allows extensive content to be entered, including line breaks.
 *
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-textarea',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTextarea implements TextareaAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolTextareaElement;
	private textareaRef?: HTMLTextAreaElement;

	private readonly setTextareaRef = (ref?: HTMLTextAreaElement) => {
		this.textareaRef = ref;
	};

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.textareaRef?.value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus() {
		return delegateFocus(this.host!, () => setFocus(this.textareaRef!));
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-form-field-textarea', {
				'kol-form-field--has-value': this.state._hasValue,
				'kol-form-field--has-counter': this.controller.hasSoftCharacterLimit() || this.controller.hasCounter(),
			}),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
		};
	}

	private getTextAreaProps(): TextAreaStateWrapperProps {
		const ariaDescribedBy = typeof this.state._maxLength === 'number' ? [`${this.state._id}-character-limit-hint`] : undefined; // When a character limit is defined, we provide an additional hint referenced by aria-describedby.

		return {
			ref: this.setTextareaRef,
			state: this.state,
			style: {
				resize: this.state._resize,
			},
			ariaDescribedBy,
			...this.controller.onFacade,
			onInput: this.onInput,
			onFocus: (event: Event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: Event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerStateWrapperFc state={this.state}>
					<KolTextAreaStateWrapperFc {...this.getTextAreaProps()} />
				</KolInputContainerStateWrapperFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: TextareaController;

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Adjusts the height of the element to its content.
	 * @TODO: change back to AdjustHeightPropType after stencil #4663 has been resolved
	 */
	@Prop() public _adjustHeight?: boolean = false;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideMsg?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

	/**
	 * Shows a character counter for the input element.
	 */
	@Prop() public _hasCounter?: boolean = false;

	/**
	 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
	 */
	@Prop() public _maxLengthBehavior?: MaxLengthBehaviorPropType = 'hard';

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Makes the input element read only.
	 * @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _readOnly?: boolean = false;

	/**
	 * Defines whether and in which direction the size of the input can be changed by the user. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 * In version 3 (v3), horizontal resizing is abolished. The corresponding property is then reduced to the properties `vertical` (default) and `none`.
	 */
	@Prop() public _resize?: TextareaResizePropType = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Maximum number of visible rows of the element.
	 */
	@Prop({ mutable: true, reflect: false }) public _rows?: RowsPropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Defines whether the browser should check the spelling and grammar.
	 */
	@Prop() public _spellCheck?: SpellCheckPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Defines the value of the element.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: string;

	@State() public state: TextareaStates = {
		_adjustHeight: false,
		_currentLength: 0,
		_currentLengthDebounced: 0,
		_hasValue: false,
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_resize: 'vertical',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new TextareaController(this, 'textarea', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_adjustHeight')
	public validateAdjustHeight(value?: AdjustHeightPropType): void {
		this.controller.validateAdjustHeight(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hasCounter')
	public validateHasCounter(value?: HasCounterPropType): void {
		this.controller.validateHasCounter(value);
	}

	@Watch('_hint')
	public validateHint(value?: HintPropType): void {
		this.controller.validateHint(value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsHorizontalPropType): void {
		this.controller.validateIcons(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
	}

	@Watch('_maxLengthBehavior')
	public validateMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.controller.validateMaxLengthBehavior(value);
	}

	@Watch('_msg')
	public validateMsg(value?: Stringified<MsgPropType>): void {
		this.controller.validateMsg(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: PlaceholderPropType): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: ReadOnlyPropType): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_resize')
	public validateResize(value?: TextareaResizePropType): void {
		this.controller.validateResize(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_rows')
	public validateRows(value?: RowsPropType): void {
		this.controller.validateRows(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_spellCheck')
	public validateSpellCheck(value?: SpellCheckPropType): void {
		this.controller.validateSpellCheck(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
	}

	public componentDidLoad(): void {
		setTimeout(() => {
			if (this._adjustHeight === true && this.textareaRef /* SSR instanceof HTMLTextAreaElement */) {
				this._rows =
					this.state?._rows && this.state._rows > increaseTextareaHeight(this.textareaRef) ? this.state._rows : increaseTextareaHeight(this.textareaRef);
			} else if (!this._rows) {
				this._rows = 1;
			}
		});
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}

	private readonly onInput = (event: InputEvent) => {
		if (this.textareaRef instanceof HTMLTextAreaElement) {
			this._value = this.textareaRef.value;
			if (this.state._adjustHeight) {
				this._rows = increaseTextareaHeight(this.textareaRef);
			}
			this.controller.onFacade.onInput(event);
		}
	};
}
