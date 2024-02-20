import { Component, h, Host, JSX, Prop } from '@stencil/core';

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
			<Host class="kol-input-radio-group">
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
			</Host>
		);
	}

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop() public _alert?: boolean = true;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 */
	@Prop() public _error?: string;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	/**
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 */
	@Prop() public _list!: Stringified<Option<W3CInputValue>[]>;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop() public _touched?: boolean = false;

	/**
	 * Defines the value of the input.
	 */
	@Prop() public _value?: W3CInputValue;
}
