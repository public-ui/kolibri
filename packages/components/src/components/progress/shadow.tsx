import type { KoliBriProgressVariantType, LabelPropType, ProgressAPI, ProgressStates } from '../../schema';
import { KoliBriProgressVariantEnum, validateLabel, watchNumber, watchString, watchValidator } from '../../schema';
import { Component, h, Prop, State, Watch } from '@stencil/core';

import type { JSX } from '@stencil/core';
const VALID_VARIANTS = Object.keys(KoliBriProgressVariantEnum);

const CycleSvg = ({ state }: { state: ProgressStates }) => {
	const fullCircle = 342;

	return (
		<svg width="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
			<circle class="kol-progress__cycle-background" cx="60" cy="60" r="54.5" fill="currentColor" stroke="currentColor" stroke-width="8"></circle>
			<circle class="kol-progress__cycle-whitespace" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="3"></circle>
			<circle class="kol-progress__cycle-border" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
			<circle class="kol-progress__cycle-whitespace" cx="60" cy="60" r="51" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
			<circle class="kol-progress__cycle-border" cx="60" cy="60" r="50" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
			<circle
				class="kol-progress__cycle-progress"
				fill="currentColor"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-dasharray={`${Math.round((state._value / state._max) * fullCircle)}px ${fullCircle}px`}
				stroke-width="6"
				cx="60"
				cy="60"
				r="54.5"
			></circle>
		</svg>
	);
};

const BarSvg = ({ state }: { state: ProgressStates }) => {
	const percentage = 100 * (state._value / state._max);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" overflow="visible">
			<rect
				class="kol-progress__bar-background"
				x="1"
				y="1"
				height="11"
				rx="5"
				fill="currentColor"
				stroke="currentColor"
				stroke-width="3"
				style={{ width: `100%` }}
			></rect>
			<rect
				class="kol-progress__bar-border"
				x="1"
				y="1"
				height="11"
				rx="5"
				fill="currentColor"
				stroke="currentColor"
				stroke-width="1"
				style={{ width: `100%` }}
			></rect>
			<rect
				class="kol-progress__bar-progress"
				x="3"
				y="3"
				height="7"
				rx="3.5"
				fill="currentColor"
				stroke="currentColor"
				stroke-width="3"
				style={{ width: `calc(${percentage}% - 4px)` }}
			></rect>
		</svg>
	);
};

const createProgressSVG = (state: ProgressStates): JSX.Element => {
	switch (state._variant) {
		case 'cycle':
			return <CycleSvg state={state} />;
		case 'bar':
			return <BarSvg state={state} />;
		default:
			throw new Error(`Progress variant ${state._variant} not implemented.`);
	}
};

@Component({
	tag: 'kol-progress',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolProgress implements ProgressAPI {
	private interval?: number;

	// https://dequeuniversity.com/library/aria/progress-bar-bounded
	public render(): JSX.Element {
		const isPercentage = this.state._unit === '%';
		const liveProgressValue = isPercentage ? `${Math.round((this.state._liveValue / this.state._max) * 100)}` : this.state._liveValue;
		const displayValue = isPercentage ? Math.round((this.state._value / this.state._max) * 100) : this.state._value;
		return (
			<div class="kol-progress">
				<div
					aria-hidden="true"
					class={{
						'kol-progress__cycle': this.state._variant === 'cycle',
						'kol-progress__bar': this.state._variant === 'bar',
					}}
				>
					{this.state._variant === 'bar' && this.state._label && <div class="kol-progress__bar-label">{this.state._label}</div>}
					{createProgressSVG(this.state)}
					{this.state._variant == 'cycle' && (
						<div class="kol-progress__cycle-text">
							{this.state._label && <div class="kol-progress__cycle-label">{this.state._label}</div>}
							<div class="kol-progress__cycle-value">{`${displayValue} ${this.state._unit}`}</div>
						</div>
					)}
					{this.state._variant == 'bar' && (
						<div class="kol-progress__bar-value" style={{ width: `${`${(isPercentage ? 100 : this.state._max) + 1}`.length}ch` }}>
							{displayValue}
						</div>
					)}
					{this.state._variant == 'bar' && <div class="kol-progress__bar-unit">{this.state._unit}</div>}
				</div>

				{/* https://css-tricks.com/html5-progress-element/ */}
				<progress
					class="visually-hidden"
					aria-busy={this.state._value < this.state._max ? 'true' : 'false'}
					max={this.state._max}
					value={this.state._value}
				></progress>
				<span aria-live="polite" aria-relevant="removals text" class="visually-hidden">
					{isPercentage ? `${liveProgressValue} %` : `${liveProgressValue} von ${this.state._max} ${this.state._unit}`}
				</span>
			</div>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines at which value the progress display is completed.
	 */
	@Prop() public _max!: number;

	/**
	 * Defines the unit of the step values (not shown).
	 */
	@Prop() public _unit?: string = '%';

	/**
	 * Defines the progress.
	 */
	@Prop() public _value!: number;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: KoliBriProgressVariantType;

	@State() public state: ProgressStates = {
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
		this.validateVariant(this._variant);

		this.state = {
			...this.state,
			_liveValue: this.state._value,
		};
		this.interval = setInterval(() => {
			if (this.state._liveValue !== this.state._value) {
				this.state = {
					...this.state,
					_liveValue: this.state._value,
				};
			}
		}, 5000) as unknown as number;
	}

	public disconnectedCallback(): void {
		clearInterval(this.interval);
	}
}
