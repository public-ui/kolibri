import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { AlertType, AlertVariant, KoliBriAlertEventCallbacks } from '../../types/alert';
import { HeadingLevel } from '../../types/heading-level';
import { setState, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { translate } from '../../i18n';
import { Log } from '../../utils/dev.utils';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	hasCloser: boolean;
	heading: string;
	level: HeadingLevel;
	on: KoliBriAlertEventCallbacks;
	type: AlertType;
	variant: AlertVariant;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

const Icon = (props: { ariaLabel: string; icon: string; heading?: string }) => {
	return <kol-icon class="heading-icon" _ariaLabel={typeof props.heading === 'string' && props.heading.length > 0 ? '' : props.ariaLabel} _icon={props.icon} />;
};

const AlertIcon = (props: { heading?: string; type?: AlertType }) => {
	switch (props.type) {
		case 'error':
			return <Icon ariaLabel={translate('kol-error')} icon="codicon codicon-error" heading={props.heading} />;
		case 'info':
			return <Icon ariaLabel={translate('kol-info')} icon="codicon codicon-info" heading={props.heading} />;
		case 'warning':
			return <Icon ariaLabel={translate('kol-warning')} icon="codicon codicon-warning" heading={props.heading} />;
		case 'success':
			return <Icon ariaLabel={translate('kol-success')} icon="codicon codicon-pass" heading={props.heading} />;
		default:
			return <Icon ariaLabel={translate('kol-message')} icon="codicon codicon-comment" heading={props.heading} />;
	}
};

@Component({
	tag: 'kol-alert',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolAlert implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
			<Host>
				<div
					class={{
						[this.state._type as string]: true,
						[this.state._variant as string]: true,
					}}
					role={this.state._alert ? 'alert' : undefined}
				>
					<div class="heading">
						<AlertIcon heading={this.state._heading} type={this.state._type} />
						<div>
							{typeof this.state._heading === 'string' && this.state._heading?.length > 0 && (
								<kol-heading-wc _headline={this.state._heading} _level={this.state._level}></kol-heading-wc>
							)}
							{this._variant === 'msg' && (
								<div class="content">
									<slot />
								</div>
							)}
						</div>
						{this.state._hasCloser && (
							<kol-button-wc
								class="close"
								_icon={{
									left: {
										icon: 'codicon codicon-close',
									},
								}}
								_iconOnly
								_label={translate('kol-close')}
								_on={this.on}
								_tooltipAlign="left"
							></kol-button-wc>
						)}
					</div>
					{this._variant === 'card' && (
						<div class="content">
							<slot />
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	@Prop({ reflect: true }) public _alert?: boolean = false;

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 */
	@Prop({ reflect: true }) public _hasCloser?: boolean = false;

	/**
	 * Gibt den Titel der Meldung an.
	 */
	@Prop() public _heading?: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Alerts an.
	 */
	@Prop() public _on?: KoliBriAlertEventCallbacks;

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 */
	@Prop() public _type?: AlertType = 'default';

	/**
	 * Gibt an, welche Benachrichtigungsvariante dargestellt wird.
	 */
	@Prop() public _variant?: AlertVariant = 'msg';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_level: 1,
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		watchBoolean(this, '_alert', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_hasCloser')
	public validateHasCloser(value?: boolean): void {
		watchBoolean(this, '_hasCloser', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_heading')
	public validateHeading(value?: string): void {
		watchString(this, '_heading', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	private validateOnValue = (value: unknown): boolean =>
		typeof value === 'object' && value !== null && typeof (value as KoliBriAlertEventCallbacks).onClose === 'function';

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_variant')
	public validateVariant(value?: AlertVariant): void {
		watchValidator(this, '_variant', (value) => value === 'card' || value === 'msg', new Set('AlertVariant {card, msg}'), value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAlert(this._alert);
		this.validateHasCloser(this._hasCloser);
		this.validateHeading(this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateType(this._type);
		this.validateVariant(this._variant);
	}
}
