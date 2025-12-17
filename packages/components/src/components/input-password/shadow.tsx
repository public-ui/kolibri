import type { JSX, VNode } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

import type {
	AutoCompletePropType,
	ButtonProps,
	DisabledPropType,
	FocusableElement,
	HasCounterPropType,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	IdPropType,
	InputPasswordAPI,
	InputPasswordStates,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MaxLengthBehaviorPropType,
	MsgPropType,
	NamePropType,
	PlaceholderPropType,
	ReadOnlyPropType,
	RequiredPropType,
	ShortKeyPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { devHint } from '../../schema';

import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerStateWrapperFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import KolIconButtonFc from '../../functional-components/IconButton';
import { translate } from '../../i18n';
import type { PasswordVariantPropType } from '../../schema/props/variant/password-variant';
import { nonce } from '../../utils/dev.utils';
import { propagateSubmitEventToForm } from '../form/controller';
import { InputPasswordController } from './controller';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-input-password',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputPassword implements InputPasswordAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputPasswordElement;
	private inputRef?: HTMLInputElement;

	private readonly translateHidePassword = translate('kol-hide-password');
	private readonly translateShowPassword = translate('kol-show-password');

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.inputRef?.value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.inputRef?.focus();
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		this.controller.onFacade.onKeyDown(event);

		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};

	private readonly onInput = (event: InputEvent) => {
		this._value = (event.target as HTMLInputElement).value;
		this.controller.onFacade.onInput(event);
	};

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-password', 'password', {
				'has-value': this.state._hasValue,
				'kol-form-field--has-counter': this.controller.hasSoftCharacterLimit() || this.controller.hasCounter(),
			}),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const ariaDescribedBy = typeof this.state._maxLength === 'number' ? [`${this.state._id}-character-limit-hint`] : undefined; // When a character limit is defined, we provide an additional hint referenced by aria-describedby.

		return {
			ref: this.catchRef,
			type: this._passwordVisible ? 'text' : 'password',
			state: this.state,
			ariaDescribedBy,
			...this.controller.onFacade,
			onInput: this.onInput,
			onKeyDown: this.onKeyDown,
			onFocus: (event: Event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: Event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	private getShowPasswordButton(): VNode | null {
		if (this._variant !== 'visibility-toggle') {
			return null;
		}

		return (
			<KolIconButtonFc
				componentName="button"
				class="kol-input-password__password-toggle-button kol-input-container__smart-button"
				data-testid="kol-input-password-toggle-button"
				label={this._passwordVisible ? this.translateHidePassword : this.translateShowPassword}
				buttonVariant="ghost"
				onClick={(): void => {
					this._passwordVisible = !this._passwordVisible;
					this.inputRef?.focus();
				}}
				icon={`codicon codicon-eye-${this._passwordVisible ? 'closed' : 'watch'}`}
				disabled={this._disabled}
			/>
		);
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerStateWrapperFc state={this.state} endAdornment={this.getShowPasswordButton()}>
					<KolInputStateWrapperFc {...this.getInputProps()} />
				</KolInputContainerStateWrapperFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputPasswordController;

	/**
	 * Defines the key combination that can be used to trigger or focus the component’s interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the input can be auto-completed.
	 */
	@Prop() public _autoComplete?: AutoCompletePropType = 'off';

	/**
	 * Shows a character counter for the input element.
	 */
	@Prop() public _hasCounter?: boolean = false;

	/**
	 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
	 */
	@Prop() public _maxLengthBehavior?: MaxLengthBehaviorPropType = 'hard';

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
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
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

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
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

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
	@Prop({ mutable: true, reflect: true }) public _value?: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: PasswordVariantPropType = 'default';

	@State() public state: InputPasswordStates = {
		_currentLength: 0,
		_currentLengthDebounced: 0,
		_hasValue: false,
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_variant: 'default',
	};
	@State() private _passwordVisible: boolean = false;
	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputPasswordController(this, 'password', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: AutoCompletePropType): void {
		this.controller.validateAutoComplete(value);
		if (value === 'on') {
			devHint(`[KolInputPassword] The 'autocomplete' option should not be set to "on" for a password input field`);
		}
	}

	@Watch('_maxLengthBehavior')
	public validateMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.controller.validateMaxLengthBehavior(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		this.controller.validateDisabled(value);
	}
	@Watch('_variant')
	public validateVariant(value?: PasswordVariantPropType): void {
		this.controller.validateVariant(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hasCounter')
	public validateHasCounter(value?: HasCounterPropType): void {
		this.controller.validateHasCounter(value);
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

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
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

	@Watch('_pattern')
	public validatePattern(value?: string): void {
		this.controller.validatePattern(value);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: PlaceholderPropType): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: ReadOnlyPropType): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
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
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
