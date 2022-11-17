import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { AlertType, AlertVariant, KoliBriAlertEventCallbacks } from '../../types/alert';
import { HeadingLevel } from '../../types/heading-level';
import { Log } from '../../utils/dev.utils';
import { setState, watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { featureHint } from '../../utils/a11y.tipps';

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
	return <kol-icon class="icon" _ariaLabel={typeof props.heading === 'string' && props.heading.length > 0 ? '' : props.ariaLabel} _icon={props.icon} />;
};

const AlertIcon = (props: { heading?: string; type?: AlertType }) => {
	switch (props.type) {
		case 'error':
			return <Icon ariaLabel={'Fehler'} icon="fa-solid fa-circle-xmark" heading={props.heading} />;
		case 'info':
			return <Icon ariaLabel={'Hinweis'} icon="fa-solid fa-circle-info" heading={props.heading} />;
		case 'warning':
			return <Icon ariaLabel={'Warnung'} icon="fa-solid fa-triangle-exclamation" heading={props.heading} />;
		case 'success':
			return <Icon ariaLabel={'Erfolg'} icon="fa-solid fa-circle-check" heading={props.heading} />;
		default:
			return <Icon ariaLabel={'Nachricht'} icon="fa-regular fa-comment" heading={props.heading} />;
	}
};

@Component({
	tag: 'kol-alert',
	styleUrls: {
		default: './style.sass',
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
					{this.state._variant === 'msg' && <AlertIcon heading={this.state._heading} type={this.state._type} />}
					<div>
						{((typeof this.state._heading === 'string' && this.state._heading.length > 0) || this.state._variant === 'card') && (
							<kol-heading-wc class="heading" _level={this.state._level}>
								{this.state._variant === 'card' && <AlertIcon heading={this.state._heading} type={this.state._type} />}
								{this.state._heading}
							</kol-heading-wc>
						)}
						<div class="content">
							<slot />
						</div>
						{this.state._hasCloser && (
							<kol-button-wc
								class="close"
								_icon={{
									left: {
										icon: 'fa-solid fa-circle-xmark',
									},
								}}
								_iconOnly
								_label="Schließen"
								_on={this.on}
								_tooltipAlign="left"
							></kol-button-wc>
						)}
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	@Prop() public _alert?: boolean = false;

	/**
	 * Gibt an, ob der Alert ein Schließen-Icon hat.
	 */
	@Prop() public _hasCloser?: boolean = false;

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
	@State() public state: States = {};

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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriAlertEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			featureHint('[KolAlert] Prüfen, wie man auch einen EventCallback einzeln ändern kann.');
			const callbacks: KoliBriAlertEventCallbacks = {};
			if (typeof value.onClose === 'function' || value.onClose === true) {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriAlertEventCallbacks>(this, '_on', callbacks);
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
