import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { MeterApi } from '../../internal/functional-components/meter/api';
import { meterPropsConfig } from '../../internal/functional-components/meter/api';
import { MeterFC } from '../../internal/functional-components/meter/component';
import {
	clampedNumberValueProp,
	highProp,
	labelProp,
	lowProp,
	maxProp,
	minProp,
	optimumProp,
	orientationProp,
	unitProp,
	type OrientationPropType,
} from '../../internal/props';

type MeterData = {
	high: number | undefined;
	low: number | undefined;
	optimum: number | undefined;
};

@Component({
	tag: 'kol-meter',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolMeter extends BaseWebComponent<MeterApi> implements WebComponentInterface<MeterApi> {
	private meterData: MeterData = { high: undefined, low: undefined, optimum: undefined };

	/**
	 * From this value to the max value is the high range of the meter. Below this value is the middle range.
	 */
	@Prop()
	public _high?: number;

	@Watch('_high')
	public watchHigh(value?: number): void {
		if (value === undefined) {
			this.meterData.high = undefined;
		} else {
			highProp.apply(value, (v) => {
				this.meterData.high = v;
			});
		}
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * From this value to the min value is the low range of the meter. Above this value is the middle range.
	 */
	@Prop()
	public _low?: number;

	@Watch('_low')
	public watchLow(value?: number): void {
		if (value === undefined) {
			this.meterData.low = undefined;
		} else {
			lowProp.apply(value, (v) => {
				this.meterData.low = v;
			});
		}
	}

	/**
	 * Defines the maximum value of the element.
	 * Default like native component.
	 */
	@Prop()
	public _max: number = 1;

	@Watch('_max')
	public watchMax(value?: number): void {
		maxProp.apply(value, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
	}

	/**
	 * Defines the minimum value of the element.
	 * Default like native component.
	 */
	@Prop()
	public _min: number = 0;

	@Watch('_min')
	public watchMin(value?: number): void {
		minProp.apply(value, (v) => {
			this.setRenderProp('min', v);
			this.watchValue(this.getRawProp('value'));
		});
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
		if (value === undefined) {
			this.meterData.optimum = undefined;
		} else {
			optimumProp.apply(value, (v) => {
				this.meterData.optimum = v;
			});
		}
	}

	/**
	 * Defines whether the meter bar is displayed horizontally or vertically.
	 */
	@Prop()
	public _orientation: OrientationPropType = 'horizontal';

	@Watch('_orientation')
	public watchOrientation(value?: OrientationPropType): void {
		orientationProp.apply(value, (v) => this.setRenderProp('orientation', v));
	}

	/**
	 * Defines the unit of the value.
	 */
	@Prop()
	public _unit: string = '%';

	@Watch('_unit')
	public watchUnit(value?: string): void {
		unitProp.apply(value, (v) => this.setRenderProp('unit', v));
	}

	/**
	 * Defines the value of the element. Is capped between min and max.
	 */
	@Prop()
	public _value!: number;

	@Watch('_value')
	public watchValue(value?: number): void {
		this.setRawProp('value', value);
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setRenderProp('value', v);
			},
			{ min: this.getRenderProp('min'), max: this.getRenderProp('max') },
		);
	}

	public componentWillLoad(): void {
		this.initRenderProps(meterPropsConfig);

		this.watchHigh(this._high);
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
		this.watchLow(this._low);
		maxProp.apply(this._max, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
		minProp.apply(this._min, (v) => {
			this.setRenderProp('min', v);
			this.watchValue(this.getRawProp('value'));
		});
		this.watchOptimum(this._optimum);
		orientationProp.apply(this._orientation, (v) => this.setRenderProp('orientation', v));
		unitProp.apply(this._unit, (v) => this.setRenderProp('unit', v));
		this.watchValue(this._value);
	}

	public render(): JSX.Element {
		const { high, low, optimum } = this.meterData;
		return (
			<Host>
				<MeterFC
					high={high}
					label={this.getRenderProp('label')}
					low={low}
					max={this.getRenderProp('max')}
					min={this.getRenderProp('min')}
					optimum={optimum}
					orientation={this.getRenderProp('orientation')}
					unit={this.getRenderProp('unit')}
					value={this.getRenderProp('value')}
				/>
			</Host>
		);
	}
}
