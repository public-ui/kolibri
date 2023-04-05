import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import {
	AlternativButtonLinkRole,
	AriaCurrent,
	ButtonStates,
	KoliBriButtonCallbacks,
	KoliBriButtonType,
	KoliBriButtonVariant,
	OptionalButtonProps,
	OptionalButtonStates,
	RequiredButtonProps,
	RequiredButtonStates,
	watchTooltipAlignment,
} from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { Alignment } from '../../types/props/alignment';
import { a11yHintDisabled, devWarning } from '../../utils/a11y.tipps';
import { nonce } from '../../utils/dev.utils';
import { mapBoolean2String, mapStringOrBoolean2String, setEventTarget, setState, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { propergateFocus } from '../../utils/reuse';
import { validateIcon, watchIconAlign } from '../../utils/validators/icon';
import { validateAriaLabelWithLabel, validateLabelWithAriaLabel } from '../../utils/validators/label';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { propergateResetEventToForm, propergateSubmitEventToForm } from '../form/controller';
import { watchButtonType, watchButtonVariant } from './controller';

/**
 * @internal
 */
@Component({
	tag: 'kol-button-wc',
	shadow: false,
})
export class KolButtonWc implements Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates> {
	@Element() private readonly host?: HTMLKolButtonWcElement;
	private readonly nonce = nonce();
	private ref?: HTMLButtonElement;

	private readonly catchRef = (ref?: HTMLButtonElement) => {
		this.ref = ref;
		propergateFocus(this.host, this.ref);
	};

	private readonly onClick = (event: MouseEvent) => {
		if (this.state._type === 'submit') {
			propergateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else if (this.state._type === 'reset') {
			propergateResetEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else if (typeof this.state._on?.onClick === 'function') {
			event.stopPropagation();
			setEventTarget(event, this.ref);
			this.state._on?.onClick(event, this.state._value);
		} else {
			devWarning(`It was no button click callback configured!`);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<button
					ref={this.catchRef}
					accessKey={this.state._accessKey}
					aria-controls={this.state._ariaControls}
					aria-current={mapStringOrBoolean2String(this.state._ariaCurrent)}
					aria-expanded={mapBoolean2String(this.state._ariaExpanded)}
					aria-label={this.state._iconOnly === false ? this.state._ariaLabel : undefined}
					aria-labelledby={this.state._iconOnly === true ? this.nonce : undefined}
					aria-selected={mapStringOrBoolean2String(this.state._ariaSelected)}
					class={{
						[this.state._variant as string]: this.state._variant !== 'custom',
						[this.state._customClass as string]:
							this.state._variant === 'custom' && typeof this.state._customClass === 'string' && this.state._customClass.length > 0,
						'icon-only': this.state._iconOnly === true,
					}}
					disabled={this.state._disabled}
					id={this.state._id}
					{...this.state._on}
					onClick={this.onClick}
					role={this.state._role}
					tabIndex={this.state._tabIndex}
					type={this.state._type}
				>
					<kol-span-wc _icon={this._icon} _iconOnly={this._iconOnly} _label={this.state._label}>
						{/*
							Es ist keine gute Idee hier einen Slot einzufügen, da dadurch ermöglicht wird,
							die Unterstützung hinsichtlich der Barrierefreiheit der Komponente zu umgehen.
						*/}
						<slot name="expert" slot="expert" />
					</kol-span-wc>
				</button>
				{this.state._iconOnly === true && (
					<kol-tooltip
						/**
						 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
						 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
						 */
						aria-hidden="true"
						_align={this.state._tooltipAlign}
						_id={this.nonce}
						_label={this.state._ariaLabel || this.state._label}
					></kol-tooltip>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man den Button auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, welche Elemente kontrolliert werden.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Button hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 */
	@Prop() public _ariaCurrent?: AriaCurrent;

	/**
	 * Gibt an, ob durch den Button etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop({ reflect: true }) public _ariaExpanded?: boolean;

	/**
	 * Gibt einen beschreibenden Text für den Screenreader an. Damit die
	 * Sprachsteuerung von interaktiven Elementen funktioniert, muss der
	 * Aria-Label-Text mit dem Label-Text des Buttons beginnen.
	 *
	 * - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
	 */
	@Prop({ mutable: true, reflect: false }) public _ariaLabel?: string;

	/**
	 * Gibt an, ob Element ausgewählt ist (role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop({ reflect: true }) public _ariaSelected?: boolean;

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Gibt an, ob der Button deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean = false;

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob das Icon links oder rechts dargestellt werden soll.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: Alignment;

	/**
	 * Blendet den Text aus und zeigt nur das gewählte Icon an, der Text wird in den Tooltip verschoben.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 */
	@Prop() public _id?: string;

	/**
	 * Setzt den sichtbaren Text des Elements.
	 */
	// - eslint-disable-next-line @stencil/strict-mutable
	@Prop({ mutable: true, reflect: false }) public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: KoliBriButtonCallbacks<unknown>;

	/**
	 * Gibt an, welche Rolle der Schalter hat.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Setzt die gewünschte Ausrichtung des Tooltips (`_icon-only`).
	 */
	@Prop() public _tooltipAlign?: Alignment = 'top';

	/**
	 * Setzt den Typ der Schaltfläche.
	 */
	@Prop() public _type?: KoliBriButtonType = 'button';

	/**
	 * Gibt einen Wert an, den der Schalter bei einem Klick zurückgibt.
	 */
	@Prop() public _value?: Stringified<unknown>;

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: ButtonStates = {
		_icon: {},
		_label: '…', // ⚠ required
		_on: {},
		_type: 'button',
		_variant: 'normal',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		watchString(this, '_accessKey', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		watchString(this, '_ariaControls', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrent): void {
		watchValidator(
			this,
			'_ariaControls',
			(value) => value === true || value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time',
			new Set(['boolean', 'String {data, location, page, step, time}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		watchBoolean(this, '_ariaExpanded', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		validateAriaLabelWithLabel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		watchBoolean(this, '_ariaSelected', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_customClass')
	public validateCustomClass(value?: string): void {
		watchString(this, '_customClass', value, {
			defaultValue: undefined,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		watchBoolean(this, '_disabled', value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @deprecated
	 */
	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_iconAlign')
	public validateIconAlign(value?: Alignment): void {
		watchIconAlign(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		watchBoolean(this, '_iconOnly', value, {
			defaultValue: false,
			// hooks: {
			//   beforePatch: (_value, nextState) => {
			//     let ariaLabel = this.state._ariaLabel;
			//     if (nextState.has('_ariaLabel')) {
			//       ariaLabel = nextState.get('_ariaLabel') as string;
			//     }
			//     if (typeof ariaLabel !== 'string' || ariaLabel.length <= 0) {
			//       devHint(`[KolButton]: Bevor Icon-Only aktiviert wird, muss ein Aria-Label bzw. Label gesetzt werden.`);
			//       nextState.set('_iconOnly', false);
			//     }
			//   },
			// },
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabelWithAriaLabel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriButtonCallbacks<unknown>): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_role')
	public validateRole(value?: AlternativButtonLinkRole): void {
		watchString(this, '_role', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Alignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_type')
	public validateType(value?: KoliBriButtonType): void {
		watchButtonType(this, '_type', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_value')
	public validateValue(value?: Stringified<unknown>): void {
		setState(this, '_value', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_variant')
	public validateVariant(value?: KoliBriButtonVariant): void {
		watchButtonVariant(this, '_variant', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAriaControls(this._ariaControls);
		this.validateAriaCurrent(this._ariaCurrent);
		this.validateAriaExpanded(this._ariaExpanded);
		this.validateAriaLabel(this._ariaLabel);
		this.validateAriaSelected(this._ariaSelected);
		this.validateCustomClass(this._customClass);
		this.validateDisabled(this._disabled);
		this.validateIcon(this._icon);
		this.validateIconAlign(this._iconAlign);
		this.validateIconOnly(this._iconOnly);
		this.validateId(this._id);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateTabIndex(this._tabIndex);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
		this.validateValue(this._value);
		this.validateVariant(this._variant);
	}
}
