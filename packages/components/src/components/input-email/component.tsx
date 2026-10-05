import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	AutoCompletePropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputEmailProps,
	InputTypeOnDefault,
	InternalButtonProps,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MaxLengthBehaviorPropType,
	MsgPropType,
	NamePropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';

import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { InputFC } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputEmailApi } from '../../internal/functional-components/input-email/api';
import { inputEmailPropsConfig } from '../../internal/functional-components/input-email/api';
import { BaseTextInputWebComponent } from '../../internal/functional-components/text-input/base-web-component';
import { multipleProp, suggestionsProp } from '../../internal/props';
import { createUniqueId } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';

/**
 * The **Email** input type creates an input field for email addresses. It supports built-in format validation, multiple addresses via the `_multiple` property, and auto-complete suggestions.
 *
 * @slot - The label of the input field.
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-email',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputEmail
	extends BaseTextInputWebComponent<InputEmailApi>
	implements ClickableElement, FocusableElement, InputEmailProps, WebComponentInterface<InputEmailApi>
{
	@Element() protected readonly host?: HTMLKolInputEmailElement;

	@State() public id = createUniqueId('input-email');

	@State() public inputHasFocus = false;

	public constructor() {
		super();
		this.initFormAssociation('email', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.ctaRef.el?.value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(inputEmailPropsConfig);
		this.unsetRenderProp('smartButton');
		this._touched = this._touched === true;
		this.watchAriaDetails(this._ariaDetails);
		this.watchName(this._name);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTouched(this._touched);
		this.watchAccessKey(this._accessKey);
		this.watchMsg(this._msg);
		this.watchDisabled(this._disabled);
		this.watchHideMsg(this._hideMsg);
		this.watchHideLabel(this._hideLabel);
		this.watchHint(this._hint);
		this.watchInfoPopover(this._infoPopover);
		this.watchLabel(this._label);
		this.watchShortKey(this._shortKey);
		this.watchSmartButton(this._smartButton);
		this.watchOn(this._on);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);
		this.watchIcons(this._icons);
		this.watchAutoComplete(this._autoComplete);
		this.watchHasCounter(this._hasCounter);
		this.watchMaxLengthBehavior(this._maxLengthBehavior);
		this.initMaxLength(this._maxLength);
		this.watchPattern(this._pattern);
		this.watchPlaceholder(this._placeholder);
		this.watchReadOnly(this._readOnly);
		this.watchRequired(this._required);
		this.watchSuggestions(this._suggestions);
		this.watchMultiple(this._multiple);
		this.initValue(this._value);
		this.initHasValue();
	}

	public componentDidLoad(): void {
		this.didLoadTextInput();
	}

	public disconnectedCallback(): void {
		this.destroyTextInput();
	}

	// --- Render ---

	public render(): JSX.Element {
		const { startAdornment, endAdornment } = this.getTextInputAdornments();

		return (
			<Host>
				<FormFieldFC {...this.getTextFormFieldProps('kol-input-email email')}>
					<InputContainerFC
						disabled={this.getRenderProp('disabled')}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<InputFC
							{...this.getTextInputProps({ multiple: this.getRenderProp('multiple'), suggestions: this.getRenderProp('suggestions') }, { type: 'email' })}
						/>
					</InputContainerFC>
				</FormFieldFC>
			</Host>
		);
	}

	// --- Props ---

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * References an external element by ID that provides accessible details for this input.
	 * Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

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
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

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
	 * Makes the input accept multiple inputs.
	 * @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _multiple?: boolean = false;

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
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

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
	@Prop() public _variant?: VariantClassNamePropType;

	// --- Watchers ---

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		this.applyAccessKey(value);
	}

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	@Watch('_autoComplete')
	public watchAutoComplete(value?: AutoCompletePropType): void {
		this.applyAutoComplete(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	@Watch('_hasCounter')
	public watchHasCounter(value?: boolean): void {
		this.applyHasCounter(value);
	}

	@Watch('_hideMsg')
	public watchHideMsg(value?: boolean): void {
		this.applyHideMsg(value);
	}

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.applyHideLabel(value);
	}

	@Watch('_hint')
	public watchHint(value?: string): void {
		this.applyHint(value);
	}

	@Watch('_icons')
	public watchIcons(value?: IconsHorizontalPropType): void {
		this.applyIcons(value);
	}

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	@Watch('_maxLength')
	public watchMaxLength(value?: number): void {
		this.applyMaxLength(value);
	}

	@Watch('_maxLengthBehavior')
	public watchMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.applyMaxLengthBehavior(value);
	}

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	@Watch('_multiple')
	public watchMultiple(value?: boolean): void {
		multipleProp.apply(value, (v) => this.setRenderProp('multiple', v));
	}

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	@Watch('_pattern')
	public watchPattern(value?: string): void {
		this.applyPattern(value);
	}

	@Watch('_placeholder')
	public watchPlaceholder(value?: string): void {
		this.applyPlaceholder(value);
	}

	@Watch('_readOnly')
	public watchReadOnly(value?: boolean): void {
		this.applyReadOnly(value);
	}

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		this.applyRequired(value);
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyShortKey(value);
	}

	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		this.applySmartButton(value);
	}

	@Watch('_suggestions')
	public watchSuggestions(value?: SuggestionsPropType): void {
		suggestionsProp.apply(value, (v) => this.setRenderProp('suggestions', v));
	}

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	@Watch('_touched')
	public watchTouched(value?: boolean): void {
		this.applyTouched(value);
	}

	@Watch('_value')
	public watchValue(value?: string): void {
		this.applyValue(value);
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
