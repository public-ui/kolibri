import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonAPI,
	ButtonCallbacksPropType,
	ButtonStates,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	DisabledPropType,
	FocusableElement,
	IconsPropType,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import {
	mapBoolean2String,
	mapStringOrBoolean2String,
	setEventTarget,
	setState,
	showExpertSlot,
	validateAccessKey,
	validateAlternativeButtonLinkRole,
	validateAriaControls,
	validateAriaDescription,
	validateAriaExpanded,
	validateAriaSelected,
	validateButtonCallbacks,
	validateButtonType,
	validateButtonVariant,
	validateCustomClass,
	validateDisabled,
	validateHideLabel,
	validateIcons,
	validateLabelWithExpertSlot,
	validateShortKey,
	validateTabIndex,
	validateTooltipAlign,
	watchString,
} from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { nonce } from '../../utils/dev.utils';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';
import { KolSpanWcTag, KolTooltipWcTag } from '../../core/component-names';

/**
 * @internal
 */
@Component({
	tag: 'kol-button-wc',
	shadow: false,
})
export class KolButtonWc implements ButtonAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolButtonWcElement;
	private buttonRef?: HTMLButtonElement;

	private readonly internalDescriptionById = nonce();

	private readonly catchRef = (ref?: HTMLButtonElement) => {
		this.buttonRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.buttonRef?.focus();
	}

	private readonly onClick = (event: MouseEvent) => {
		if (this.state._type === 'submit') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.buttonRef,
			});
		} else if (this.state._type === 'reset') {
			propagateResetEventToForm({
				form: this.host,
				ref: this.buttonRef,
			});
		} else {
			// Event handling
			stopPropagation(event);

			tryToDispatchKoliBriEvent('click', this.host, this.state._value);

			// TODO: Static form handling
			this.controller.setFormAssociatedValue(this.state._value);

			// Callback
			if (typeof this.state._on?.onClick === 'function') {
				setEventTarget(event, this.buttonRef);
				this.state._on?.onClick(event, this.state._value);
			}
		}
	};

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._label);
		const hasAriaDescription = Boolean(this.state._ariaDescription?.trim()?.length);

		return (
			<Host class="kol-button-wc">
				<button
					ref={this.catchRef}
					accessKey={this.state._accessKey || undefined}
					aria-controls={this.state._ariaControls}
					aria-describedby={hasAriaDescription ? this.internalDescriptionById : undefined}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
					aria-selected={mapStringOrBoolean2String(this.state._ariaSelected)}
					class={{
						button: true,
						disabled: this.state._disabled === true,
						[this.state._variant as string]: this.state._variant !== 'custom',
						[this.state._customClass as string]:
							this.state._variant === 'custom' && typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
						'hide-label': this.state._hideLabel === true,
					}}
					disabled={this.state._disabled}
					id={this.state._id}
					name={this.state._name}
					{...this.state._on}
					onClick={this.onClick}
					role={this.state._role}
					tabIndex={this.state._tabIndex}
					type={this.state._type}
				>
					<KolSpanWcTag
						class="button-inner"
						_badgeText={this.state._accessKey || this._shortKey}
						_icons={this.state._icons}
						_hideLabel={this.state._hideLabel}
						_label={hasExpertSlot ? '' : this.state._label}
					>
						<slot name="expert" slot="expert"></slot>
					</KolSpanWcTag>
				</button>
				<KolTooltipWcTag
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_badgeText={this._accessKey || this._shortKey}
					_align={this.state._tooltipAlign}
					_label={typeof this.state._label === 'string' ? this.state._label : ''}
				></KolTooltipWcTag>
				{hasAriaDescription && (
					<span class="visually-hidden" id={this.internalDescriptionById}>
						{this.state._ariaDescription}
					</span>
				)}
			</Host>
		);
	}

	private readonly controller: AssociatedInputController;

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';

	/**
	 * Defines the value that the button emits on click.
	 */
	@Prop() public _value?: Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';

	@State() public state: ButtonStates = {
		_icons: {},
		_label: '', // ⚠ required
		_on: {},
		_type: 'button',
		_variant: 'normal',
	};

	public constructor() {
		this.controller = new AssociatedInputController(this, 'button', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: AccessKeyPropType): void {
		validateAccessKey(this, value);
	}

	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		validateAriaControls(this, value);
	}

	@Watch('_ariaDescription')
	public validateAriaDescription(value?: AriaDescriptionPropType): void {
		validateAriaDescription(this, value);
	}

	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		validateAriaExpanded(this, value);
	}

	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		validateAriaSelected(this, value);
	}

	@Watch('_customClass')
	public validateCustomClass(value?: CustomClassPropType): void {
		validateCustomClass(this, value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		validateDisabled(this, value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		validateHideLabel(this, value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsPropType): void {
		validateIcons(this, value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value, {
			required: true,
		});
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		validateButtonCallbacks(this, value);
	}

	@Watch('_role')
	public validateRole(value?: AlternativeButtonLinkRolePropType): void {
		validateAlternativeButtonLinkRole(this, value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		validateShortKey(this, value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		validateTooltipAlign(this, value);
	}

	@Watch('_type')
	public validateType(value?: ButtonTypePropType): void {
		validateButtonType(this, value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		setState(this, '_value', value);
		this.controller.setFormAssociatedValue(this.state._value);
	}

	@Watch('_variant')
	public validateVariant(value?: ButtonVariantPropType): void {
		validateButtonVariant(this, value);
	}

	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAriaControls(this._ariaControls);
		this.validateAriaDescription(this._ariaDescription);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaSelected(this._ariaSelected);
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateHideLabel(this._hideLabel);
		this.validateIcons(this._icons);
		this.validateId(this._id);
		this.validateLabel(this._label);
		this.validateName(this._name);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateShortKey(this._shortKey);
		this.validateSyncValueBySelector(this._syncValueBySelector);
		this.validateTabIndex(this._tabIndex);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
		this.validateValue(this._value);
		this.validateVariant(this._variant);
	}
}
