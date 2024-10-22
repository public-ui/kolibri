import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	ButtonProps,
	HideErrorPropType,
	IdPropType,
	InputDateAPI,
	InputDateStates,
	InputDateType,
	InputTypeOnDefault,
	InputTypeOnOff,
	Iso8601,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	NamePropType,
	ReadOnlyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { deprecatedHint, type FocusableElement, type MsgPropType, showExpertSlot } from '../../schema';

import { nonce } from '../../utils/dev.utils';
import { propagateSubmitEventToForm } from '../form/controller';
import { getRenderStates } from '../input/controller';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { InputDateController } from './controller';
import { KolInputTag } from '../../core/component-names';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-input-date',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputDate implements InputDateAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputDateElement;
	private inputRef?: HTMLInputElement;

	@State() private _initialValueType: 'Date' | 'String' | null = null;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | Date | undefined> {
		return this.inputRef && this.remapValue(this.inputRef?.value);
	}

	/**
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	public async focus() {
		await this.kolFocus();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.inputRef?.focus();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async reset() {
		this.state = {
			...this.state,
			_value: null,
		};
		this.controller.setFormAssociatedValue('');

		// Setting the state value might not trigger a state change and rerender if the previous value is already an empty string,
		// which can occur during an incomplete input. Directly setting the DOM property "forces" a reset of the native element.
		if (this.inputRef) {
			this.inputRef.value = '';
		}
	}

	private setInitialValueType(value: Iso8601 | Date | null) {
		if (value instanceof Date) {
			this._initialValueType = 'Date';
		} else if (typeof value === 'string') {
			this._initialValueType = 'String';
		} else {
			this._initialValueType = null;
		}
	}
	private remapValue(newValue: string): Date | string {
		return this._initialValueType === 'Date' ? new Date(newValue) : newValue;
	}

	private readonly onChange = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value;
		const remappedValue = this.remapValue(newValue);
		this.controller.onFacade.onChange(event, remappedValue);
	};

	private readonly onInput = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value;
		const remappedValue = this.remapValue(newValue);
		this.controller.onFacade.onInput(event, true, remappedValue);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasSuggestions = Array.isArray(this.state._suggestions) && this.state._suggestions.length > 0;
		const hasExpertSlot = showExpertSlot(this.state._label);

		return (
			<Host class={{ 'kol-input-date': true, 'has-value': this.state._hasValue }}>
				<KolInputTag
					class={{
						[this.state._type]: true,
						'hide-label': !!this.state._hideLabel,
					}}
					_accessKey={this.state._accessKey}
					_alert={this.showAsAlert()}
					_disabled={this.state._disabled}
					_msg={this.state._msg}
					_hideError={this.state._hideError}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icons={this.state._icons}
					_id={this.state._id}
					_label={this.state._label}
					_suggestions={this.state._suggestions}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_smartButton={this.state._smartButton}
					_tooltipAlign={this._tooltipAlign}
					_touched={this.state._touched}
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
						<input
							ref={this.catchRef}
							title=""
							accessKey={this.state._accessKey}
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
							autoCapitalize="off"
							autoComplete={this.state._autoComplete}
							autoCorrect="off"
							disabled={this.state._disabled}
							id={this.state._id}
							list={hasSuggestions ? `${this.state._id}-list` : undefined}
							max={this.state._max}
							min={this.state._min}
							name={this.state._name}
							readOnly={this.state._readOnly}
							required={this.state._required}
							step={this.state._step}
							spellcheck="false"
							type={this.state._type}
							value={this.state._value || undefined}
							{...this.controller.onFacade}
							onKeyDown={this.onKeyDown}
							onBlur={(event) => {
								this.controller.onFacade.onBlur(event);
								this.inputHasFocus = false;
							}}
							onFocus={(event) => {
								this.controller.onFacade.onFocus(event);
								this.inputHasFocus = true;
							}}
							onChange={this.onChange}
							onInput={this.onInput}
						/>
					</div>
				</KolInputTag>
			</Host>
		);
	}

	private readonly controller: InputDateController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 * @deprecated Will be removed in v3. Use automatic behaviour instead.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean;

	/**
	 * Defines whether the input can be auto-completed.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

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
	 * Defines the largest possible input value.
	 */
	@Prop() public _max?: Iso8601 | Date;

	/**
	 * Defines the smallest possible input value.
	 */
	@Prop() public _min?: Iso8601 | Date;

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
	 * Makes the input element read only.
	 * @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _readOnly?: boolean = false;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines the step size for value changes.
	 */
	@Prop() public _step?: number;

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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type: InputDateType = 'date';

	/**
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true }) public _value?: Iso8601 | Date | null;

	@State() public state: InputDateStates = {
		_autoComplete: 'off',
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
		_type: 'datetime-local',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputDateController(this, 'date', this.host);
	}

	private showAsAlert(): boolean {
		if (this.state._alert === undefined) {
			return Boolean(this.state._touched) && !this.inputHasFocus;
		}
		return this.state._alert;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: InputTypeOnOff): void {
		this.controller.validateAutoComplete(value);
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

	@Watch('_max')
	public validateMax(value?: Iso8601 | Date): void {
		this.controller.validateMax(value);
	}

	@Watch('_min')
	public validateMin(value?: Iso8601 | Date): void {
		this.controller.validateMin(value);
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

	@Watch('_readOnly')
	public validateReadOnly(value?: ReadOnlyPropType): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
	}

	@Watch('_step')
	public validateStep(value?: number): void {
		this.controller.validateStep(value);
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

	@Watch('_type')
	public validateType(value?: InputDateType): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: Iso8601 | Date | null): void {
		if (value instanceof Date) {
			deprecatedHint('Date type will be removed in v3. Use `Iso8601` instead.');
		}
		this.controller.validateValueEx(value);
		if (value !== undefined) this.setInitialValueType(value);
	}

	public componentWillLoad(): void {
		if (this._value !== undefined) this.setInitialValueType(this._value);
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
