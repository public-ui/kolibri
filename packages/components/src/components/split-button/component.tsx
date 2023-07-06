import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { AlternativButtonLinkRole, KoliBriButtonType, KoliBriButtonVariant, watchTooltipAlignment } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { Align } from '../../types/props/align';
import { AriaCurrent, validateAriaCurrent } from '../../types/props/aria-current';
import { validateAriaExpanded } from '../../types/props/aria-expanded';
import { validateAriaSelected } from '../../types/props/aria-selected';
import { validateDisabled } from '../../types/props/disabled';
import { validateHideLabel } from '../../types/props/hide-label';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { a11yHintDisabled } from '../../utils/a11y.tipps';
import { setState, watchBoolean, watchString } from '../../utils/prop.validators';
import { validateTabIndex } from '../../utils/validators/tab-index';
import { watchButtonType, watchButtonVariant } from '../button/controller';
import { KoliBriSplitButtonAPI, KoliBriSplitButtonAStates, KoliBriSplitButtonCallback } from './types';

/**
 * @slot - Ermöglicht das Einfügen beliebigen HTML's in das dropdown.
 */
@Component({
	tag: 'kol-split-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSplitButton implements KoliBriSplitButtonAPI {
	private dropdown: HTMLDivElement | undefined;
	private dropdownContent: HTMLDivElement | undefined;

	private readonly clickHandler = (e: Event) => {
		if (typeof this.state._on.onClick === 'function') this.state._on.onClick(e);
		else this.toggleDropdown();
	};

	private readonly openDropdown = () => {
		if (this.dropdown && this.dropdownContent) {
			this.dropdown.style.height = `${this.dropdownContent.clientHeight}px`;
			this.state = { ...this.state, _showDropdown: true };
		}
	};
	private readonly closeDropdown = () => {
		if (this.dropdown && this.dropdownContent) {
			this.dropdown.style.height = ``;
			this.state = { ...this.state, _showDropdown: false };
		}
	};
	private readonly toggleDropdown = (value?: boolean) => {
		const openIt = typeof value === 'boolean' ? value : !this.state._showDropdown;
		if (openIt) this.openDropdown();
		else this.closeDropdown();
	};
	private forceCounter = 100; // because the dropdown could be empty
	private readonly forceOpenDropdown = () => {
		if (this.forceCounter > 0) {
			if (this.dropdownContent?.clientHeight) this.openDropdown();
			else setTimeout(this.forceOpenDropdown, 10);
			this.forceCounter--;
		}
	};

	private readonly catchDropdownElements = (e?: HTMLDivElement | null) => {
		if (e) {
			this.dropdown = e;
			setTimeout(() => {
				this.dropdownContent = e.firstChild as HTMLDivElement;
				if (this._showDropdown) this.forceOpenDropdown();
			});
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-button-wc
					class={{
						'main-button': true,
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaCurrent={this._ariaCurrent}
					_ariaExpanded={this._ariaExpanded}
					_ariaSelected={this._ariaSelected}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_icon={this._icon}
					_hideLabel={this._hideLabel}
					_label={this._label}
					_on={{ onClick: this.clickHandler }}
					_role={this._role}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
				></kol-button-wc>
				<div class="horizontal-line"></div>
				<kol-button-wc
					class="secondary-button"
					_disabled={this._disabled}
					_hideLabel
					_icon="codicon codicon-triangle-down"
					_label={`dropdown ${this.state._showDropdown ? 'schließen' : 'öffnen'}`}
					_on={{ onClick: () => this.toggleDropdown() }}
				></kol-button-wc>
				<div class="popover" ref={this.catchDropdownElements}>
					<div class="popover-content">
						<slot />
					</div>
				</div>
			</Host>
		);
	}

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
	 */
	@Prop() public _ariaCurrent?: AriaCurrent;

	/**
	 * Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 * @deprecated use _label
	 */
	@Prop({ mutable: true, reflect: false }) public _ariaLabel?: string;

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: string;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: { onClick: KoliBriSplitButtonCallback };

	/**
	 * Gibt die Rolle des primären Elements in der Komponente an.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt die Rolle des primären Elements in der Komponente an.
	 */
	@Prop({ mutable: true, reflect: true }) public _showDropdown?: boolean = false;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'top';

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 */
	@Prop() public _type?: KoliBriButtonType = 'button';

	/**
	 * Gibt einen Wert an, den der Schalter bei einem Klick zurückgibt.
	 */
	@Prop() public _value?: Stringified<unknown>;

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	@State() public state: KoliBriSplitButtonAStates = {
		_icon: '',
		_label: '',
		_on: {},
		_showDropdown: false,
	};

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		watchString(this, '_accessKey', value);
	}

	@Watch('_ariaControls')
	public validateAriaControls(value?: string): void {
		watchString(this, '_ariaControls', value);
	}

	@Watch('_ariaCurrent')
	public validateAriaCurrent(value?: AriaCurrent): void {
		validateAriaCurrent(this, value);
	}

	@Watch('_ariaExpanded')
	public validateAriaExpanded(value?: boolean): void {
		validateAriaExpanded(this, value);
	}

	/**
	 * @deprecated use _label
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_ariaSelected')
	public validateAriaSelected(value?: boolean): void {
		validateAriaSelected(this, value);
	}

	@Watch('_customClass')
	public validateCustomClass(value?: string): void {
		watchString(this, '_customClass', value, { defaultValue: undefined });
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		validateDisabled(this, value);
		if (value) a11yHintDisabled();
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		validateHideLabel(this, value);
	}

	@Watch('_icon')
	public validateIcon(value?: string): void {
		watchString(this, '_icon', value);
	}

	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		this.validateHideLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_on')
	public validateOn(value?: { onClick: KoliBriSplitButtonCallback }): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	@Watch('_role')
	public validateRole(value?: AlternativButtonLinkRole): void {
		watchString(this, '_role', value);
	}

	@Watch('_showDropdown')
	public validateShowDropdown(value?: boolean): void {
		watchBoolean(this, '_showDropdown', value);
		this.toggleDropdown(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		validateTabIndex(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Align): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	@Watch('_type')
	public validateType(value?: KoliBriButtonType): void {
		watchButtonType(this, '_type', value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<unknown>): void {
		setState(this, '_value', value);
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
		this.validateLabel(this._label || this._ariaLabel);
		this.validateOn(this._on);
		this.validateRole(this._role);
		this.validateShowDropdown(this._showDropdown);
		this.validateTabIndex(this._tabIndex);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateType(this._type);
		this.validateValue(this._value);
		this.validateVariant(this._variant);
	}
}
