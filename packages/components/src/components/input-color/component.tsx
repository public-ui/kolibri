import type { JSX, VNode } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	AutoCompletePropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconOrIconClass,
	IconsHorizontalPropType,
	InputColorProps,
	InputTypeOnDefault,
	InternalButtonProps,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';

import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { IconButtonFC } from '../../internal/functional-components/form-field/icon-button';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import { SuggestionsFC } from '../../internal/functional-components/form-field/suggestions';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { IconFC } from '../../internal/functional-components/icon/component';
import type { InputColorApi } from '../../internal/functional-components/input-color/api';
import { inputColorPropsConfig } from '../../internal/functional-components/input-color/api';
import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	shortKeyProp,
	smartButtonProp,
	stringValueProp,
	suggestionsProp,
	variantProp,
} from '../../internal/props';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';

const renderIcon = (icon?: IconOrIconClass): JSX.Element | null => {
	if (!icon) {
		return null;
	}
	return typeof icon === 'string' ? (
		<IconFC class="kol-input-container__icon" icons={icon} label="" />
	) : (
		<IconFC class="kol-input-container__icon" icons={icon.icon} label={icon.label ?? ''} style={icon.style} />
	);
};

/**
 * The **Color** input type creates a selection field for defining any color. The color can be entered in hexadecimal, RGB, or HSL notation. It is possible to select a color via a picker or by entering exact color values.
 *
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-input-color',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputColor
	extends BaseFormFieldWebComponent<InputColorApi>
	implements ClickableElement, FocusableElement, InputColorProps, WebComponentInterface<InputColorApi>
{
	@Element() protected readonly host?: HTMLKolInputColorElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	@State() public id = createUniqueId('input-color');

	@State() public inputHasFocus = false;

	public constructor() {
		super();
		this.initFormAssociation('color', this._name);
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
		this.initRenderProps(inputColorPropsConfig);
		// Without `_smartButton` no button is rendered, so the seeded default must not survive.
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
		this.watchSuggestions(this._suggestions);
		this.watchValue(this._value);
	}

	public componentDidLoad(): void {
		// Without a preset value the field takes the initial value of the native control (`#000000`).
		if (!this._value && this.ctaRef) {
			this._value = this.ctaRef.el?.value;
		}
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Event handling ---

	/** The value is kept without a re-render: the native control already shows it. */
	private readonly handleColorInput = (event: Event): void => {
		const value = (event.target as HTMLInputElement).value;
		this.setRenderProp('value', value);
		if (this.ctaRef.el) {
			this.ctaRef.el.value = value;
		}
		this.handleInput(event);
	};

	// --- Render ---

	private getInputProps(): InputFCProps {
		const id = this.id;
		const name = this.getRenderProp('name');
		const accessKey = this.getRenderProp('accessKey');
		const shortKey = this.getRenderProp('shortKey');
		const suggestions = this.getRenderProp('suggestions');
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			disabled: this.getRenderProp('disabled'),
			name: name ? `${name}-color` : undefined,
			...(accessKey ? { accessKey } : {}),
			value: this.getRenderProp('value'),
			autoComplete: this.getRenderProp('autoComplete'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			suggestions: suggestions.length > 0 ? ((<SuggestionsFC id={id} suggestions={suggestions} />) as VNode) : undefined,
			class: 'kol-input-color__input kol-input-color__input--color',
			onBlur: this.handleBlur,
			onChange: this.handleChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleColorInput,
			onKeyDown: this.handleKeyDown,
			ref: this.ctaRef,
			type: 'color',
			ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}

	public render(): JSX.Element {
		const icons = this.getRenderProp('icons');
		const smartButton = this.getRenderProp('smartButton') as InternalButtonProps | undefined;
		const disabled = this.getRenderProp('disabled');
		const startAdornment = [renderIcon(icons.left)].filter(Boolean) as VNode[];
		const endAdornment = [
			typeof smartButton === 'object' && smartButton !== null ? (
				<IconButtonFC componentName="button" class="kol-input-container__smart-button" {...smartButton} hideLabel={true} disabled={disabled} />
			) : null,
			renderIcon(icons.right),
		].filter(Boolean) as VNode[];

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: 'kol-input-color',
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						variant: this.getRenderProp('variant'),
					})}
				>
					<InputContainerFC
						disabled={disabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<InputFC {...this.getInputProps()} />
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
	 * Makes the element non-interactive: it stays focusable and is announced as disabled (aria-disabled), but ignores activation and input.
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
	@Prop() public _value?: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	// --- Watchers ---

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this._shortKey);
	}

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	@Watch('_autoComplete')
	public watchAutoComplete(value?: AutoCompletePropType): void {
		autoCompleteProp.apply(value, (v) => this.setRenderProp('autoComplete', v));
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
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
		horizontalIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		if (value === undefined || value === null) {
			this.unsetRenderProp('smartButton');
		} else {
			smartButtonProp.apply(value, (v) => this.setRenderProp('smartButton', v));
		}
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
		stringValueProp.apply(value, (v) => this.setRenderProp('value', v));
		this.formAssociation.setFormAssociatedValue(this.getRenderProp('value'));
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
