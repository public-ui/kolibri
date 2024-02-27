import type { JSX } from '@stencil/core';
import { Log, alertTypeOptions, alertVariantOptions, setState, validateHasCloser, validateLabel, watchBoolean, watchValidator } from '@public-ui/schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { watchHeadingLevel } from '../heading/validation';
import { KolIcon, KolHeadingWc, KolButtonWc } from '../../core/component-names';

import type {
	AlertAPI,
	AlertStates,
	AlertType,
	AlertVariant,
	HasCloserPropType,
	HeadingLevel,
	KoliBriAlertEventCallbacks,
	LabelPropType,
} from '@public-ui/schema';
const Icon = (props: { ariaLabel: string; icon: string; label?: string }) => {
	return <KolIcon class="heading-icon" _label={typeof props.label === 'string' && props.label.length > 0 ? '' : props.ariaLabel} _icons={props.icon} />;
};

const AlertIcon = (props: { label?: string; type?: AlertType }) => {
	switch (props.type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" label={props.label} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" label={props.label} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" label={props.label} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" label={props.label} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" label={props.label} />;
	}
};

/**
 * @slot - Der Inhalt der Meldung.
 */
@Component({
	tag: 'kol-alert-wc',
	shadow: false,
})
export class KolAlertWc implements AlertAPI {
	private readonly close = () => {
		if (this._on?.onClose !== undefined) {
			this._on.onClose(new Event('Close'));
		}
	};

	private readonly on = {
		onClick: this.close,
	};

	public render(): JSX.Element {
		if (this.state._alert) {
			/**
			 * - https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
			 * - https://googlechrome.github.io/samples/vibration/
			 */
			try {
				Log.debug(['Navigator should vibrate ...', navigator.vibrate([100, 75, 100, 75, 100])]);
			} catch (e) {
				Log.debug('Navigator does not support vibration.');
			}

			setTimeout(() => {
				this.validateAlert(false);
			}, 10000);
		}

		return (
			<Host
				class={{
					alert: true,
					[this.state._type as string]: true,
					[this.state._variant as string]: true,
					hasCloser: !!this.state._hasCloser,
				}}
				role={this.state._alert ? 'alert' : undefined}
			>
				<div class="heading">
					<AlertIcon label={this.state._label} type={this.state._type} />
					<div class="heading-content">
						{typeof this.state._label === 'string' && this.state._label?.length > 0 && (
							<KolHeadingWc _label={this.state._label} _level={this.state._level}></KolHeadingWc>
						)}
						{this.state._variant === 'msg' && (
							<div class="content">
								<slot />
							</div>
						)}
					</div>
					{this.state._hasCloser && (
						<KolButtonWc
							class="close"
							_hideLabel
							_icons={{
								left: {
									icon: 'codicon codicon-close',
								},
							}}
							_label={translate('kol-close')}
							_on={this.on}
							_tooltipAlign="left"
						></KolButtonWc>
					)}
				</div>
				{this.state._variant === 'card' && (
					<div class="content">
						<slot />
					</div>
				)}
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
				}
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
			value
		);
	}

	@Watch('_variant')
	public validateVariant(value?: AlertVariant): void {
		watchValidator(
			this,
			'_variant',
			(value?) => typeof value === 'string' && alertVariantOptions.includes(value),
			new Set(`AlertVariant {${alertVariantOptions.join(', ')}`),
			value
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
