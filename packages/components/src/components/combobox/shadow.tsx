import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import { getRenderStates } from '../../functional-component-wrappers/_helpers/getRenderStates';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import type { InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import KolInputStateWrapperFc from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import CustomSuggestionsOptionFc from '../../functional-components/CustomSuggestionsOption/CustomSuggestionsOption';
import CustomSuggestionsOptionsGroupFc from '../../functional-components/CustomSuggestionsOptionsGroup';
import { translate } from '../../i18n';
import { IconFC } from '../../internal/functional-components/icon/component';
import type {
	ComboboxAPI,
	ComboboxStates,
	DisabledPropType,
	FocusableElement,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	PlaceholderPropType,
	RequiredPropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	W3CInputValue,
} from '../../schema';
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';
import { delegateFocus, setFocus } from '../../utils/element-focus';
import { delegateClick, setClick } from '../../utils/element-click';
import { ComboboxController } from './controller';

/**
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-combobox',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCombobox implements ComboboxAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolComboboxElement;
	private refInput?: HTMLInputElement;
	private refSuggestions: HTMLLIElement[] = [];
	private _focusedOptionIndex: number = -1;
	private readonly translateDeleteSelection = translate('kol-delete-selection');

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string> {
		return this.state._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus() {
		return delegateFocus(this.host!, () => setFocus(this.refInput!));
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	public async click(): Promise<void> {
		return delegateClick(this.host!, async () => setClick(this.refInput!));
	}

	private toggleListbox = () => {
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			this._isOpen = false;
		} else {
			this.refInput?.focus();
			if (this._isOpen) {
				// Liste schließen
				this._isOpen = false;
			} else if (Array.isArray(this._filteredSuggestions) && this._filteredSuggestions.length > 0) {
				// Liste öffnen
				this._isOpen = true;
				const selectedIndex = this._filteredSuggestions.findIndex((option) => option === this.state._value);
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : -1;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};
	private readonly setInputRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private selectOption(option: string) {
		this.controller.onFacade.onInput(
			new CustomEvent<EventDetail>('input', { bubbles: true, detail: { name: this.state._name as string, value: option } }),
			true,
			option,
		);
		this.controller.onFacade.onChange(
			new CustomEvent<EventDetail>('change', { bubbles: true, detail: { name: this.state._name as string, value: option } }),
			option,
		);
		this.controller.setFormAssociatedValue(option);
		this.state._value = option;
		this.refInput?.focus();
	}

	private clearSelection() {
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			return;
		}

		const emptyValue = '';
		this._focusedOptionIndex = -1;
		this._value = emptyValue;
		this.state._value = emptyValue;
		this._filteredSuggestions = [...this.state._suggestions];
		this._isOpen = false;

		const detail = { name: this.state._name as string, value: emptyValue };
		this.controller.onFacade.onInput(new CustomEvent('input', { bubbles: true, detail }), true, emptyValue);
		this.controller.onFacade.onChange(new CustomEvent('change', { bubbles: true, detail }), emptyValue);
		this.controller.setFormAssociatedValue(emptyValue);

		this.refInput?.focus();
	}

	private onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this.state._value = target.value;
		this._value = target.value;
		this.controller.onFacade.onInput(event);
		this.setFilteredSuggestionsByQuery(target.value);
		this._focusedOptionIndex = -1;
	}

	private handleKeyDownDropdown(event: KeyboardEvent) {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			this._isOpen = true;
			this.focusSuggestionStartingWith(event.key);
		}
	}

	private setFilteredSuggestionsByQuery(query: string) {
		if (query.trim() === '') {
			this._filteredSuggestions = [...this.state._suggestions];
		} else {
			this._filteredSuggestions = Array.isArray(this.state._suggestions)
				? this.state._suggestions.filter((option: W3CInputValue) => {
						return (option as string).toLowerCase().includes(query.toLowerCase());
					})
				: this._filteredSuggestions;

			this._isOpen = this._filteredSuggestions && this._filteredSuggestions.length > 0 ? true : false;
		}
	}

	private moveFocus(delta: number) {
		if (!this._filteredSuggestions) {
			return;
		}
		let newIndex = this._focusedOptionIndex + delta;

		if (newIndex >= this._filteredSuggestions.length) {
			newIndex = 0;
		}

		if (newIndex < 0) {
			newIndex = this._filteredSuggestions.length - 1;
		}
		this.focusOption(newIndex);
	}

	private focusOption(index: number) {
		this._focusedOptionIndex = index;
		if (this.refSuggestions) {
			const optionElement = this.refSuggestions[index];
			optionElement?.focus();
		}
	}

	private selectFocusedOption(): boolean {
		if (this._filteredSuggestions && this._focusedOptionIndex >= 0 && this._focusedOptionIndex < this._filteredSuggestions.length) {
			this.selectOption(this._filteredSuggestions[this._focusedOptionIndex] as string);
			return true;
		}
		return false;
	}

	private focusSuggestionStartingWith(char: string) {
		const charLowerCase = char.toLowerCase();

		const index =
			Array.isArray(this._filteredSuggestions) &&
			this._filteredSuggestions.length > 0 &&
			this._filteredSuggestions.findIndex((option: W3CInputValue) => (option as string).toLowerCase().startsWith(charLowerCase));

		if (typeof index === 'number') {
			this.focusOption(index);
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-combobox', {
				'has-value': this.state._hasValue,
			}),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const isDisabled = this.state._disabled === true;

		return {
			ref: this.setInputRef,
			state: this.state,
			class: 'kol-combobox__input',
			type: 'text',
			role: 'combobox',
			'aria-activedescendant': this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined,
			'aria-autocomplete': 'both',
			'aria-controls': 'listbox',
			'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
			'aria-expanded': this._isOpen ? 'true' : 'false',
			'aria-label': this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined,
			'aria-labelledby': this.state._id,
			'aria-keyshortcuts': this.state._shortKey,
			value: this.state._value,
			accessKey: this.state._accessKey,
			autocapitalize: 'off',
			autocorrect: 'off',
			disabled: isDisabled,
			customSuggestions: true,
			id: this.state._id,
			name: this.state._name,
			required: this.state._required,
			...this.controller.onFacade,
			onFocus: (event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
			onChange: this.onChange.bind(this),
			onInput: this.onInput.bind(this),
			placeholder: this.state._placeholder,
		};
	}

	public render(): JSX.Element {
		const isDisabled = this.state._disabled === true;
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div class="kol-combobox__group">
						<KolInputStateWrapperFc {...this.getInputProps()} />
						{this.state._value && this.state._hasClearButton && (
							<KolButtonWcTag
								_icons="kolicon-cross"
								_label={this.translateDeleteSelection}
								_hideLabel
								_variant="ghost"
								_disabled={isDisabled}
								data-testid="combobox-delete"
								class="kol-combobox__delete"
								hidden={isDisabled}
								_on={{
									onClick: () => {
										this.clearSelection();
									},
								}}
							/>
						)}
						<IconFC
							icons="kolicon-chevron-down"
							label=""
							class={clsx('kol-custom-suggestions-toggle', {
								'kol-custom-suggestions-toggle--disabled': isDisabled,
							})}
							onClick={this.toggleListbox.bind(this)}
						/>
					</div>
					{
						<CustomSuggestionsOptionsGroupFc
							blockSuggestionMouseOver={this.blockSuggestionMouseOver}
							onKeyDown={this.handleKeyDownDropdown.bind(this)}
							hidden={!this._isOpen || isDisabled}
						>
							{Array.isArray(this._filteredSuggestions) &&
								this._filteredSuggestions.length > 0 &&
								this._filteredSuggestions.map((option, index) => (
									<CustomSuggestionsOptionFc
										disabled={false}
										index={index}
										option={option}
										searchTerm={this.state._value}
										ref={(el) => {
											if (el) this.refSuggestions[index] = el;
										}}
										selected={this.state._value === option}
										onClick={() => {
											this.selectOption(option as string);
											this.toggleListbox();
											this._isOpen = false;
										}}
										onMouseOver={() => {
											if (!this.blockSuggestionMouseOver) {
												this.focusOption(index);
											}
										}}
										onFocus={() => {
											this.focusOption(index);
										}}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === 'NumpadEnter') {
												this.selectOption(option as string);
												this.toggleListbox();
												e.preventDefault();
											}
										}}
									/>
								))}
						</CustomSuggestionsOptionsGroupFc>
					}
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const handleEvent = (isOpen?: boolean, callback?: () => void): void => {
			event.preventDefault();
			if (isOpen !== undefined) {
				this._isOpen = isOpen;
				if (!isOpen) {
					this.refInput?.focus();
				}
			}
			callback?.();
		};
		switch (event.key) {
			case 'Down':
			case 'ArrowDown': {
				this.blockSuggestionMouseOver = true;
				handleEvent(true, () => this.moveFocus(1));
				break;
			}
			case 'Up':
			case 'ArrowUp': {
				this.blockSuggestionMouseOver = true;
				handleEvent(true, () => this.moveFocus(-1));
				break;
			}
			case 'Tab':
				if (this._isOpen) {
					this._isOpen = false;
					this.refInput?.focus();
				}
				break;
			case 'Esc':
			case 'Escape': {
				this._isOpen = false;
				event.preventDefault();
				this.refInput?.focus();
				break;
			}
			case ' ':
			case 'Enter':
			case 'NumpadEnter': {
				if (this._isOpen) {
					if (this.selectFocusedOption()) {
						this._isOpen = false;
					}
				} else {
					this.toggleListbox();
				}
				event.preventDefault();
				break;
			}
			case 'Home': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this.focusOption(0);
					}
				});
				break;
			}
			case 'End': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this.focusOption(this._filteredSuggestions ? this._filteredSuggestions.length - 1 : 0);
					}
				});
				break;
			}
			case 'PageUp': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => this._isOpen && this.moveFocus(-10));
				break;
			}
			case 'PageDown': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => this._isOpen && this.moveFocus(10));
				break;
			}
		}
	}

	private readonly controller: ComboboxController;
	@State()
	private blockSuggestionMouseOver: boolean = false;
	@State()
	private _isOpen: boolean = false;
	@State()
	private _filteredSuggestions?: SuggestionsPropType;

	@Listen('click')
	handleWindowClick(event: MouseEvent) {
		if (this.host !== undefined && !this.host.contains(event.target as Node)) {
			this._isOpen = false;
		}
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Makes the element not focusable and ignore all events.
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
	 * Shows the clear button if enabled.
	 */
	@Prop() public _hasClearButton?: boolean = true;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions!: SuggestionsPropType;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

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

	@State() public state: ComboboxStates = {
		_hasValue: false,
		_hasClearButton: true,
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
		_value: '',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new ComboboxController(this, 'combobox', this.host);
		this.onInput = this.onInput.bind(this);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: PlaceholderPropType): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
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

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
		this._filteredSuggestions = value;
	}

	@Watch('_hasClearButton')
	public validateHasClearButton(value?: boolean): void {
		this.controller.validateHasClearButton(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
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
		this.controller.setFormAssociatedValue(value);
	}

	public componentWillLoad(): void {
		this.refSuggestions = [];
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
		this._filteredSuggestions = this.state._suggestions;
	}

	@Listen('mousemove')
	public handleMouseEvent() {
		this.blockSuggestionMouseOver = false;
	}

	@Listen('focusout')
	public handleFocusOut(event: FocusEvent) {
		setTimeout(() => {
			if (!this.host?.contains(document.activeElement)) {
				this.onBlur(event);
			}
		});
	}
	@Listen('blur')
	public handleWindowBlur(event: FocusEvent) {
		this.onBlur(event);
	}

	private onBlur(event: FocusEvent): void {
		if (this._isOpen) {
			if (event instanceof FocusEvent && event.view === window) {
				this._isOpen = false;
			}
		}
	}

	private onChange(event: Event): void {
		this.controller.onFacade.onChange(event);

		// Static form handling
		this.controller.setFormAssociatedValue(this.state._value as unknown as string);
	}
}
