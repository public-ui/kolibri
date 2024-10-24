import type { JSX } from '@stencil/core';
import { alertTypeOptions, alertVariantOptions, setState, validateHasCloser, validateLabel, watchBoolean, watchValidator } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { watchHeadingLevel } from '../heading/validation';
import type { AlertAPI, AlertStates, AlertType, AlertVariant, HasCloserPropType, HeadingLevel, KoliBriAlertEventCallbacks, LabelPropType } from '../../schema';
import KolAlertFc, { type KolAlertFcProps } from '../../functional-components/Alert';

/**
 * @internal
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-alert-wc',
	shadow: false,
})
export class KolAlertWc implements AlertAPI {
	private readonly close = () => {
		this._on?.onClose?.(new Event('Close'));
	};

	private readonly handleAlertTimeout = () => {
		this.validateAlert(false);
	};

	public render(): JSX.Element {
		const { _alert, _hasCloser, _label, _level, _type, _variant } = this.state;

		const props: KolAlertFcProps = {
			alert: _alert,
			hasCloser: _hasCloser,
			label: _label,
			level: _level,
			type: _type,
			variant: _variant,
			onCloserClick: this.close,
			onAlertTimeout: this.handleAlertTimeout,
		};

		return (
			<Host>
				<KolAlertFc {...props}>
					<slot />
				</KolAlertFc>
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

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		watchBoolean(this, '_alert', value);
	}

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	private validateOnValue = (value: unknown): boolean =>
		typeof value === 'object' && value !== null && typeof (value as KoliBriAlertEventCallbacks).onClose === 'function';

	@Watch('_on')
	public validateOn(value?: KoliBriAlertEventCallbacks): void {
		if (this.validateOnValue(value)) {
			setState<KoliBriAlertEventCallbacks>(
				this,
				'_on',
				{
					onClose: (value as KoliBriAlertEventCallbacks).onClose,
				},
				// {
				// 	afterPatch: (value: unknown) => {
				// 		this._hasCloser = this.validateOnValue(value);
				// 	},
				// }
			);
			// } else {
			// 	setState<KoliBriAlertEventCallbacks>(this, '_on', null, {
			// 		afterPatch: (value: unknown) => {
			// 			this._hasCloser = this.validateOnValue(value);
			// 		},
			// 	});
		}
	}

	@Watch('_type')
	public validateType(value?: AlertType): void {
		watchValidator(
			this,
			'_type',
			(value?) => typeof value === 'string' && alertTypeOptions.includes(value),
			new Set(`String {${alertTypeOptions.join(', ')}`),
			value,
		);
	}

	@Watch('_variant')
	public validateVariant(value?: AlertVariant): void {
		watchValidator(
			this,
			'_variant',
			(value?) => typeof value === 'string' && alertVariantOptions.includes(value),
			new Set(`AlertVariant {${alertVariantOptions.join(', ')}`),
			value,
		);
	}

	public componentWillLoad(): void {
		this.validateAlert(this._alert);
		this.validateHasCloser(this._hasCloser);
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateType(this._type);
		this.validateVariant(this._variant);
	}
}
