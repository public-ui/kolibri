import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { KoliBriProgressType } from '../../types/progress';
import { PropLabel } from '../../types/props';
import { watchNumber, watchString } from '../../utils/prop.validators';

type RequiredProps = {
	max: number;
	value: number;
};
type OptionalProps = PropLabel & {
	type: KoliBriProgressType;
	unit: string;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	liveValue: number;
};
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

// https://css-tricks.com/html5-progress-element/
const createProgressSVG = (state: States): JSX.Element => {
	switch (state._type) {
		case 'cycle':
			return (
				<div>
					<div class={state._type}>
						<svg width="100" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
							<circle fill="none" stroke="#efefef" cx="6px" cy="6px" r="5px"></circle>
							<text aria-hidden="true" font-size="0.1em" x="50%" y="50%" text-anchor="middle" fill="currentColor">
								{state._label && (
									<tspan text-anchor="middle" x="50%" dy="-0.5em">
										{state._label}
									</tspan>
								)}
								<tspan text-anchor="middle" x="50%" dy={state._label ? '1em' : '0em'}>
									{state._value}
									{state._unit}
								</tspan>
							</text>
							<circle
								class="cycle"
								stroke-linecap="round"
								stroke-dasharray={`${Math.round((state._value / state._max) * 32)}px 32px`}
								fill="none"
								stroke="#0075ff"
								cx="6px"
								cy="6px"
								r="5px"
							></circle>
						</svg>
					</div>
				</div>
			);
		default:
			return (
				<div>
					{state._label && <div>{state._label}</div>}
					<div style={{ display: 'flex', gap: '0.3em' }} class={state._type}>
						<svg width="100" viewBox="0 0 24 2" xmlns="http://www.w3.org/2000/svg">
							<line stroke-width="2" x1="1" stroke-linecap="round" y1="1" x2="23" y2="1" fill="#efefef" stroke="#efefef"></line>
							<line
								class="bar"
								stroke-width="2"
								x1="1"
								stroke-linecap="round"
								y1="1"
								x2={`${1 + Math.round((state._value / state._max) * 22)}`}
								y2="1"
								fill="#0075ff"
								stroke="#0075ff"
							></line>
						</svg>
						<text aria-hidden="true" font-size="0.1em" text-anchor="middle" dominant-baseline="central" fill="currentColor">
							{state._value}
							{state._unit}
						</text>
					</div>
				</div>
			);
	}
};

@Component({
	tag: 'kol-progress',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolProcess implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private interval?: NodeJS.Timer;

	// https://dequeuniversity.com/library/aria/progress-bar-bounded
	public render(): JSX.Element {
		return (
			<Host>
				{createProgressSVG(this.state)}
				<progress aria-busy={this.state._value < this.state._max ? 'true' : 'false'} max={this.state._max} value={this.state._value}></progress>
				<span aria-live="polite" aria-relevant="removals text" hidden>
					{this.state._liveValue} von {this.state._max} {this.state._unit}
				</span>
			</Host>
		);
	}

	/**
	 * Setzt die Bezeichnung der Fortschrittsanzeige.
	 */
	@Prop() public _label?: string;

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 */
	@Prop() public _max!: number;

	/**
	 * Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 */
	@Prop() public _type?: KoliBriProgressType;

	/**
	 * Setzt die Einheit der Fortschrittswerte. (wird nicht angezeigt)
	 */
	@Prop() public _unit?: string = '%';

	/**
	 * Gibt an, wie weit die Anzeige fortgeschritten ist.
	 */
	@Prop() public _value!: number;

	@State() public state: States = {
		_max: 100,
		_type: 'bar',
		_unit: '%',
		_value: 0,
		_liveValue: 0,
	};

	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
	}

	@Watch('_max')
	public validateMax(value?: number): void {
		if (typeof value !== 'number') {
			value = 100;
		}
		watchNumber(this, '_max', value, {
			required: true,
		});
	}

	@Watch('_type')
	public validateType(value?: KoliBriProgressType): void {
		switch (value) {
			case 'cycle':
				break;
			default:
				value = 'bar';
		}
		this.state = {
			...this.state,
			_type: value,
		};
	}

	@Watch('_unit')
	public validateUnit(value?: string): void {
		watchString(this, '_unit', value);
	}

	@Watch('_value')
	public validateValue(value?: number): void {
		if (typeof value !== 'number') {
			value = 0;
		}
		watchNumber(this, '_value', value, {
			// max: this._max, TODO as Function
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateMax(this._max);
		this.validateType(this._type);
		this.validateUnit(this._unit);
		this.validateValue(this._value);

		this.interval = setInterval(() => {
			if (this.state._liveValue !== this.state._value) {
				this.state = {
					...this.state,
					_liveValue: this.state._value,
				};
			}
		}, 5000);
	}

	public disconnectedCallback(): void {
		clearInterval(this.interval);
	}
}
