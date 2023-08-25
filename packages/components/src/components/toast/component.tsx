import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { KoliBriToastEventCallbacks } from '../../types/toast';
import { setState, watchValidator } from '../../utils/prop.validators';
import { AlertType } from '../alert/types';
import { API, States } from './types';

/**
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-toast',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolToast implements API {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Toasts an.
	 */
	@Prop() public _on?: KoliBriToastEventCallbacks;

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: AlertType = 'default';

	@State() public state: States = {
		_label: '...',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriToastEventCallbacks): void {
		if (typeof value === 'object' && (typeof value?.onClose === 'function' || value.onClose === true)) {
			setState<KoliBriToastEventCallbacks>(this, '_on', { onClose: value.onClose });
		}
	}

	@Watch('_type')
	public validateType(value?: AlertType): void {
		watchValidator(
			this,
			'_type',
			(value) => typeof value === 'string' && (value === 'default' || value === 'error' || value === 'info' || value === 'success' || value === 'warning'),
			new Set('String {success, info, warning, error}'),
			value
		);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateType(this._type);
	}

	private readonly close = () => {
		if (this._on?.onClose !== undefined) {
			this._on.onClose(new Event('Close'));
		}
	};

	private readonly on = {
		onClose: this.close,
	};

	public render(): JSX.Element {
		return (
			<Host>
				<div>
					<kol-alert _alert={true} _label={this.state._label} _level={0} _hasCloser={true} _type={this.state._type} _variant="card" _on={this.on}>
						<slot />
					</kol-alert>
				</div>
			</Host>
		);
	}
}
