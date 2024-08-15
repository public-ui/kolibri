import type {
	ComboboxAPI,
	ComboboxStates,
	HideErrorPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	W3CInputValue,
} from '../../schema';
import { showExpertSlot } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { ComboboxController } from './controller';
import { KolIconTag, KolInputWcTag } from '../../core/component-names';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { getRenderStates } from '../input/controller';
import { translate } from '../../i18n';
import clsx from 'clsx';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-combobox',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCombobox implements ComboboxAPI {
	@Element() private readonly host?: HTMLKolComboboxElement;
	private refInput?: HTMLInputElement;
	private refSuggestions: HTMLLIElement[] = [];
	private _focusedOptionIndex: number = -1;

	/**
	 * Get value of input.
	 * @returns {Promise<string | undefined>}
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.state._value;
	}

	/**
	 * Sets the focus on the input.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.refInput?.focus();
	}

	private toggleListbox = () => {
		if (this.state._disabled === true) {
			this._isOpen = false;
		} else {
			this._isOpen = !this._isOpen;
			this.refInput?.focus();
			if (this._isOpen && Array.isArray(this._filteredSuggestions) && this._filteredSuggestions.length > 0) {
				const selectedIndex = this._filteredSuggestions.findIndex((option) => option === this.state._value);
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this.focusOption(this._focusedOptionIndex);
			}
		}
	};
	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.refInput = ref;
	};

	private selectOption(event: Event, option: string) {
		this.controller.onFacade.onInput(event, true, option);
		this.controller.onFacade.onChange(event, option);
		this.controller.setFormAssociatedValue(option);
		this.state._value = option;
		this.refInput?.focus();
	}
	private onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		this.state._value = target.value;
		this.controller.onFacade.onInput(event);
		this.setFilteredSuggestionsByQuery(target.value);
		this._focusedOptionIndex = -1;
	};

	private handleKeyDownDropdown = (event: KeyboardEvent) => {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			this._isOpen = true;
			this.focusSuggestionStartingWith(event.key);
		}
	};

	private setFilteredSuggestionsByQuery(query: string) {
		if (query.trim() === '') {
			this._filteredSuggestions = [...this._suggestions];
		} else {
			this._filteredSuggestions = this._suggestions.filter((option: string) => {
				return option.toLowerCase().includes(query.toLowerCase());
			});

			this._isOpen = this._filteredSuggestions && this._filteredSuggestions.length > 0;
		}
	}

	private moveFocus(delta: number) {
		if (this._filteredSuggestions === null || this._filteredSuggestions === undefined) {
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
		if (this.refSuggestions?.length > 0) {
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

	private handleClickListItem = (option: string) => (e: MouseEvent) => {
		this.selectOption(e, option);
		this.toggleListbox();
	};

	private handleMouseOver = (index: number) => () => {
		if (!this.blockSuggestionMouseOver) {
			this.focusOption(index);
		}
	};

	private handleFocus = (index: number) => () => {
		this.focusOption(index);
	};

	private handleOnKeyDown = (option: string) => (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'NumpadEnter') {
			this.selectOption(e, option);
			this.toggleListbox();
			e.preventDefault();
		}
	};

	private handleClick = (): void => {
		this.refInput?.focus();
	};

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._label);
		const { ariaDescribedBy } = getRenderStates(this.state);

		return (
			<Host class="kol-combobox">
				<div class={clsx('combobox', this.state._disabled && 'combobox--disabled')}>
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
						onClick={this.handleClick}
						role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
					>
						<span slot="label">
							{hasExpertSlot ? (
								<slot name="expert"></slot>
							) : typeof this.state._accessKey === 'string' ? (
								<>
									<InternalUnderlinedAccessKey accessKey={this.state._accessKey} label={this.state._label} />{' '}
									<span class="access-key-hint" aria-hidden="true">
										{this.state._accessKey}
									</span>
								</>
							) : (
								<span>{this.state._label}</span>
							)}
						</span>
						<div slot="input">
							<div class="combobox__group">
								<input
									ref={this.catchRef}
									class="combobox__input"
									type="text"
									role="combobox"
									aria-autocomplete="both"
									aria-expanded={this._isOpen ? 'true' : 'false'}
									aria-controls="listbox"
									value={this.state._value}
									accessKey={this.state._accessKey}
									aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
									aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
									aria-labelledby={this.state._id}
									aria-activedescendant={this._isOpen && this._focusedOptionIndex >= 0 ? `option-${this._focusedOptionIndex}` : undefined}
									autoCapitalize="off"
									autoCorrect="off"
									disabled={this.state._disabled}
									id={this.state._id}
									name={this.state._name}
									required={this.state._required}
									spellcheck="false"
									{...this.controller.onFacade}
									onInput={this.onInput}
									onChange={this.onChange}
									placeholder={this.state._placeholder}
								/>
								<button tabindex="-1" class="combobox__icon" onClick={this.toggleListbox} disabled={this.state._disabled}>
									<KolIconTag _icons="codicon codicon-triangle-down" _label={translate('kol-dropdown')} />
								</button>
							</div>
							{this._isOpen && !(this.state._disabled === true) && (
								<ul
									role="listbox"
									class={clsx('combobox__listbox', this.blockSuggestionMouseOver && 'combobox__listbox--cursor-hidden')}
									onKeyDown={this.handleKeyDownDropdown}
								>
									{Array.isArray(this._filteredSuggestions) &&
										this._filteredSuggestions.length > 0 &&
										this._filteredSuggestions.map((option, index) => (
											<li
												id={`option-${index}`}
												key={`-${index}`}
												ref={(el) => {
													if (el) this.refSuggestions[index] = el;
												}}
												data-index={index}
												tabIndex={-1}
												role="option"
												aria-selected={this.state._value === option}
												onClick={this.handleClickListItem(option as string)}
												onMouseOver={this.handleMouseOver(index)}
												onFocus={this.handleFocus(index)}
												class="combobox__item"
												onKeyDown={this.handleOnKeyDown(option as string)}
											>
												{option}
											</li>
										))}
								</ul>
							)}
						</div>
					</KolInputWcTag>
				</div>
			</Host>
		);
	}

	private handleKeyDown(event: KeyboardEvent) {
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
				this.refInput?.focus();
				break;
			}
			case 'NumpadEnter':
			case 'Enter': {
				this.toggleListbox();
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
						this.focusOption(this._filteredSuggestions !== null && this._filteredSuggestions !== undefined ? this._filteredSuggestions.length - 1 : 0);
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

	private handleMouseMove() {
		this.blockSuggestionMouseOver = false;
	}

	private readonly controller: ComboboxController;
	@State() private blockSuggestionMouseOver: boolean = false;
	@State() private _isOpen: boolean = false;
	@State() private _filteredSuggestions?: SuggestionsPropType;

	@Listen('click', { target: 'window' })
	handleWindowClick(event: MouseEvent) {
		if (this.host !== undefined && !this.host.contains(event.target as Node)) {
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
	 * Defines whether the screen-readers should read out the notification.
	 */
	// eslint-disable-next-line @stencil-community/strict-mutable, @stencil-community/ban-default-true
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	// eslint-disable-next-line @stencil-community/strict-mutable
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
	 * Suggestions the user can choose from.
	 */
	@Prop() public _suggestions!: string[];

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
	// eslint-disable-next-line @stencil-community/strict-mutable
	@Prop({ mutable: true }) public _value?: string;

	@State() public state: ComboboxStates = {
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
		_value: '',
	};

	public constructor() {
		this.controller = new ComboboxController(this, 'combobox', this.host);
		this.onInput = this.onInput.bind(this);
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

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
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
		this.controller.setFormAssociatedValue(value);
	}

	public componentWillLoad(): void {
		this.refSuggestions = [];
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = Boolean(this.state._value);
		this.controller.addValueChangeListener((v) => (this.state._hasValue = Boolean(v)));
		this.host?.addEventListener('keydown', this.handleKeyDown.bind(this));
		this.host?.addEventListener('mousemove', this.handleMouseMove.bind(this));
		this._filteredSuggestions = this.state._suggestions;
	}

	disconnectedCallback() {
		this.host?.removeEventListener('keydown', this.handleKeyDown.bind(this));
		this.host?.removeEventListener('mousemove', this.handleMouseMove.bind(this));
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
		if (this._isOpen) {
			this._isOpen = !this._isOpen;
			this.refInput?.focus();
		}
	}

	private onChange = (event: Event) => {
		// Event handling
		stopPropagation(event);
		tryToDispatchKoliBriEvent('change', this.host, this.state._value);

		// Static form handling
		this.controller.setFormAssociatedValue(this.state._value as unknown as string);

		// Callback
		if (typeof this.state._on?.onChange === 'function' && !this._isOpen) {
			this.state._on.onChange(event, this.state._value);
		}
	};
}
