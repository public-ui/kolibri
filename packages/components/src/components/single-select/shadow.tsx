import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type {
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
	Option,
	OptionsPropType,
	PlaceholderPropType,
	RequiredPropType,
	RowsPropType,
	ShortKeyPropType,
	SingleSelectAPI,
	SingleSelectStates,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

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
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';
import { propagateFocus } from '../../utils/element-focus';
import { SingleSelectController } from './controller';

/**
 * The **SingleSelect** component creates a dropdown list from which exactly one predefined option can be selected.
 *
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-single-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSingleSelect implements SingleSelectAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolSingleSelectElement;
	private refInput?: HTMLInputElement;
	private refOptions: HTMLLIElement[] = [];
	private readonly translateDeleteSelection = translate('kol-delete-selection');
	private readonly translateNoResultsMessage = translate('kol-no-results-message');
	private oldValue?: StencilUnknown;
	// so onBlur doesn't close the panel if clear button is pressed
	private isClearing = false;

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus() {
		await propagateFocus(this.host, this.refInput);
	}

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private toggleListbox = (event: Event) => {
		event?.preventDefault();
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			return;
		} else {
			this.refInput?.focus();
			if (this._isOpen) {
				// Liste schließen
				this._isOpen = false;
			} else {
				// Liste öffnen
				this._isOpen = true;
				const selectedIndex = Array.isArray(this._filteredOptions) ? this._filteredOptions.findIndex((option) => option.label === this._inputValue) : -1;
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : -1;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};

	private onBlur(event: FocusEvent) {
		const matchingOption = this.state._options?.find((option) => (option.label as string)?.toLowerCase() === this._inputValue?.toLowerCase());
		if (matchingOption) {
			this.selectOption(matchingOption as Option<string>);
		} else if (!this._isOpen && this._value) {
			this._inputValue = this.state._options?.find((option) => (option as Option<string>).value === this._value)?.label as string;
			this._filteredOptions = [...this.state._options];
		}
		if (event instanceof FocusEvent && event.view === window && !this.isClearing) {
			this._isOpen = false;
		}
	}

	private createEventWithTarget(type: string, detail: EventDetail): CustomEvent<EventDetail> {
		const event = new CustomEvent<EventDetail>(type, {
			bubbles: true,
			detail,
		});

		if (this.refInput) {
			Object.defineProperty(event, 'target', {
				value: this.refInput,
			});

			Object.defineProperty(event, 'currentTarget', {
				value: this.refInput,
			});
		}
		return event;
	}

	private clearSelection() {
		this.isClearing = true;

		if (this.state._disabled) {
			return;
		}

		const emptyValue = null;
		this._focusedOptionIndex = -1;
		this._value = emptyValue;
		this._inputValue = '';
		this._filteredOptions = [...this.state._options];

		const inputEvent = this.createEventWithTarget('input', {
			name: this.state._name as string,
			value: emptyValue,
		});
		const changeEvent = this.createEventWithTarget('change', {
			name: this.state._name as string,
			value: emptyValue,
		});

		this.controller.onFacade.onInput(inputEvent, true, { value: emptyValue });
		this.controller.onFacade.onChange(changeEvent, { value: emptyValue });

		this.isClearing = false;
	}

	private selectOption(option: Option<string>) {
		if (option.value === this._value) {
			this._inputValue = option.label as string;
			this._filteredOptions = [...this.state._options];
			return;
		}

		this._value = option.value;
		this._inputValue = option.label as string;

		const inputEvent = this.createEventWithTarget('input', {
			name: this.state._name ?? '',
			value: option.value,
		});
		const changeEvent = this.createEventWithTarget('change', {
			name: this.state._name ?? '',
			value: option.value,
		});

		this.controller.onFacade.onInput(inputEvent, false, option.value);
		this.controller.onFacade.onChange(changeEvent, option.value);

		this._filteredOptions = [...this.state._options];

		this.controller.setFormAssociatedValue(this._value);
	}

	private onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this._inputValue = target.value;
		this._isOpen = true;
		this.setFilteredOptionsByQuery(target.value);
		this._focusedOptionIndex = -1;
	}

	private handleKeyDownDropdown(event: KeyboardEvent) {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			event.preventDefault();
			this._isOpen = true;
			this.focusSuggestionStartingWith(event.key);
		}
	}

	private setFilteredOptionsByQuery(query: string) {
		if (query?.trim() === '') {
			this._filteredOptions = [...this.state._options];
		} else if (Array.isArray(this.state._options) && this.state._options.length > 0 && query.length > 0) {
			this._filteredOptions = this.state._options.filter((option) => {
				return (option.label as string)?.toLowerCase()?.includes(query?.toLowerCase());
			});
		}
	}

	private _focusedOptionIndex: number = -1;

	private moveFocus(delta: number) {
		if (!this._filteredOptions) {
			return;
		}
		let newIndex = this._focusedOptionIndex + delta;

		let iterations = 0;
		let foundEnabledOption = false;

		const maxIterations = this._filteredOptions.length;

		while (iterations < maxIterations) {
			if (newIndex >= this._filteredOptions.length) {
				newIndex = 0;
			}
			if (newIndex < 0) {
				newIndex = this._filteredOptions.length - 1;
			}

			const option = this._filteredOptions[newIndex] as Option<StencilUnknown>;
			if (!option.disabled) {
				foundEnabledOption = true;
				break;
			}

			newIndex += delta;
			iterations++;
		}

		if (foundEnabledOption) {
			this._focusedOptionIndex = newIndex;
			this.focusOption(this._focusedOptionIndex);
		}
	}

	private focusOption(index: number) {
		if (this.refOptions) {
			const optionElement = this.refOptions[index];
			optionElement?.focus();
		}
	}

	private selectFocusedOption(): boolean {
		if (Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0 && this._focusedOptionIndex >= 0) {
			this.selectOption(this._filteredOptions[this._focusedOptionIndex] as Option<string>);
			return true;
		}
		return false;
	}

	private focusSuggestionStartingWith(char: string) {
		const charLowerCase = char.toLowerCase();

		const index =
			Array.isArray(this._filteredOptions) &&
			this._filteredOptions.findIndex((option) => (option.label as string).toLowerCase().startsWith(charLowerCase) && !option.disabled);

		if (typeof index === 'number' && index >= 0) {
			this._focusedOptionIndex = index;
			this.focusOption(index);
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: 'kol-single-select',
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const isDisabled = this.state._disabled === true;

		return {
			'aria-activedescendant': this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined,
			'aria-autocomplete': 'both',
			'aria-controls': 'listbox',
			'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
			'aria-label': this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined,
			'aria-keyshortcuts': this.state._shortKey,
			accessKey: this.state._accessKey,
			autocapitalize: 'off',
			autocorrect: 'off',
			class: 'kol-single-select__input',
			disabled: isDisabled,
			name: this.state._name,
			placeholder: this.state._placeholder,
			ref: this.catchRef,
			required: this.state._required,
			role: 'combobox',
			state: this.state,
			type: 'text',
			value: this._inputValue,
			...this.controller.onFacade,
			onChange: this.onChange.bind(this),
			onClick: this.onClick.bind(this),
			onInput: this.onInput.bind(this),
			onFocus: (event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	public render(): JSX.Element {
		const isDisabled = this.state._disabled === true;
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div class="kol-single-select__group">
						<KolInputStateWrapperFc {...this.getInputProps()} />

						{this._inputValue && this.state._hasClearButton && (
							<KolButtonWcTag
								_icons="kolicon-cross"
								_label={this.translateDeleteSelection}
								_hideLabel
								_variant="ghost"
								_disabled={isDisabled}
								data-testid="single-select-delete"
								class="kol-single-select__delete"
								hidden={isDisabled}
								_on={{
									onClick: () => {
										this.clearSelection();
										this.refInput?.focus();
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
							style={{ '--visible-options': `${this._rows ?? 5}` }}
							hidden={!this._isOpen || isDisabled}
						>
							{Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0 ? (
								this._filteredOptions.map((option, index) => (
									<CustomSuggestionsOptionFc
										index={index}
										option={option.label}
										searchTerm={this._inputValue}
										ref={(el) => {
											if (el) this.refOptions[index] = el;
										}}
										selected={this._value === (option as Option<string>).value}
										disabled={option.disabled ? true : false}
										onClick={(event: Event) => {
											if (option.disabled) {
												return;
											}
											this.selectOption(option as Option<string>);
											this.refInput?.focus();
											this.toggleListbox(event);
											this._isOpen = false;
										}}
										onMouseOver={() => {
											if (!this.blockSuggestionMouseOver) {
												this._focusedOptionIndex = index;
												this.focusOption(index);
											}
										}}
										onFocus={() => {
											if (!option.disabled) {
												this._focusedOptionIndex = index;
												this.focusOption(index);
											}
										}}
										onKeyDown={(e) => {
											if (option.disabled) {
												return;
											}
											if (e.key === 'Enter' || e.key === 'NumpadEnter') {
												this.selectOption(option as Option<string>);
												this.refInput?.focus();
												this.toggleListbox(e);
												e.preventDefault();
											}
										}}
									/>
								))
							) : (
								// role=alert is the only role/state thats read from screenreader
								<li class="kol-single-select__no-results-message" role="alert">
									{this.translateNoResultsMessage}{' '}
								</li>
							)}
						</CustomSuggestionsOptionsGroupFc>
					}
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
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
					this._isOpen = !this._isOpen;
					this.refInput?.focus();
				}
				break;
			case 'Esc':
			case 'Escape': {
				this._isOpen = false;
				handleEvent(false);
				break;
			}
			case ' ':
			case 'Enter':
			case 'NumpadEnter': {
				if (this._isOpen) {
					if (this.selectFocusedOption()) {
						this.refInput?.focus();
						handleEvent(false);
					}
				} else {
					this.toggleListbox(event);
				}
				break;
			}
			case 'Home': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this._focusedOptionIndex = 0;
						this.focusOption(this._focusedOptionIndex);
					}
				});
				break;
			}
			case 'End': {
				this.blockSuggestionMouseOver = true;
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this._focusedOptionIndex = this._filteredOptions ? this._filteredOptions.length - 1 : 0;
						this.focusOption(this._focusedOptionIndex);
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

	private readonly controller: SingleSelectController;
	@State()
	private _isOpen = false;
	@State()
	private _filteredOptions?: OptionsPropType = [];
	@State()
	private _inputValue: string = '';
	@State()
	private blockSuggestionMouseOver: boolean = false;

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
	 * Defines the icon classnames (e.g. `icons="fa-solid fa-user"`).
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
	 * Options the user can choose from.
	 */
	@Prop() public _options!: OptionsPropType;

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
	@Prop({ mutable: true, reflect: true }) public _value: StencilUnknown = null;

	/**
	 * Shows the clear button if enabled.
	 */
	@Prop() public _hasClearButton?: boolean = true;

	/**
	 * Maximum number of visible rows of the element.
	 */
	@Prop() public _rows?: RowsPropType;

	@State() public state: SingleSelectStates = {
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_hasClearButton: true,
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new SingleSelectController(this, 'single-select', this.host);
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

	@Watch('_options')
	public validateOptions(value?: OptionsPropType): void {
		this.controller.validateOptions(value);
		this._filteredOptions = value;
		this.updateInputValue(this._value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
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
	public validateValue(value: StencilUnknown): void {
		this.controller.validateValue(value);
		this.oldValue = value;
		this.updateInputValue(value);
	}

	@Watch('_hasClearButton')
	public validateHasClearButton(value?: boolean): void {
		this.controller.validateHasClearButton(value);
	}

	@Watch('_rows')
	public validateRows(value?: number): void {
		this.controller.validateRows(value);
	}

	@Listen('mousemove')
	public handleMouseEvent() {
		this.blockSuggestionMouseOver = false;
	}

	private updateInputValue(value?: StencilUnknown) {
		if (Array.isArray(this._options)) {
			const matchedOption = this._options.find((option) => option.value === value);
			this._inputValue = matchedOption ? String(matchedOption.label) : '';
		}
	}

	public componentWillLoad(): void {
		this.refOptions = [];
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.oldValue = this._value;
		this._filteredOptions = this.state._options;
		this.updateInputValue(this._value);
	}

	private onChange(event: Event): void {
		if (this.oldValue !== this.refInput?.value) {
			this.oldValue = this.refInput?.value;
		}

		if (!this._isOpen) {
			this.controller.onFacade.onChange(event, this._value);
		}
	}

	private onClick(event: MouseEvent): void {
		this.toggleListbox(event);
		this.refInput?.focus();
		this.controller.onFacade.onClick(event);
	}
}
