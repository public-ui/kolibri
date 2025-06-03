import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type {
	ComboboxAPI,
	ComboboxStates,
	HideMsgPropType,
	IconsHorizontalPropType,
	IdPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	W3CInputValue,
} from '../../schema';
import clsx from 'clsx';
import { nonce } from '../../utils/dev.utils';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import { ComboboxController } from './controller';
import { getRenderStates } from '../input/controller';
import type { InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper';
import KolInputStateWrapperFc from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper';
import CustomSuggestionsToggleFc from '../../functional-components/CustomSuggestionsToggle';
import CustomSuggestionsOptionFc from '../../functional-components/CustomSuggestionsOption/CustomSuggestionsOption';
import CustomSuggestionsOptionsGroupFc from '../../functional-components/CustomSuggestionsOptionsGroup';
import type { EventDetail } from '../../schema/interfaces/EventDetail';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-combobox',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolCombobox implements ComboboxAPI {
	@Element() private readonly host?: HTMLKolComboboxElement;
	private refInput?: HTMLInputElement;
	private refSuggestions: HTMLLIElement[] = [];
	private _focusedOptionIndex: number = -1;

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.state._value;
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.refInput?.focus();
	}

	private toggleListbox = () => {
		if (this.state._disabled === true) {
			this._isOpen = false;
		} else {
			this.refInput?.focus();
			if (!this._hasOpened && Array.isArray(this._filteredSuggestions) && this._filteredSuggestions.length > 0) {
				this._isOpen = true;
				this._hasOpened = true;
				const selectedIndex = this._filteredSuggestions.findIndex((option) => option === this.state._value);
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : -1;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};
	private readonly catchRef = (ref?: HTMLInputElement) => {
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
			this._filteredSuggestions = [...this._suggestions];
		} else {
			this._filteredSuggestions = Array.isArray(this._suggestions)
				? this._suggestions.filter((option: W3CInputValue) => {
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
			onClick: () => this.refInput?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const { ariaDescribedBy } = getRenderStates(this.state);

		return {
			ref: this.catchRef,
			state: this.state,
			class: 'kol-combobox__input',
			type: 'text',
			role: 'combobox',
			'aria-autocomplete': 'both',
			'aria-expanded': this._isOpen ? 'true' : 'false',
			'aria-controls': 'listbox',
			'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
			'aria-label': this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined,
			'aria-labelledby': this.state._id,
			'aria-activedescendant': this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined,
			value: this.state._value,
			accessKey: this.state._accessKey,
			autocapitalize: 'off',
			autocorrect: 'off',
			disabled: this.state._disabled,
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
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div class="kol-combobox__group">
						<KolInputStateWrapperFc {...this.getInputProps()} />
						<CustomSuggestionsToggleFc onClick={this.toggleListbox.bind(this)} disabled={this.state._disabled} />
					</div>

					{this._isOpen && !(this.state._disabled === true) && (
						<CustomSuggestionsOptionsGroupFc blockSuggestionMouseOver={this.blockSuggestionMouseOver} onKeyDown={this.handleKeyDownDropdown.bind(this)}>
							{Array.isArray(this._filteredSuggestions) &&
								this._filteredSuggestions.length > 0 &&
								this._filteredSuggestions.map((option, index) => (
									<CustomSuggestionsOptionFc
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
											this._hasOpened = false;
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
					)}
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
				this._hasOpened = false;
				this._isOpen = false;
				event.preventDefault();
				this.refInput?.focus();
				break;
			}
			case 'NumpadEnter':
			case 'Enter': {
				if (this._isOpen && this._focusedOptionIndex >= 0) {
					this._filteredSuggestions && this.selectOption(this._filteredSuggestions[this._focusedOptionIndex] as string);
					this._isOpen = false;
					this._hasOpened = false;
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
	@State()
	private _hasOpened = false;

	@Listen('click', { target: 'window' })
	handleWindowClick(event: MouseEvent) {
		if (this.host != undefined && !this.host.contains(event.target as Node)) {
			this._isOpen = false;
		}
	}

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
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions!: SuggestionsPropType;

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
	@Prop({ mutable: true, reflect: true }) public _value?: string;

	@State() public state: ComboboxStates = {
		_hasValue: false,
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

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
		this._filteredSuggestions = value;
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
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

	private onBlur() {
		this._hasOpened = false;
		if (this._isOpen) {
			this._isOpen = !this._isOpen;
			this.refInput?.focus();
		}
	}

	private onChange(event: Event): void {
		this.controller.onFacade.onChange(event);

		// Static form handling
		this.controller.setFormAssociatedValue(this.state._value as unknown as string);
	}
}
