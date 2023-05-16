import { Component, h, Host, JSX, Prop, State } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { AlertType, AlertVariant, KoliBriAlertEventCallbacks, Props, States } from './types';

/**
 * @slot default
 * Der Inhalt der Meldung.
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
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	@Prop({ reflect: true }) public _alert?: boolean = false;

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 */
	@Prop({ reflect: true }) public _hasCloser?: boolean = false;

	/**
	 * Gibt den Titel der Meldung an.
	 */
	@Prop() public _heading?: string;

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Alerts an.
	 */
	@Prop() public _on?: KoliBriAlertEventCallbacks;

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 */
	@Prop() public _type?: AlertType = 'default';

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 */
	@Prop() public _variant?: AlertVariant = 'msg';

	@State() public state: States = {
		_level: 1,
	};
}
