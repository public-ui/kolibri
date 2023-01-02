import { Component, h, JSX, Prop } from '@stencil/core';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';

import { deprecatedHint } from '../../utils/a11y.tipps';
import { Props } from '../input-radio/types';

/**
 * @deprecated Die Komponenten Input-Radio-Group und Input-Radio werden zur Komponente Input-Radio zusammengeführt. Verwendet einfach den Tag `<kol-input-radio>` statt `<kol-input-radio-group>`.
 */
@Component({
	tag: 'kol-input-radio-group',
	shadow: true,
})
export class KolInputRadioGroup implements Props {
	public render(): JSX.Element {
		deprecatedHint(`[KolInputRadioGroup] Die Komponenten Input-Radio-Group und Input-Radio werden zur Komponente Input-Radio zusammengeführt. Wir empfehlen den Tag <kol-input-radio> statt <kol-input-radio-group> zu verwenden.

Mit der Version 1.1 wird die Komponente KolInputRadioGroup aus der Bibliothek entfernt.`);
		return (
			<kol-input-radio
				_accessKey={this._accessKey}
				_disabled={this._disabled}
				_error={this._error}
				_hideLabel={this._hideLabel}
				_id={this._id}
				_list={this._list}
				_name={this._name}
				_on={this._on}
				_orientation={this._orientation}
				_required={this._required}
				_tabIndex={this._tabIndex}
				_touched={this._touched}
				_value={this._value}
			>
				<slot />
			</kol-input-radio>
		);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean;

	/**
	 * Gibt den Text für eine Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id!: string;

	/**
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 */
	@Prop() public _list!: Stringified<Option<unknown>[]>;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt die Ausrichtung der LinkList an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert der Radio an.
	 */
	@Prop() public _value?: string;
}
