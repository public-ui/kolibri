import type {
	HideErrorPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Option,
	OptionsPropType,
	SingleSelectAPI,
	SingleSelectStates,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { showExpertSlot } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { SingleSelectController } from './controller';
import { KolIconTag, KolInputWcTag } from '../../core/component-names';
import { InternalUnderlinedBadgeText } from '../span/InternalUnderlinedBadgeText';
import { getRenderStates } from '../input/controller';
import { translate } from '../../i18n';
import clsx from 'clsx';

/**
 * @slot - The input field label.
 */
@Component({
	tag: 'kol-single-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSingleSelect implements SingleSelectAPI {
	@Element() private readonly host?: HTMLKolSingleSelectElement;
	private refInput?: HTMLInputElement;
	private refOptions: HTMLLIElement[] = [];
	private oldValue?: string;

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

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private toggleListbox = (event: Event) => {
		event?.preventDefault();
		if (this.state._disabled) {
			return;
		} else {
			this._isOpen = !this._isOpen;
			if (this._isOpen) {
				this.refInput?.focus();
				const selectedIndex = Array.isArray(this._filteredOptions) ? this._filteredOptions.findIndex((option) => option.label === this._inputValue) : -1;
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};

	private onBlur() {
		if (Array.isArray(this.state._options) && this.state._options.length > 0 && !this.state._options.some((option) => option.label === this._inputValue)) {
			this._inputValue = this.state._options.find((option) => (option as Option<string>).value === this.state._value)?.label as string;
			this._filteredOptions = [...this.state._options];
		}
		this._isOpen = false;
	}

	private clearSelection() {
		if (this.state._disabled) {
			return;
		} else {
			this._focusedOptionIndex = -1;
			this.state._value = '';
			this._inputValue = '';
			this._filteredOptions = [...this.state._options];

			this.controller.setFormAssociatedValue(this.state._value);
		}
	}

	private selectOption(event: Event, option: Option<string>) {
		this.state._value = option.value;
		this._inputValue = option.label as string;
		this.controller.onFacade.onChange(event, option.value);
		this.controller.onFacade.onInput(event, false, option.value);

		this._filteredOptions = [...this.state._options];

		this.controller.setFormAssociatedValue(this.state._value);
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

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._label);
		const { ariaDescribedBy } = getRenderStates(this.state);

		return (
			<Host class="kol-single-select">
				<div class={`single-select ${this.state._disabled === true ? 'disabled' : ''} `}>
					<KolInputWcTag
						_accessKey={this.state._accessKey}
						_disabled={this.state._disabled}
						_hideError={this.state._hideError}
						_hideLabel={this.state._hideLabel}
						_hint={this.state._hint}
						_icons={this.state._icons}
						_id={this.state._id}
						_label={this.state._label}
						_msg={this.state._msg}
						_required={this.state._required}
						_tooltipAlign={this._tooltipAlign}
						_touched={this.state._touched}
						role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
					>
						<span slot="label">
							{hasExpertSlot ? (
								<slot name="expert"></slot>
							) : typeof this.state._accessKey === 'string' ? (
								<>
									<InternalUnderlinedBadgeText badgeText={this.state._accessKey} label={this.state._label} />{' '}
									<span class="access-key-hint" aria-hidden="true">
										{this.state._accessKey}
									</span>
								</>
							) : (
								<span>{this.state._label}</span>
							)}
						</span>
						<div slot="input">
							<div class="single-select__group">
								<input
									ref={this.catchRef}
									class="single-select__input"
									type="text"
									aria-autocomplete="both"
									aria-controls="listbox"
									value={this._inputValue}
									accessKey={this.state._accessKey}
									aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
									aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
									aria-activedescendant={this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined}
									autoCapitalize="off"
									autoCorrect="off"
									disabled={this.state._disabled}
									name={this.state._name}
									required={this.state._required}
									spellcheck="false"
									{...this.controller.onFacade}
									onInput={this.onInput.bind(this)}
									onChange={this.onChange.bind(this)}
									placeholder={this.state._placeholder}
									onClick={this.toggleListbox.bind(this)}
								/>
								{this._inputValue && (
									<KolIconTag
										_icons="codicon codicon-close"
										_label={translate('kol-delete-selection')}
										onClick={() => {
											this.clearSelection();
											this.refInput?.focus();
										}}
										class="single-select__delete"
									/>
								)}

								<button tabindex="-1" class="single-select__button" onClick={this.toggleListbox.bind(this)} disabled={this.state._disabled}>
									<KolIconTag _icons="codicon codicon-triangle-down" _label={translate('kol-dropdown')} />
								</button>
							</div>
							{this._isOpen && !(this.state._disabled === true) && (
								<ul
									role="listbox"
									class={clsx('single-select__listbox', this.blockSuggestionMouseOver && 'single-select__listbox--cursor-hidden')}
									onKeyDown={this.handleKeyDownDropdown.bind(this)}
								>
									{Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0 ? (
										this._filteredOptions.map((option, index) => (
											<li
												id={`option-${index}`}
												key={`-${index}`}
												ref={(el) => {
													if (el) this.refOptions[index] = el;
												}}
												tabIndex={-1}
												role="option"
												aria-selected={this.state._value === (option as Option<string>).value}
												onClick={(event: Event) => {
													this.selectOption(event, option as Option<string>);
													this.refInput?.focus();
													this.toggleListbox(event);
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
												class="single-select__item"
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === 'NumpadEnter') {
														this.selectOption(e, option as Option<string>);
														this.refInput?.focus();
														this.toggleListbox(e);
														e.preventDefault();
													}
												}}
											>
												<input
													class="visually-hidden"
													type="radio"
													name="options"
													id={`option-radio-${index}`}
													value={(option as Option<string>).value}
													checked={this.state._value === (option as Option<string>).value || index === this._focusedOptionIndex}
												/>

												<label htmlFor={`option-radio-${index}`} class="radio-label">
													{option.label}
												</label>
											</li>
										))
									) : (
										<li class="single-select__no-results-message">{translate('kol-no-results-message')} </li>
									)}
								</ul>
							)}
						</div>
					</KolInputWcTag>
				</div>
			</Host>
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
				handleEvent(false);
				break;
			}
			case ' ': {
				if (this._isOpen) {
					if (Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0) {
						this.selectOption(event, this._filteredOptions[this._focusedOptionIndex] as Option<string>);
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
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _hideError?: boolean = false;

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
	@Prop() public _icons?: Stringified<KoliBriHorizontalIcons>;

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
	@Prop() public _msg?: MsgPropType;

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
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

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
	@Prop({ mutable: true }) public _value?: string;

	@State() public state: SingleSelectStates = {
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_value: '',
	};

	public constructor() {
		this.controller = new SingleSelectController(this, 'single-select', this.host);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideError')
	public validateHideError(value?: HideErrorPropType): void {
		this.controller.validateHideError(value);
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
	public validateIcons(value?: Stringified<KoliBriHorizontalIcons>): void {
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
	public validateMsg(value?: MsgPropType): void {
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

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
		this.oldValue = value;
		this.updateInputValue(value);
	}

	@Listen('mousemove')
	public handleMouseEvent() {
		this.blockSuggestionMouseOver = false;
	}

	private updateInputValue(value?: string) {
		if (Array.isArray(this._options)) {
			const matchedOption = this._options.find((option) => (option as Option<string>).value === value);
			this._inputValue = matchedOption ? (matchedOption.label as string) : '';
		}
	}

	public componentWillLoad(): void {
		this.refOptions = [];
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.oldValue = this._value;
		this._filteredOptions = this._options;
		this.updateInputValue(this._value);
	}

	private onChange(event: Event): void {
		if (this.oldValue !== this.refInput?.value) {
			this.oldValue = this.refInput?.value;
		}
		// Event handling
		stopPropagation(event);
		tryToDispatchKoliBriEvent('change', this.host, this._value);

		// Callback
		if (typeof this.state._on?.onChange === 'function' && !this._isOpen) {
			this.state._on.onChange(event, this._value && this.oldValue !== this.refInput?.value);
		}
	}
}
