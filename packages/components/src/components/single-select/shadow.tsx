import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type {
	HideMsgPropType,
	IconsHorizontalPropType,
	IdPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Option,
	OptionsPropType,
	RowsPropType,
	ShortKeyPropType,
	SingleSelectAPI,
	SingleSelectStates,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import clsx from 'clsx';
import { KolIconTag } from '../../core/component-names';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper';
import type { InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper';
import KolInputStateWrapperFc from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import CustomSuggestionsOptionFc from '../../functional-components/CustomSuggestionsOption/CustomSuggestionsOption';
import CustomSuggestionsOptionsGroupFc from '../../functional-components/CustomSuggestionsOptionsGroup';
import CustomSuggestionsToggleFc from '../../functional-components/CustomSuggestionsToggle';
import { translate } from '../../i18n';
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import { nonce } from '../../utils/dev.utils';
import { getRenderStates } from '../input/controller';
import { SingleSelectController } from './controller';

/**
 * @slot - The input field label.
 */
@Component({
	tag: 'kol-single-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolSingleSelect implements SingleSelectAPI {
	@Element() private readonly host?: HTMLKolSingleSelectElement;
	private refInput?: HTMLInputElement;
	private refOptions: HTMLLIElement[] = [];
	private oldValue?: StencilUnknown;

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown | undefined> {
		return this._value;
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.refInput?.focus();
	}

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private toggleListbox = (event: Event) => {
		event?.preventDefault();
		if (this.state._disabled) {
			return;
		} else {
			if (!this._hasOpened) {
				this._isOpen = true;
				this._hasOpened = true;
				this.refInput?.focus();
				const selectedIndex = Array.isArray(this._filteredOptions) ? this._filteredOptions.findIndex((option) => option.label === this._inputValue) : -1;
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : -1;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};

	private onBlur() {
		if (Array.isArray(this.state._options) && this.state._options.length > 0 && !this.state._options.some((option) => option.label === this._inputValue)) {
			this._inputValue = this.state._options.find((option) => (option as Option<string>).value === this._value)?.label as string;
			this._filteredOptions = [...this.state._options];
		}
		this._isOpen = false;
		this._hasOpened = false;
	}

	private clearSelection() {
		if (this.state._disabled) {
			return;
		} else {
			const emptyValue = '';
			this._focusedOptionIndex = -1;
			this._value = emptyValue;
			this._inputValue = emptyValue;
			this._filteredOptions = [...this.state._options];

			this.controller.onFacade.onInput(
				new CustomEvent<EventDetail>('input', { bubbles: true, detail: { name: this.state._name as string, value: emptyValue } }),
				true,
				emptyValue,
			);
			this.controller.onFacade.onChange(
				new CustomEvent<EventDetail>('change', { bubbles: true, detail: { name: this.state._name as string, value: emptyValue } }),
				emptyValue,
			);
		}
	}

	private selectOption(option: Option<string>) {
		this._value = option.value;
		this._inputValue = option.label as string;
		this.controller.onFacade.onInput(
			new CustomEvent<EventDetail>('input', { bubbles: true, detail: { name: this.state._name as string, value: option.value } }),
			false,
			option.value,
		);
		this.controller.onFacade.onChange(
			new CustomEvent<EventDetail>('change', { bubbles: true, detail: { name: this.state._name as string, value: option.value } }),
			option.value,
		);

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
			class: 'kol-single-select',
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.refInput?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const { ariaDescribedBy } = getRenderStates(this.state);

		return {
			'aria-activedescendant': this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined,
			'aria-autocomplete': 'both',
			'aria-controls': 'listbox',
			'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
			'aria-label': this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined,
			accessKey: this.state._accessKey,
			autocapitalize: 'off',
			autocorrect: 'off',
			class: 'kol-single-select__input',
			disabled: this.state._disabled,
			name: this.state._name,
			placeholder: this.state._placeholder,
			ref: this.catchRef,
			required: this.state._required,
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
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div class="kol-single-select__group">
						<KolInputStateWrapperFc {...this.getInputProps()} />

						{this._inputValue && !this.state._hideClearButton && (
							<KolIconTag
								_icons="codicon codicon-close"
								data-testid="single-select-delete"
								_label={translate('kol-delete-selection')}
								onClick={() => {
									this.clearSelection();
									this.refInput?.focus();
								}}
								class={clsx('kol-single-select__delete', {
									'kol-single-select__delete--disabled': this.state._disabled,
								})}
							/>
						)}

						<CustomSuggestionsToggleFc onClick={this.toggleListbox.bind(this)} disabled={this.state._disabled} />
					</div>
					{this._isOpen && !(this.state._disabled === true) && (
						<CustomSuggestionsOptionsGroupFc
							blockSuggestionMouseOver={this.blockSuggestionMouseOver}
							onKeyDown={this.handleKeyDownDropdown.bind(this)}
							style={{ '--visible-options': `${this._rows ?? 5}` }}
						>
							{Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0 ? (
								this._filteredOptions.map((option, index) => (
									<CustomSuggestionsOptionFc
										index={index}
										option={option.label}
										ref={(el) => {
											if (el) this.refOptions[index] = el;
										}}
										selected={this._value === (option as Option<string>).value}
										onClick={(event: Event) => {
											this.selectOption(option as Option<string>);
											this.refInput?.focus();
											this.toggleListbox(event);
											this._isOpen = false;
											this._hasOpened = false;
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
												this.selectOption(option as Option<string>);
												this.refInput?.focus();
												this.toggleListbox(e);
												e.preventDefault();
											}
										}}
									/>
								))
							) : (
								<li class="kol-single-select__no-results-message">{translate('kol-no-results-message')} </li>
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
			if (!this.host?.contains(document.activeElement)) {
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
				if (this._isOpen) {
					if (Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0) {
						this.selectOption(this._filteredOptions[this._focusedOptionIndex] as Option<string>);
						this.refInput?.focus();
						handleEvent(false);
					}
				} else {
					this.toggleListbox(event);
				}
				break;
			}
			case 'NumpadEnter':
			case 'Enter': {
				this.toggleListbox(event);
				this._hasOpened = false;
				this._isOpen = false;
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
	@State()
	private _hasOpened = false;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
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
	@Prop({ mutable: true, reflect: true }) public _hideMsg?: boolean = false;

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
	 * Adds a visual short key hint to the component.
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
	@Prop({ mutable: true, reflect: true }) public _value?: StencilUnknown;

	/**
	 * Defines the whether the clear button should be hidden.
	 */
	@Prop() public _hideClearButton?: boolean = false;

	/**
	 * Maximum number of visible rows in the options dropdown before scrolling.
	 */
	@Prop() public _rows?: RowsPropType;

	@State() public state: SingleSelectStates = {
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_hideClearButton: false,
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new SingleSelectController(this, 'single-select', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
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
		this.updateInputValue(this._value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
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
	public validateValue(value?: StencilUnknown): void {
		this.controller.validateValue(value);
		this.oldValue = value;
		this.updateInputValue(value);
	}

	@Watch('_hideClearButton ')
	public validateHideClearButton(value?: boolean): void {
		this.controller.validateHideClearButton(value);
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
		this.controller.onFacade.onClick(event);
	}
}
