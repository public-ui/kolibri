import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { ButtonStates, KoliBriButtonCallbacks, KoliBriButtonType, KoliBriButtonVariant, watchTooltipAlignment } from '../../types/button-link';
import { API } from './types';
import { Stringified } from '../../types/common';
import { AlignPropType } from '../../types/props/align';
import { validateAriaControls } from '../../types/props/aria-controls';
import { AriaCurrentPropType, validateAriaCurrent } from '../../types/props/aria-current';
import { validateAriaExpanded } from '../../types/props/aria-expanded';
import { DisabledPropType, validateDisabled } from '../../types/props/disabled';
import { validateHideLabel } from '../../types/props/hide-label';
import { IconPropType, validateIcon, watchIconAlign } from '../../types/props/icon';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { StencilUnknown } from '../../types/unknown';
import { a11yHintDisabled } from '../../utils/a11y.tipps';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { mapBoolean2String, mapStringOrBoolean2String, setEventTarget, setState, watchBoolean, watchString } from '../../utils/prop.validators';
import { propagateFocus } from '../../utils/reuse';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';
import { watchButtonType, watchButtonVariant } from './controller';
import { CustomClassPropType, validateCustomClass } from '../../types/props/custom-class';
import { ButtonCallbacksPropType, validateButtonCallbacks } from '../../types/props/button-callbacks';
import { AlternativeButtonLinkRolePropType, validateAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';

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
		const hasExpertSlot: boolean = this.state._label === false;
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
					<kol-span-wc _icon={this.state._icon} _hideLabel={this.state._hideLabel} _label={hasExpertSlot ? false : this.state._label}>
						<slot name="expert" slot="expert"></slot>
					</kol-span-wc>
				</button>
				<kol-tooltip
					/**
					 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
					 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
					 */
					aria-hidden="true"
					hidden={hasExpertSlot || !this.state._hideLabel}
					_align={this.state._tooltipAlign}
					_label={typeof this.state._label === 'string' ? this.state._label : ''}
				></kol-tooltip>
			</Host>
		);
	}

	private readonly controller: AssociatedInputController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated aria-current is not necessary for buttons. will be removed in version 2.
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icon?: IconPropType;

	/**
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: AlignPropType;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 *
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 */
	@Prop() public _id?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
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
	@Prop() public _syncValueBySelector?: string;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: AlignPropType = 'top';

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 */
	@Prop() public _type?: KoliBriButtonType = 'button';

	/**
	 * Gibt einen Wert an, den der Schalter bei einem Klick zurückgibt.
	 */
	@Prop() public _value?: Stringified<StencilUnknown>;

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	@State() public state: ButtonStates = {
		_icon: {},
		_label: false, // ⚠ required
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

	/**
	 * @deprecated
	 */
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
	public validateIcon(value?: IconPropType): void {
		validateIcon(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: AlignPropType): void {
		watchIconAlign(this, value);
	}

	/**
	 * @deprecated use _hide-label
	 */
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
		validateLabelWithExpertSlot(this, value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriButtonCallbacks<StencilUnknown>): void {
		validateButtonCallbacks(this, value);
	}

	@Watch('_role')
	public validateRole(value?: AlternativeButtonLinkRolePropType): void {
		validateAlternativeButtonLinkRole(this, value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: string): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: AlignPropType): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	@Watch('_type')
	public validateType(value?: KoliBriButtonType): void {
		watchButtonType(this, '_type', value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		setState(this, '_value', value);
		this.controller.setFormAssociatedValue(this.state._value);
	}

	@Watch('_variant')
	public validateVariant(value?: KoliBriButtonVariant): void {
		watchButtonVariant(this, '_variant', value);
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
		this.validateIcon(this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateId(this._id);
		this.validateLabel(this._label || this._ariaLabel);
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
