import type { HighProp, LabelProp, LowProp, MaxProp, MinProp, OptimumProp, UnitProp, ValueProp } from '../../props';
import { highProp, labelProp, lowProp, maxProp, minProp, optimumProp, unitProp, valueProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { MeterApi } from './api';

type MeterData = {
	min: number;
	low: number | undefined;
	high: number | undefined;
	optimum: number | undefined;
};

export class MeterController extends BaseController<MeterApi> implements ControllerInterface<MeterApi> {
	private interval?: ReturnType<typeof setInterval>;
	private meterData: MeterData = { min: 0, low: undefined, high: undefined, optimum: undefined };

	public constructor(states: MeterApi['States']) {
		super(states, {
			label: '',
			max: 100,
			min: 0,
			unit: '%',
			value: 0,
		});
	}

	public componentWillLoad(props: ResolvedInputProps<MeterApi>): void {
		const { label, max, min, unit, value } = props;
		this.watchLabel(label);
		this.watchMax(max);
		this.watchMin(min);
		this.watchUnit(unit);
		this.watchValue(value);
		this.watchLow(undefined);
		this.watchHigh(undefined);
		this.watchOptimum(undefined);

		this.setState('liveValue', this.getProps().value);
		this.startLiveValueInterval();
	}

	public watchLabel(value?: string): void {
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchMax(value?: number): void {
		withValidPropValue<MaxProp>(maxProp, value, (v) => {
			this.setProp('max', v);
		});
	}

	public watchMin(value?: number): void {
		withValidPropValue<MinProp>(minProp, value, (v) => {
			this.setProp('min', v);
			this.meterData.min = v;
		});
	}

	public watchUnit(value?: string): void {
		withValidPropValue<UnitProp>(unitProp, value, (v) => {
			this.setProp('unit', v);
			this.setState('unit', v);
		});
	}

	public watchValue(value?: number): void {
		withValidPropValue<ValueProp>(valueProp, value, (v) => {
			this.setProp('value', v);
		});
	}

	public watchLow(value?: number): void {
		if (value === undefined) {
			this.meterData.low = undefined;
		} else {
			withValidPropValue<LowProp>(lowProp, value, (v) => {
				this.meterData.low = v;
			});
		}
	}

	public watchHigh(value?: number): void {
		if (value === undefined) {
			this.meterData.high = undefined;
		} else {
			withValidPropValue<HighProp>(highProp, value, (v) => {
				this.meterData.high = v;
			});
		}
	}

	public watchOptimum(value?: number): void {
		if (value === undefined) {
			this.meterData.optimum = undefined;
		} else {
			withValidPropValue<OptimumProp>(optimumProp, value, (v) => {
				this.meterData.optimum = v;
			});
		}
	}

	private startLiveValueInterval(): void {
		this.interval = setInterval(() => {
			const { value } = this.getProps();
			if (this.component.liveValue !== value) {
				this.setState('liveValue', value);
			}
		}, 5000);
	}

	public destroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}

	public getMeterData(): MeterData {
		return this.meterData;
	}
}
