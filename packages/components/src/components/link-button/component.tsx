import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { translate } from '../../i18n';
import {
	AlternativButtonLinkRole,
	KoliBriButtonVariant,
	LinkOnCallbacks,
	LinkTarget,
	OptionalLinkButtonProps,
	RequiredLinkButtonProps,
} from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { AriaCurrent, Align } from '../../types/props';
import { propagateFocus } from '../../utils/reuse';

@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolLinkButton implements Generic.Element.Members<RequiredLinkButtonProps, OptionalLinkButtonProps> {
	@Element() private readonly host?: HTMLKolLinkButtonElement;
	private ref?: HTMLKolLinkWcElement;

	private readonly catchRef = (ref?: HTMLKolLinkWcElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-link-wc
					ref={this.catchRef}
					class={{
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_ariaControls={this._ariaControls}
					_ariaCurrent={this._ariaCurrent}
					_ariaExpanded={this._ariaExpanded}
					_ariaLabel={this._ariaLabel}
					_ariaSelected={this._ariaSelected}
					_disabled={this._disabled}
					_download={this._download}
					_hideLabel={this._hideLabel}
					_href={this._href}
					_icon={this._icon}
					_label={this._label}
					_on={this._on}
					_role="button"
					_tabIndex={this._tabIndex}
					_target={this._target}
					_targetDescription={this._targetDescription}
					_tooltipAlign={this._tooltipAlign}
				>
					<slot name="expert" slot="expert"></slot>
				</kol-link-wc>
			</Host>
		);
	}

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
	@Prop({ reflect: true }) public _ariaExpanded?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop({ reflect: true }) public _ariaSelected?: boolean;

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean = false;

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 */
	@Prop() public _download?: boolean | string = false;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean = false;

	/**
	 * Gibt die Ziel-Url des Links an.
	 */
	@Prop() public _href!: string;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop({ reflect: true }) public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt die EventCallback-Funktionen für den Link an.
	 * @deprecated
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Gibt die Rolle des primären Elements in der Komponente an.
	 */
	@Prop() public _role?: AlternativButtonLinkRole;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an wo der Link geöffnet werden soll.
	 */
	@Prop() public _target?: LinkTarget;

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 */
	@Prop() public _targetDescription?: string = translate('kol-open-link-in-tab');

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'right';

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';
}
