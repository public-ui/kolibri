import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { KoliBriToastEventCallbacks } from '../../types/toast';
import { setState, watchValidator } from '../../utils/prop.validators';
import { AlertType } from '../alert/types';
import { ToastStatus, toastStatusOptions } from '../toast-container/types';
import { API, States } from './types';

/**
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-toast',
	shadow: true,
	styleUrls: {
		default: './style.css',
	},
})
export class KolToast implements API {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop() public _on?: KoliBriToastEventCallbacks;

	/**
	 * Defines the current toast status.
	 */
	@Prop() public _status!: ToastStatus;

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: AlertType = 'default';

	@State() public state: States = {
		_label: '...',
		_status: 'adding',
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

	@Watch('_status')
	public validateStatus(status?: ToastStatus): void {
		watchValidator(
			this,
			'_status',
			(status) => typeof status === 'string' && toastStatusOptions.includes(status),
			new Set('String {adding, settled, removing}'),
			status
		);
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
		this.validateStatus(this._status);
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
			<div class={`toast ${this.state._status}`}>
				<kol-alert class="alert" _alert={true} _label={this.state._label} _level={0} _hasCloser={true} _type={this.state._type} _variant="card" _on={this.on}>
					<slot />
				</kol-alert>
			</div>
		);
	}
}
