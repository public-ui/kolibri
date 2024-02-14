import { Component, h, Host, JSX, Prop, State } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { LabelPropType } from '../../types/props/label';
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
					_label={this._label || this._heading}
					_level={this._level}
					_on={this._on}
					_type={this._type}
					_variant={this._variant}
					class="kol-alert-wc"
				>
					<slot />
				</kol-alert-wc>
			</Host>
		);
	}

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop() public _alert?: boolean = false;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 * @deprecated Use _label.
	 */
	@Prop() public _heading?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Alerts an.
	 */
	@Prop() public _on?: KoliBriAlertEventCallbacks;

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: AlertType = 'default';

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: AlertVariant = 'msg';

	@State() public state: States = {
		_level: 1,
	};
}
