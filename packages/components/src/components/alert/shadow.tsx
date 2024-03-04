import type { AlertProps, AlertStates, AlertType, AlertVariant, HeadingLevel, KoliBriAlertEventCallbacks, LabelPropType } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State } from '@stencil/core';

/**
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-alert',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAlert implements AlertProps {
	public render(): JSX.Element {
		return (
			<Host class="kol-alert">
				<kol-alert-wc
					_alert={this._alert}
					_hasCloser={this._hasCloser}
					_label={this._label}
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
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop() public _alert?: boolean = false;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

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

	@State() public state: AlertStates = {
		_level: 1,
	};
}
