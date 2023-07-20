import { Component, h, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { W3CInputValue } from '../../types/w3c';
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
				_label={this._label}
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
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 */
	@Prop() public _alert?: boolean = true;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 */
	@Prop() public _id?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 */
	@Prop() public _list!: Stringified<Option<W3CInputValue>[]>;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop() public _required?: boolean;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop() public _touched?: boolean = false;

	/**
	 * Gibt den Wert der Radio an.
	 */
	@Prop() public _value?: W3CInputValue;
}
