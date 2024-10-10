import type { KoliBriProgressVariantType, LabelPropType, ProgressAPI, ProgressStates } from '../../schema';
import { KoliBriProgressVariantEnum, validateLabel, watchNumber, watchString, watchValidator } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import type { JSX } from '@stencil/core';
const VALID_VARIANTS = Object.keys(KoliBriProgressVariantEnum);

const CycleSvg = ({ state }: { state: ProgressStates }) => {
	const fullCircle = 342;
	const textPositionTop = '43%';
	const textPositionBottom = '57%';
	const valueY = state._label ? textPositionBottom : '50%';

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
				<text aria-hidden="true" x="50%" y={textPositionTop} text-anchor="middle" fill="currentColor">
					{state._label}
				</text>
			)}
			<text aria-hidden="true" x="50%" y={valueY} text-anchor="middle" fill="currentColor">
				{state._value}
				{state._unit}
			</text>
		</svg>
	);
};

const BarSvg = ({ state }: { state: ProgressStates }) => {
	const textLabelPadding = 'var(--kolibri-text-label-padding, 45px)';
	const percentage = 100 * (state._value / state._max);

	return (
		<div class="bar">
			{state._label && <div>{state._label}</div>}
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" overflow="visible">
				<rect
					class="background"
					x="1"
					y="1"
					height="10"
					rx="5"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="3"
					style={{ width: `calc(100% - 2px - ${textLabelPadding})` }}
				></rect>
				<rect
					class="border"
					x="1"
					y="1"
					height="10"
					rx="5"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="1"
					style={{ width: `calc(100% - 2px - ${textLabelPadding})` }}
				></rect>
				<rect
					class="progress"
					x="2.5"
					y="2.5"
					height="7"
					rx="3.5"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="3"
					style={{ width: `calc(${percentage}% - 5px - (${textLabelPadding} / 100 * ${percentage}))` }}
				></rect>
				<text aria-hidden="true" text-anchor="end" dominant-baseline="middle" fill="currentColor" x="100%" y="50%">
					{state._value}
					{state._unit}
				</text>
			</svg>
		</div>
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
	shadow: {
		delegatesFocus: true,
	},
})
export class KolProcess implements ProgressAPI {
	private interval?: number;

	// https://dequeuniversity.com/library/aria/progress-bar-bounded
	public render(): JSX.Element {
		return (
			<Host class="kol-progress">
				{createProgressSVG(this.state)}

				{/* https://css-tricks.com/html5-progress-element/ */}
				<progress aria-busy={this.state._value < this.state._max ? 'true' : 'false'} max={this.state._max} value={this.state._value}></progress>
				<span aria-live="polite" aria-relevant="removals text" class="visually-hidden">
					{this.state._liveValue} von {this.state._max} {this.state._unit}
				</span>
			</Host>
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
