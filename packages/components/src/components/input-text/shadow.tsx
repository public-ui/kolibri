import type {
	AlertPropType,
	ButtonProps,
	FocusableElement,
	HideErrorPropType,
	IdPropType,
	InputTextAPI,
	InputTextStates,
	InputTextType,
	InputTypeOnDefault,
	InputTypeOnOff,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { setState, showExpertSlot, validateAlert } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { propagateSubmitEventToForm } from '../form/controller';
import { getRenderStates } from '../input/controller';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { InputTextController } from './controller';
import { KolInputWcTag } from '../../core/component-names';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-input-text',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputText implements InputTextAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputTextElement;
	private inputRef?: HTMLInputElement;
	private oldValue?: string;

	private emitEvent(type: string): void {
		this.host?.dispatchEvent(new Event(type, { bubbles: true, composed: true }));
	}

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	private readonly onBlur = (event: FocusEvent) => {
		this.emitEvent('blur');
		this.controller.onFacade.onBlur(event);
	};

	private readonly onChange = (event: Event) => {
		const value = this.inputRef?.value;

		if (this.oldValue !== value) {
			this.oldValue = value;
		}

		this.emitEvent('change');
		this.controller.onFacade.onChange(event);
	};

	private readonly onClick = (event: MouseEvent) => {
		this.emitEvent('click');
		this.controller.onFacade.onClick(event);
	};

	private readonly onFocus = (event: FocusEvent) => {
		this.emitEvent('focus');
		this.controller.onFacade.onFocus(event);
	};

	private readonly onInput = (event: InputEvent) => {
		const value = this.inputRef?.value ?? '';
		setState(this, '_currentLength', value.length);

		this.value = value;
		this.emitEvent('input');

		this.controller.onFacade.onInput(event);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.inputRef?.value;
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

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasSuggestions = Array.isArray(this.state._suggestions) && this.state._suggestions.length > 0;
		const hasExpertSlot = showExpertSlot(this.state._label);

		return (
			<Host
				class={{
					'has-value': this.state._hasValue,
					'kol-input-text': true,
				}}
			>
				<KolInputWcTag
					class={{
						[this.state._type]: true,
						'hide-label': !!this.state._hideLabel,
					}}
					_accessKey={this.state._accessKey}
					_currentLength={this.state._currentLength}
					_disabled={this.state._disabled}
					_hasCounter={this.state._hasCounter}
					_hideError={this.state._hideError}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icons={this.state._icons}
					_id={this.state._id}
					_label={this.state._label}
					_maxLength={this.state._maxLength}
					_msg={this.state._msg}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_smartButton={this.state._smartButton}
					_suggestions={this.state._suggestions}
					_tooltipAlign={this._tooltipAlign}
					_touched={this.state._touched}
					onClick={() => this.inputRef?.focus()}
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
							maxlength={this.state._maxLength}
							name={this.state._name}
							pattern={this.state._pattern}
							placeholder={this.state._placeholder}
							readOnly={this.state._readOnly}
							required={this.state._required}
							spellcheck="false"
							type={this.state._type}
							value={this.state._value as string}
							onBlur={this.onBlur}
							onChange={this.onChange}
							onClick={this.onClick}
							onFocus={this.onFocus}
							onInput={this.onInput}
							onKeyDown={this.onKeyDown}
						/>
					</div>
				</KolInputWcTag>
			</Host>
		);
	}

	private readonly controller: InputTextController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 * @TODO: Change type back to `AlertPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

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
	 * Shows the character count on the lower border of the input.
	 * @TODO: Change type back to `HasCounterPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCounter?: boolean = false;

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
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

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
	 * Defines a validation pattern for the input field.
	 */
	@Prop() public _pattern?: string;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

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
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: InputTextType = 'text';

	/**
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true }) public _value?: string;

	@Prop({ mutable: true, reflect: true }) public value?: string;

	@State() public state: InputTextStates = {
		_autoComplete: 'off',
		_currentLength: 0,
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
		_type: 'text',
	};

	public constructor() {
		this.controller = new InputTextController(this, 'text', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: AlertPropType): void {
		validateAlert(this, value);
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

	@Watch('_hasCounter')
	public validateHasCounter(value?: boolean): void {
		this.controller.validateHasCounter(value);
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

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
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

	@Watch('_pattern')
	public validatePattern(value?: string): void {
		this.controller.validatePattern(value);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: boolean): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
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
	public validateType(value?: InputTextType): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
		this.oldValue = value;
		this.value = value;
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.oldValue = this._value;
		this.value = this._value;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
