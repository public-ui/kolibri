import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { States as ButtonStates } from '../../components/button/types';
import { Stringified } from '../../types/common';
import { AlignPropType } from '../../types/props/align';
import { AlternativeButtonLinkRolePropType, validateAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { validateAriaControls } from '../../types/props/aria-controls';
import { AriaCurrentPropType, validateAriaCurrent } from '../../types/props/aria-current';
import { validateAriaExpanded } from '../../types/props/aria-expanded';
import { ButtonCallbacksPropType, validateButtonCallbacks } from '../../types/props/button-callbacks';
import { ButtonTypePropType, validateButtonType } from '../../types/props/button-type';
import { ButtonVariantPropType, validateButtonVariant } from '../../types/props/button-variant';
import { CustomClassPropType, validateCustomClass } from '../../types/props/custom-class';
import { DisabledPropType, validateDisabled } from '../../types/props/disabled';
import { validateHideLabel } from '../../types/props/hide-label';
import { IconsPropType, validateIcons, watchIconAlign } from '../../types/props/icons';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType, validateTooltipAlign } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';
import { a11yHintDisabled } from '../../utils/a11y.tipps';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { mapBoolean2String, mapStringOrBoolean2String, setEventTarget, setState, watchBoolean, watchString } from '../../utils/prop.validators';
import { propagateFocus, showExpertSlot } from '../../utils/reuse';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';
import { API } from './types';

/**
 * @internal
 */
@Component({
	tag: 'kol-button-wc',
	shadow: false,
})
export class KolButtonWc implements API {
	@Element() private readonly host?: HTMLKolButtonWcElement;
	private ref?: HTMLButtonElement;

	private readonly catchRef = (ref?: HTMLButtonElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onClick = (event: MouseEvent) => {
		if (this.state._type === 'submit') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else if (this.state._type === 'reset') {
			propagateResetEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else {
			// Event handling
			stopPropagation(event);
			tryToDispatchKoliBriEvent('click', this.host, this.state._value);

			// TODO: Static form handling
			this.controller.setFormAssociatedValue(this.state._value);

			// Callback
			if (typeof this.state._on?.onClick === 'function') {
				setEventTarget(event, this.ref);
				this.state._on?.onClick(event, this.state._value);
			}
		}
	};

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._label);
		return (
			<Host>
				<button
					ref={this.catchRef}
					accessKey={this.state._accessKey}
					aria-controls={this.state._ariaControls}
					aria-current={mapStringOrBoolean2String(this.state._ariaCurrent)}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
					aria-selected={mapStringOrBoolean2String(this.state._ariaSelected)}
					class={{
						'kol-button-wc': true,
						button: true,
						[this.state._variant as string]: this.state._variant !== 'custom',
						[this.state._customClass as string]:
							this.state._variant === 'custom' && typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
						'icon-only': this.state._hideLabel === true, // @deprecated in v2
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
					<kol-span-wc
						class="kol-span-wc button-inner"
						_icons={this.state._icons}
						_hideLabel={this.state._hideLabel}
						_label={hasExpertSlot ? '' : this.state._label}
					>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
				</button>
				<kol-tooltip-wc
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_align={this.state._tooltipAlign}
					_label={typeof this.state._label === 'string' ? this.state._label : ''}
					class="kol-tooltip-wc"
				></kol-tooltip-wc>
			</Host>
		);
	}

	private readonly controller: AssociatedInputController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated aria-current is not necessary for buttons. will be removed in version 2.
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

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
	 * @deprecated Use _icons.
	 */
	@Prop() public _icon?: IconsPropType;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: AlignPropType;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 *
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

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
		_label: '…', // ⚠ required
		_on: {},
		_type: 'button',
		_variant: 'normal',
	};

	public constructor() {
		this.controller = new AssociatedInputController(this, 'button', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		watchString(this, '_accessKey', value);
	}

	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		validateAriaControls(this, value);
	}

	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrentPropType): void {
		validateAriaCurrent(this, value);
	}

	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		validateAriaExpanded(this, value);
	}

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		watchBoolean(this, '_ariaSelected', value);
	}

	@Watch('_customClass')
	public validateCustomClass(value?: CustomClassPropType): void {
		validateCustomClass(this, value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		validateDisabled(this, value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		validateHideLabel(this, value);
	}

	@Watch('_icon')
	public validateIcon(value?: IconsPropType): void {
		validateIcons(this, value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsPropType): void {
		validateIcons(this, value);
	}

	@Watch('_iconAlign')
	public validateIconAlign(value?: AlignPropType): void {
		watchIconAlign(this, value);
	}

	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		this.validateHideLabel(value);
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
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaSelected(this._ariaSelected);
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateHideLabel(this._hideLabel || this._iconOnly);
		this.validateIcons(this._icons || this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateId(this._id);
		this.validateLabel(this._label ?? this._ariaLabel); // explicitly allow empty string labels
		this.validateName(this._name);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateSyncValueBySelector(this._syncValueBySelector);
		this.validateTabIndex(this._tabIndex);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
		this.validateValue(this._value);
		this.validateVariant(this._variant);
	}
}
