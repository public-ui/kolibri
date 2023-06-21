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
	type: KoliBriProgressType; // @deprecated
	unit: string;
	variant: KoliBriProgressType;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	liveValue: number;
};
type OptionalStates = PropLabel & {
	unit: string;
	variant: KoliBriProgressType;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

// https://css-tricks.com/html5-progress-element/
const createProgressSVG = (state: States): JSX.Element => {
	switch (state._variant) {
		case 'cycle':
			return (
				<svg class="cycle" width="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
					<circle class="background" cx="60" cy="60" r="54.5" fill="currentColor" stroke="currentColor" stroke-width="8"></circle>
					<circle class="whitespace" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="3"></circle>
					<circle class="border" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
					<circle class="whitespace" cx="60" cy="60" r="51" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
					<circle class="border" cx="60" cy="60" r="50" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
					<circle
						class="progress"
						fill="currentColor"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-dasharray={`${Math.round((state._value / state._max) * 320)}px 320px`}
						stroke-width="6"
						cx="60"
						cy="60"
						r="54.5"
					></circle>
					<text aria-hidden="true" x="50%" y="50%" text-anchor="middle" fill="currentColor">
						{state._label && <tspan>{state._label}</tspan>}
						<tspan>
							{state._value}
							{state._unit}
						</tspan>
					</text>
				</svg>
			);
		default:
			return (
				<div class="bar">
					{state._label && <div>{state._label}</div>}
					<div style={{ display: 'flex', gap: '0.3em' }}>
						<svg width="100" viewBox="0 0 102 8" xmlns="http://www.w3.org/2000/svg">
							<rect class="background" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100"></rect>
							<rect
								class="progress"
								x="2.5"
								y="2.5"
								height="7"
								rx="3.5"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="3"
								width={95 * (state._value / state._max)}
							></rect>
							<rect class="border" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100"></rect>
						</svg>
						<text aria-hidden="true" text-anchor="middle" dominant-baseline="central" fill="currentColor">
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
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label?: string;

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 */
	@Prop() public _max!: number;

	/**
	 * Deprecated: Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 * @deprecated will be removed in v2, use _variant
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

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: KoliBriProgressType;

	@State() public state: States = {
		_max: 100,
		_unit: '%',
		_value: 0,
		_variant: 'bar',
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

	// @deprecated remove with v2
	@Watch('_type')
	public validateType(value?: KoliBriProgressType): void {
		this.validateVariant(value);
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

	@Watch('_variant')
	public validateVariant(value?: KoliBriProgressType): void {
		if (!value && this._type) {
			// remove with v2
			value = this._type;
		}
		if (value !== 'cycle') {
			value = 'bar';
		}
		this.state = {
			...this.state,
			_variant: value,
		};
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateMax(this._max);
		this.validateUnit(this._unit);
		this.validateValue(this._value);
		this.validateVariant(this._variant || this._type);

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
