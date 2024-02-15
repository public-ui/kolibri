import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { HasCloserPropType, validateHasCloser } from '../../types/props/has-closer';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { ShowPropType, validateShow } from '../../types/props/show';
import { KoliBriToastEventCallbacks } from '../../types/toast';
import { setState, watchBoolean, watchNumber, watchValidator } from '../../utils/prop.validators';
import { AlertType } from '../alert/types';
import { watchHeadingLevel } from '../heading/validation';
import { API, States } from './types';

/**
 * @slot - Der Inhalt der Meldung.
 * @deprecated - Use ToastService - see toaster
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
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop() public _alert?: boolean = true;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 * @deprecated Use _label.
	 */
	@Prop() public _heading?: string = '';

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Toasts an.
	 */
	@Prop() public _on?: KoliBriToastEventCallbacks;

	/**
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = true;

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 */
	@Prop() public _showDuration?: number = 10000;

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: AlertType = 'default';

	@State() public state: States = {
		_alert: true,
		_level: 1,
		_show: true,
	};

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		watchBoolean(this, '_alert', value);
	}

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
	}

	@Watch('_heading')
	public validateHeading(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriToastEventCallbacks): void {
		if (typeof value === 'object' && (typeof value?.onClose === 'function' || value.onClose === true)) {
			setState<KoliBriToastEventCallbacks>(this, '_on', { onClose: value.onClose });
		}
	}

	@Watch('_show')
	public validateShow(value?: ShowPropType): void {
		validateShow(this, value, { hooks: { afterPatch: this.handleShowAndDuration } });
	}

	@Watch('_showDuration')
	public validateShowDuration(value?: number): void {
		watchNumber(this, '_showDuration', value, {
			hooks: {
				afterPatch: this.handleShowAndDuration,
			},
		});
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
		this.validateAlert(this._alert);
		this.validateHasCloser(this._hasCloser);
		this.validateLabel(this._label || this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateShow(this._show);
		this.validateShowDuration(this._showDuration);
		this.validateType(this._type);
	}

	private durationTimeout?: number;

	private readonly handleShowAndDuration = () => {
		if (this.state._show === true && typeof this.state._showDuration === 'number' && this.state._showDuration >= 0) {
			clearTimeout(this.durationTimeout);
			this.durationTimeout = setTimeout(() => {
				this.close();
			}, this.state._showDuration) as unknown as number;
		}
	};

	private readonly close = () => {
		this._show = false;
		this.state = {
			...this.state,
			_show: false,
		};

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
				{this.state._show && (
					<div class="kol-toast-wc">
						<kol-alert
							_alert={this.state._alert}
							_label={this.state._label}
							_level={this.state._level}
							_hasCloser={this.state._hasCloser}
							_type={this.state._type}
							_variant="card"
							// tabindex="0"
							_on={this.on}
							class="kol-alert"
						>
							<slot />
						</kol-alert>
					</div>
				)}
			</Host>
		);
	}
}
