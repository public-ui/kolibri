import { Component, h, Host, JSX, Prop, State } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { AlertType, AlertVariant, KoliBriAlertEventCallbacks, Props, States } from './types';

/**
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-alert',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAlert implements Props {
	public render(): JSX.Element {
		return (
			<Host>
				<kol-alert-wc
					_alert={this._alert}
					_hasCloser={this._hasCloser}
					_heading={this._heading}
					_level={this._level}
					_on={this._on}
					_type={this._type}
					_variant={this._variant}
				>
					<slot />
				</kol-alert-wc>
			</Host>
		);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 */
	@Prop() public _alert?: boolean = false;

	/**
	 * Gibt an, ob die Komponente einen Schließen-Schalter hat.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Gibt die Beschriftung der Komponente an.
	 */
	@Prop() public _heading?: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Alerts an.
	 */
	@Prop() public _on?: KoliBriAlertEventCallbacks;

	/**
	 * Setzt den Typ der Komponente oder des interaktiven Elements in der Komponente an.
	 */
	@Prop() public _type?: AlertType = 'default';

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: AlertVariant = 'msg';

	@State() public state: States = {
		_level: 1,
	};
}
