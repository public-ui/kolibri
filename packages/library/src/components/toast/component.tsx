import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { AlertType } from '../../types/alert';
import { HeadingLevel } from '../../types/heading-level';
import { setState, watchBoolean, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { KoliBriToastEventCallbacks } from '../../types/toast';
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
	on: KoliBriToastEventCallbacks;
	show: boolean;
	showDuration: number;
	type: AlertType;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-toast',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolToast implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * Gibt an, ob der Screenreader die Meldung vorlesen soll.
	 */
	@Prop() public _alert?: boolean = true;

	/**
	 * Gibt an, ob der Toast ein Schließen-Icon hat.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Gibt den Titel der Meldung an.
	 */
	@Prop() public _heading?: string = '';

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt die EventCallback-Function für das Schließen des Toasts an.
	 */
	@Prop() public _on?: KoliBriToastEventCallbacks;

	/**
	 * Gibt an, ob der Toast eingeblendet wird.
	 */
	@Prop({ mutable: true, reflect: false }) public _show?: boolean = true;

	/**
	 * Gibt an, wie viele Millisekunden der Toast eingeblendet werden soll.
	 */
	@Prop() public _showDuration?: number = 10000;

	/**
	 * Gibt an, ob es sich um eine Erfolgs-, Info-, Warnung- oder Fehlermeldung handelt.
	 */
	@Prop() public _type?: AlertType = 'default';

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
	public validateOn(value?: KoliBriToastEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			featureHint('[KolToast] Prüfen, wie man auch einen EventCallback einzeln ändern kann.');
			const callbacks: KoliBriToastEventCallbacks = {};
			if (typeof value.onClose === 'function' || value.onClose === true) {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriToastEventCallbacks>(this, '_on', callbacks);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_show')
	public validateShow(value?: boolean): void {
		watchBoolean(this, '_show', value, {
			hooks: {
				afterPatch: this.handleShowAndDuration,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_showDuration')
	public validateShowDuration(value?: number): void {
		watchNumber(this, '_showDuration', value, {
			hooks: {
				afterPatch: this.handleShowAndDuration,
			},
		});
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
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAlert(this._alert);
		this.validateHasCloser(this._hasCloser);
		this.validateHeading(this._heading);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateShow(this._show);
		this.validateShowDuration(this._showDuration);
		this.validateType(this._type);
	}

	private durationTimeout?: NodeJS.Timer;

	private readonly handleShowAndDuration = () => {
		if (this.state._show === true && typeof this.state._showDuration === 'number' && this.state._showDuration >= 0) {
			clearTimeout(this.durationTimeout as NodeJS.Timer);
			this.durationTimeout = setTimeout(() => {
				clearTimeout(this.durationTimeout as NodeJS.Timer);
				this.close();
			}, this.state._showDuration);
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
					<div>
						<kol-alert
							_alert={this.state._alert}
							_heading={this.state._heading}
							_level={this.state._level}
							_hasCloser={this.state._hasCloser}
							_type={this.state._type}
							_variant="card"
							// tabindex="0"
							_on={this.on}
						>
							<slot />
						</kol-alert>
					</div>
				)}
			</Host>
		);
	}
}
