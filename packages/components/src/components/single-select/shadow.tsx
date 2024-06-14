import type {
	HideErrorPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	SingleSelectAPI,
	SingleSelectStates,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	OptionsWithOptgroupPropType,
	W3CInputValue,
} from '../../schema';
import { Component, Element, h, Host, Method, Prop, State, Watch, Fragment, Listen } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { SingleSelectController } from './controller';

import type { JSX } from '@stencil/core';
import { KolButtonTag, KolIconTag, KolInputWcTag } from '../../core/component-names';
import { showExpertSlot } from '../../schema';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { getRenderStates } from '../input/controller';
import { translate } from '../../i18n';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
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
	private ref?: HTMLSelectElement;
	private refOptions: HTMLLIElement[] = [];

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.state._value;
	}

	private toggleListbox = () => {
		if (this.state._disabled) {
			this._isOpen = false;
		} else {
			this._isOpen = !this._isOpen;
			if (this._isOpen && Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0) {
				const selectedIndex = this._filteredOptions.findIndex((option) => option.label === this.state._value);
				this._focusedOptionIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this.focusOption(this._focusedOptionIndex);
			}
			if (Array.isArray(this._options)) {
				const matchedOption = this._options.find((option) => option.label === this.state._value);
				this._value = matchedOption ? (matchedOption.label as string) : '';
				this._filteredOptions = this.state._options;
			}
		}
	};

	private clearSelection() {
		this.state._value = '';
		this._value = '';
		this.state._hasValue = false;
		this._filteredOptions = [...this.state._options];
	}

	private selectOption(option: W3CInputValue) {
		this.state._value = option as string;
		this._value = option as string;
		this.state._hasValue = !!option;
		this._filteredOptions = [...this.state._options];
	}

	private onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this._value = target.value;
		this.setFilteredOptionsByQuery(target.value);
	}

	private handleKeyDownDropdown(event: KeyboardEvent) {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			this._isOpen = true;
			this.focusSuggestionStartingWith(event.key);
		}
	}

	private setFilteredOptionsByQuery(query: string) {
		if (query.trim() === '') {
			this._filteredOptions = [...this.state._options];
		} else {
			this._filteredOptions = this.state._options.filter((option) => {
				return (option.label as string).toLowerCase().includes(query.toLowerCase());
			});

			this._isOpen = Array.isArray(this._filteredOptions) && this._filteredOptions.length > 0;
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
			// this._value = optionElement?.textContent || '';
		}
	}

	private focusSuggestionStartingWith(char: string) {
		const charLowerCase = char.toLowerCase();

		const index =
			Array.isArray(this._filteredOptions) &&
			this._filteredOptions.length > 0 &&
			this._filteredOptions.findIndex((option) => (option.label as string).toLowerCase().startsWith(charLowerCase));

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
						onClick={() => this.ref?.focus()}
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
							<div class="single-select__group">
								<input
									class="single-select__input"
									type="text"
									role="single-select"
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
									onInput={this.onInput.bind(this)}
									onChange={this.onChange.bind(this)}
									placeholder={this.state._placeholder}
									onClick={this.toggleListbox}
								/>
								{this.state._value && (
									<KolIconTag
										_icons="codicon codicon-close"
										_label={translate('kol-dropdown')}
										onClick={this.clearSelection.bind(this)}
										class="single-select__icon"
									/>
								)}
								<span class={{ 'single-select__button': true }}>
									<KolButtonTag
										_label={translate('kol-dropdown')}
										_variant="ghost"
										_on={{
											onClick: (): void => {
												this.toggleListbox();
											},
										}}
										_hideLabel
										_icons="codicon codicon-triangle-down"
									></KolButtonTag>
								</span>
							</div>
							{this._isOpen && !(this.state._disabled === true) && (
								<ul role="listbox" aria-label="" class={{ 'single-select__listbox': true }} onKeyDown={this.handleKeyDownDropdown.bind(this)}>
									{Array.isArray(this._filteredOptions) &&
										this._filteredOptions.length > 0 &&
										this._filteredOptions.map((option, index) => (
											<li
												id={`option-${index}`}
												key={`-${index}`}
												ref={(el) => {
													if (el) this.refOptions[index] = el;
												}}
												data-index={index}
												tabIndex={0}
												role="option"
												aria-selected={this.state._value === option.label}
												onClick={() => {
													this.selectOption(option.label);
													this.toggleListbox();
												}}
												class="single-select__item"
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === 'NumpadEnter') {
														this.selectOption(option.label);
														e.preventDefault();
													}
												}}
											>
												<input
													type="radio"
													name="options"
													id={`option-radio-${index}`}
													value={option.label}
													checked={this.state._value === (option.label as string)}
												/>

												<label htmlfor={`option-radio-${index}`}> {option.label}</label>
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

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const handleEvent = (isOpen?: boolean, callback?: () => void): void => {
			event.preventDefault();
			if (isOpen !== undefined) {
				this._isOpen = isOpen;
			}
			callback?.();
		};
		switch (event.key) {
			case 'Down':
			case 'ArrowDown': {
				handleEvent(true, () => this.moveFocus(1));
				break;
			}
			case 'Up':
			case 'ArrowUp': {
				handleEvent(true, () => this.moveFocus(-1));
				break;
			}
			case 'Esc':
			case 'Escape': {
				handleEvent(false);
				break;
			}
			case 'NumpadEnter':
			case 'Enter': {
				this.toggleListbox();
				break;
			}
			case 'Home': {
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this._focusedOptionIndex = 0;
						this.focusOption(this._focusedOptionIndex);
					}
				});
				break;
			}
			case 'End': {
				handleEvent(undefined, () => {
					if (this._isOpen) {
						this._focusedOptionIndex = this._filteredOptions ? this._filteredOptions.length - 1 : 0;
						this.focusOption(this._focusedOptionIndex);
					}
				});
				break;
			}
			case 'PageUp': {
				handleEvent(undefined, () => this._isOpen && this.moveFocus(10));
				break;
			}
			case 'PageDown': {
				handleEvent(undefined, () => this._isOpen && this.moveFocus(-10));
				break;
			}
		}
	}

	private readonly controller: SingleSelectController;
	@State()
	private _isOpen = false;
	@State()
	private _filteredOptions?: OptionsWithOptgroupPropType;

	@Listen('click', { target: 'window' })
	handleWindowClick(event: MouseEvent) {
		if (this.host != undefined && !this.host.contains(event.target as Node)) {
			this._isOpen = false;
		}
		if (Array.isArray(this._options) && !this._options.some((option) => option.label === this._value)) {
			this._value = '';
			this._filteredOptions = this.state._options;
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
	@Prop() public _options!: OptionsWithOptgroupPropType;

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
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_value: '',
	};

	public constructor() {
		this.controller = new SingleSelectController(this, 'select', this.host);
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

	@Watch('_options')
	public validateOptions(value?: OptionsWithOptgroupPropType): void {
		this.controller.validateOptions(value);
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
	}

	public componentWillLoad(): void {
		this.refOptions = [];
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
		this._filteredOptions = this.state._options;
	}

	private onChange(event: Event): void {
		// Event handling
		stopPropagation(event);
		tryToDispatchKoliBriEvent('change', this.host, this._value);

		// Static form handling
		this.controller.setFormAssociatedValue(this._value as unknown as string);

		// Callback
		if (typeof this.state._on?.onChange === 'function') {
			this.state._on.onChange(event, this._value);
		}
	}
}
