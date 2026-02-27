import type { HighProp, LowProp, MinProp, OptimumProp } from '../../props';
import { highProp, lowProp, minProp, optimumProp, withValidPropValue } from '../../props';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import { ProgressController } from '../progress/controller';
import type { MeterApi } from './api';

type MeterData = {
	min: number;
	low: number | undefined;
	high: number | undefined;
	optimum: number | undefined;
};

export class MeterController extends ProgressController implements ControllerInterface<MeterApi> {
	private meterData: MeterData = { min: 0, low: undefined, high: undefined, optimum: undefined };

	public constructor(states: MeterApi['States']) {
		super(states);
	}

	public override componentWillLoad(props: ResolvedInputProps<MeterApi>): void {
		super.componentWillLoad({
			label: props.label,
			max: props.max,
			unit: props.unit,
			value: props.value,
			variant: 'bar',
		});
		this.watchMin(props.min);
		this.watchLow(undefined);
		this.watchHigh(undefined);
		this.watchOptimum(undefined);
	}

	public watchMin(value?: number): void {
		withValidPropValue<MinProp>(minProp, value, (v) => {
			this.meterData.min = v;
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

	public getMeterData(): MeterData {
		return this.meterData;
	}
}
