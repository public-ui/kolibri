import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { KoliBriProgressVariantEnum, KoliBriProgressVariantType } from '../../types/progress';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { KoliBriProgressAPI, KoliBriProgressStates } from './types';

const VALID_VARIANTS = Object.keys(KoliBriProgressVariantEnum);

// https://css-tricks.com/html5-progress-element/
const createProgressSVG = (state: KoliBriProgressStates): JSX.Element => {
	const fullCircle = 342;
	const textPositionTop = '43%';
	const textPositionBottom = '57%';

	let labelY = textPositionTop;
	let valueY = state._label ? textPositionBottom : '50%';
	switch (state._variant) {
		case 'cycle-value-label':
			if (state._label) {
				labelY = textPositionBottom;
				valueY = textPositionTop;
			}
		// eslint-disable-next-line no-fallthrough
		case 'cycle':
		case 'cycle-label-value':
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
						stroke-dasharray={`${Math.round((state._value / state._max) * fullCircle)}px ${fullCircle}px`}
						stroke-width="6"
						cx="60"
						cy="60"
						r="54.5"
					></circle>
					{state._label && (
						<text aria-hidden="true" x="50%" y={labelY} text-anchor="middle" fill="currentColor">
							{state._label}
						</text>
					)}
					<text aria-hidden="true" x="50%" y={valueY} text-anchor="middle" fill="currentColor">
						{state._value}
						{state._unit}
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
export class KolProcess implements KoliBriProgressAPI {
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
	@Prop() public _label?: LabelPropType;

	/**
	 * Gibt an, bei welchem Wert die Fortschrittsanzeige abgeschlossen ist.
	 */
	@Prop() public _max!: number;

	/**
	 * Deprecated: Gibt an, ob der Prozess als Balken oder Kreis dargestellt wird.
	 * @deprecated will be removed in v2, use _variant
	 */
	@Prop() public _type?: KoliBriProgressVariantType;

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
	@Prop() public _variant?: KoliBriProgressVariantType;

	@State() public state: KoliBriProgressStates = {
		_max: 100,
		_unit: '%',
		_value: 0,
		_variant: 'bar',
		_liveValue: 0,
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
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
	public validateType(value?: KoliBriProgressVariantType): void {
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
	public validateVariant(value?: KoliBriProgressVariantType): void {
		watchValidator(this, '_variant', (value) => typeof value === 'string' && VALID_VARIANTS.includes(value), new Set(VALID_VARIANTS), value);
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
