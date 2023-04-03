import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import {
	AlternativButtonLinkRole,
	AriaCurrent,
	KoliBriButtonCallbacks,
	KoliBriButtonType,
	KoliBriButtonVariant,
	OptionalButtonProps,
	RequiredButtonProps,
} from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { Alignment } from '../../types/props/alignment';
import { propergateFocus } from '../../utils/reuse';

@Component({
	tag: 'kol-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolButton implements Generic.Element.Members<RequiredButtonProps, OptionalButtonProps> {
	@Element() private readonly host?: HTMLKolButtonElement;
	private ref?: HTMLKolButtonWcElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		this.ref = ref;
		propergateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-button-wc
					ref={this.catchRef}
					class={{
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaCurrent={this._ariaCurrent}
					_ariaExpanded={this._ariaExpanded}
					_ariaLabel={this._ariaLabel}
					_ariaSelected={this._ariaSelected}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_icon={this._icon}
					_iconAlign={this._iconAlign}
					_iconOnly={this._iconOnly}
					_id={this._id}
					_label={this._label}
					_on={this._on}
					_role={this._role}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
				>
					{/*
						Es ist keine gute Idee hier einen Slot einzufügen, da dadurch ermöglicht wird,
						die Unterstützung hinsichtlich der Barrierefreiheit der Komponente zu umgehen.
					*/}
					<slot name="expert" slot="expert" />
				</kol-button-wc>
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
	 * Gibt einen beschreibenden Text des Buttons an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 */
	@Prop() public _ariaLabel?: string;

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
	 * Gibt den Class-Identifier eines Icons eine eingebunden Icofont an. (z.B. https://icofont.com/)
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Gibt an, ob das Icon links oder rechts dargestellt werden soll.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: Alignment;

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean = false;

	/**
	 * Gibt die ID der Schaltfläche an. (Selection, Testing)
	 */
	@Prop() public _id?: string;

	/**
	 * Gibt den Label für die Beschriftung der Schaltfläche an.
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: KoliBriButtonCallbacks<unknown>;

	/**
	 * Gibt an, welche Role der Schalter hat.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Alignment = 'top';

	/**
	 * Gibt an, welche Typ der Button hat.
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
}
