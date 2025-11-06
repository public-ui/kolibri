import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type {
	DisabledPropType,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	IdPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	MultiSelectAPI,
	MultiSelectStates,
	NamePropType,
	Option,
	OptionsPropType,
	PlaceholderPropType,
	RequiredPropType,
	RowsPropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import clsx from 'clsx';
import { KolBadgeTag, KolIconTag } from '../../core/component-names';
import { getRenderStates } from '../../functional-component-wrappers/_helpers/getRenderStates';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import type { InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import KolInputStateWrapperFc from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import CustomSuggestionsOptionFc from '../../functional-components/CustomSuggestionsOption/CustomSuggestionsOption';
import CustomSuggestionsOptionsGroupFc from '../../functional-components/CustomSuggestionsOptionsGroup';
import CustomSuggestionsToggleFc from '../../functional-components/CustomSuggestionsToggle';
import { translate } from '../../i18n';
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import { nonce } from '../../utils/dev.utils';
import { MultiSelectController } from './controller';

/**
 * @slot - The input field label.
 */
@Component({
	tag: 'kol-multi-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolMultiSelect implements MultiSelectAPI {
	@Element() private readonly host?: HTMLKolMultiSelectElement;
	private refInput?: HTMLInputElement;
	private refOptions: HTMLLIElement[] = [];
	private readonly translateDeleteSelection = translate('kol-delete-selection');
	private readonly translateNoResultsMessage = translate('kol-no-results-message');
	private readonly translateSelectedOptions = translate('kol-selected-options');
	private readonly translateRemove = translate('kol-remove-selection');

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown[]> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.refInput?.focus();
	}

	private _focusedOptionIndex: number = -1;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private toggleListbox = (event: Event) => {
		event?.preventDefault();
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			return;
		}

		if (!this._hasOpened) {
			this._isOpen = true;
			this._hasOpened = true;
			this.refInput?.focus();
			this._focusedOptionIndex = 0;
			this.focusOption(this._focusedOptionIndex);
		}
	};

	private onBlur() {
		this._isOpen = false;
		this._hasOpened = false;
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
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			return;
		}

		const emptyValue: StencilUnknown[] = [];
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
	}

	private selectOption(option: Option<string>) {
		const currentValues = Array.isArray(this._value) ? [...this._value] : [];
		const optionValue = option.value;

		const isSelected = currentValues.includes(optionValue);

		if (isSelected) {
			this._value = currentValues.filter((val) => val !== optionValue);
		} else {
			this._value = [...currentValues, optionValue];
		}

		const inputEvent = this.createEventWithTarget('input', {
			name: this.state._name ?? '',
			value: this._value,
		});
		const changeEvent = this.createEventWithTarget('change', {
			name: this.state._name ?? '',
			value: this._value,
		});

		this.controller.onFacade.onInput(inputEvent, false, this._value);
		this.controller.onFacade.onChange(changeEvent, this._value);

		this._inputValue = '';
		this._filteredOptions = [...this.state._options];
		this.controller.setFormAssociatedValue(this._value);

		if (this.refInput) {
			this.refInput.value = '';
		}
	}

	private removeOption(value: StencilUnknown) {
		const isDisabled = this.state._disabled === true;
		if (isDisabled) {
			return;
		}

		const currentValues = Array.isArray(this._value) ? [...this._value] : [];
		const newValue = currentValues.filter((val) => val !== value);

		this._value = [...newValue];

		const inputEvent = this.createEventWithTarget('input', {
			name: this.state._name ?? '',
			value: this._value,
		});
		const changeEvent = this.createEventWithTarget('change', {
			name: this.state._name ?? '',
			value: this._value,
		});

		this.controller.onFacade.onInput(inputEvent, false, this._value);
		this.controller.onFacade.onChange(changeEvent, this._value);
		this.controller.setFormAssociatedValue(this._value);
		this.badgeRefs = [];
	}

	private onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this._inputValue = target.value;
		this._isOpen = true;
		this.setFilteredOptionsByQuery(target.value);
		this._focusedOptionIndex = 0;
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

	private moveFocus(delta: number) {
		if (!this._filteredOptions) {
			return;
		}
		let newIndex = this._focusedOptionIndex + delta;

		if (newIndex >= this._filteredOptions.length) {
			newIndex = 0;
		}

		if (newIndex < 0) {
			newIndex = this._filteredOptions.length - 1;
		}

		this._focusedOptionIndex = newIndex;
		this.focusOption(this._focusedOptionIndex);
	}

	private focusOption(index: number) {
		if (this.refOptions) {
			const optionElement = this.refOptions[index];
			optionElement?.focus();
		}
	}

	private focusSuggestionStartingWith(char: string) {
		const charLowerCase = char.toLowerCase();

		const index =
			Array.isArray(this._filteredOptions) && this._filteredOptions.findIndex((option) => (option.label as string).toLowerCase().startsWith(charLowerCase));

		if (typeof index === 'number') {
			this._focusedOptionIndex = index;
			this.focusOption(index);
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: 'kol-multi-select',
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.refInput?.focus(),
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
			'aria-multiselectable': 'true',
			role: 'combobox',
			accessKey: this.state._accessKey,
			autocapitalize: 'off',
			autocorrect: 'off',
			class: 'kol-multi-select__input',
			disabled: isDisabled,
			name: this.state._name,
			placeholder: this.state._placeholder,
			ref: this.catchRef,
			required: this.state._required,
			state: this.state,
			type: 'text',
			value: this._inputValue,
			...this.controller.onFacade,
			onKeyDown: (e) => {
				this.handleInputKeyDown(e);
				this.getInputProps().onKeyDown?.(e);
			},
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

	private getSelectedOptions(): Option<string>[] {
		if (!Array.isArray(this._value) || !Array.isArray(this.state._options)) {
			return [];
		}

		return this.state._options.filter((option) => this._value.includes((option as Option<string>).value)) as Option<string>[];
	}

	private isOptionSelected(option: Option<string>): boolean {
		return Array.isArray(this._value) && this._value.includes(option.value);
	}

	private badgeRefs: HTMLDivElement[] = [];

	private readonly catchBadgeRef = (index: number) => (ref?: HTMLDivElement) => {
		if (ref) {
			this.badgeRefs[index] = ref;
		}
	};

	private handleBadgeKeyDown(event: KeyboardEvent, value: StencilUnknown, index: number) {
		switch (event.key) {
			case 'Delete':
			case 'Backspace': {
				event.preventDefault();
				const totalChips = this.badgeRefs.length;
				const nextIndex = index < totalChips - 1 ? index : index - 1;

				this.removeOption(value);

				if (this.badgeRefs.length > 0) {
					const targetIndex = Math.min(nextIndex, this.badgeRefs.length - 1);
					if (targetIndex >= 0 && this.badgeRefs[targetIndex]) {
						this.badgeRefs[targetIndex].focus();
					} else {
						this.refInput?.focus();
					}
				} else {
					this.refInput?.focus();
				}

				break;
			}
			case 'ArrowLeft': {
				event.preventDefault();
				if (index > 0) {
					this.badgeRefs[index - 1]?.focus();
				}
				break;
			}
			case 'ArrowRight': {
				event.preventDefault();
				if (index < this.badgeRefs.length - 1) {
					this.badgeRefs[index + 1]?.focus();
				} else {
					this.refInput?.focus();
				}
				break;
			}
			case 'Home': {
				event.preventDefault();
				this.badgeRefs[0]?.focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				this.refInput?.focus();
				break;
			}
		}
	}

	private handleInputKeyDown(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;
		const cursorPosition = target.selectionStart ?? 0;
		const isInputEmpty = inputValue === '';
		const isCursorAtStart = cursorPosition === 0;

		if (event.key === 'Backspace' && isInputEmpty && Array.isArray(this._value) && this._value.length > 0) {
			event.preventDefault();
			const lastBadgeIndex = this.badgeRefs.length - 1;
			if (lastBadgeIndex >= 0 && this.badgeRefs[lastBadgeIndex]) {
				this.badgeRefs[lastBadgeIndex].focus();
			}
		} else if (event.key === 'ArrowLeft' && isInputEmpty && isCursorAtStart && this.badgeRefs.length > 0) {
			event.preventDefault();
			const lastBadgeIndex = this.badgeRefs.length - 1;
			if (lastBadgeIndex >= 0 && this.badgeRefs[lastBadgeIndex]) {
				this.badgeRefs[lastBadgeIndex].focus();
			}
		}
	}

	public render(): JSX.Element {
		const isDisabled = this.state._disabled === true;
		const selectedOptions = this.getSelectedOptions();
		const hasSelections = selectedOptions.length > 0;

		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div
						class={clsx('kol-multi-select__content', {
							'kol-multi-select__content--disabled': isDisabled,
						})}
					>
						{hasSelections && (
							<div class="kol-multi-select__badges" role="list" aria-label={this.translateSelectedOptions}>
								{selectedOptions.map((option, index) => (
									<div
										key={`badge-${option.value}-${index}`}
										ref={this.catchBadgeRef(index)}
										tabindex={isDisabled ? -1 : 0}
										role="button"
										aria-label={`${option.label}`}
										onKeyDown={(e) => this.handleBadgeKeyDown(e, option.value, index)}
									>
										<KolBadgeTag
											_label={option.label as string}
											_smartButton={{
												_label: `${this.translateRemove} ${option.label}`,
												_icons: 'codicon codicon-close',
												_hideLabel: true,
												_tabIndex: -1,
												_on: {
													onClick: (event: Event) => {
														event.stopPropagation();
														this.removeOption(option.value);
														requestAnimationFrame(() => {
															this.refInput?.focus();
														});
													},
												},
											}}
										/>
									</div>
								))}
							</div>
						)}

						<div class="kol-multi-select__input-wrapper">
							<KolInputStateWrapperFc
								{...this.getInputProps()}
								onKeyDown={(e) => {
									this.handleInputKeyDown(e);
									this.getInputProps().onKeyDown?.(e);
								}}
							/>
						</div>

						{hasSelections && !this.state._hideClearButton && (
							<KolIconTag
								_icons="codicon codicon-close"
								data-testid="multi-select-delete"
								_label={this.translateDeleteSelection}
								onClick={() => {
									this.clearSelection();
									this.refInput?.focus();
								}}
								class={clsx('kol-multi-select__delete', {
									'kol-multi-select__delete--disabled': isDisabled,
								})}
								tabIndex={isDisabled ? -1 : 0}
							/>
						)}

						<CustomSuggestionsToggleFc onClick={this.toggleListbox.bind(this)} disabled={isDisabled} tabIndex={isDisabled ? -1 : 0} />
					</div>

					{this._isOpen && !isDisabled && (
						<CustomSuggestionsOptionsGroupFc
							blockSuggestionMouseOver={this.blockSuggestionMouseOver}
							onKeyDown={this.handleKeyDownDropdown.bind(this)}
							style={{ '--visible-options': `${this._rows ?? 5}` }}
						>
							{Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0 ? (
								this._filteredOptions.map((option, index) => {
									const isSelected = this.isOptionSelected(option as Option<string>);
									const canSelect = !isSelected;

									return (
										<CustomSuggestionsOptionFc
											index={index}
											option={option.label}
											searchTerm={this._inputValue}
											ref={(el) => {
												if (el) this.refOptions[index] = el;
											}}
											selected={isSelected}
											onClick={() => {
												if (canSelect || isSelected) {
													this.selectOption(option as Option<string>);
													this.refInput?.focus();
												}
											}}
											onMouseOver={() => {
												if (!this.blockSuggestionMouseOver) {
													this._focusedOptionIndex = index;
													this.focusOption(index);
												}
											}}
											onFocus={() => {
												this._focusedOptionIndex = index;
												this.focusOption(index);
											}}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === 'NumpadEnter') {
													if (canSelect || isSelected) {
														this.selectOption(option as Option<string>);
														this.refInput?.focus();
													}
													e.preventDefault();
												}
											}}
										/>
									);
								})
							) : (
								<li class="kol-multi-select__no-results-message">{this.translateNoResultsMessage}</li>
							)}
						</CustomSuggestionsOptionsGroupFc>
					)}
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	@Listen('focusout', { target: 'window' })
	public handleFocusOut() {
		setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			if (!this.host!.contains(document.activeElement)) {
				this.onBlur();
			}
		}, 0);
	}

	@Listen('blur', { target: 'window' })
	public handleWindowBlur() {
		this.onBlur();
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const activeElement = document.activeElement;
		const isBadgeFocused = this.badgeRefs.some((badge) => badge === activeElement);

		if (isBadgeFocused) {
			return;
		}

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
				this._hasOpened = false;
				this._isOpen = false;
				handleEvent(false);
				break;
			}
			case ' ': {
				event.preventDefault();
				if (this._isOpen) {
					if (
						Array.isArray(this._filteredOptions) &&
						this._filteredOptions.length > 0 &&
						this._focusedOptionIndex >= 0 &&
						this._focusedOptionIndex < this._filteredOptions.length
					) {
						this.selectOption(this._filteredOptions[this._focusedOptionIndex] as Option<string>);
						this.refInput?.focus();
					}
				} else {
					this.toggleListbox(event);
				}
				this.refInput!.value = '';
				break;
			}
			case 'NumpadEnter':
			case 'Enter': {
				event.preventDefault();
				if (this._isOpen) {
					if (
						Array.isArray(this._filteredOptions) &&
						this._filteredOptions.length > 0 &&
						this._focusedOptionIndex >= 0 &&
						this._focusedOptionIndex < this._filteredOptions.length
					) {
						this.selectOption(this._filteredOptions[this._focusedOptionIndex] as Option<string>);
						this.refInput?.focus();
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

	private readonly controller: MultiSelectController;
	@State()
	private _isOpen = false;
	@State()
	private _filteredOptions?: OptionsPropType = [];
	@State()
	private _inputValue: string = '';
	@State()
	private blockSuggestionMouseOver: boolean = false;
	@State()
	private _hasOpened = false;

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
	 * Defines the whether the clear button should be hidden.
	 */
	@Prop() public _hideClearButton?: boolean = false;

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
	 * Defines the internal ID of the primary component element.
	 * @deprecated Will be removed in the next major version.
	 */
	@Prop() public _id?: IdPropType;

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
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true, reflect: true }) public _value: StencilUnknown[] = [];

	/**
	 * Maximum number of visible rows in the options dropdown before scrolling.
	 */
	@Prop() public _rows?: RowsPropType;

	@State() public state: MultiSelectStates = {
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '',
		_options: [],
		_hideClearButton: false,
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new MultiSelectController(this, 'multi-select', this.host);
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

	@Watch('_hideClearButton')
	public validateHideClearButton(value?: boolean): void {
		this.controller.validateHideClearButton(value);
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

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
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
	public validateValue(value?: StencilUnknown[]): void {
		this.controller.validateValue(value);
	}

	@Watch('_rows')
	public validateRows(value?: number): void {
		this.controller.validateRows(value);
	}

	@Listen('mousemove')
	public handleMouseEvent() {
		this.blockSuggestionMouseOver = false;
	}

	public componentWillLoad(): void {
		this.refOptions = [];
		this.badgeRefs = [];
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this._filteredOptions = this.state._options;

		if (!Array.isArray(this._value)) {
			this._value = this._value ? [this._value] : [];
		}

		this.controller.setFormAssociatedValue(this._value);
	}

	private onChange(event: Event): void {
		if (!this._isOpen) {
			this.controller.onFacade.onChange(event, this._value);
		}
	}

	private onClick(_event: MouseEvent): void {
		this.toggleListbox(_event);
		this.controller.onFacade.onClick(_event);
	}
}
