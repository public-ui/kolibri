import type {
	HideErrorPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ComboboxAPI,
	ComboboxStates,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { Component, Element, h, Host, Method, Prop, State, Watch, Fragment, Listen } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { ComboboxController } from './controller';

import type { JSX } from '@stencil/core';
import { KolIconTag, KolInputTag } from '../../core/component-names';
import { showExpertSlot } from '../../schema';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { getRenderStates } from '../input/controller';

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
	private ref?: HTMLSelectElement;

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this._value;
	}

	private toggleListbox = () => {
		this._isOpen = !this._isOpen;
	};

	private selectOption(option: string) {
		this.state._value = option;
		this.toggleListbox();
	}
	private onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this._value = target.value;
		this.setFilteredOptionsByQuery(target.value);
	}

	private setFilteredOptionsByQuery(query: string) {
		if (query.trim() === '') {
			this._filteredOptions = [...this._options];
		} else {
			this._filteredOptions = this._options.filter((option: string) => {
				return option.toLowerCase().includes(query.toLowerCase());
			});

			this._isOpen = this._filteredOptions && this._filteredOptions.length > 0 ? true : false;
		}
	}

	private _focusedOptionIndex: number = -1;

	private moveFocus(delta: number) {
		if (!this._filteredOptions) {
			return;
		}
		let index = 0;
		if (delta < this._filteredOptions.length) {
			const optionLength = this._filteredOptions.length;
			index = (this._focusedOptionIndex + delta + optionLength) % optionLength;
			if (index < 0) {
				index = optionLength - 1;
			}
		}
		this._focusedOptionIndex = index;
		this.focusOption(this._focusedOptionIndex);
	}

	private focusOption(index: number) {
		if ((this.host as HTMLKolComboboxElement) && this.host != undefined && this.host.shadowRoot) {
			const optionElement = this.host.shadowRoot.querySelector(`li[data-index="${index}"]`) as HTMLElement;
			optionElement?.focus();
			this._value = optionElement.textContent || '';
		}
	}
	private selectFocusedOption() {
		if (this._focusedOptionIndex !== undefined && this._filteredOptions) {
			const selectedOption = this._filteredOptions[this._focusedOptionIndex];
			this.state._value = selectedOption;
			this._isOpen = false;
			this._focusedOptionIndex = 0;
		}
	}

	private focusOptionStartingWith(char: string) {
		const charLowerCase = char.toLowerCase();

		const index = this._filteredOptions?.findIndex((option: string) => option.toLowerCase().startsWith(charLowerCase));

		if ((index as number) >= 0) {
			this._focusedOptionIndex = index as number;
			this.focusOption(index as number);
		}
	}

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._label);
		const { ariaDescribedBy } = getRenderStates(this.state);

		return (
			<Host class={{ 'kol-combobox': true, combobox: true }}>
				<div class="combobox">
					<KolInputTag
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
							<div class="combobox__group">
								<input
									class="combobox__input"
									type="text"
									role="combobox"
									aria-autocomplete="both"
									aria-expanded="false"
									aria-controls="listbox"
									value={this.state._value}
									title=""
									accessKey={this.state._accessKey}
									aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
									aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
									autoCapitalize="off"
									autoCorrect="off"
									disabled={this.state._disabled}
									id={this.state._id}
									name={this.state._name}
									required={this.state._required}
									spellcheck="false"
									{...this.controller.onFacade}
									onInput={this.onInput.bind(this)}
									onClick={this.toggleListbox.bind(this)}
									onChange={this.onChange.bind(this)}
								/>
								<span class="combobox__icon">
									<KolIconTag _icons="codicon codicon-triangle-down" _label={`dropdown`} onClick={this.toggleListbox.bind(this)} />
								</span>
							</div>
							<ul role="listbox" aria-label="" class={{ combobox__listbox: true, 'combobox__listbox--hidden': !this._isOpen }}>
								{this._filteredOptions &&
									this._filteredOptions.map((option, index) => (
										<li
											key={`-${index}`}
											data-index={index}
											tabIndex={0}
											role="option"
											aria-selected={this.state._value === option}
											onClick={() => this.selectOption(option)}
											class="combobox__item"
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													this.selectOption(option);
													e.preventDefault();
												}
											}}
										>
											{option}
										</li>
									))}
							</ul>
						</div>
					</KolInputTag>
				</div>
			</Host>
		);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const isOpen = this._isOpen;
		const handleEvent = (val?: boolean, callback?: () => void): void => {
			event.preventDefault();
			if (val !== undefined) {
				this._isOpen = val;
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
			case ' ':
			case 'Enter': {
				handleEvent(isOpen ? true : true, () => (isOpen ? this.selectFocusedOption() : undefined));
				break;
			}
			case 'Home': {
				handleEvent(undefined, () => {
					if (isOpen) {
						this._focusedOptionIndex = 0;
						this.focusOption(this._focusedOptionIndex);
					}
				});
				break;
			}
			case 'End': {
				handleEvent(undefined, () => {
					if (isOpen) {
						this._focusedOptionIndex = this._filteredOptions ? this._filteredOptions.length - 1 : 0;
						this.focusOption(this._focusedOptionIndex);
					}
				});
				break;
			}
			case 'PageUp': {
				handleEvent(undefined, () => isOpen && this.moveFocus(10));
				break;
			}
			case 'PageDown': {
				handleEvent(undefined, () => isOpen && this.moveFocus(-10));
				break;
			}
			default:
				if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
					this._isOpen = true;
					this.focusOptionStartingWith(event.key);
				}
				break;
		}
	}

	@Listen('click', { target: 'window' })
	handleWindowClick(event: MouseEvent) {
		(this.host as HTMLKolComboboxElement) && this.host != undefined && !this.host.contains(event.target as Node) && (this._isOpen = false);
	}

	private readonly controller: ComboboxController;
	@State()
	private _isOpen = false;
	@State()
	private _filteredOptions?: string[];
	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	@Prop() public _error?: string;

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
	 * Options the user can choose from, also supporting Optgroup.
	 */
	@Prop() public _options!: string[];

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

	@State() public state: ComboboxStates = {
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_value: '',
	};

	public constructor() {
		this.controller = new ComboboxController(this, 'select', this.host);
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

	@Watch('_error')
	public validateError(value?: string): void {
		this.controller.validateError(value);
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
	public validateOptions(value?: string[]): void {
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
