import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { MeterApi } from '../../internal/functional-components/meter/api';
import { MeterFC } from '../../internal/functional-components/meter/component';
import { MeterController } from '../../internal/functional-components/meter/controller';
import type { ProgressVariantType } from '../../internal/props';

@Component({
	tag: 'kol-meter',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolMeter implements WebComponentInterface<MeterApi> {
	private readonly ctrl = new MeterController(this);

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop()
	public _max!: number;

	@Watch('_max')
	public watchMax(value?: number): void {
		this.ctrl.watchMax(value);
	}

	/**
	 * Defines the minimum value of the element.
	 */
	@Prop()
	public _min?: number;

	@Watch('_min')
	public watchMin(value?: number): void {
		this.ctrl.watchMin(value);
	}

	/**
	 * Defines the lower boundary of the low range.
	 */
	@Prop()
	public _low?: number;

	@Watch('_low')
	public watchLow(value?: number): void {
		this.ctrl.watchLow(value);
	}

	/**
	 * Defines the upper boundary of the high range.
	 */
	@Prop()
	public _high?: number;

	@Watch('_high')
	public watchHigh(value?: number): void {
		this.ctrl.watchHigh(value);
	}

	/**
	 * Defines the optimal value of the element.
	 */
	@Prop()
	public _optimum?: number;

	@Watch('_optimum')
	public watchOptimum(value?: number): void {
		this.ctrl.watchOptimum(value);
	}

	/**
	 * Defines the unit of the step values (not shown).
	 */
	@Prop()
	public _unit?: string;

	@Watch('_unit')
	public watchUnit(value?: string): void {
		this.ctrl.watchUnit(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value!: number;

	@Watch('_value')
	public watchValue(value?: number): void {
		this.ctrl.watchValue(value);
	}

	@State()
	public unit: string = '%';

	@State()
	public variant: ProgressVariantType = 'bar';

	@State()
	public liveValue: number = 0;

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
			max: this._max,
			min: this._min,
			unit: this._unit,
			value: this._value,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		const { label, max, unit, value } = this.ctrl.getProps();
		const { min, low, high, optimum } = this.ctrl.getMeterData();
		const { liveValue } = this;
		return (
			<Host>
				<MeterFC
					label={label}
					max={max}
					min={min}
					unit={unit}
					value={value}
					variant="bar"
					liveValue={liveValue}
					low={low}
					high={high}
					optimum={optimum}
				/>
			</Host>
		);
	}
}
