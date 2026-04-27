import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { MeterApi } from '../../internal/functional-components/meter/api';
import { MeterFC } from '../../internal/functional-components/meter/component';
import { MeterController } from '../../internal/functional-components/meter/controller';
import type { OrientationPropType } from '../../internal/props';

@Component({
	tag: 'kol-meter',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolMeter extends BaseWebComponent<MeterApi> implements WebComponentInterface<MeterApi> {
	private readonly ctrl = new MeterController(this.stateAccess);

	/**
	 * From this value to the max value is the high range of the meter. Below this value is the middle range.
	 */
	@Prop()
	public _high?: number;

	@Watch('_high')
	public watchHigh(value?: number): void {
		this.ctrl.watchHigh(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * From this value to the min value is the low range of the meter. Above this value is the middle range.
	 */
	@Prop()
	public _low?: number;

	@Watch('_low')
	public watchLow(value?: number): void {
		this.ctrl.watchLow(value);
	}

	/**
	 * Defines the maximum value of the element.
	 * Default like native component.
	 */
	@Prop()
	public _max: number = 1;

	@Watch('_max')
	public watchMax(value?: number): void {
		this.ctrl.watchMax(value);
	}

	/**
	 * Defines the minimum value of the element.
	 * Default like native component.
	 */
	@Prop()
	public _min: number = 0;

	@Watch('_min')
	public watchMin(value?: number): void {
		this.ctrl.watchMin(value);
	}

	/**
	 * Indicates the optimal range of the element.
	 * If this lies in the high range, the high range will be optimum, the middle range will be suboptimum and the low range will be critical.
	 * If this lies in the low range, the low range will be optimum, the middle range will be suboptimum and the high range will be critical.
	 * If this lies in the middle range, both low and high range will be suboptimum and nothing will be critical.
	 */
	@Prop()
	public _optimum?: number;

	@Watch('_optimum')
	public watchOptimum(value?: number): void {
		this.ctrl.watchOptimum(value);
	}

	/**
	 * Defines whether the meter bar is displayed horizontally or vertically.
	 */
	@Prop()
	public _orientation: OrientationPropType = 'horizontal';

	@Watch('_orientation')
	public watchOrientation(value?: OrientationPropType): void {
		this.ctrl.watchOrientation(value);
	}

	/**
	 * Defines the unit of the value.
	 */
	@Prop()
	public _unit: string = '%';

	@Watch('_unit')
	public watchUnit(value?: string): void {
		this.ctrl.watchUnit(value);
	}

	/**
	 * Defines the value of the element. Is capped between min and max.
	 */
	@Prop()
	public _value!: number;

	@Watch('_value')
	public watchValue(value?: number): void {
		this.ctrl.watchValue(value);
	}

	@State()
	public liveValue: number = 0;

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			high: this._high,
			label: this._label,
			low: this._low,
			max: this._max,
			min: this._min,
			optimum: this._optimum,
			orientation: this._orientation,
			unit: this._unit,
			value: this._value,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		const { high, low, optimum } = this.ctrl.getMeterData();
		return (
			<Host>
				<MeterFC
					high={high}
					label={this.ctrl.getRenderProp('label')}
					low={low}
					liveValue={this.liveValue}
					max={this.ctrl.getRenderProp('max')}
					min={this.ctrl.getRenderProp('min')}
					optimum={optimum}
					orientation={this.ctrl.getRenderProp('orientation')}
					unit={this.ctrl.getRenderProp('unit')}
					value={this.ctrl.getRenderProp('value')}
				/>
			</Host>
		);
	}
}
